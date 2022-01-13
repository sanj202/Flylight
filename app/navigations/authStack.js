
import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import {
  Login,
  register,
  SetPassword,
  EditProfile,
  DashBoard,
  Varification,
  ForgotPassword,
  F_Varification,

} from '../screens/index'
import { MainStack } from './mainStack';

import { MyTabs } from './bottom/index'

const Stack = createStackNavigator();

function AuthStack() {

  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={Platform.OS == 'ios' ? { headerShown: true }:{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='register' component={register} />
      <Stack.Screen name="Varification" component={Varification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name='F_Varification' component={F_Varification} />
      <Stack.Screen name='SetPassword' component={SetPassword} />
      <Stack.Screen name='MainStack' component={MainStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export { AuthStack };

