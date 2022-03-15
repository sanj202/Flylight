
import React from 'react'
import {
  Image, View, StyleSheet, TouchableOpacity,
  Text, Touchable, Dimensions, StatusBar, Platform
} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Task_Manager,
  AddTask,
  Action_Manager,
  ReportFeedback,
  Edit_Opportunity,
  editLead,
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
  EditProfile,
  Staff_Members,
  DashBoard,
  Organization,
  Campaign,
  AddCampaign,
  EditCampaign,
  Meetings,
  AddMeetings,
  EditMeetings,
  MeetingsDetail,
  addLead,
  packegeTopups,
  Edit_Contact,
  orderHistory
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
        }
      }}
      // initialRouteName='Home'
    >
      <Tab.Screen
        name="Home"
        // component={TopTab}
        component={DashBoard}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            fontSize: 12, fontFamily: 'Roboto',
            paddingBottom: '5%', color: '#fff',
          },
          title: 'Home',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              focused ?
              <Image
                style={{ width: 22, height: 24, marginTop: '7%', }}
                source={require('../../images/homeTab.png')}
              />
              :
              <Image
              style={{ width: 19.48, height: 21.64, marginTop: '7%', }}
              source={require('../../images/homeTab.png')}
            />
            );
          },
        }} />
      <Tab.Screen name="Report" component={Report}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            fontSize: 12, fontFamily: 'Roboto',
            paddingBottom: '5%', color: '#fff',
          },
          title: 'Report',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              focused ?
              <Image
                style={{ width: 23, height: 23, marginTop: '5%', }}
                source={require('../../images/report.png')}
              />
              :
              <Image
              style={{ width: 21, height: 21, marginTop: '5%', }}
              source={require('../../images/report.png')}
            />
            );
          },
        }} />

      <Tab.Screen name="addTab" component={AddContact}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: { color: '#2296E4' },
          title: 'addTab',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <View
                style={Platform.OS == 'ios' ?
                  { marginTop: '-4%' }
                  :
                  { marginTop: '-16%' }
                } >
                <View style={styles.base}>
                  <View style={styles.baseTop} />
                </View>
                <View>
                  <View
                    style={styles.box}  >
                  </View>
                  <Image
                    style={{
                      width: 48, height: 48, marginTop: '65%', marginHorizontal: '23%'
                      // alignItems: 'center', 
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
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            fontSize: 12, fontFamily: 'Roboto',
            paddingBottom: '5%', color: '#fff',
          },
          title: 'ContactList',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              focused ?
              <Image
                style={{ width: 30, height: 11, marginTop: '7%' }}
                source={require('../../images/callTab.png')}
              />
              :
              <Image
              style={{ width: 28.40, height: 9.10, marginTop: '7%' }}
              source={require('../../images/callTab.png')}
            />
            );
          },
        }} />

      < Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            fontSize: 12, fontFamily: 'Roboto',
            paddingBottom: '5%', color: '#fff',
          },
          title: 'Profile',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              focused ?
              <Image style={{ width: 21, height: 22, marginTop: '6%' }}
                source={require('../../images/profile.png')}
              />
              :
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
        name="addLead"
        component={addLead}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="editLead"
        component={editLead}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="Edit_Opportunity"
        component={Edit_Opportunity}
        options={{
          tabBarHideOnKeyboard: true,
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
        name="AddTask"
        component={AddTask}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="Action_Manager"
        component={Action_Manager}
        options={{
          tabBarHideOnKeyboard: true,
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
          tabBarHideOnKeyboard: true,
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
        name="Organization"
        component={Organization}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="Campaign"
        component={Campaign}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="AddCampaign"
        component={AddCampaign}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="EditCampaign"
        component={EditCampaign}
        options={{
          tabBarHideOnKeyboard: true,
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
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name='packegeTopups'
        component={packegeTopups}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />


      <Tab.Screen
        name='Staff_Members'
        component={Staff_Members}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name='Edit_Contact'
        component={Edit_Contact}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name='Meetings'
        component={Meetings}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name='AddMeetings'
        component={AddMeetings}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name='EditMeetings'
        component={EditMeetings}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name='orderHistory'
        component={orderHistory}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name='MeetingsDetail'
        component={MeetingsDetail}
        options={{
          tabBarHideOnKeyboard: true,
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