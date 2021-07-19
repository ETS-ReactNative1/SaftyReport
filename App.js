import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import { Provider as PaperProvider } from 'react-native-paper';

import Tabs from './navigation/tab'

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}