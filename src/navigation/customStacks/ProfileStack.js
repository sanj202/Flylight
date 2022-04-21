// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    Profile,
    Notification,
    EditProfile,
    packegeTopups,
    orderHistory,
} from '../../screens/index'

const Stack = createNativeStackNavigator();
function ProfileStack() {
    return (
        // <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="ProfileStack" component={Profile} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="orderHistory" component={orderHistory} />
                <Stack.Screen name="packegeTopups" component={packegeTopups} />
                <Stack.Screen name="Notification" component={Notification} />
            </Stack.Navigator>
        // </NavigationContainer>
    );
}

export default ProfileStack;