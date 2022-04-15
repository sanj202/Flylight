
import React from 'react'
import { Platform } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Login,
  register,
  SetPassword,
  Varification,
  ForgotPassword,
  F_Varification,
} from '../screens/index'
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={Platform.OS == 'ios' ? { headerShown: true } : { headerShown: false }}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='register' component={register} />
      <Stack.Screen name="Varification" component={Varification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name='F_Varification' component={F_Varification} />
      <Stack.Screen name='SetPassword' component={SetPassword} />
    </Stack.Navigator>
  );
}



