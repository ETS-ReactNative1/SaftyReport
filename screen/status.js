import React, {useState, useEffect, useRef } from 'react';
import { FlatList, View, StyleSheet, Alert, Image,Modal } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, Title, Paragraph,  Portal, IconButton, Divider,} from 'react-native-paper';
import { images, COLORS, SIZES } from '../constants';

function status({ navigation, route }) {

  const [data,setData] = useState([])
  const [loading,setLoading]= useState(true)

  /*const [cards, setCard] = useState([
    {
      repID:'1651ad',  
      imgURL: images.innerFac,
      title:'Pipe Leak',
      content: 'Water pipe leakage at the humidity facility ',
      date: '05/5/1995',
      isFinished:'No',
      desc:`Bill ran from the giraffe toward the dolphin. 25 years later, she still regretted that specific moment. There are over 500 starfish in the bathroom drawer. The big was having an excellent day until he hit the windshield.`  
      },
      {
      repID:'a1351',  
      imgURL: images.darkStair,
      title:'Unknown entry point',
      content: 'Potential break in point',
      date: '21/06/1999',
      isFinished:'Doing',
      desc: `He kept telling himself that one day it would all somehow make sense. Chocolate covered crickets were his favorite snack. Her fragrance of choice was fresh garlic.
            `
        
      }
  ])*/

  const fetchData = ()=>{
    fetch("http://localhost:3000/")
    .then(res=>res.json())
    .then(results=>{

      setData(results)
      setLoading(false)

    }).catch(err=>{
        console.log(err);
    })
 }

  useEffect(() => {
    /*if (route.params?.post) {
      addCard(route.params?.post);
    }
  },[route.params?.post]);*/
    fetchData()
  },[])

  const addCard = ( card ) => {
    card.repID = Math.random().toString();
    setCard((currentCards) => {
      return [card, ...currentCards]
    });
    
  }

  function deleteCard(id) {
    console.log(id);
    const remainingCards = cards.filter(delCard => id !== delCard.id);
    setCard(remainingCards);
  }

  const ListHeader = () => {
    //View to set in Header
    return (
      <View>
      <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginTop:10}}>
        <Title style={{flex:5, marginHorizontal:10}}>Report Status</Title>
          <Button
            style={{marginVertical:10,marginHorizontal:20, flex:1, alignSelf:'flex-end'}}
            mode = 'contained' 
            icon="plus" 
            color={COLORS.white}
            onPress={() => {
              navigation.navigate('AddReport')}}
          > Report</Button>
      </View>
      </View>
    );
  };

    const renderItem = ({ item }) => (
      <Card style={{margin:5}}>
       <Card.Cover source={item.imgURL} />
       <Card.Title title={item.title} subtitle={item.date} />
          <Card.Content>
            <Paragraph>{item.content}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => {
                navigation.navigate('ViewMore', {
                  data: {...item}
              });
            }} >More</Button>
            <Button onPress={() => deleteCard(item.repID)} >Delete</Button>
          </Card.Actions>
    </Card>);
  

  return (
      <SafeAreaView>
        <FlatList
        //Render top components
          ListHeaderComponent={ListHeader}
          deleteCard={deleteCard}
        //Card list items  
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          
        />
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    modalClose: {
      borderWidth: 1,
      borderColor:COLORS.white,
      backgroundColor: COLORS.lightRed,
      alignSelf:'center'
    },
    
  });  

export default status;  