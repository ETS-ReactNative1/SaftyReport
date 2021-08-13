import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper';
import AddImg from '../components/addImg';


export default function addReport(props) {

    const [text, setText] = React.useState('');

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ flex: 1, margin:5}}>
            <TextInput 
                label="Email"
                value={text}
                onChangeText={text => setText(text)}
            />
            </View>
            <View style={{ flex: 1, alignItems: 'left',}}>
                <AddImg />
            </View>
            
        </SafeAreaView>
    );
}

