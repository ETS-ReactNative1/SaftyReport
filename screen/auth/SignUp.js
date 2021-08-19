import React from 'react';
import {  View, TextInput, Pressable, Image  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Subheading } from 'react-native-paper';
import styles from './styles';
import {COLORS, icon, images } from '../../constants'


export default function Login(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex:1, alignItems:'center'}}>
        <Image style={{flex:1, resizeMode:'contain', width:'80%'}} source={images.AOT} />
      </View>
      <View style={{flex:3}}>
      <Text style={styles.header}>Sign Up</Text>
      <Subheading style={styles.subheaderStyle}>Safety Report Aplication</Subheading>
      <TextInput style={styles.input2} placeholder="First Name" />
      <TextInput style={styles.input2} placeholder="Last Name" />
      <TextInput style={styles.input2} placeholder="Position" />
      <TextInput style={styles.input2} placeholder="Email" />
      <TextInput style={styles.input2} placeholder="Password..." secureTextEntry />
      <TextInput style={styles.input2} placeholder="Password..." secureTextEntry />
      <Pressable style={styles.startBtn}>
        <Text style={styles.startText}>Confirm</Text>
      </Pressable>
      </View>
    </SafeAreaView>
  );
}



