

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';


export default function AddContactAsking({ navigation }) {
    return (
      
        <Card style={[styles.headerView,]}>
            <View style={styles.headerView2}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        style={{ margin: '5%', marginTop: '3%', alignSelf: 'flex-end', height: 14, width: 14 }}
                        source={require('../../images/crossImgR.png')}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>
                Do You Want To {'\n'} Add Contacts?
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("AddContactPopUp")}
                    style={[styles.btn, { backgroundColor: '#4581F8' }]}
                >
                    <Text
                        style={styles.btnText}
                    >
                        OK
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.btn, { backgroundColor: '#B8B8B8' }]}
                >
                    <Text
                        style={styles.btnText}
                    >
                        SKIP
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
        height: '35%',
        borderRadius: 10
    },
    headerView2: {
        paddingTop: '3%'
    },
    title: {
        textAlign: 'center',
        fontSize: 21,
        fontWeight: 'bold',
        color:'#000000'
    },
    btn: {
        marginTop: '10%',
        padding: 10,
        // paddingTop:15,
        // paddingBottom:15,
        borderRadius: 20,
        width: '40%',
    },
    btnText: {
        fontSize: 20,
        color: '#fff',
        fontFamily:'Roboto',
        fontWeight: 'bold',
        textAlign: 'center',
    }

})