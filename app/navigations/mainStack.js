
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {
  HomeStack,
  All_Lead,
  Login,
  Report,
  Profile,
  Edit_Contact,
  AddContactUpload,
  Edit_Lead,
  Edit_Opportunity,
  Task_Manager,
  Report2,
  EditProfile,
 Notification
} from '../screens/index'
import { HomeTabs } from './bottom/homeTab'
import { AuthStack } from './authStack';

// const TabNavigation = () => {
//   <HomeTabs initialRouteName='DashBoard' {...props}/>
// }

const Stack = createStackNavigator();

export function MainStack({route}) {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} // initialRouteName='HomeTabs' 
    >
      <Stack.Screen name='HomeTabs' component={HomeTabs} options={{ headerShown: false }} />
      <Stack.Screen name='Edit_Contact' component={Edit_Contact} />
      {/* <Stack.Screen name='EditProfile' component={EditProfile} /> */}
      {/* <Stack.Screen name='Profile' component={Profile} /> */}
      <Stack.Screen name="Edit_Opportunity" component={Edit_Opportunity} />
      <Stack.Screen name="Task_Manager" component={Task_Manager} />
       <Stack.Screen name="All_Lead" component={All_Lead} />
       <Stack.Screen name="AddContactUpload" component={AddContactUpload} />
      {/* <Stack.Screen name="Logout" component={Login} /> */}
      <Stack.Screen name='Logout' component={AuthStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}


