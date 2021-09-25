import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Button, Portal, Dialog } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [imageURL, setURL] = useState(null);
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      base64:true
    });

    if (!result.cancelled) {
      return result;
    }
  };

  const onUpload = async () => {
    
      const data = await pickImage();
      const source = data.base64;

      if (source) {

        let base64Img = `data:image/jpg;base64,${source}`;
        let apiUrl =
          'https://api.cloudinary.com/v1_1/dikzhc5yg/image/upload';
        let data = {
          file: base64Img,
          upload_preset: 'saftyReport64'
        };

        fetch(apiUrl, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST'
        })
          .then(async response => {
            let data = await response.json();
            if (data.secure_url) {
              console.log(data.secure_url);
              setURL(data.secure_url);
            }
          })
          .catch(err => {
            alert('Cannot upload');
            console.log(err);
          });
      }
  };

  return (
    
    <View style={imageUploaderStyles.container}>
        {
            imageURL  && <Image source={{ uri: imageURL }} style={{ width: '100%', height: '100%' }} />
        }
            <View style={imageUploaderStyles.uploadBtnContainer}>
                <TouchableOpacity onPress={onUpload} style={imageUploaderStyles.uploadBtn} >
                    <Text>{imageURL ? 'Edit' : 'Upload'} Image</Text>
                    <AntDesign name="camera" size={20} color="black" />
                </TouchableOpacity>
            </View>

            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Content>
                <Button onPress={onUpload}>Add from gallery </Button>
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
borderRadius:50,
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