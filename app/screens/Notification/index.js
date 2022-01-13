

import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import Header from '../../component/header/index'


export default function notifications({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
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
                //   style={{  height: "14%"}}
                onPressLeft={() => {
                    navigation.goBack()
                }}

                title='Notification'

                onPressRight={() => {
                    // navigation.navigate('Notification')
                    navigation.goBack()
                }}
            />

            <View style={{ margin: '3%' }}>
                <View>
                    <Text style={{ color: '#444444', fontWeight: 'bold', marginBottom: '3%', fontSize: 15 }}>Today</Text>
                    <View style={styles.notify}>

                        <Image
                            style={{ marginTop: '2%', width: 45, height: 45 }}
                            source={require('../../images/alert.png')}
                        />

                        <View style={{ marginLeft: '3%' }}>

                            <View style={{ flexDirection: 'row', }}>

                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0F0F0F', }}>lorem Ipsum doller</Text>
                                <Text style={{ marginLeft: '28%', fontSize: 11, color: '#0F0F0F' }} >14:45PM</Text>
                            </View>
                            <Text style={{ fontSize: 10, color: '#565656', width: '70%' }}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.</Text>
                        </View>
                    </View>
                </View>

                {/* <View style={{marginTop:'2%'}}/> */}

                <View style={{ marginTop: '2%' }} />

                <View style={styles.notify}>

                    <Image
                        style={{ marginTop: '2%', width: 45, height: 45 }}
                        source={require('../../images/alert.png')}
                    />

                    <View style={{ marginLeft: '3%' }}>

                        <View style={{ flexDirection: 'row', }}>

                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0F0F0F', }}>lorem Ipsum doller</Text>
                            <Text style={{ marginLeft: '28%', fontSize: 11, color: '#0F0F0F' }} >14:45PM</Text>
                        </View>
                        <Text style={{ fontSize: 10, color: '#565656', width: '70%' }}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.</Text>
                    </View>
                </View>

                <View>
                    <Text style={{ color: '#444444', fontWeight: 'bold', marginTop: '5%', marginBottom: '3%', fontSize: 15 }}>Yesterday</Text>
                    <View style={styles.notify}>

                        <Image
                            style={{ marginTop: '2%', width: 45, height: 45 }}
                            source={require('../../images/alert.png')}
                        />

                        <View style={{ marginLeft: '3%' }}>

                            <View style={{ flexDirection: 'row', }}>

                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0F0F0F', }}>lorem Ipsum doller</Text>
                                <Text style={{ marginLeft: '28%', fontSize: 11, color: '#0F0F0F' }} >14:45PM</Text>
                            </View>
                            <Text style={{ fontSize: 10, color: '#565656', width: '70%' }}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: '2%' }} />

                    <View style={styles.notify}>

                        <Image
                            style={{ marginTop: '2%', width: 45, height: 45 }}
                            source={require('../../images/alert.png')}
                        />

                        <View style={{ marginLeft: '3%' }}>

                            <View style={{ flexDirection: 'row', }}>

                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0F0F0F', }}>lorem Ipsum doller</Text>
                                <Text style={{ marginLeft: '28%', fontSize: 11, color: '#0F0F0F' }} >14:45PM</Text>
                            </View>
                            <Text style={{ fontSize: 10, color: '#565656', width: '70%' }}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: '2%' }} />

                    <View style={styles.notify}>

                        <Image
                            style={{ marginTop: '2%', width: 45, height: 45 }}
                            source={require('../../images/alert.png')}
                        />

                        <View style={{ marginLeft: '3%' }}>

                            <View style={{ flexDirection: 'row', }}>

                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0F0F0F', }}>lorem Ipsum doller</Text>
                                <Text style={{ marginLeft: '28%', fontSize: 11, color: '#0F0F0F' }} >14:45PM</Text>
                            </View>
                            <Text style={{ fontSize: 10, color: '#565656', width: '70%' }}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

