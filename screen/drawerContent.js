import React from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Title,IconButton, Avatar, Divider, List, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { images, COLORS, SIZES } from '../constants';

import { AuthContext } from '../components/context/auth';
import { UserContext } from '../components/context/user';

function drawerContent({ navigation }) {

    const { signOut } = React.useContext(AuthContext);
    const { state } = React.useContext(UserContext);

    return (
        <SafeAreaView>
            <View>
            <View style={{margin:10, flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}}>
                <Avatar.Image size={75} source={images.defPP}/>
                <Title>{state.userProfile.name}</Title>
            </View>
            <Divider />
            <List.Section>
             <List.Item 
             title={state.userProfile.position}
             left={() => <List.Icon icon="rename-box" />} 
             />
            <List.Item
                title={state.userProfile.phone}
                left={() => <List.Icon icon="phone" />}
            />
            <List.Item
                title={state.userProfile.email}
                left={() => <List.Icon icon="email" />}
            />
            </List.Section>
            <Divider />
            <Button
                onPress={() => {
                    navigation.navigate('EditProfile')
                }}
                   >Edit Profile</Button>
            <Button
                 onPress={()=>{signOut()}}   
                >Sign Out</Button>
            </View>
        </SafeAreaView>
    );
}

export default drawerContent;