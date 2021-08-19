import React, {useContext} from 'react';
import {  View, TextInput, Pressable, Image  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Subheading } from 'react-native-paper';
import { Formik } from 'formik';
import styles from './styles';
import {COLORS, icon, images } from '../../constants';
import { AuthContext } from '../../components/context';

export default function Login({navigation , route}) {

  const { signIn } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex:1, alignItems:'center'}}>
        <Image style={{flex:1, resizeMode:'contain', width:'80%'}} source={images.AOT} />
      </View>
      <View style={{flex:1, padding:10}}>
      <Text style={styles.header}>Sign in</Text>
      <Subheading style={styles.subheaderStyle}>Safety Report Aplication</Subheading>

      <Formik
        initialValues={{ userName: '', password: ''}}
        onSubmit={(values) => {
        console.log(values);

      
        }}
      >
      {props => (
        <View>
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
      </View>
       )}
       </Formik>
      </View>
      <View style={{flex:1,}}>
        <Pressable  style={styles.startBtn}
                    onPress={()=>signIn()}
                   >
          <Text style={styles.startText}>
            Sign In</Text>
          </Pressable>
          <Pressable onPress={() => {
              navigation.navigate('SignUp')}}>
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

