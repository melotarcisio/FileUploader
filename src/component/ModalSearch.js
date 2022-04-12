import React, {useEffect, useState} from 'react';
import {Text, View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {NetworkInfo} from 'react-native-network-info';
import axios from 'axios';
import {faComputer} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const ModalSearch = ({isOpen, setClose, onSelect, run}) => {
  let [ipList, setIpList] = useState([]);
  let [text, setText] = useState('Procurando ...');

  useEffect(() => {
    if (!isOpen) return;
    console.log('running');
    NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
      console.log('defaultGateway: ', defaultGateway);
      if (defaultGateway.match(/\d{3}\.\d{3}\.\d+/)) {
        search(defaultGateway);
      } else {
        console.log('erro no ip');
      }
    });
  }, run);

  const textGenerator = count =>
    setInterval(() => {
      count++;
      switch (count % 3) {
        case 0:
          setText('Procurando ..');
          break;
        case 1:
          setText('Procurando ...');
          break;
        case 2:
          setText('Procurando .');
          break;
      }
    }, 500);

  const search = async defaultIp => {
    let interval = textGenerator(0);
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
            if (response.data.includes('finded'))
              res({
                name: response.data.split(';')[1],
                ip: `http://${defaultIp}${n}:5000/`,
                key: n,
              });
            else res(null);
          })
          .catch(() => res(null));
      });
    });
    const ipArray = [...(await Promise.all(promises))].filter(
      ip => ip !== null,
    );
    console.log('result', ipArray);
    setIpList(ipArray);
    clearInterval(interval);
    interval = '';
    setText('Selecione um endereço de IP');
  };

  return (
    <>
      <Modal
        animationType="fade"
        visible={isOpen}
        transparent={true}
        onRequestClose={() => setClose()}>
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <Text>{text}</Text>
            <FlatList
              data={ipList}
              renderItem={element => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(element.item.ip);
                    setClose();
                  }}
                  style={styles.button}>
                  <FontAwesomeIcon icon={faComputer} style={styles.icon} />
                  <View>
                    <Text>{element.item.name}</Text>
                    <Text>{element.item.ip}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={element => element.key}
              style={styles.flat}
            />
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
    paddingVertical: '55%',
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
  flat: {
    marginTop: '10%',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#d7c5ed',
    borderColor: '#8c19af',
    borderWidth: 4,
    borderRadius: 10,
    marginBottom: 1,
    marginTop: 5,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
    alignSelf: 'center',
  },
});

export default ModalSearch;
