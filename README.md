# FileUploader

### app mobile with portable API

## Objective

The purpose of this project is to facilitate the integration of the mobile device with the computer

## Description

The project has two parts, the Android application, which was made using ReactNative and the portable API that was made using Python with Flask.
For use, you will need to run the portable API on your computer and configure the application to connect to your IP from a LAN connection. The application also has an automated IP search function on your network.

You can use both the application and the portable API just downloading the .apk and the .exe that I have made available on my Google Drive at the following link:

```
https://drive.google.com/drive/folders/1pqy_N0fsa-wTYOZMsHFMbfDCy7nXsK8k?usp=sharing
```

## How to use

On the first screen it is necessary to set the IP where you are running the portable API, you can do this manually or use the search button that will automatically do it.
After selecting IP you have two options:

### Upload
You can browse the folders on your device and when you select a file it will be automatically sent to the 'files/upload' folder on your computer's desktop.

### Download
The portable API will automatically create on your desktop the 'files/download' path and any file added in this directory can be downloaded on your device, just choose it.

### Additional
You can share files and web pages with your computer through the share function of your device. Just use the function of sharing externally in any application and the FileUploader will appear as the option by selecting it, the app will offer you the option to upload to your machine, or open the web page in your standard browser.

If you want to run the code on your machine, just follow the next tutorial

## ReactNative application

With the 'yarn' tool installed on your machine, at the root of the repository run the command to install the dependencies:
```
yarn install
```

To run the app in debug mode, run the following command:
```
yarn android
```

If you want to generate an apk, run the following commands:
```
cd android
```
```
.\gradlew assembleRelease
```

## Portable API

With the 'PIP' tool installed on your machine, enter the portableeapi directory and run the following command to install dependencies:
```
python -m venv .env && .\.env\Scripts\activate && pip install -r requirements.txt
```

To run the API, simply run the following command:
```
.\.env\Scripts\activate && python main.py
```


There are still several features that I want to include in this project and I will gradually do.
