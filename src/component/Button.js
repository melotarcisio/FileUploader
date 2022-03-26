import React from 'react'
import styles from '~/pages/FileHandler/styles'

import {
    Text, Image, ImageBackground, StatusBar, Modal, View
  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'

const Button = ({
    click,
    text
}) => {

    return (
        <TouchableOpacity 
            style={styles.button} 
            onPress={click}
          >
              <Text style={styles.textButton}>{text}</Text>
          </TouchableOpacity>
    )
}

export default Button