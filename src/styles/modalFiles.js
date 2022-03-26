import {StyleSheet, Dimensions} from 'react-native'

const styles = StyleSheet.create({
    modal: {
      width: '100%', 
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 50,
      paddingVertical: 60
    },
    modalView: {
      margin: 20,
      backgroundColor: '#ECDAD6',
      borderRadius: 20,
      padding: 20,
      width: '100%',
      height: '100%',
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },    
    back: {
        flex: 0.1,
        backgroundColor: '#ECDAD6',
        borderColor: '#8c19af',
        color: '#8c19af',
        borderWidth: 1,
        width: '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 20,
    },
    flat:{
        flex: 1,
        width: '100%',
        backgroundColor: '#ECDAD6'
    },
    icon: {
      alignSelf: 'center',
      
    },
    item:{
        textAlignVertical: 'center',
        textAlign: 'left',
        paddingLeft: 10,
        paddingRight: 5,
        fontSize: 15,
        minWidth: 140,
        maxWidth: 135
    },
    itemTouch: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ECDAD6',
        borderColor: '#8c19af',
        borderWidth: 4,
        borderRadius: 10,
        marginBottom: 1,
        marginTop: 5,
        paddingVertical: 10,
        paddingLeft: 10
    },
    size: {
      textAlign: 'right',
      alignSelf: 'center'

    },

});

export default styles