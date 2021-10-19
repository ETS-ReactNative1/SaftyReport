import React, {useState} from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Subheading, Paragraph, Button } from 'react-native-paper';
import { COLORS } from '../constants';

function CardItem(props) {

    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);

    //Delete confirmation pop-up
    const RenderDia = () => {
      return (
        <View style={styles.centeredView}>
        <Modal animationType='fade' visible={visible} transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Title>Are you sure to delete this report?</Title>
              <Subheading>This action cannot be reversed.</Subheading>
              <View style={{flexDirection:'row',justifyContent:'space-around', margin:5}}>
                <Button mode='contained' color={COLORS.lightRed} onPress={() => props.deleteCard(props.item)}>Confirm</Button>
                <Button onPress={()=>setVisible(false)}>Cancel</Button>
                </View>
              </View>
          </View>
        </Modal>
        </View>
      )
    }

    return (
    <View>
      <RenderDia />
    <Card style={{margin:5}}>
       <Card.Cover source={{uri:props.item.imgUrl}} />
       <Card.Title title={props.item.title} subtitle={new Date(props.item.date).toLocaleDateString('en-gb')} />
          <Card.Content>
            <Paragraph>{props.item.content}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button color={COLORS.primary} 
            onPress={() => {
                navigation.navigate('ViewMore', {
                  data:{...props.item}
              });
            }} >More</Button>
            <Button color={COLORS.lightRed} onPress={() => setVisible(true)} >Delete</Button>
          </Card.Actions>
    </Card>
    </View>
    );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})

export default CardItem;