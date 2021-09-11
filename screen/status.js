import React, {useState, useEffect, useRef } from 'react';
import { FlatList, View, StyleSheet, RefreshControl, ActivityIndicator } from "react-native";
import * as SecureStore  from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, Title, Paragraph,  Portal, IconButton, Dialog,} from 'react-native-paper';
import { images, COLORS, SIZES } from '../constants';
import { AuthContext } from '../components/context';

function status({ navigation, route }) {
  
  const [data,setData] = useState([])
  const [loading,setLoading]= useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);

  const fetchData = async ()=>{
    try{
    const response = await fetch(`http://192.168.1.34:3001/api/report`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }});

    const json = await response.json();

    console.log(json);

    setData(json)
    setLoading(false)
  }catch(e){console.log(e);}
 }

  const onRefresh = React.useCallback(() => {
    setLoading(true)
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    
    setLoading(true);
    //bootstrapAsync();
    
    fetchData();

  },[])

  const deleteCard = async (id) => {
    fetch(`http://192.168.1.34:3001/api/report/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }}).
    then(()=>
    onRefresh()
    ).
    then(()=>
    setVisible(true));
  }

  const RenderDia = (props) => {
    return (
      <Dialog Dialog visible={visible} onDismiss={()=>setVisible(false)}>
        <Dialog.Content>
              <Paragraph>This report has been successfully deleted</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
              <Button onPress={()=>setVisible(false)}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    )
  }

  const ListHeader = () => {
    //View to set in Header
    return (
      <View>
      <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginTop:10}}>
        <Portal>
          <RenderDia />
        </Portal>
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
            <Button onPress={() => deleteCard(item.id)} >Delete</Button>
          </Card.Actions>
    </Card>);
  

  return (
      <SafeAreaView >
        {(!loading) ? (
        <FlatList
        //Render top components
          ListHeaderComponent={ListHeader}
          deleteCard={deleteCard}
        //Card list items  
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        
        />):
        (
          <SafeAreaView style={styles.container}>
            <ActivityIndicator size="large" color={COLORS.black}/>
          </SafeAreaView>)}
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems:'center'
    },
    
  });  

export default status;  