import React, {useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, RefreshControl, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Snackbar, Button, Title, Portal, Subheading,} from 'react-native-paper';

import CardItem from '../components/cardItem';
import { images, COLORS, SIZES } from '../constants';
import { UserContext } from '../components/context/user';
import { api } from '../constants/api';

function status({ navigation, route }) {

  const { state } = React.useContext(UserContext);
  
  const [data,setData] = useState([])
  const [loading,setLoading]= useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

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
      setVisible(true);
    }  
    
    }catch(e){
      console.log(e);
    }
  }

  const SnackDel = () => {
    return(
      <View style={{flex: 1,justifyContent: 'center', alignItems:'center'}} >
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={3500}>
        Deleted Successfully
      </Snackbar>
    </View>
    )
  }

  const ListHeader = () => {
    //View to set in Header
    return (
      <View>
   
      <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginTop:10}}>
        <Portal>
          <SnackDel />
        </Portal>
        <Title style={{flex:5, marginHorizontal:10}}>Report Status</Title>
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
      </View>
    );
  };

  const ListFooter = () => {
    return (
      <View style={styles.container}>
        { data.length === 0 ? (
        <View></View>
        ):(
          <View></View>
        )}
      </View>
    )
  }

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
      <SafeAreaView >
        {(!loading) ? (
        <FlatList
        //Render top components
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          ListEmptyComponent={ListEmpty}
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