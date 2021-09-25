import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";


import { View, ActivityIndicator } from 'react-native'

//import  formik
import { Formik } from "formik";

//icon
import {Octicons, Ionicons, Fontisto} from "@expo/vector-icons";




import {StyledContainer,InnerContainer,PageLogo,PageTitle, StyledContainerlogin,SubTitle,StyledFormArea,
    LeftIcon,RightIcon,StyledTextInput,StyledButton,StyledInputLabel,ButtonText ,Colors,
    MsgBox,Line,ExtraText,ExtraView,TextLink,TextLinkContent} from '../../components/styled'


//colors
const {brand, darkLight, primary} = Colors;
import {COLORS, icon, images } from '../../constants';

//keyboard avoiding view
import KeyboardAvoidingWrapper  from "../../components/KeyboardAvoidingWrapper";

import { AuthContext } from '../../components/context/auth';

const Signup= ({navigation}) => {
 
    const [hidePassword, setHidePassword] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const { signUp } = React.useContext(AuthContext);

    async function creatAcc(data) {
        try {
        setLoading(true);
        signUp(data);  
      } catch (e) {
    
        setLoading(false);
        console.log(e);
      }
      }
    
    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
        <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>Sign Up</PageTitle>
            <Formik initialValues={{name: '', username: '', position: '',email:'', phone: '',password:''}}
                onSubmit = {(values) => {
                creatAcc(values);
                console.log(values);
                 }}
                
                >{({handleChange, handleBlur, handleSubmit,values})=> (
                    <StyledFormArea>
                    <MyTextInput
                  label="Name"
                  placeholder="..."
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  icon="person"
                />
                  <MyTextInput
                  label="Username"
                  placeholder="..."
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  icon="person"
                />
                                  <MyTextInput
                  label="Position"
                  placeholder="..."
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('position')}
                  onBlur={handleBlur('position')}
                  value={values.position}
                  icon="person"
                />

                <MyTextInput
                  label="Email Address"
                  placeholder="..."
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  icon="mail"
                />
                  <MyTextInput
                  label="Phone"
                  placeholder="..."
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  icon="person"
                />
                <MyTextInput
                  label="Password"
                  placeholder="..."
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
                        <MsgBox>...</MsgBox>
                        {(isLoading) ? (
                    <StyledButton 
                    >
                      <ActivityIndicator color={COLORS.white}/>
                    </StyledButton> )
                : (
                  <StyledButton onPress={handleSubmit}>
                            <ButtonText> Submit</ButtonText>
                        </StyledButton>
                )}


                        
                        <Line />
                        <ExtraView>
                            <ExtraText>Already have an account?</ExtraText>
                            <TextLink onPress={() => navigation.navigate('Login')}>
                                <TextLinkContent>Login</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)}
            </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}
const MyTextInput = ({label, icon , isPassword, hidePassword,setHidePassword ,...props}) => {
    return(
        <View>
         <LeftIcon><Octicons name={icon} size={30} color={brand}/></LeftIcon>
        <StyledInputLabel>{label} </StyledInputLabel>
        <StyledTextInput {...props}/>
        {isPassword &&  (
            <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off': 'md-eye'} size={30} color={darkLight} />
            </RightIcon>
        )}
        </View>
    );
}
export default Signup;