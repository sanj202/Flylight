import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainBottomTab from './MainBottomTab';
import CustomDrawer from './CustomDrawer';
import {Notification} from '../screens/index'

const Drawer = createDrawerNavigator();

export default function MainDrawer({route}) {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false }} >
      <Drawer.Screen name="MainDrawer" component={MainBottomTab} />
      <Drawer.Screen name="Notification" component={Notification}/>
    </Drawer.Navigator>
  );
}