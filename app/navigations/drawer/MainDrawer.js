

import React from 'react'
import {
  Image, View, StyleSheet, TouchableOpacity, Dimensions,
  Text, Touchable
} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {SideMenu} from '../../screens/index'
import  BottomTabScreens  from '../bottom/BottomTabScreens'
const width = Dimensions.get("screen").width;
const Drawer = createDrawerNavigator();

export default function MainDrawer (props) {

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
      <Drawer.Screen name='DashBoard' component={BottomTabScreens} />
    </Drawer.Navigator>
  );
}

