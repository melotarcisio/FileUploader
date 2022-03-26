import { object } from 'prop-types';
import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs'
import { getData, storeData } from '~/services/AsyncStorage';
import RNFetchBlob from 'rn-fetch-blob'
import axios from 'axios';

export async function moveNrename (path, filename) {
    const toSave = `${RNFS.ExternalStorageDirectoryPath}/UploaderFile/Download/${filename}`
    try{
        await RNFS.moveFile(path, toSave)
    } catch (e) {
        if(e.toString().includes('No such file or directory')){
            await RNFS.mkdir(`${RNFS.ExternalStorageDirectoryPath}/UploaderFile/Download/`)
            await moveNrename(path)
        }
    }
}

export function sendFile (path, ip) {
    filename = path.split('/').pop()
    console.log(`${ip}upload`)
    return RNFetchBlob.fetch('POST', `${ip}upload`, {
        path: 'upload',
        name: filename,
        'Content-Type' : 'multipart/form-data',
        }, [{ name: 'upload', filename: 'upload', type: 'file', data: RNFetchBlob.wrap(path) }]
    )
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
    if(type === 'return'){
        let path = lastPath.replace(/[^\/]+\/?$/, '')
        return getDirectory(path)
    }else{
        return getDirectory(lastPath + name + '/')
    }
}

const getObjectByJSON = json => {
    let newJson = []
    for(let i in json){
        console.log('item',i)
        newJson.push({
            filename: i,
            size: json[i].Size,
            type: 'file',
            path: ''
        })
    }
    return newJson
}

export async function getCloudDirectory (path, ip) {
    const req = await axios({
        method: 'post',
        baseURL: ip,
        url: '/download',
        headers: {
            path: path
        }
    }) 
    return getObjectByJSON(req.data)
}

