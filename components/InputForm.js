import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { COLORS } from '../constants';
import AddImg from './addImg';
 
export default InputForm = ({ addCard }) => {

  const today = new Date();

  return (
  <View style={{flex:1, padding:10}}>
  <Formik
    initialValues={{ title: '', content: '', date: today.toDateString(), isFinished:'No', desc: '' }}
    onSubmit={(values) => {
      console.log(values);
      addCard(values);
      
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