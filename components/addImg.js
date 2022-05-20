import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Button, Portal, Dialog, List } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function UploadImg({sentURL}) {
  const [imageURL, setURL] = useState(null);
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

    useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== 'granted' ||
          cameraStatus.status !== 'granted'
        ) {
          alert('Sorry, we need these permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    hideDialog();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.25,
      base64:true
    });

    if (!result.cancelled) {
      setURL(result.uri);
      sentURL(result);
    }
  };

  const cameraImg = async () => {
    hideDialog();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.25,
      base64:true
    });

    if (!result.cancelled) {
      setURL(result.uri);
      sentURL(result);
    }
  };

  return (
    
    <View style={imageUploaderStyles.container}>
        {
            imageURL  && <Image source={{ uri: imageURL }} style={{ width: '100%', height: '100%' }} />
        }
            <View style={imageUploaderStyles.uploadBtnContainer}>
                <TouchableOpacity onPress={showDialog} style={imageUploaderStyles.uploadBtn} >
                    <Text>{imageURL ? 'Edit' : 'Upload'} Image</Text>
                    <AntDesign name="camera" size={20} color="black" />
                </TouchableOpacity>
            </View>

            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Add from...</Dialog.Title>
                <Dialog.Content>
                <List.Item 
                  title='Gallery'
                  onPress={pickImage}
                  left={props => <List.Icon {...props} icon="folder-image" />}
                />
                <List.Item 
                  title='Camera'
                  onPress={cameraImg}
                  left={props => <List.Icon {...props} icon="camera" />}
                />
                </Dialog.Content>
              </Dialog>
            </Portal>
      
            </View>
     
    

);
}

const imageUploaderStyles=StyleSheet.create({
container:{
  elevation:2,
  height:'40%',
  width:'100%', 
  backgroundColor:'#efefef',
  position:'relative',
  borderRadius:10,
  overflow:'hidden',
  marginVertical:10
},
uploadBtnContainer:{
  opacity:0.7,
  position:'absolute',
  right:0,
  bottom:0,
  backgroundColor:'lightgrey',
  width:'100%',
  height:'25%',
},
uploadBtn:{
  display:'flex',
  alignItems:"center",
  justifyContent:'center'
}
})