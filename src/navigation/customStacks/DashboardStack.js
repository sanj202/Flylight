// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    DashBoard,
    lead_manager,
    TransforLeads,
    addLead,
    editLead,
    Staff_Members,
    Notification,
    History,
    HistoryOne,
    Organization,
    Campaign,
    AddCampaign,
    EditCampaign,
    Meetings,
    AddMeetings,
    EditMeetings,
    MeetingsDetail,
    Action_Manager,
    Task_Manager,
    AddTask,
    Lead_ManagerDetail
} from '../../screens/index'

const Stack = createNativeStackNavigator();
function DashboardStack() {
    return (
        // <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DashboardStack" component={DashBoard} />
            <Stack.Screen name="lead_manager" component={lead_manager} />
            <Stack.Screen name="addLead" component={addLead} />
            <Stack.Screen name="editLead" component={editLead} />
            <Stack.Screen name="Staff_Members" component={Staff_Members} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="HistoryOne" component={HistoryOne} />
            <Stack.Screen name="Organization" component={Organization} />
            <Stack.Screen name="Campaign" component={Campaign} />
            <Stack.Screen name="AddCampaign" component={AddCampaign} />
            <Stack.Screen name="EditCampaign" component={EditCampaign} />
            <Stack.Screen name='TransforLeads' component={TransforLeads} />
            <Stack.Screen name='Action_Manager' component={Action_Manager} />
            <Stack.Screen name='Task_Manager' component={Task_Manager} />
            <Stack.Screen name='AddTask' component={AddTask} />
            <Stack.Screen name="Meetings" component={Meetings} />
            <Stack.Screen name="AddMeetings" component={AddMeetings} />
            <Stack.Screen name="EditMeetings" component={EditMeetings} />
            <Stack.Screen name='MeetingsDetail' component={MeetingsDetail} />
            <Stack.Screen name='Lead_ManagerDetail' component={Lead_ManagerDetail} />
        </Stack.Navigator>
        // </NavigationContainer>
    );
}

export default DashboardStack;