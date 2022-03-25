import React, {useEffect, useState} from 'react';
import {Modal, View, FlatList, Text, TouchableOpacity} from 'react-native'
import styles from '~/styles/modalFiles'
import Item from './Item'

const ModalFiles = ({
    onSelect,
    list,
    visible,
    setVisible
}) => {
    
    return (
        <Modal
            animationType='fade'
            visible={visible}
            transparent={true}
            onRequestClose={() => {setVisible(false)}}
          >
              <View style={styles.modal}>
                <View style={styles.modalView}>
                    <Text 
                        onPress={() => setVisible(false)}
                        style={styles.back}
                    >VOLTAR</Text>
                    <FlatList 
                        data={list}
                        renderItem={element => 
                            <Item 
                                name={element.item.filename} 
                                size={element.item.size}
                                type={element.item.type}
                                onPress={onSelect}
                            />
                        }
                        keyExtractor={item => item.index}
                        style={styles.flat}
                    />
                </View>
              </View>
          </Modal>
    )
}

export default ModalFiles