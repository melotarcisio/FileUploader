import {sendFile, sendURL} from '~/pages/FileHandler/fileHandler'
import ReceiveSharingIntent from 'react-native-receive-sharing-intent'
import { Alert, Modal, View, Text } from 'react-native'

import React, {useState} from 'react'
import styles from '~/pages/FileHandler/styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUpload, loading as ld } from '@fortawesome/free-solid-svg-icons'


const IntentHandler = ({
    files,
    pIp,
    loading,
    setLoading
}) => {
    let [progress, setProgress] = useState('0%')

    const shareIntentHandler = () => {
      //[{ filePath: null, text: null, weblink: null, mimeType: null, contentUri: null, fileName: null, extension: null }]
      for(let file in files) {
        console.log('Arquivo a ser enviado', files[file])
        let isUrl = files[file].weblink != null
        Alert.alert(
          "Confirmação",
          isUrl ? `Deseja abrir o seguinte endereço em no ip ${pIp}\n${files[file].weblink}`
                : `Deseja enviar o arquivo ${files[file].fileName} para o ip ${pIp}`,
          [
            {
              text: "Sim", onPress: () => {
                if(isUrl){
                  sendURL(files[file].weblink, pIp)
                    .then((sended)=>{
                      Alert.alert('',sended ? 'Link aberto no computador' : 'Erro ao abrir link')
                      setLoading(false)
                    })
                } else {
                  sendFile(files[file].filePath, pIp)
                    .uploadProgress({interval: 10}, (w, t)=>{
                        setProgress( parseInt(w/t*100) + '%' )
                    })
                    .then(()=>{
                        Alert.alert('Enviado com sucesso!')
                    })
                    .catch((e)=>{
                        Alert.alert('Falha ao enviar arquivo')
                    })
                    .finally(() => {
                        setLoading(false)
                        ReceiveSharingIntent.clearReceivedFiles()
                    })
                }
            }
          },
            {text: "Não", onPress: ()=>setLoading(false)}
          ]
        )
      }
      ReceiveSharingIntent.clearReceivedFiles()
    }
    
    return (
        <>
        <Modal
            animationType='fade'
            visible={loading}
            transparent={true}
            onRequestClose={() => {setLoading(false)}}
            onShow={shareIntentHandler}
          >
            <View style={styles.modalLoading}>
              <View style={styles.viewModal}>
                <Text style={styles.loading}>
                  {`Enviando Arquivo: ${progress}`}
                </Text>
                <FontAwesomeIcon 
                  icon={progress != '0%' ? faUpload : ld} 
                  style={styles.icon}
                  size={40}
                />
              </View>
            </View>
        </Modal>
        </>
    )
}

export default IntentHandler