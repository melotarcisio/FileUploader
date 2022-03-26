import {StyleSheet, Dimensions} from 'react-native'

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      paddingHorizontal: 20,
    },
    button: {
      backgroundColor: '#d7c5ed',
      marginBottom: 60,
      marginTop: 60,
      borderRadius: 30,
      minWidth: 300,
      minHeight: 120,
      alignContent: 'center',
      justifyContent: 'center'
      
    },
    textButton: {
      fontSize: 30,
      color: '#8c19af',
      fontWeight: 'bold',
      alignSelf: 'center'
    }, 
    modalLoading: {
      width: '100%',
      paddingVertical: 250,
      paddingHorizontal: 20

    },
    viewModal: {
      width: '100%',
      height: '100%',
      backgroundColor: '#ECDAD6',
      borderColor: '#8c19af',
      borderWidth: 5,
      borderRadius: 30,
      justifyContent:'center'
    },
    loading: {
      alignSelf: 'center',
      fontSize: 20,
      color: '#8c19af'
    },
    icon : {
      alignSelf: 'center',
      marginTop: 20,
      color: '#8c19af'
    }
});

export default styles