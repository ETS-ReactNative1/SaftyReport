import React from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Title,IconButton, Avatar, Divider, List, Button } from 'react-native-paper';
import { images, COLORS, SIZES } from '../constants';
import { AuthContext } from '../components/context';


function drawerContent(props) {

    const { signOut } = React.useContext(AuthContext);

    return (
        <SafeAreaView>
            <View>
            <View style={{margin:10, flexDirection:'row', justifyContent:'space-evenly'}}>
                <Avatar.Image size={75} source={images.defPP}/>
                <View style={{flexDirection:'column'}}>
                <Title>Paru Yohannan</Title>
                <Button
                   
                >Edit Profile</Button>
                </View>
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
             title="Chief Security"
             left={() => <List.Icon icon="rename-box" />} 
             />
            <List.Item
                title="094-044-1112"
                left={() => <List.Icon icon="phone" />}
            />
            <List.Item
                title="paru44@tanima.com"
                left={() => <List.Icon icon="email" />}
            />
            </List.Section>
            <Divider />
            <Button
                 onPress={()=>{signOut()}}   
                >Sign Out</Button>
            </View>
        </SafeAreaView>
    );
}

export default drawerContent;