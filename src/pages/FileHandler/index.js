import React, {useEffect, useState} from 'react'
import { getData, storeData } from '~/services/AsyncStorage'
import styles from './styles'
import RNFS from 'react-native-fs'
import ModalFiles from '~/component/ModalFiles'
import Button from '~/component/Button'
import RNFetchBlob from 'rn-fetch-blob'
import {moveNrename, getCloudDirectory, sendFile, getDirectory, selectDirectory} from './fileHandler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUpload, faDownload } from '@fortawesome/free-solid-svg-icons'

import {
    Text, Image, ImageBackground, StatusBar, Modal, View
  } from 'react-native';

export default function FileHandler ()  {
    let [pIp, setPIp] = useState('')
    let [modalUpload, setModalUpload] = useState(false)
    let [modalDownload, setModalDownload] = useState(false)
    let [directoryList, setDirectoryList] = useState([])
    let [lastPath, setLastPath] = useState('')
    let [loading, setLoading] = useState(false)
    let [progress, setProgress] = useState('0%')
    let [cloudList, setCloudList] = useState([])

    useEffect(() => {
      getData('@ip').then((lastIp)=>{
        setPIp(lastIp)
      })
    })

    const onSelectDownload = (selected) => {
      setLoading(true)
      RNFetchBlob.config({fileCache: true})
        .fetch('POST', `${pIp}download`, {
          path: selected.name
        })
        .progress({interval: 10}, (w, t) => {
          setProgress( parseInt(w/t*100) + '%' )
        })
        .then((res) => {
          setProgress('Aguarde')
          moveNrename(res.path(), selected.name).then(()=>setLoading(false))
        })
        .catch(()=>setLoading(false))
    }

    const onSelect = async (selected) => {
      if(selected.type === 'file'){
        setLoading(true)
        sendFile(selected.path, pIp)
          .uploadProgress({interval: 10}, (w, t)=>{
            setProgress( parseInt(w/t*100) + '%' )
          })
          .then(()=>{
            console.log('Enviado com sucesso')
          })
          .catch((e)=>{
            console.log('Falha ao enviar arquivo\n', e)
          })
          .finally(() => setLoading(false))
      } else {
        selectDirectory(selected, lastPath)
          .then(({list, lPath}) => {
            if(list === undefined) return
            setDirectoryList(list)
            setLastPath(lPath)
          })
      }
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
          <Text onPress={() => {
              getCloudDirectory('', pIp)
            }}>{'IP SELECIONADO:\t' + pIp}</Text>
          <Button
            text={'UPLOAD'}
            click={() => {
              getDirectory('').then(({list, lPath})=>{
                  setDirectoryList(list)
                  setLastPath(lPath)
                  setModalUpload(true)
              }).catch((e)=>console.log(e))
            }}
          />
          <Button 
            text={'DOWNLOAD'}
            click={() => {
              getCloudDirectory('', pIp).then((list)=>{
                setCloudList(list)
                setModalDownload(true)
              })
            }}
          />
        </>
          <ModalFiles 
            visible={modalUpload}
            list={directoryList}
            setVisible={setModalUpload}
            onSelect={onSelect}
          />
          <ModalFiles 
            visible={modalDownload}
            list={cloudList}
            setVisible={setModalDownload}
            onSelect={onSelectDownload}
          />
          <Modal
            animationType='fade'
            visible={loading}
            transparent={true}
            onRequestClose={() => {setLoading(false)}}
          >
            <View style={styles.modalLoading}>
              <View style={styles.viewModal}>
                <Text style={styles.loading}>
                  {`${modalDownload ? 'Baixando' : 'Enviando'} Arquivo: ${progress}`}
                </Text>
                <FontAwesomeIcon 
                  icon={modalDownload ? faDownload : faUpload} 
                  style={styles.icon}
                  size={40}
                />
              </View>
            </View>
          </Modal>
      </ImageBackground>
    )
}