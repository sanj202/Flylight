import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native'

export default function Splash() {
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