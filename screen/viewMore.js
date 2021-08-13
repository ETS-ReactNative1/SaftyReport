import React from 'react';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Title, Divider } from 'react-native-paper';
import { images, COLORS } from '../constants';

function viewMore( {route, navigation} ) {
    const { title, content, date, desc } = route.params.data;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:COLORS.primary }}>
            
            <View style={{ alignItems: 'center', margin:5 }}>
                <Title style={{color:COLORS.white,textShadowRadius:10,textShadowColor:COLORS.black,textTransform:'uppercase'}}> {title}</Title>
                <Divider style={{margin:10}} />
                <Text> {content}</Text>
                <Divider style={{margin:10}}/>
                <Text> {date}</Text>
                <Divider style={{margin:10}}/>
                <View style={{backgroundColor:COLORS.white, margin:5, justifyContent:'center', borderRadius: 5 }}>
                    <Text style={{padding:5, textAlign:'left',}}> {desc}</Text>
                </View>
                </View>           
        </SafeAreaView>        
    );
}

export default viewMore;