import React from "react";
import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

export default function Splash() {

    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
          console.log("TOKEN:", token);
        },
      
        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
          console.log("NOTIFICATION:", notification);
          const body = notification.message;
          const title = notification.title;
          console.log("NOTIFICATION.....................:", body,title);
          Alert.alert(title,body)
          // process the notification
      
          // (required) Called when a remote is received or opened, or local notification is opened
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
      
        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
          console.log("ACTION:", notification.action);
          console.log("NOTIFICATION:", notification);
      
          // process the action
        },
      
        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function(err) {
          console.error(err.message, err);
        },
      
        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
      
        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,
      
        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
        
      });

    return (
        <View styles={{ marginTop: '45%' }}>
            <Image
                source={require('../../images/Splash.png')}
                style={styles.images}
            />
            <View style={styles.view}></View>
            <Text style={styles.title}>CRM</Text>
            <Text style={styles.subtitle}>Lead Generation and Employee {'\n'}Management</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    images: {
        height: 160,
        width: 220,
        marginTop: '40%',
        alignSelf: 'center',
    },
    view: {
        borderBottomWidth: 2,
        width: '62%',
        marginLeft: '19%'
    },
    title: {
        fontSize: 68,
        fontWeight: 'bold',
        color: '#2F394E',
        textAlign: 'center',
        marginTop: '5%'
    },
    subtitle: {
        fontSize: 22,
        color: '#2F394E',
        textAlign: 'center',
        marginTop: '8%'
    }
})