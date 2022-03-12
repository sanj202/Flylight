

import React from 'react'
import {
  Image, View, StyleSheet, TouchableOpacity, Dimensions,
  Text, Touchable
} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  Login,
  DashBoard,
  SideMenu,
  Report,
  Contacts,
  Profile
} from '../../screens/index'
import { HomeTabs } from '../bottom/homeTab'

const width = Dimensions.get("screen").width;


const Drawer = createDrawerNavigator();

export function TopTab(props) {

  // console.log("drawer................")
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  }

  return (
    <Drawer.Navigator
      // drawerStyle={{ width: width }}
      drawerContent={props => <SideMenu {...props} />}
      // initialRouteName="DashBoard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name='DashBoard' component={HomeTabs} />
      {/* <Drawer.Screen name='Report2' component={Report} />
      <Drawer.Screen name='Contacts2' component={Contacts} /> */}
      {/* <Drawer.Screen name='Profile2' component={Profile} /> */}

    </Drawer.Navigator>
  );
}

