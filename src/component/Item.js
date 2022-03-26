import React, {useEffect, useState} from 'react';
import {Modal, View, FlatList, Text, TouchableOpacity} from 'react-native'
import styles from '~/styles/modalFiles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faFolder, faFileImage, faOutdent as back } from '@fortawesome/free-solid-svg-icons'

const Item = ({
    name,
    type,
    size,
    path,
    onPress
}) => {

    const normalizeSize = size => {
        try{
            if(size.includes('B')) return size
        } catch (e) {
            
        }
        if(type.match(/(?:directory|return)/)) return ''
        if(size < 1024)
            return `${parseInt(size)} B`
        else if(size/1024 < 1024)
            return `${parseInt(size/1024)} kB`
        else if(size/1048576 < 1024)
            return parseInt(size/1048576) + 'MB'
        else
            return parseInt(size/1073741824) + 'GB'
    }

    return(
        <TouchableOpacity 
            onPress={() => onPress({name:name, type:type, size:size, path:path})}
            style={styles.itemTouch}
        >
            <FontAwesomeIcon 
                icon={ type === 'file' ? faFileImage : faFolder  } 
                style={styles.icon}
            />
            <Text style={styles.item}>
                {name}
            </Text>
            <Text style={styles.size}>{normalizeSize(size)}</Text>
        </TouchableOpacity>
    )
}

export default Item