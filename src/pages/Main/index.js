import React, {useEffect, useState} from 'react';
import { Formik } from 'formik';

import {
  Text, Image, ImageBackground, StatusBar
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { getData, storeData } from '~/services/AsyncStorage';
import styles from './styles'

import requestPermission from '~/services/RequestPermission'

const Main = ({navigation}) => {
  let [pIp, setPIp] = useState('')

  useEffect(() => {
    requestPermission()
    getData('@ip').then((lastIp)=>{
      setPIp(lastIp)
    })
  })

  const submit = async (ip) => {
    ip = ip.match(/^\w+\.\w+/) ? `http://${ip}` : ip
    await storeData('@ip', ip);
    console.log(ip)
    navigation.navigate('FileHandler')
  }

  return (
    <Formik
      initialValues={{
        ip: pIp
      }}
      onSubmit={ (values) => submit(values.ip) }
      enableReinitialize={true}
    >
    {({
      values,
      handleSubmit,
      setFieldValue
    }) => (
      <ImageBackground
        source={{
          uri: 'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/background.png',
        }}
        style={styles.container}
        resizeMode="cover"
      >
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <Image
          source={{
            uri: 'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/rocketseat_logo.png',
          }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcome} >File Uploader</Text>
        <Text style={styles.instructions}>Selecione o IP do seu computador:</Text>
        <TextInput 
          style={styles.input}
          placeholder={'http://000.000.0.0:0000'}
          value={values.ip}
          onChangeText={(text) => {
            setFieldValue('ip', text)
          }}
        />
        <TouchableOpacity 
          style={styles.button}
          disabled={values.ip != null ? values.ip.match(/\w+\.\w+\.\w+/) ? false : true : false}
          onPress={handleSubmit}
        >
          <Text
            editable = {false}
            style={{color: values.ip != null ? values.ip.match(/\w+\.\w+\.\w+/) ? '#363636' : '#D3D3D3' : '#D3D3D3'}}
          >Iniciar</Text>
        </TouchableOpacity>
      </ImageBackground>
    )}
    </Formik>
  )
}
;

export default Main;
