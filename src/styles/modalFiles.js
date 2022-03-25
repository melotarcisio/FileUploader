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
      backgroundColor: "white",
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
        backgroundColor: '#005295',
        width: '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 20,
    },
    flat:{
        flex: 1,
        backgroundColor: '#129632',
        width: '100%',
    },
    item:{
        textAlignVertical: 'center',
        textAlign: 'left',
        paddingLeft: '20%',
        fontSize: 15
    },
    itemTouch: {
        backgroundColor: '#d9b9e2',
        borderColor: '#8c19af',
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 5,
        marginTop: 5,
        paddingVertical: 10
    },

});

export default styles