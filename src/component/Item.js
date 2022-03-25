import React, {useEffect, useState} from 'react';
import {Modal, View, FlatList, Text, TouchableOpacity} from 'react-native'
import styles from '~/styles/modalFiles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faFolder, faFileImage, faOutdent as back } from '@fortawesome/free-solid-svg-icons'

const Item = ({
    name,
    type,
    size,
    onPress
}) => {
    return(
        <TouchableOpacity 
            onPress={() => onPress({name:name, type:type})}
            style={styles.itemTouch}
        >
            <FontAwesomeIcon 
                icon={ type === 'file' ? faFileImage : faFolder  } 
                style={styles.icon}
            />
            <Text style={styles.item}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export default Item