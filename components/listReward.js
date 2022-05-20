import React, {useState} from 'react';
import { View, TouchableOpacity, Text  } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { List } from 'react-native-paper';
import ImageView from "react-native-image-viewing";
import { COLORS } from '../constants';
import { api } from '../constants/api';

function list() {

  const [visible, setIsVisible] = useState(false);
  const [rewards, setReward] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReward = async () => {
    const json = await fetch(`${api}/api/reward/getOneSet`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }});

      const res = await json.json();
      setReward(res[0]);
      setLoading(false);

  }

  React.useEffect(()=>{

    getReward();

  },[])

  const images = [
    {
      uri: rewards.firstUrl,
      title: rewards.firstName
    },
    {
      uri: rewards.secondUrl,
      title: rewards.secondName
    },
    {
      uri: rewards.thirdUrl,
      title: rewards.thirdName
    },
  ];

  /*const images = [
  {
    uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
  },
  {
    uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
  },
  {
    uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
  },
];*/
  
    return (
      <View style={{flex:1, justifyContent:"center"}}>
      {(loading)  ? 
        <View >
          <ActivityIndicator color={COLORS.primary} />
        </View> 
        :
        <View>
        <ImageView
          images={images}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
        <List.Section >
          <TouchableOpacity onPress={()=>setIsVisible(true)}>
            <List.Subheader style={{backgroundColor:COLORS.primary, color:"#dce8fc"}}>Reward</List.Subheader>
          </TouchableOpacity>
          <List.Item title={rewards.firstName} left={() => <List.Icon color="#ffd700" icon="crown" />} />
          <List.Item style={{backgroundColor:COLORS.primary}} title={rewards.secondName} left={() => <List.Icon color="#c0c0c0" icon="crown" />}/>
          <List.Item title={rewards.thirdName} left={() => <List.Icon color="#cd7f32" icon="crown" />}/>
        </List.Section>
        </View>
      }
      </View>);
}


export default list;