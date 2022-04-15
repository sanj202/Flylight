// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector, connect } from 'react-redux';
import MainDrawer from './MainDrawer';
import AuthStack from './Authstack'
import { Splash } from '../screens/index';

const Stack = createNativeStackNavigator();

function RootNavigation() {
  const [load, setLoad] = useState(true)
  const IsLogin = useSelector(state => state.auth.data)
  async function performload() {
    return new Promise(response => {
      setTimeout(() => { response("") }, 2000)
    })
  }
  useEffect(() => {
    async function apicall() {
      const d = await performload()
      if (d !== null) {
        setLoad(false)
      }
    }
    apicall()
  });
  if (load) {
    return (<Splash />)
  }
  else {

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {(IsLogin !== undefined && IsLogin.status == 'success') ?
            <Stack.Screen name="Main" component={MainDrawer} />
            :
            <Stack.Screen name="Onboarding" component={AuthStack} />
          }
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default RootNavigation;