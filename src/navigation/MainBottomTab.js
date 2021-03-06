import * as React from 'react';
import { Text, View, Dimensions, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTab from './CustomTab';
import {
    Task_Manager,
    AddTask,
    Action_Manager,
    editLead,
    lead_manager,
    Lead_ManagerDetail,
    TransforLeads,
    AddContact,
    Profile,
    Contacts,
    History,
    HistoryOne,
    Report2,
    EditProfile,
    Staff_Members,
    DashBoard,
    Organization,
    Campaign,
    AddCampaign,
    EditCampaign,
    addLead,
    packegeTopups,
    Edit_Contact,
    orderHistory,
    LeadFilterScreen
    // Meetings,
    // AddMeetings,
    // EditMeetings,
    // MeetingsDetail,
    // All_Lead,
    // Report,
    // ReportFeedback,
    // Edit_Opportunity,
    // History_Feedback,
    // Notification,
} from '../screens/index'

import ProfileStack from './customStacks/ProfileStack'
import ContactStack from './customStacks/contactStack'
import ReportStack from './customStacks/ReportStack'
import DashboardStack from './customStacks/DashboardStack'
// import AddTabStack from './customStacks/AddTab';

import navigationStrings from '../constant/navigationStrings';
import { event } from 'react-native-reanimated';

const Tab = createBottomTabNavigator();

export default function MainBottomTab({ route }) {
    const { width, height } = Dimensions.get('window');
    return (
        // <Tab.Navigator tabBar={props => <CustomTab {...props} />}>
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { height: height * 8 / 100, backgroundColor: '#2296E4', paddingBottom: '1%' },
                tabBarOptions: { activeTintColor: '#fff', inactiveTintColor: 'lightgray' }
            }}>
            <Tab.Screen name={navigationStrings.DashBoard} component={DashboardStack}
                listeners={({ navigation }) => ({
                    tabPress: (event) => {
                        event.preventDefault();
                        navigation.navigate(navigationStrings.DashBoard, { screen: navigationStrings.DashBoard });
                    }
                })}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarLabelStyle: { fontSize: 12, fontFamily: 'Roboto', color: '#fff' },
                    title: 'Home',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            focused ?
                                <Image
                                    style={{ width: 22, height: 24, }}
                                    source={require('../images/homeTab.png')}
                                />
                                :
                                <Image
                                    style={{ width: 22, height: 24, opacity: 0.8 }}
                                    source={require('../images/homeTab.png')}
                                />
                        );
                    }
                }} />
            <Tab.Screen name={navigationStrings.Report} component={ReportStack}
                listeners={({ navigation }) => ({
                    tabPress: (event) => {
                        event.preventDefault();
                        navigation.navigate(navigationStrings.Report, { screen: navigationStrings.Report });
                    }
                })}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarLabelStyle: {
                        fontSize: 12, fontFamily: 'Roboto',
                        color: '#fff',
                    },
                    title: 'Report',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            focused ?
                                <Image
                                    style={{ width: 23, height: 23, }}
                                    source={require('../images/report.png')}
                                />
                                :
                                <Image
                                    style={{ width: 23, height: 23, opacity: 0.8 }}
                                    source={require('../images/report.png')}
                                />
                        );
                    }
                }} />
            <Tab.Screen name={navigationStrings.AddContact} component={AddContact}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarLabelStyle: {
                        fontSize: 12, fontFamily: 'Roboto',
                        color: '#fff',
                    },
                    title: 'AddTab',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <View style={styles.baseTop}>
                                <Image
                                    style={{
                                        width: 40, height: 40,
                                        resizeMode: 'contain',
                                        alignSelf: 'center',
                                        top: height * 2 / 100,
                                        // alignItems: 'center', 
                                    }}
                                    source={require('../images/Add.png')}
                                />
                            </View>
                        );
                    }
                }} />
            <Tab.Screen name={navigationStrings.Contacts} component={ContactStack}
                listeners={({ navigation }) => ({
                    tabPress: (event) => {
                        event.preventDefault();
                        navigation.navigate(navigationStrings.Contacts, { screen: navigationStrings.Contacts });
                    }
                })}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarLabelStyle: {
                        fontSize: 12, fontFamily: 'Roboto',
                        color: '#fff',
                    },
                    title: 'ContactList',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            focused ?
                                <Image
                                    style={{ width: 30, height: 11, }}
                                    source={require('../images/callTab.png')}
                                />
                                :
                                <Image
                                    style={{ width: 30, height: 11, opacity: 0.8 }}
                                    source={require('../images/callTab.png')}
                                />
                        );
                    }
                }} />
            <Tab.Screen name={navigationStrings.Profile} component={ProfileStack}
                listeners={({ navigation }) => ({
                    tabPress: (event) => {
                        event.preventDefault();
                        navigation.navigate(navigationStrings.Profile, { screen: navigationStrings.Profile });
                    }
                })}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarLabelStyle: {
                        fontSize: 12, fontFamily: 'Roboto',
                        color: '#fff',
                    },
                    title: 'Profile',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            focused ?
                                <Image
                                    style={{ width: 21, height: 22, }}
                                    source={require('../images/profile.png')}
                                />
                                :
                                <Image
                                    style={{ width: 21, height: 22, opacity: 0.8 }}
                                    source={require('../images/profile.png')}
                                />
                        );
                    }
                }} />
            {/*         
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
                name='orderHistory'
                component={orderHistory}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarIcon: () => null,
                    tabBarButton: () => null,
                }}
            />

            <Tab.Screen
                name='LeadFilterScreen'
                component={LeadFilterScreen}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarIcon: () => null,
                    tabBarButton: () => null,
                }}
            />
            <Tab.Screen
                name='TransforLeads'
                component={TransforLeads}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarIcon: () => null,
                    tabBarButton: () => null,
                }}
            />
            <Tab.Screen
                name='Lead_ManagerDetail'
                component={Lead_ManagerDetail}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarIcon: () => null,
                    tabBarButton: () => null,
                }}
            /> */}
            {/* <Tab.Screen
                name='Notification'
                component={Notification}
                options={{
                    tabBarIcon: () => null,
                    tabBarButton: () => null,
                }}
            /> */}
            {/* <Tab.Screen
                name="History_Feedback"
                component={History_Feedback}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarIcon: () => null,
                    tabBarButton: () => null,
                }}
            /> */}

            {/* <Tab.Screen
        name="Report2"
        component={Report2}
        options={{
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      /> */}
            {/* <Tab.Screen
                name="Edit_Opportunity"
                component={Edit_Opportunity}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarIcon: () => null,
                    tabBarButton: () => null,
                }}
            /> */}
            {/* <Tab.Screen
                name="ReportFeedback"
                component={ReportFeedback}
                options={{
                    tabBarIcon: () => null,
                    tabBarButton: () => null,
                }}
            /> */}
            {/* <Tab.Screen
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
            /> */}
            {/* <Tab.Screen
                name='MeetingsDetail'
                component={MeetingsDetail}
                options={{
                    tabBarHideOnKeyboard: true,
                    tabBarIcon: () => null,
                    tabBarButton: () => null,
                }}
            /> */}
            {/* <Tab.Screen
                name="All_Lead"
                component={All_Lead}
                options={{
                    tabBarIcon: () => null,
                    tabBarButton: () => null,
                }}
            /> */}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    baseTop: {
        bottom: 0,
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 60,
        borderRightWidth: 60,
        borderBottomWidth: 30,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "white",
        transform: [{ rotate: "180deg" }],
        flex: 1,
    },
})