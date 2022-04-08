import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {SideMenu} from '../../screens/index'
import  BottomTabScreens  from '../bottom/BottomTabScreens'
const Drawer = createDrawerNavigator();

export default function MainDrawer (props) {
  return (
    <Drawer.Navigator drawerContent={props => <SideMenu {...props} />}
      screenOptions={{headerShown: false}} >
      <Drawer.Screen name='MainDrawer' component={BottomTabScreens} />
    </Drawer.Navigator>
  );
}

