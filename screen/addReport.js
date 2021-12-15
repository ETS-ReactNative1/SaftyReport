import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, ActivityIndicator, Pressable,  } from 'react-native';
import { Portal, Title, IconButton, Dialog, Subheading, Button, Headline, Paragraph, Divider } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import {Picker} from '@react-native-picker/picker';

import { COLORS, GLSTYLES, SIZES, icon, } from '../constants';
import { api } from '../constants/api';
import AddImg from '../components/addImg';

import { UserContext } from '../components/context/user';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const reviewSchema = yup.object({
  title: yup.string()
    .required('This field is required'),
  content: yup.string()
    .required('This field is required'),
  desc: yup.string()
    .required('This field is required')
});



export default function addReport({ navigation, route }) {

  const { state } = React.useContext(UserContext);

  const [imgData, setImg] = useState(null);
  const [zoneData, setZoneData] = useState(null);
  const [zoneDataDesc, setZDDVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isError, setError] = useState(false);
  const [isImgSet,setReady] = useState(false);


  const hideDialog = () => {
          setError(false);
          setVisible(false);
  };

  const showDialogErr = () => {
          setError(true);
  };

  const showLoading = () => {
          setError(false);
          setVisible(true);
  };
  //เช็คว่า backend เน่าหรือเปล่า
  const pingServer = async () =>{

    return await fetch(`${api}/api/ping`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }})

  };

  //API for adding report
  const addReport = async (data, img) => {

    return await fetch(`${api}/api/report`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`bearer ${state.userToken}`
      },
      body: JSON.stringify({
        title: data.title,
        content: data.content,
        desc:data.desc,
        url:img
      })
    });
  };

  //API for uploading image
  const onUpload = async () => {
    const source = imgData.base64;

    if (source) {

      let base64Img = `data:image/jpg;base64,${source}`;
      let apiUrl =
        'https://api.cloudinary.com/v1_1/dikzhc5yg/image/upload';
      let data = {
        file: base64Img,
        upload_preset: 'saftyReport64'
      };

      return await fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
        /*.then(async response => {
          let data = await response.json();
          if (data.secure_url) {
            console.log(data.secure_url);
            return data.secure_url;
          }
        })*/
        .catch(err => {
          showDialogErr();
          console.log(err);
          console.log('Failed to upload image')
        });
    }
};
  //Callback function for addImage component
  const sentURL = (props) =>{
    setImg(props);
    setReady(true);
  }

  const Submiting = async (values) => {
    
    try {
      //Check if server is responsing
      showLoading();
      const checkServer = await pingServer()

      if(checkServer.status === 200){
      //Begin uploading  
      const uri = await onUpload();
      let data = await uri.json();

      const response = await addReport(values, data.secure_url);

      if (response.status === 200) {
        console.log('Uploading Success')
        setVisible(false)
        route.params.onGoBack();
        navigation.goBack();
      }
    }
    }catch (exception) {
      showDialogErr();
      console.log(exception);
      console.log('Backend error?');
    }
  }

  const fetchZonesData = async ()=>{
    try{
    const response = await fetch(`${api}/api/zone`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }});

    const result = await response.json();
    setZoneData(result);

  }catch(e){console.log(e);}
 }

 useEffect(() => {
    
  fetchZonesData();


},[]);

  return (
  <View style={styles.outerContainer}>
    <View style={{ alignContent:'center'}}>
      <Pressable style={{zIndex : 1, position:'absolute', bottom:5}} onPress={() => navigation.goBack()}>
        <IconButton icon={icon.leftArr} color={COLORS.white} />
      </Pressable>
      <Title style={styles.textHeader}>ADD REPORT</Title>
    </View>
  <View style={styles.innnerContainer}>
  <Formik
    initialValues={{ title: '', desc: '', content: '' }}
    validationSchema={reviewSchema}
    onSubmit = {(values) => {
      Submiting(values);
    }}
  >
    {(props) => (
      <View>

        {/*Title Field*/}
        {(props.touched.title && props.errors.title)?
        <TextInput
          style={styles.errinput}
          placeholder={props.errors.title}
          placeholderTextColor={COLORS.darkRed}
          onChangeText={props.handleChange('title')}
          value={props.values.title}
        />:(
        <TextInput
          style={styles.input}
          placeholder='Report Title'
          onChangeText={props.handleChange('title')}
          value={props.values.title}
        />)}

        
        {/*Description Field*/}
        {(props.touched.desc && props.errors.desc)?
        <TextInput
          style={styles.errinput}
          placeholder={props.errors.desc}
          placeholderTextColor={COLORS.darkRed}
          onChangeText={props.handleChange('desc')}
          value={props.values.desc}
        />:(
          <TextInput
          style={styles.input}
          placeholder='Full Description'
          onChangeText={props.handleChange('desc')}
          value={props.values.desc}
        />)}


  
          <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginVertical:-10, paddingStart:15}} onPress={() => setZDDVisible(true)}>
            <Text>Select Zone</Text>
            <IconButton icon={"map-marker-question"} color={COLORS.primary}/>
          </TouchableOpacity>
        <View style={{...styles.input, height:60, }}>
        <Picker
          itemStyle={{color:COLORS.lightGray}}
          mode='dropdown'
          placeholder="Select City"
          selectedValue={props.values.content}
          onValueChange={props.handleChange('content')}>
          <Picker.Item  label="Select Location" value={"null"} enabled={false} />
          {zoneData && zoneData.map((item) => {
        return(
          <Picker.Item 
              label={item.ZoneName.toString()} 
              value={item.ZoneName.toString()} 
              key={item.ZoneID.toString()} />)
        })}
        </Picker>
        </View>

        <AddImg sentURL = {sentURL}/>

        {/*Check if image has been set and ready to upload*/}
        {(isImgSet)?(
        <Pressable style={styles.buttonStyle} onPress={props.handleSubmit} >
          <IconButton icon={icon.add} color={COLORS.white}/>
          <Text style={styles.textButton}>SUBMIT</Text>
        </Pressable>
        ):(
          <Pressable style={{...styles.buttonStyle, backgroundColor:COLORS.lightGray2}} >
            <IconButton icon={icon.add} color={COLORS.white}/>
            <Text style={styles.textButton}>SUBMIT</Text>
        </Pressable>
        )}
      </View>
    )}
  </Formik>
  <Portal>

  {/*Loading Dialog */}
  {(!isError)?(  
  <Dialog visible={visible} style={GLSTYLES.loadingModal}>
    <View style={{flex:1, justifyContent:'space-evenly', alignItems:'center'}}>
      <ActivityIndicator size='large' color={COLORS.white} />
      <Title  style={{margin:5, color:COLORS.white}}>Uploading...</Title>
    </View>
  </Dialog>
  ):(
    <Dialog visible={visible} style={GLSTYLES.errModal}>
    <View style={{flex:1, justifyContent:'space-evenly', alignItems:'center'}}>
      <IconButton icon={icon.error} color={COLORS.white} size={36}/>
      <Title style={{color:COLORS.white}}>An Error Has Occured!</Title>
      <Subheading style={{textAlign:'center' ,color:COLORS.white}}>Please check yours connection and try again.</Subheading>
      <Dialog.Actions>
        <IconButton icon={icon.close} color={COLORS.white} onPress={() => hideDialog()}>Close</IconButton>
      </Dialog.Actions>
    </View>
  </Dialog>
  )}

  <Dialog visible={zoneDataDesc} onDismiss={()=>setZDDVisible(false)} style={styles.zoneDescContainer}>
    <Dialog.Title>Location Description</Dialog.Title>
    <Divider style={{borderWidth:0.5, borderColor:COLORS.white}}/>
    <Dialog.Content style={{marginTop:5}}>
      <ScrollView>
    {zoneData && zoneData.map((item) => {
        return(
        <View style={{borderBottomWidth:1, borderBottomColor:COLORS.black, marginBottom:5}} key={item.ZoneID}>
          <Subheading style={{fontStyle:"italic"}}>{item.ZoneName}</Subheading>
          <Paragraph>{item.Desc}</Paragraph>
        </View>
          )
        })}
        </ScrollView>
      </Dialog.Content>
  </Dialog>

  </Portal>


  </View>
  </View>
  )
    }

    const styles = StyleSheet.create({
      outerContainer:{
        flex:1,
        backgroundColor:COLORS.primary,
        padding:20,
      },
      innnerContainer:{
        flex:1, 
        padding:10, 
        backgroundColor:COLORS.white,
        borderRadius:20
      },
      input: {
          backgroundColor:COLORS.lightGray5,
          borderColor:COLORS.white,
          borderWidth:1,
          padding: 15,
          fontSize: 18,
          borderRadius: 10,
          marginBottom:7
      },
      errinput: {
          borderColor: COLORS.lightRed,
          borderWidth:1,
          padding: 15,
          fontSize: 18,
          borderRadius: 10,
          marginBottom:7
    },
      buttonStyle:{
        height:50,
        backgroundColor:COLORS.primary,
        borderRadius:10,
        marginTop:5,
        padding:15,
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      },
      textHeader:{
        textAlign:'center',
        textShadowRadius:10,
        textShadowOffset:{height:2},
        fontSize:SIZES.h1,
        color:COLORS.white,
        marginBottom:10
      },  
      textButton:{
        textAlign:'center',
        color:COLORS.white,
        fontSize: SIZES.body2,
        marginRight:15
      },
      zoneDescContainer:{
        backgroundColor:COLORS.lightBlue2,

      },
      dividerStyle: {
        color:COLORS.black,
        margin:10
    },
      });  
