import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../screen/auth/LoginScreen';
import SignUp from '../screen/auth/SignUp';

const Stack = createStackNavigator();

function authNav() {
    return (
            <Stack.Navigator>
                <Stack.Screen name="SignIn" component={LoginScreen} options={{headerShown:false}} />
                <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
            </Stack.Navigator>
    );
}

export default authNav;



