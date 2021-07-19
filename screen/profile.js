import React, { useState, useEffect } from 'react';
import { Image, View, Platform, Text, TextInput } from 'react-native';
import { Avatar, List  } from 'react-native-paper';
import { images } from "../constants";
import ListCompo from '../components/list'

const pro1 = {
  name:'Yuta Juto',
  email: 'yuta44@royalmail.com',
  phone: '112-44-57'
  ,
};

export default function ImagePickerExample() {

  return (
    <View style={{ flex: 1 }}>
      <View style={{margin:10, alignItems:'center'}}>
      <Avatar.Image size={100} source={images.defPP}/>
      </View>
      <View >
        <ListCompo name={pro1.name} email={pro1.email} phone={pro1.phone} />
        
      </View>
    </View>
  );
}