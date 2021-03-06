import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  instructions: {
    color: '#DDD',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  welcome: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    color: '#8c19af',
    width: '80%',
    padding: 5,
    margin: 15,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    backgroundColor: '#fff',
    width: 100,
    height: 40,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
