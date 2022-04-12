import React, {useEffect, useState} from 'react';
import {getData, storeData} from '~/services/AsyncStorage';
import styles from './styles';
import ModalFiles from '~/component/ModalFiles';
import Button from '~/component/Button';
import RNFetchBlob from 'rn-fetch-blob';
import {
  moveNrename,
  getCloudDirectory,
  sendFile,
  getDirectory,
  selectDirectory,
} from './fileHandler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUpload, faDownload} from '@fortawesome/free-solid-svg-icons';
import IntentHandler from '~/component/ShareIntentHandler';

import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

import {Text, ImageBackground, Modal, View} from 'react-native';

export default function FileHandler() {
  let [pIp, setPIp] = useState('');
  let [modalUpload, setModalUpload] = useState(false);
  let [modalDownload, setModalDownload] = useState(false);
  let [directoryList, setDirectoryList] = useState([]);
  let [lastPath, setLastPath] = useState('');
  let [loading, setLoading] = useState(false);
  let [progress, setProgress] = useState('0%');
  let [cloudList, setCloudList] = useState([]);
  let [loadingIntent, setLoadingIntent] = useState(false);
  let [listIntent, setListIntent] = useState([]);

  useEffect(() => {
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
  });

  const onSelectDownload = selected => {
    setLoading(true);
    RNFetchBlob.config({fileCache: true})
      .fetch('POST', `${pIp}download`, {
        path: selected.name,
      })
      .progress({interval: 10}, (w, t) => {
        setProgress(parseInt((w / t) * 100) + '%');
      })
      .then(res => {
        setProgress('Wait');
        moveNrename(res.path(), selected.name).then(() => setLoading(false));
      })
      .catch(() => setLoading(false));
  };

  const onSelect = async selected => {
    if (selected.type === 'file') {
      setLoading(true);
      sendFile(selected.path, pIp)
        .uploadProgress({interval: 10}, (w, t) => {
          setProgress(parseInt((w / t) * 100) + '%');
        })
        .then(() => {
          console.log('Enviado com sucesso');
        })
        .catch(e => {
          console.log('Falha ao enviar arquivo\n', e);
        })
        .finally(() => setLoading(false));
    } else {
      selectDirectory(selected, lastPath).then(({list, lPath}) => {
        if (list === undefined) return;
        setDirectoryList(list);
        setLastPath(lPath);
      });
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/background.png',
      }}
      style={styles.container}
      resizeMode="cover">
      <>
        <IntentHandler
          files={listIntent}
          pIp={pIp}
          loading={loadingIntent}
          setLoading={setLoadingIntent}
        />
        <Text
          onPress={() => {
            ReceiveSharingIntent.getReceivedFiles(
              files => {
                // files returns as JSON Array example
                //[{ filePath: null, text: null, weblink: null, mimeType: null, contentUri: null, fileName: null, extension: null }]
                console.log('Received file:\n', files);
              },
              error => {
                console.log(error);
              },
              'appFileUploaderSharing', // share url protocol (must be unique to your app, suggest using your apple bundle id)
            );
          }}>
          {'SELECTED IP:\t' + pIp}
        </Text>
        <Button
          text={'UPLOAD'}
          click={() => {
            getDirectory('')
              .then(({list, lPath}) => {
                setDirectoryList(list);
                setLastPath(lPath);
                setModalUpload(true);
              })
              .catch(e => console.log(e));
          }}
        />
        <Button
          text={'DOWNLOAD'}
          click={() => {
            getCloudDirectory('', pIp).then(list => {
              setCloudList(list);
              setModalDownload(true);
            });
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
        animationType="fade"
        visible={loading}
        transparent={true}
        onRequestClose={() => {
          setLoading(false);
        }}>
        <View style={styles.modalLoading}>
          <View style={styles.viewModal}>
            <Text style={styles.loading}>
              {`${
                modalDownload ? 'Downloading' : 'Uploading'
              } File: ${progress}`}
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
  );
}
