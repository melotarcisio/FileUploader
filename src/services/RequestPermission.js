import {
    PermissionsAndroid,
    BackHandler,
    NativeModules,
    Platform,
} from 'react-native';
  
const requestPermissions = async () => {
    try {
        const PermissionFile = NativeModules.PermissionFile;            
        if (Platform.Version >= 30) {
        PermissionFile.checkAndGrantPermission(
            (err) => {
            DeviceUtils.showAlert(
                'Ops',
                'Acesso não garantido!',
            );
            },
            (res) => {
            if (res) {
                console.log('Permissão garantida!');
                //checkDirectoryAndDownload(url, name, Text);
            }
            },
        );
        } else {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permissão garantida!');
        } else {
            console.log('Permissão não garantida');
            BackHandler.exitApp();
        }
        }  
    } catch (err) {
        console.warn(err);
    }
};

export default requestPermissions