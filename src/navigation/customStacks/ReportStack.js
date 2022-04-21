// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    Report2,
    Notification,
    LeadFilterScreen
} from '../../screens/index'

const Stack = createNativeStackNavigator();
function ReportStack() {
    return (
        // <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="ReportStack" component={Report2} />
                <Stack.Screen name="LeadFilterScreen" component={LeadFilterScreen} />
                {/* <Stack.Screen name="orderHistory" component={orderHistory} />
                <Stack.Screen name="packegeTopups" component={packegeTopups} /> */}
                <Stack.Screen name="Notification" component={Notification} />
            </Stack.Navigator>
        // </NavigationContainer>
    );
}

export default ReportStack;