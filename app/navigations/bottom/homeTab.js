
import React from 'react'
import {
  Image, View, StyleSheet, TouchableOpacity,
  Text, Touchable, Dimensions, StatusBar, Platform
} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Task_Manager,
  Action_Manager,
  ReportFeedback,
  Edit_Opportunity,
  Edit_Lead,
  lead_manager,
  All_Lead,
  Report,
  AddContact,
  Profile,
  Contacts,
  ContactsTwo,
  History,
  HistoryOne,
  History_Feedback,
  Report2,
  Notification,
  EditProfile
} from '../../screens/index'
import { TopTab } from '../drawer/TopTab'

const Tab = createBottomTabNavigator();

const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: "9%", backgroundColor: '#2296E4' },
        tabBarOptions: {
          activeTintColor: '#fff',
          inactiveTintColor: 'lightgray',
          // keyboardHidesTabBar: true
          // position:'absolute'
        }
      }}
      initialRouteName='Home'
    >
      <Tab.Screen
        name="Home"
        component={TopTab}
        options={{
          tabBarLabelStyle: {
            fontSize: 12, fontFamily: 'Roboto',
            paddingBottom: '5%', color: '#fff',
          },
          title: 'Home',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: 19.48, height: 21.64, marginTop: '7%', }}
                source={require('../../images/homeTab.png')}
              />
            );
          },
        }} />
      <Tab.Screen name="Report" component={Report}
        options={{
          tabBarLabelStyle: {
            fontSize: 12, fontFamily: 'Roboto',
            paddingBottom: '5%', color: '#fff',
          },
          title: 'Report',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: 21, height: 21, marginTop: '5%', }}
                source={require('../../images/report.png')}
              />
            );
          },
        }} />

      <Tab.Screen name="addTab" component={AddContact}
        options={{
          tabBarLabelStyle: { color: '#2296E4' },
          title: 'addTab',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              // console.log("tab.........................."),
              <View
                style={Platform.OS == 'ios' ?
                  { marginTop: '-4%' }
                  :
                  { marginTop: '-12%' }
                }
              >

                <View style={styles.base}>
                  <View style={styles.baseTop} />
                </View>

                <View>
                  <View
                    style={[styles.box,
                      // {
                      //   transform: [{ rotate: "180deg" }],
                      // },
                    ]}
                  >
                  </View>
                  <Image
                    style={{
                      width: 48, height: 48,
                      // alignItems: 'center',
                      marginTop: '65%', marginHorizontal: '23%'
                    }}
                    source={require('../../images/Add.png')}
                  />
                </View>
              </View>
            );
          },
        }} />

      < Tab.Screen name="AddContact" component={Contacts}
        options={{
          tabBarLabelStyle: {
            fontSize: 12, fontFamily: 'Roboto',
            paddingBottom: '5%', color: '#fff',
          },
          title: 'AddContact',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: 28.40, height: 9.10, marginTop: '7%' }}
                source={require('../../images/callTab.png')}
              />
            );
          },
        }} />

      < Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarLabelStyle: {
            fontSize: 12, fontFamily: 'Roboto',
            paddingBottom: '5%', color: '#fff',
          },
          title: 'Profile',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image style={{ width: 19.05, height: 20.77, marginTop: '6%' }}
                source={require('../../images/profile.png')}
              />
            );
          },
        }} />

      <Tab.Screen
        name="All_Lead"
        component={All_Lead}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="lead_manager"
        component={lead_manager}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Edit_Lead"
        component={Edit_Lead}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="Edit_Opportunity"
        component={Edit_Opportunity}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="ReportFeedback"
        component={ReportFeedback}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="Task_Manager"
        component={Task_Manager}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="Action_Manager"
        component={Action_Manager}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="HistoryOne"
        component={HistoryOne}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="History_Feedback"
        component={History_Feedback}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="Report2"
        component={Report2}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name='ContactsTwo'
        component={ContactsTwo}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name='Notification'
        component={Notification}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name='EditProfile'
        component={EditProfile}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator >
  );
}

const styles = StyleSheet.create({

  box: {
    height: 80,
    width: 80,
    marginVertical: "-95%",
    marginRight: '10%',
    alignItems: "center",
    justifyContent: "center",
    transparentCard: true,
    // borderTopLeftRadius:10,
    // borderTopWidth:5,
  },

  baseTop: {
    borderTopWidth: 30,
    borderTopColor: '#fff',
    borderLeftWidth: 50,
    borderLeftColor: 'transparent',
    borderRightWidth: 50,
    borderRightColor: 'transparent',
    height: 0,
    width: 0,
    left: '5%',
    // top: -10,
    position: 'absolute',
    marginLeft: '-10%'
  },
  image2: {
    width: 28,
    height: 28,
    marginHorizontal: '10%'
  },
})

export { HomeTabs }