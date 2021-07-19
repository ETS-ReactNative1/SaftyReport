import * as React from 'react';
import { StyleSheet, View,StatusBar,Alert, ScrollView } from "react-native";

import { Headline, Button} from 'react-native-paper';

import { images, SIZES, COLORS } from '../constants';
import CardCompo from '../components/card';

const card1 = {
  imgURL: images.innerFac,
  title:'Pipe Leak',
  content: 'Water pipe leakage at the humidity facility ',
  name: 'Surayut'
  ,
};

const card2 = {
  imgURL: images.darkStair,
  title:'Unknown entry point',
  content: 'Potential break in point',
  name: 'Pravit'
  ,
};

function status({ navigation }) {
    return (
      <ScrollView style={{backgroundColor:COLORS.primary}}>
        <View style={{flex:1, margin:10, flexDirection: 'row', justifyContent: 'space-between',}} >
          <Headline>Report Status</Headline>
          <Button
            style={{margin:5, flex:1}}
            mode = 'contained' 
            icon="plus" 
            color="#f194ff"
            onPress={() => Alert.alert('Sike!!','No report for you')}
          >Add New Report</Button>
            
        </View>
        <View style={{flex:10}}>
          <CardCompo img={card1.imgURL} name={card1.name} title={card1.title} contents={card1.content} />
          <CardCompo img={card2.imgURL} name={card2.name} title={card2.title} contents={card2.content} />
        </View>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: "#f9c2ff",
      marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    }
  });

export default status;  