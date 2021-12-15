import React, { useEffect, useState} from 'react';
import { Image, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import ImageView from "react-native-image-viewing";
import { Text, Title,Subheading, IconButton, Headline } from 'react-native-paper';
import { icon, COLORS, SIZES } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

function viewMore( {route, navigation} ) {
    const { title, content, date, desc, imgUrl, isFinished } = route.params.data;

    const [visible, setIsVisible] = useState(false);

    //Time and date converter
    const event = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const imageHeight = SIZES.height/3;

    const StatusDisplay = () => {
        switch(isFinished) {
            case "Not Finished":
                return (
                    <View style={{...styles.statusContainer, borderColor:COLORS.white, backgroundColor:COLORS.lightRed}}>
                        <IconButton icon="progress-alert" color={COLORS.white} />
                        <Text style={{color:COLORS.white, fontWeight:'bold'}}>UNFINISH</Text>
                    </View>
                )
            case "Going":
                return (
                    <View style={{...styles.statusContainer, borderColor:COLORS.white, backgroundColor:COLORS.lightBlue1}}>
                        <IconButton icon="progress-clock" color={COLORS.white} />
                        <Text style={{color:COLORS.white, fontWeight:'bold'}}>UNDER INVESTIGATION</Text>
                    </View>
                )
            case "Done":
                return (
                    <View style={{...styles.statusContainer, borderColor:COLORS.white, backgroundColor:COLORS.lightGreen}}>
                        <IconButton icon="progress-check" color={COLORS.white} />
                        <Text style={{color:COLORS.white, fontWeight:'bold'}}>COMPLETED</Text>
                    </View>
                )
            default:
                return (
                    <View style={{...styles.statusContainer, borderColor:COLORS.lightGray}}>
                        <IconButton icon="progress-check" color={COLORS.lightGray} />
                        <Text style={{color:COLORS.lightGray, fontWeight:'bold'}}>UNKNOWN</Text>
                    </View>
                )            
        }
    }

    return (
            <View style={{flex:1, backgroundColor:COLORS.white}}>
                <ScrollView contentContainerStyle={{ }}>
                    <View style={{ alignContent:'center'}}>
                        <Pressable style={{zIndex : 1, position:'absolute', top:10, }} onPress={() => navigation.goBack()}>
                            <IconButton style={{ backgroundColor:COLORS.white, opacity:0.9}} icon={icon.leftArr} color={COLORS.primary} />
                        </Pressable>
                    </View>
                    <View style={{}}>
                        <Pressable onPress={()=>setIsVisible(true)}>
                            <Image source={{uri:imgUrl}} resizeMode='cover' style={{width:SIZES.width, height:imageHeight}} />
                        </Pressable>
                            <ImageView
                            images={[{uri:imgUrl}]}
                            imageIndex={0}
                            visible={visible}
                            onRequestClose={() => setIsVisible(false)}
                            />
                        </View>           
                        <View style={{}}>
                            <View style={{}}>
                                <View style={{paddingLeft:10}}>
                                    <Title style={styles.title}> {title}</Title>
                                    <Subheading style={{...styles.styleTxt, color:COLORS.lightGray, marginBottom:-10}}>{content}, {event.toLocaleDateString('th_TH', options)}</Subheading>
                                </View>
                                <View style={styles.divider} />
                                <View style={{ paddingHorizontal:10, justifyContent:"space-between"}}>
                                    <Text style={styles.styleTxt}> {desc}</Text>
                                    <StatusDisplay />
                                </View>
                            </View>
                        </View>

                </ScrollView> 
            </View>  
    );
}

const styles = StyleSheet.create({
    blockContainer: {
        backgroundColor:COLORS.white, 
        padding:5,
        marginVertical:10, 
        borderRadius: 5,
        
    },
    statusContainer:{
        backgroundColor:COLORS.white,
        flexDirection:'row',
        justifyContent:'space-between',
        alignSelf:'center',
        alignItems:'center',
        paddingHorizontal:5,
        margin:5,
        borderRadius:15,
        borderWidth:2,
    },
    divider:{
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginTop: 5,
        marginBottom: 10,
    },
    title: {
        color:COLORS.black,
        textShadowColor:COLORS.black,
        textTransform:'uppercase',
        borderColor:COLORS.black,
        fontWeight:'bold',
        fontSize:SIZES.h2,
        marginBottom:-10
    },
    subHeader:{
        color:COLORS.white,
    },
    styleTxt:{
        color:COLORS.black,
        fontSize:SIZES.body3,
        padding:5, 
    },
    dividerStyle: {
        color:COLORS.white,
        margin:10
    },

});

export default viewMore;