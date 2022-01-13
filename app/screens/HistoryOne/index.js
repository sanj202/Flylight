import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    Image,
    Button,
    ScrollView,
    Modal,
    Alert,
    Pressable,
    StatusBar
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import styles from './styles'
import Header from '../../component/header/index'
import { Picker, } from '@react-native-picker/picker'
import LinearGradient from 'react-native-linear-gradient';


export default function HistoryOne({ navigation }) {

    return (
        <View style={styles.container}>
            {/* ------------------------------------------------------------------ */}
            <StatusBar
                barStyle="dark-content"
                // dark-content, light-content and default
                hidden={false}
                //To hide statusBar
                backgroundColor="#2B6EF2"
                //Background color of statusBar only works for Android
                translucent={false}
                //allowing light, but not detailed shapes
                networkActivityIndicatorVisible={true}
            />

            <Header
                // style={{ height: "16%" }}
                onPressLeft={() => {
                    // navigation.OpenDrawer()
                    navigation.goBack()
                }}
                title='History'
                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />
            
            {/* ------------------------------------------------------------------------- */}
            <View style={{ marginTop: '2.5%' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('History_Feedback')}
                >
                    <View style={styles.listData}>
                        <Image
                            style={{ height: 53, width: 53, margin: '2%' }}
                            source={require('../../images/profileCall.png')}
                        />
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 19, fontFamily: 'Roboto', marginTop: '5%', color: '#0F0F0F' }}>Johne Doe</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={{ height: 12, width: 12, marginRight: '3%', marginTop: '8%' }}
                                    source={require('../../images/material-call.png')}
                                />
                                <Text style={{ fontWeight: 'bold', marginTop: '5%', fontSize: 12, color: '#0F0F0F' }}>+91 1234567890</Text>
                            </View>
                        </View>
                        <Text style={{ color: '#565656', fontFamily: 'Roboto', fontSize: 12, marginRight: '5%', marginTop: '5%' }}>SMT Group</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView>

                <View style={{

                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: '#DBDBDB',
                    margin: '3%',
                    marginTop: '0%'
                }}>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#0F0F0F', fontFamily: 'Roboto' }}>15:24PM</Text>

                            <Text style={{
                                color: '#0F0F0F', paddingBottom: '2%',
                                fontSize: 12, fontFamily: 'Roboto',
                            }}>Call On - Sep 17</Text>
                        </View>
                        <View>
                            <Text style={{
                                color: '#fff', backgroundColor: '#05B829', paddingLeft: 10, paddingRight: 10,
                                padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 10, marginTop: '20%'
                            }}>Closed</Text>
                        </View>


                    </View>
                    <View style={{ borderBottomWidth: 0.5, }}></View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: '3%' }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#0F0F0F', fontFamily: 'Roboto' }}>15:24PM</Text>

                            <Text style={{ color: '#0F0F0F', paddingBottom: '2%', fontSize: 12, fontFamily: 'Roboto' }}>Call On - Sep 17</Text>
                        </View>
                        <View>
                            <Text style={{

                                color: '#fff', backgroundColor: '#608EE9', paddingLeft: 15, paddingRight: 15,
                                padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 10, textAlign: 'right',
                                marginTop: '20%'
                            }}>Hold</Text>
                        </View>


                    </View>
                    <View style={{ borderBottomWidth: 0.5, }}></View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: '3%' }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#0F0F0F', fontFamily: 'Roboto' }}>15:24PM</Text>

                            <Text style={{ color: '#0F0F0F', paddingBottom: '2%', fontSize: 12, fontFamily: 'Roboto' }}>Call On - Sep 17</Text>
                        </View>
                        <View>
                            <Text style={{
                                color: '#fff', backgroundColor: '#F69708',
                                paddingLeft: 15, paddingRight: 15,
                                padding: 1, borderRadius: 15, marginLeft: '2%',
                                fontSize: 10, textAlign: 'right',
                                marginTop: '20%'
                            }}>New</Text>
                        </View>


                    </View>
                    <View style={{ borderBottomWidth: 0.5, }}></View>

                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                        paddingTop: '3%'
                    }}>
                        <View>
                            <Text style={{
                                fontWeight: 'bold', fontSize: 18,
                                color: '#0F0F0F', fontFamily: 'Roboto'
                            }}>15:24PM</Text>

                            <Text style={{
                                color: '#0F0F0F', paddingBottom: '2%',
                                fontSize: 12, fontFamily: 'Roboto'
                            }}>Call On - Sep 17</Text>
                        </View>
                        <View>
                            <Text style={{
                                color: '#fff', backgroundColor: '#FF0000',
                                paddingLeft: 15, paddingRight: 15,
                                padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 10,
                                marginTop: '20%'
                            }}>DND</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View >
    );
}


