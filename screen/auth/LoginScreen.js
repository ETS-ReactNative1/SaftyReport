import React, {useContext, useState} from 'react';
import {  View, TextInput, Pressable, Image, ActivityIndicator  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Subheading } from 'react-native-paper';
import { Formik } from 'formik';
import styles from './styles';
import {COLORS, icon, images } from '../../constants';
import { AuthContext } from '../../components/context';

export default function Login({navigation , route}) {

  const { signIn } = React.useContext(AuthContext);
  const [currentStatus, setStatus] = useState('Safety Report Aplication')
  const [isLoading, setLoading] = useState(false);

  async function loginFunc(data) {
    try {
    setLoading(true);  
    const login = await fetch('http://192.168.1.34:3001/api/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: data.userName,
            password: data.password
          })
        });

      const response = await login.json();
      
      if (login.status === 200) {
        setLoading(false);  
        signIn(response);
        
      }
      else {
        setLoading(false);  
        setStatus(response.error);
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
      <View style={{flex:1, padding:10}}>
      <Text style={styles.header}>Sign in</Text>
      <Subheading style={styles.subheaderStyle}>{currentStatus}</Subheading>
      <Formik
        initialValues={{ userName: '', password: ''}}
        onSubmit={(values) => {
          loginFunc(values);
        }}
      >
      {props => (
      <View >
      <TextInput  style={styles.input} 
                  placeholder="Email..."
                  onChangeText={props.handleChange('userName')}
                  value={props.values.userName}  />

      <TextInput  style={styles.input} 
                  placeholder="Password..."  
                  secureTextEntry
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}  
      />
     {(isLoading) ? (
          <Pressable  style={styles.startBtn}
                   >
            <ActivityIndicator color={COLORS.white}/>
          </Pressable> )
          : (
          <Pressable  style={styles.startBtn}
          onPress={props.handleSubmit}
                   >
           <Text style={styles.startText}>
            Sign In</Text>
          </Pressable>
          )}
      </View>
       )}
       </Formik>
      </View>

      <View style={{flex:0.5, padding:10}}>
          <Pressable onPress={()=> {
              navigation.navigate('SignUp')}
              }>
          <Text style={{textAlign:'center'}}>Forget your password?</Text>
          </Pressable>
        <View style={{justifyContent:'center',flexDirection:'row', marginVertical:5}}>
          <Text>Don't have account? </Text>
          <Pressable onPress={() => {
              navigation.navigate('SignUp')}}>
          <Text style={styles.signUpText}>Sign up now</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

