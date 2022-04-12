import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import IntentHandler from '~/component/ShareIntentHandler';
import {Text, Image, ImageBackground, StatusBar, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {getData, storeData} from '~/services/AsyncStorage';
import styles from './styles';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

import requestPermission from '~/services/RequestPermission';
import ModalSearch from '~/component/ModalSearch';

const Main = ({navigation}) => {
  let [pIp, setPIp] = useState('');
  let [loadingIntent, setLoadingIntent] = useState(false);
  let [listIntent, setListIntent] = useState([]);
  let [modalSearch, setModalSearch] = useState(false);
  let [modalRunning, setModalRunning] = useState([1]);

  useEffect(() => {
    requestPermission();
    getData('@ip').then(lastIp => {
      setPIp(lastIp);
      ReceiveSharingIntent.getReceivedFiles(
        files => {
          if (files.length !== 0) {
            setListIntent(files);
            setLoadingIntent(true);
          }
        },
        error => console.log(error),
        'appFileUploaderSharing',
      );
    });
  }, []);

  const submit = async ip => {
    ip = ip.match(/^\w+\.\w+/) ? `http://${ip}` : ip;
    await storeData('@ip', ip);
    console.log(ip);
    navigation.navigate('FileHandler');
  };

  return (
    <Formik
      initialValues={{
        ip: pIp,
      }}
      onSubmit={values => submit(values.ip)}
      enableReinitialize={true}>
      {({values, handleSubmit, setFieldValue}) => (
        <ImageBackground
          source={{
            uri: 'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/background.png',
          }}
          style={styles.container}
          resizeMode="cover">
          <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
          <Image
            source={{
              uri: 'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/rocketseat_logo.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <IntentHandler
            files={listIntent}
            pIp={pIp}
            loading={loadingIntent}
            setLoading={setLoadingIntent}
          />
          <Text
            style={styles.welcome}
            onPress={async () => {
              console.log(await find());
            }}>
            File Uploader
          </Text>
          <Text style={styles.instructions}>Select your computer's IP:</Text>
          <TextInput
            style={styles.input}
            placeholder={'http://000.000.0.0:0000'}
            value={values.ip}
            onChangeText={text => {
              setFieldValue('ip', text);
            }}
          />
          <ModalSearch
            isOpen={modalSearch}
            setClose={() => setModalSearch(false)}
            onSelect={selected => setFieldValue('ip', selected)}
            run={modalRunning}
          />
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              disabled={
                values.ip != null
                  ? values.ip.match(/\w+\.\w+\.\w+/)
                    ? false
                    : true
                  : false
              }
              onPress={handleSubmit}>
              <Text
                editable={false}
                style={{
                  color:
                    values.ip != null
                      ? values.ip.match(/\w+\.\w+\.\w+/)
                        ? '#363636'
                        : '#D3D3D3'
                      : '#D3D3D3',
                }}>
                Start
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalSearch(true);
                setModalRunning(modalRunning[0] === 1 ? [0] : [1]);
              }}>
              <Text editable={false} style={{color: '#363636'}}>
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </Formik>
  );
};
export default Main;
