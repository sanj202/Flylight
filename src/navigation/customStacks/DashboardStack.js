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
    Lead_ManagerDetail,
    CampaignDetail
} from '../../screens/index'
import navigationStrings from '../../constant/navigationStrings';

const Stack = createNativeStackNavigator();
function DashboardStack() {
    return (
        // <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={navigationStrings.DashBoard} component={DashBoard} />
            <Stack.Screen name={navigationStrings.lead_manager} component={lead_manager} />
            <Stack.Screen name={navigationStrings.addLead} component={addLead} />
            <Stack.Screen name={navigationStrings.editLead} component={editLead} />
            <Stack.Screen name={navigationStrings.Staff_Members} component={Staff_Members} />
            <Stack.Screen name={navigationStrings.History} component={History} />
            <Stack.Screen name={navigationStrings.HistoryOne} component={HistoryOne} />
            <Stack.Screen name={navigationStrings.Organization} component={Organization} />
            <Stack.Screen name={navigationStrings.Campaign} component={Campaign} />
            <Stack.Screen name={navigationStrings.AddCampaign} component={AddCampaign} />
            <Stack.Screen name={navigationStrings.EditCampaign} component={EditCampaign} />
            <Stack.Screen name={navigationStrings.TransforLeads} component={TransforLeads} />
            <Stack.Screen name={navigationStrings.Action_Manager} component={Action_Manager} />
            <Stack.Screen name={navigationStrings.Task_Manager} component={Task_Manager} />
            <Stack.Screen name={navigationStrings.AddTask} component={AddTask} />
            <Stack.Screen name={navigationStrings.Lead_ManagerDetail} component={Lead_ManagerDetail} />
            <Stack.Screen name={navigationStrings.CampaignDetail} component={CampaignDetail}/>
            {/* <Stack.Screen name="Meetings" component={Meetings} />
            <Stack.Screen name="AddMeetings" component={AddMeetings} />
            <Stack.Screen name="EditMeetings" component={EditMeetings} />
            <Stack.Screen name='MeetingsDetail' component={MeetingsDetail} />
                        <Stack.Screen name="Notification" component={Notification} /> */}
        
        </Stack.Navigator>
        // </NavigationContainer>
    );
}

export default DashboardStack;