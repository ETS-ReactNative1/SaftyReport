import React from 'react';
import { useRecoilValue } from "recoil";
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Title,IconButton, Avatar, Divider, List, Button } from 'react-native-paper';
import { images, COLORS, SIZES } from '../constants';

import { AuthContext } from '../components/context/auth';
import { UserContext } from '../components/context/user';

function drawerContent(props) {

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
                    title="500 Total Reports"
                    left={() => <List.Icon icon="alert-octagon" />} 
             />
                <List.Item
                    title="260 Reports is Ongoing"
                    left={() => <List.Icon icon="arrow-right-bold-box" />}
            />
            </List.Section>
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
                   >Edit Profile</Button>
            <Button
                 onPress={()=>{signOut()}}   
                >Sign Out</Button>
            </View>
        </SafeAreaView>
    );
}

export default drawerContent;