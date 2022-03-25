import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  MainDrawer  from './drawer/MainDrawer'
const Stack = createNativeStackNavigator();

export function MainStack({ route }) {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} // initialRouteName='HomeTabs' 
    >
      <Stack.Screen name='Main' component={MainDrawer} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
