import * as React from 'react';
import { StyleSheet, Platform, StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Tabs from './navigation/tab';
import addReport from './screen/addReport';
import viewMore from './screen/viewMore';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Tabs} options={{headerShown:false}} />
        <Stack.Screen name ="AddReport" component={ addReport } options={{ title: 'Add Report' }} />
        <Stack.Screen name ="ViewMore" component={ viewMore } options={{ title: 'More Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    </SafeAreaProvider>
  );
}

