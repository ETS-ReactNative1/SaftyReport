import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity } from 'react-native';
import * as SecureStore  from 'expo-secure-store';
import { Formik } from 'formik';
import { CommonActions } from '@react-navigation/native';
import { COLORS } from '../constants';
import AddImg from '../components/addImg';

export default function addReport({ navigation, route }) {

  const [userToken, setToken] = useState('')

  useEffect(() => {

    const bootstrapAsync = async () => {
      try {
      const Token = await SecureStore.getItemAsync('userToken');
      setToken(Token);
      }
      catch(e) {console.log(e);}
    };
    
    bootstrapAsync();
  },[]);


  const addReport = async (props) => {
    return await fetch('http://192.168.1.34:3001/api/report', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`bearer ${userToken}`
      },
      body: JSON.stringify({
        title: props.title,
        content: props.content,
        desc:props.desc
      })
    });
  };

  const handleSubmit = async (values) => {
    
    try {

      addReport(values)
      console.log(userToken);

    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
  <View style={{flex:1, padding:10}}>
  <Formik
    initialValues={{ title: '', content: '', desc: ''}}
    onSubmit = {(values) => {
      
      handleSubmit(values);
      navigation.dispatch(CommonActions.goBack());
      
    }}

  >
    {props => (
      <View>
        <TextInput
          style={styles.input}
          placeholder='Report Title'
          onChangeText={props.handleChange('title')}
          value={props.values.title}
        />

        <TextInput
          style={styles.input}
          placeholder='Short Description'
          onChangeText={props.handleChange('content')}
          value={props.values.content}
        />

        <TextInput 
          style={styles.input}
          multiline
          placeholder='Full Description'
          onChangeText={props.handleChange('desc')}
          value={props.values.desc}
        />

        <AddImg />
        
        <Button color={COLORS.primary} title="Submit" onPress={props.handleSubmit} /> 
      </View>
    )}
  </Formik>
  </View>
  )
    }

    const styles = StyleSheet.create({
        input: {
          borderWidth: 1,
          borderColor: COLORS.primary,
          padding: 10,
          fontSize: 18,
          borderRadius: 6,
          marginBottom:5
      },
        
      });  
