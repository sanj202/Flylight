
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { TopTab } from './drawer/TopTab'

const Stack = createStackNavigator();

export function MainStack({ route }) {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} // initialRouteName='HomeTabs' 
    >
      <Stack.Screen name='HomeTabs' component={TopTab} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
