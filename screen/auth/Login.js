import React, { useState, useContext } from 'react';
import { Portal, Modal, Title } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';

import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from '../../components/styled';
import { View, ActivityIndicator } from 'react-native';

//colors
const { darkLight, brand, primary } = Colors;
import { COLORS, GLSTYLES, } from '../../constants';

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';

import { AuthContext } from '../../components/context/auth';


const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const { signIn } = React.useContext(AuthContext);

  async function handlelogin(data) {

    try {
      setLoading(true);
      const res = await signIn(data);

      if( res.success == false){
        showDialog();
        handleMessage(res.errCode);
        setLoading(false);
      }
    } catch (e) {
    console.log(e);
      handleMessage("An error occurred. Check your network and try again");
      setLoading(false);
    } 
  }
  const handleMessage = (message, type='FAILED') => {
    switch(message) {
      case 1:
        setMessage('Invalid Credentials');
        break;
      case 2:
        setMessage('Unknown Username');
        break;
      case 3:
        setMessage('Invalid Password');
        break;
      default:
        setMessage(message);
    }
    setMessageType(type);
  }

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('../../assets/img/Logo_AOT.png')} />
          <SubTitle>Account Login</SubTitle>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => {
                if(values.email == ''|| values.password == '' ){
                  handleMessage('Plese fill all the fields');
                }
                else {
                  handlelogin(values);
                }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>

                <MyTextInput
                  label="Email Address"
                  placeholder="andyj@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  icon="mail"
                />
                <MyTextInput
                  label="Password"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  icon="lock"
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                {/*<MsgBox type={messageType}>{message}</MsgBox>*/}

                {(isLoading) ? (
                    <StyledButton 
                    >
                      <ActivityIndicator color={COLORS.white}/>
                    </StyledButton> )
                : (
                  <StyledButton onPress={handleSubmit} >
                  <ButtonText>Login</ButtonText>
                </StyledButton>
                )}
                  
               

                <Line />
                <ExtraView>
                  <ExtraText>Don't have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent>Sign Up Now!</TextLinkContent>
                  </TextLink>
                </ExtraView>

                <ExtraView>
                  <ExtraText>Forgot the password? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent>Tap Here</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
          <Portal>
            <Modal visible={visible} onDismiss={hideDialog} contentContainerStyle={{...GLSTYLES.loadingModal,opacity:1}}>
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Title>{message}</Title>
              </View>
            </Modal>
          </Portal>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;