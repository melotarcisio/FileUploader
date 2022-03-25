import { object } from 'prop-types';
import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob'



function sendFile (path) {
    return
}

async function getMetaData(list, path) {
    //let object = await list.map(async (item) => (await RNFetchBlob.fs.stat(path + item)))
    let object = [{
        'filename': '..',
        'type': 'return',
        'size': false,
        'index': -1
        }]
    for(let i = 0; i < list.length; i++){
        let item = await RNFetchBlob.fs.stat(path + list[i])
        item.index = i
        object.push(item)
    }
    console.log(object)
    return object
}

export async function getDirectory (path, lPath = RNFS.ExternalStorageDirectoryPath + '/') {
    let ls = await RNFetchBlob.fs.ls(lPath + path)
    let lastPath = ''
    if(path !== '') lastPath = path
    return {list: await getMetaData(ls, lPath + lastPath), lPath: lastPath}
}

export function selectDirectory ({name, type}, lastPath) {
    if(type !== 'directory'){
        if(type === 'return'){
            let path = lastPath.replace(/[^\/]+\/?$/, '')
            return getDirectory(path)
        }else{
            sendFile(lastPath + name)
            return
        }
    }else{
        return getDirectory(lastPath + name + '/')
    }
}