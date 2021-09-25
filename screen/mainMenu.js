import * as React from 'react';
import {  View,Image, SafeAreaView, SectionList,StyleSheet, Alert } from 'react-native';

import { Text,Headline , Button } from 'react-native-paper';

import { images, SIZES, COLORS } from '../constants';

import ListCompo from '../components/listReward';

const list1 = {
  first:'Trip to North Korea',
  second: 'Swiss Cheese',
  third: 'Diesel Bicycle'
  ,
};

function HomeScreen({ navigation }) {

    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <Image style={{ width : '100%', height:'100%',  resizeMode: 'contain', flex:2   }}
        source={images.airport}>
        </Image>
        <View style = {{ flex: 1, margin:5, justifyContent:'space-around', alignItems:'center'}}>
          <Headline>Welcome</Headline>
          <Button mode = 'contained' icon="plus" onPress={() => {navigation.navigate('Status')}}>Add New Report</Button>
        </View>
        <View style = {{flex:3 ,paddingTop:5}}>
        <ListCompo
          first={list1.first}
          second={list1.second}
          third={list1.third} 
        />
        </View>  
        
      </SafeAreaView>
    );
  }

export default HomeScreen;  