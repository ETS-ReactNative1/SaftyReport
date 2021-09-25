import React from 'react';
import Tabs from '../navigation/tab';
import addReport from '../screen/addReport';
import viewMore from '../screen/viewMore';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function root() {
    return (
      <Stack.Navigator>
          <Stack.Screen name="Home" component={Tabs} options={{headerShown:false}} />
          <Stack.Screen name ="AddReport" component={ addReport } options={{headerShown:false}} />
          <Stack.Screen name ="ViewMore" component={ viewMore } options={{headerShown:false}} />
        </Stack.Navigator>
    )
  }
  

export default root;