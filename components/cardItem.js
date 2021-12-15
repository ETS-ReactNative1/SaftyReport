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
              <View style={{flexDirection:'row',justifyContent:'space-between', margin:15}}>
                <Button mode='contained' color={COLORS.lightRed} onPress={() => props.deleteCard(props.item)}>Confirm</Button>
                <Button onPress={()=>setVisible(false)}>Cancel</Button>
                </View>
              </View>
          </View>
        </Modal>
        </View>
      )
    }

    const StatusDisplay = () => {
      switch(props.item.isFinished) {
        case "Not Finished":
                return (
                  <View style={{...styles.statusContainer, borderColor:COLORS.lightRed, backgroundColor:COLORS.lightRed}}>
                    <Paragraph style={{color:COLORS.white, fontWeight:"bold"}}>UNFINISH</Paragraph>
                  </View>
                )
            case "Going":
                return (
                  <View style={{...styles.statusContainer, borderColor:COLORS.lightBlue1, backgroundColor:COLORS.lightBlue1}}>
                    <Paragraph style={{color:COLORS.white, fontWeight:"bold"}}>UNDER INVESTIGATION</Paragraph>
                  </View>
                )
            case "Done":
                return (
                  <View style={{...styles.statusContainer, borderColor:COLORS.lightGreen, backgroundColor:COLORS.lightGreen}}>
                    <Paragraph style={{color:COLORS.white, fontWeight:"bold"}}>COMPLETED</Paragraph>
                  </View>
                )
            default:
                return(
                  <View style={{...styles.statusContainer, borderColor:COLORS.gray, backgroundColor:COLORS.gray}}>
                    <Paragraph style={{color:COLORS.white, fontWeight:"bold"}}>UNKNOWN</Paragraph>
                  </View>
                )         
      }
    }

    return (
    <View>
      <RenderDia />
    <Card style={{margin:5, elevation:15, backgroundColor:COLORS.primary}}>
       <Card.Cover source={{uri:props.item.imgUrl}} />
       <Card.Title title={props.item.title} titleStyle={styles.textCardStyles} subtitle={`${new Date(props.item.date).toLocaleDateString('en-gb')}, ${props.item.content}`} />
          <Card.Content>
            <View style={{flex:1}}>
              <StatusDisplay />
            </View>
          </Card.Content>
          <Card.Actions>
            <Button color={COLORS.white} 
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
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
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
  statusContainer:{
    flexDirection:'row',
    alignSelf:'flex-start',
    paddingHorizontal:5,
    borderRadius:15,
    borderWidth:2,
    padding:5
},
  textCardStyles:{
    color:COLORS.white,
  }
})

export default CardItem;