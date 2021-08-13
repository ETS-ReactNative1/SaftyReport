import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

function list(props) {
    return (
        <List.Section>
             <List.Item 
             title={props.name} 
             left={() => <List.Icon icon="rename-box" />} 
             />
            <List.Item
                title={props.email}
                left={() => <List.Icon icon="email" />}
            />
            <List.Item
                title={props.phone}
                left={() => <List.Icon icon="phone" />}
            />
            </List.Section>
    );
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: "#f9c2ff",
      paddingTop: 20,
      marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });  

export default list;