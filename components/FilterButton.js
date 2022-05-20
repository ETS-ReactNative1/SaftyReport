import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from '../constants';

function FilterButton(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={
                {
                    ...styles.button,
                    backgroundColor:props.isPressed ? COLORS.primary : COLORS.white,
                }
                } 
                onPress={() => props.setFilter(props.name)}>
                <Text
                style={{
                  color:props.isPressed ? COLORS.white : COLORS.black,
                }}
                >{props.name}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 5,
    },
    button: {
      justifyContent:"center",
      textAlign:'center',
      alignItems: "center",
      padding:5,
      borderRadius:5,
      width:125,
      height:40
    },
  });

export default FilterButton;