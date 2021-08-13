import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import {Image } from 'react-native';

import MainMenu from '../screen/mainMenu'
import Status from '../screen/status'
import Profile from "../screen/profile";
import Message from "../screen/message";

import { icon, COLORS } from "../constants";

const Tab = createMaterialBottomTabNavigator();

const tabOptions = {
    showLabel: false,
    style: {
        height: "10%",
        backgroundColor: COLORS.white
    }
}

const Tabs = () => {
    return (
        <Tab.Navigator
        tabBarOptions={tabOptions}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.white : COLORS.darkBlue;

                    switch (route.name) {
                        case "Main":
                            return (
                                <Image
                                    source={icon.home}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Status":
                            return (
                                <Image
                                    source={icon.mode}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Profile":
                            return (
                                <Image
                                    source={icon.user}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Message":
                            return (
                                <Image
                                    source={icon.messenger}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                    }
                }
            })}
        >
            <Tab.Screen
                name="Main"
                component={MainMenu}
            />
            <Tab.Screen
                name="Status"
                component={Status}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
            />
            <Tab.Screen
                name="Message"
                component={Message}
            />
          
        </Tab.Navigator>
    )
}

export default Tabs;