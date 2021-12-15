import React, { useState } from 'react';
import { StyleSheet, Image, View,  TextInput,  } from 'react-native';
import { ActivityIndicator, Avatar, Paragraph, Portal, Snackbar, Title, } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import * as yup from 'yup';

import { UserContext } from '../components/context/user';
import { COLORS, images, SIZES } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../components/context/auth';

function editProfile() {

    const { state  } = React.useContext(UserContext);
    const { updateProfile } = React.useContext(AuthContext);

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) =>{
        try{
            setLoading(true);
            const res = await updateProfile(values);
            if (res.success === true){
                setVisible(true);
                setLoading(false);
            }
        }catch(e){
            console.log(e);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
                <View style={{alignItems:"center", marginVertical:20}}>
                    <Title style={styles.header}>Edit Profile</Title>
                    <View style={{borderWidth:2, borderRadius:180, borderColor:COLORS.white, marginTop:20, padding:5}}>
                        <Avatar.Image source={images.defPP} size={100} style={styles.imgProfile} />
                    </View>
                </View>
                    <Formik
                        initialValues={{ name: state.userProfile.name, position: state.userProfile.position, email: state.userProfile.email }}
                        onSubmit = {(values) => {
                            handleSubmit(values);
                        }}>
                    {(props) => (
                        <>
                    <View style={{marginTop:10, paddingHorizontal:10}}>
                    <View style={styles.inputContainer}>
                        <Paragraph style={styles.inputIndicator}>Name: </Paragraph>
                        <TextInput 
                                style={styles.input}
                                placeholder={state.userProfile.name}
                                placeholderTextColor={COLORS.darkRed}
                                onChangeText={props.handleChange('name')}
                                value={props.values.name}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Paragraph style={styles.inputIndicator}>Position: </Paragraph>
                        <TextInput 
                                style={styles.input}
                                placeholder={state.userProfile.position}
                                placeholderTextColor={COLORS.darkRed}
                                onChangeText={props.handleChange('position')}
                                value={props.values.position}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Paragraph style={styles.inputIndicator}>Email: </Paragraph>
                        <TextInput 
                                style={styles.input}
                                placeholder={state.userProfile.email}
                                placeholderTextColor={COLORS.darkRed}
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                        />
                    </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        {!loading?
                        <TouchableOpacity onPress={props.handleSubmit}>
                            <Paragraph style={{color:COLORS.white}}>Apply</Paragraph>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity>
                            <ActivityIndicator color={COLORS.white}/>
                        </TouchableOpacity>
                        }
                    </View>
                    </>
                               )}
                    </Formik>
                    <Snackbar
                        visible={visible}
                        onDismiss={()=>setVisible(false)}
                        duration={4000}>
                        Profile Updated! 
                    </Snackbar>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.primary,
    },
    header:{
        fontSize:SIZES.h1,
        color:COLORS.white,
        textShadowColor:COLORS.black,
        textShadowRadius:5,
        textShadowOffset:{
            width:0,
            height:3
        }
    },
    imgProfile:{
        backgroundColor:"transparent"
    },
    inputContainer:{
        flexDirection:"row", 
        alignItems:"center",
        borderBottomWidth:2,
        borderBottomColor:COLORS.white,
        marginBottom:5
    },
    inputIndicator:{
        flex:1,
        color:COLORS.white,
        fontSize:SIZES.h3
    },
    input: {
        borderRadius: 10,
        flex:4,
        color:COLORS.darkRed,
        fontSize:SIZES.h3
    },
    buttonContainer:{
        width:'20%',
        backgroundColor:COLORS.lightBlue2,
        borderRadius:20,
        marginTop:5,
        padding:15,
        alignItems:'center',
        alignSelf:"center"
    }
})

export default editProfile;