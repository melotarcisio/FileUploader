import React, {useEffect, useState} from 'react';
import { getData, storeData } from '~/services/AsyncStorage';
import styles from './styles'
import RNFS from 'react-native-fs'
import ModalFiles from '~/component/ModalFiles'

import {
    Text, Image, ImageBackground, StatusBar
  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FileHandler ()  {
    let [pIp, setPIp] = useState('')
    let [modalUpload, setModalUpload] = useState(false)
    let [directoryList, setDirectoryList] = useState([])

    useEffect(() => {
      getData('@ip').then((lastIp)=>{
        setPIp(lastIp)
      })
    })
    
    const getDirectory = async (path) => {
        //let ls = await RNFS.ls(RNFS.DocumentDirectoryPath + path)
        console.log(directoryList)
        setDirectoryList(['main', 'downloads', 'text1.txt', 'table2.csv', 'documents', 'text.txt', 'table.csv'])
    }
 
    const selectDirectory = (name) => {
        setDirectoryList([ 'table.csv', 'voltar'])

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
          <TouchableOpacity 
            style={styles.button} 
            onPress={() =>{
                getDirectory('').then(()=>{
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
            onSelect={selectDirectory}
          />
      </ImageBackground>
    )
}