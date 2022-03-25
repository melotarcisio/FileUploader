import React, {useEffect, useState} from 'react';
import { getData, storeData } from '~/services/AsyncStorage';
import styles from './styles'
import RNFS from 'react-native-fs'
import ModalFiles from '~/component/ModalFiles'
import RNFetchBlob from 'rn-fetch-blob'
import {sendFile, getDirectory, selectDirectory} from './fileHandler';

import {
    Text, Image, ImageBackground, StatusBar
  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FileHandler ()  {
    let [pIp, setPIp] = useState('')
    let [modalUpload, setModalUpload] = useState(false)
    let [directoryList, setDirectoryList] = useState([])
    let [lastPath, setLastPath] = useState('')

    useEffect(() => {
      getData('@ip').then((lastIp)=>{
        setPIp(lastIp)
      })
    })

    const onSelect = (selected) => {
      selectDirectory(selected, lastPath)
        .then(({list, lPath}) => {
          if(list === undefined) return
          setDirectoryList(list)
          setLastPath(lPath)
      })
    }
    
    return (
        <ImageBackground
        source={{
          uri: 'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/background.png',
        }}
        style={styles.container}
        resizeMode="cover"
      >
        <>
          <Text onPress={async () => {
            console.log(RNFS.ExternalStorageDirectoryPath)
            getDirectory('').then(({list, lPath})=>console.log(list))
          }}>{'IP SELECIONADO:' + pIp}</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() =>{
                getDirectory('').then(({list, lPath})=>{
                    setDirectoryList(list)
                    setLastPath(lPath)
                    setModalUpload(true)
                }).catch((e)=>console.log(e))
            }}
          >
              <Text style={styles.textButton}>  UPLOAD  </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>DOWNLOAD</Text>
          </TouchableOpacity>
        </>
          <ModalFiles 
            visible={modalUpload}
            list={directoryList}
            setVisible={setModalUpload}
            onSelect={onSelect}
          />
      </ImageBackground>
    )
}