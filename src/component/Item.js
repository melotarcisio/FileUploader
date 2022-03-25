import React, {useEffect, useState} from 'react';
import {Modal, View, FlatList, Text, TouchableOpacity} from 'react-native'
import styles from '~/styles/modalFiles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const Item = ({
    name,
    onPress
}) => {

    return(
        <TouchableOpacity 
            onPress={() => onPress(name)}
            style={styles.itemTouch}
        >
            <FontAwesomeIcon icon={ faCoffee } />
            <Text style={styles.item}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export default Item