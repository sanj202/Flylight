

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';


export default function AddContactSuccessfully({ navigation }) {
    return (
        <Card style={styles.headerView}>
            <View style={styles.headerView2}>
                <TouchableOpacity
                    // onPress={() => navigation.goBack()}
                >
                    <Image
                        style={{ margin: '5%', marginTop: '3%', alignSelf: 'flex-end', height: 23, width: 23 }}
                        source={require('../../images/cross_black.png')}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>
                Contacts Imported {'\n'} Successfully
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("Contacts")}
                    style={[styles.btn, { backgroundColor: '#4581F8' }]}
                >
                    <Text
                        style={styles.btnText}
                    >
                        OK
                    </Text>
                </TouchableOpacity>
            </View>

        </Card>
    );
}

const styles = StyleSheet.create({
    headerView: {
        marginTop: '45%',
        margin: '7%',
        height: '40%',
        borderRadius: 10
    },
    headerView2: {
        paddingTop: '3%'
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        marginTop: '3%',
        fontWeight: 'bold',
    },
    btn: {
        marginTop: '10%',
        padding: 10,
        borderRadius: 20,
        width: '40%',
    },
    btnText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    }

})