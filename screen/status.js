import React, {useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, RefreshControl, ActivityIndicator, Image, Modal, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Snackbar, Button, Title, Portal, Subheading,} from 'react-native-paper';

import CardItem from '../components/cardItem';
import FilterButton from '../components/FilterButton';
import { images, COLORS, SIZES } from '../constants';
import { UserContext } from '../components/context/user';
import { api } from '../constants/api';

const FILTER_MAP = {
  All: () => true,
  Unfinished: task => task.isFinished === "Not Finished",
  Going: task => task.isFinished === "Going",
  Done: task => task.isFinished === "Done"
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function status({ navigation, route }) {

  const { state } = React.useContext(UserContext);
  
  const [data,setData] = useState([])
  const [loadingModal,setLoading]= useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('All');

  const fetchData = async ()=>{
    try{
    const response = await fetch(`${api}/api/report/user`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`bearer ${state.userToken}`
      }});

    const json = await response.json();
    //Flip json, so new report will appear at the top.
    const data = json.reverse();

    setData(data)
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
    fetchData();

  },[])

  const deleteCard = async (data) => {

    const uriStr = data.imgUrl;
    const removeDomain = uriStr.split('https://res.cloudinary.com/dikzhc5yg/image/upload/');
    const removeFront = removeDomain[1].split('/');
    const finalUri = removeFront[1].split('.');

    try{
    const delRes = await fetch(`${api}/api/report/${data.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },body: JSON.stringify({
        uri: finalUri[0],
      })})

    if (delRes.status === 204) {
      onRefresh();
    }  
    
    }catch(e){
      console.log(e);
    }
  }

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const ListHeader = () => {
    //View to set in Header
    return (
      <View>
      <View style={styles.listHeaderContainer}>
        <Title style={{flex:5, marginHorizontal:10, color:COLORS.white}}>MY REPORTS</Title>
          <Button
            style={{marginVertical:10,marginHorizontal:20, flex:1, alignSelf:'flex-end'}}
            mode = 'contained' 
            icon="plus" 
            color={COLORS.white}
            onPress={() => {
              navigation.navigate('AddReport', {
                onGoBack: () => onRefresh(),
              })}}
          > Report</Button>
      </View> 
      <ScrollView horizontal={true} style={{flex:1, flexDirection:"row"}}>
        {filterList}
      </ScrollView>
      </View>
    );
  };


  const ListEmpty = () => {
    return (
      <View style={{...styles.container,margin:10}}>
        <Title>You have no report!</Title>
        <Subheading>Get start by adding some report.</Subheading>
        <Image resizeMode={'center'} source={images.report} />
      </View>
    )
  }

  const renderItem = ( {item} ) => (
    <CardItem item={item} deleteCard={deleteCard} />
    );
  

  return (
      <SafeAreaView>
        <View style={styles.container}>
          <Modal
            transparent={true}
            animationType='fade'
            visible={loadingModal}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }} 
            >
            <View style={{...styles.container,backgroundColor:COLORS.gray, opacity:0.66}}>  
              <ActivityIndicator size="large" color={COLORS.white}/>
            </View>  
          </Modal>
          </View>

        <FlatList
        //Render top components
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={ListEmpty}
          deleteCard={deleteCard}
        //Card list items  
          data={data.filter(FILTER_MAP[filter])}
          renderItem={renderItem}
          keyExtractor={item => item.id}

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        
        />
        
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems:'center',
    },
    listHeaderContainer:{
      flex:1, 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems:'center', 
      margin:5, 
      backgroundColor:COLORS.primary,
      borderRadius:7
    }
  });  

export default status;  