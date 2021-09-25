import React from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Title,Subheading, Divider } from 'react-native-paper';
import { images, COLORS, SIZES } from '../constants';

function viewMore( {route, navigation} ) {
    const { title, content, date, desc, imgUrl } = route.params.data;
    return (
        <ScrollView contentContainerStyle={{flex:1,justifyContent: 'space-between', backgroundColor:COLORS.primary }}>
            <View style={{flex:1,justifyContent: 'space-between' }}>
            <Image source={{uri:imgUrl}} style={{flex:1,resizeMode:'stretch',width:SIZES.width}} />
            </View>
            <View style={{flex:2,justifyContent: 'space-between', alignItems: 'center', margin:5 }}>
                <View style={{flex:1}}>
                <Title style={styles.title}> {title}</Title>
                <Subheading style={styles.subHeader}>{content}</Subheading>
                   
                <Text style={styles.styleTxt}> {new Date(date).toLocaleDateString('en-gb')}</Text>
                </View> 
                <View style={{flex:3}}>
                    <Text style={styles.styleTxt}> {desc}</Text>
                </View>
                </View>           
        </ScrollView>        
    );
}

const styles = StyleSheet.create({
    blockContainer: {
        backgroundColor:COLORS.white, 
        padding:5,
        marginVertical:10, 
        borderRadius: 5,
    },

    title: {
        color:COLORS.white,
        textShadowRadius:10,
        textShadowColor:COLORS.black,
        textTransform:'uppercase',
        textDecorationLine:'underline',
        textAlign:'center'
        
    },
    subHeader:{
        color:COLORS.white,
        textAlign:'center'
    },
    styleTxt:{
        color:COLORS.white,
        padding:5, 
        textAlign:'center',
    },
    dividerStyle: {
        color:COLORS.white,
        margin:10
    },

});

export default viewMore;