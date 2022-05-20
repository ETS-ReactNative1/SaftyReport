import * as React from 'react';
import {  View,Image, SafeAreaView } from 'react-native';
import { Text, Headline , Button, } from 'react-native-paper';
import { images, COLORS } from '../constants';
import ListCompo from '../components/listReward';

function HomeScreen({ navigation }) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center',  backgroundColor:COLORS.white }}>
        <View style={{flex:1,}}>
          <View style={{flex:2, backgroundColor:COLORS.primary, margin:10, borderRadius:15,}}>
            <Image style={{ width : '100%', height:'100%',  resizeMode: 'contain' }}
            source={images.airport} />
          </View>
          <View style = {{ flex: 1, marginBottom:10, justifyContent:'space-around', alignItems:'center', }}>
            <Headline style={{fontWeight:"bold",color:COLORS.primary}}>Welcome</Headline>
            <Text style={{}}>Press button below to get start</Text>
            <Button mode = 'contained' icon="plus" onPress={() => {navigation.navigate('Status')}}>Add New Report</Button>
          </View>
        </View>
        <View style = {{flex:1, }}>
          <ListCompo />
        </View>  
      </SafeAreaView>
    );
  }

export default HomeScreen;  