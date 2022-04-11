import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  ImageBackground,
  StatusBar,
  View,
  Modal,
  StyleSheet,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {getData, storeData} from '~/services/AsyncStorage';
import {NetworkInfo} from 'react-native-network-info';
import axios from 'axios';

const ModalSearch = ({isOpen, setClose, onSelect}) => {
  let [searching, setSearching] = useState(false);
  let [error, setError] = useState(false);
  let [ipList, setIpList] = useState([]);

  useEffect(() => {
    NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
      console.log('defaultGateway: ', defaultGateway);
      if (defaultGateway.match(/\d{3}\.\d{3}\.\d+/)) {
        setSearching(true);
        search(defaultGateway);
      } else {
        setError(true);
        console.log('erro no ip');
      }
    });
  });

  const search = async defaultIp => {
    const range = [
      ...[...Array(100).keys()].map(n => String(n)),
      ...[...Array(10).keys()].map(n => String(n).padStart(2, '0')),
    ];
    const promises = range.map(n => {
      let ip = `http://${defaultIp}${n}:5000/check`;
      return new Promise(res => {
        axios
          .get(ip)
          .then(response => {
            if (response.data === 'finded')
              res(`http://${defaultIp}${n}:5000/`);
            else res(null);
          })
          .catch(() => res(null));
      });
    });
    const ipArray = [...(await Promise.all(promises))].filter(
      ip => ip !== null,
    );
    console.log('result', ipArray);
    setSearching(false);
    setIpList(ipArray);
  };

  return (
    <>
      <Modal
        animationType="fade"
        visible={isOpen}
        transparent={true}
        onRequestClose={() => setClose(false)}>
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <Text>Teste</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    paddingVertical: 60,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#d7c5ed',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ModalSearch;
