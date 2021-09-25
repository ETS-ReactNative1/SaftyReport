import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../screen/auth/Login';
import Signup from '../screen/auth/Signup2';

const Stack = createStackNavigator();

function authNav() {
    return (
            <Stack.Navigator>
                <Stack.Screen name="SignIn" component={LoginScreen} options={{headerShown:false}} />
                <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}} />
            </Stack.Navigator>
    );
}

export default authNav;



