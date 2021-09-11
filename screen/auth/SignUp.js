import React, {useState} from 'react';
import {  View, TextInput, Pressable, Image  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Subheading } from 'react-native-paper';
import { Formik } from 'formik';
import styles from './styles';
import {COLORS, icon, images } from '../../constants'


export default function Login(props) {

  const [isLoading, setLoading] = useState(false);

  async function creatAcc(data) {
    try {
    setLoading(true);  
    const login = await fetch('http://192.168.1.34:3001/api/user', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: data.userName,
            password: data.password,
            name: data.name,
            position: data.position,
            phone: data.phone,
            name: data.name
          })
        });

      const response = await login.json();
      
      if (login.status === 200) {
        setLoading(false);  
        signIn(response);
        
      }
  } catch (e) {

    setLoading(false);
    console.log(e);
  }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex:1, alignItems:'center'}}>
        <Image style={{flex:1, resizeMode:'contain', width:'80%'}} source={images.AOT} />
      </View>
      <View style={{flex:3}}>
      <Text style={styles.header}>Sign Up</Text>
      <Subheading style={styles.subheaderStyle}>Safety Report Aplication</Subheading>
      <Formik
        initialValues={{ userName: '', password: '',name: '', position: '',phone: '', email: ''}}
        onSubmit={(values) => {
          creatAcc(values);
        }}
      >{props => (
        <View>
      <TextInput  style={styles.input2} 
                  placeholder="Name" 
                  onChangeText={props.handleChange('name')}
                  value={props.values.name}/>

      <TextInput  style={styles.input2} 
                  placeholder="User Name"
                  onChangeText={props.handleChange('userName')}
                  value={props.values.userName} />

      <TextInput  style={styles.input2} 
                  placeholder="Position" 
                  onChangeText={props.handleChange('position')}
                  value={props.values.position}/>

      <TextInput  style={styles.input2} 
                  placeholder="Email" 
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}/>

      <TextInput  style={styles.input2} 
                  placeholder="Phone"  
                  onChangeText={props.handleChange('phone')}
                  value={props.values.phone}/>

      <TextInput  style={styles.input2} 
                  placeholder="Password..." 
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                  secureTextEntry />

      <Pressable style={styles.startBtn}
                 onPress={props.handleSubmit} >
        <Text style={styles.startText}>Confirm</Text>
      </Pressable>
      </View>)}
      </Formik>
      </View>
    </SafeAreaView>
  );
}



