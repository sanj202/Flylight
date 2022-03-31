import React, { useState, useEffect, } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, ToastAndroid, Platform, Linking } from 'react-native';
import styles from './styles';
import Header from '../../component/header';
import { useDispatch, useSelector, connect } from 'react-redux';
import { notificationAction } from '../../redux/Actions/index'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { useIsFocused } from "@react-navigation/core"

export default function Notifications({ navigation, route }) {

    const [IsLodding, setIsLodding] = useState(false)
    const [BellData, setBellData] = useState('')
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const UserData = useSelector(state => state.auth.data)
    const notificationInfo = useSelector(state => state.notification.userNotification)
    const loginData = useSelector(state => state.auth.data)

    useEffect(() => {
        setIsLodding(true)
        if (loginData  && isFocused) {
                let data = {
                    uid: loginData.data.uid,
                    org_uid: loginData.data.org_uid,
                    profile_id: loginData.data.cProfile.toString(),
                }
                dispatch(notificationAction.notification(data, loginData.data.token));
        }
    }, [loginData, isFocused])

    useEffect(() => {
        if (notificationInfo) {
            if (notificationInfo.status == "success") {
                setBellData(notificationInfo.data)
                dispatch(notificationAction.clearResponse())
                setIsLodding(false)
            }
            else if (notificationInfo.status == "failed") {
                ToastAndroid.show(notificationInfo.message, ToastAndroid.SHORT);
                setIsLodding(false)
            }
            else {
            }
        }
        else {
        }
    }, [notificationInfo])

    const renderItem = ({ item }) => {
        return (
            <View style={{marginBottom:'1%'}} >
                <TouchableOpacity style={styles.notify} >
                    <Image
                        style={{ width: 45, height: 45 }}
                        source={require('../../images/alert.png')}
                    />
                    <View style={{ width: '70%', marginHorizontal: '1%' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0F0F0F', }}>{item.title}</Text>
                        <Text style={{ fontSize: 10, color: '#565656', }}>{item.description}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 11, color: '#0F0F0F' }} >
                            {moment(item.updated_at).format("HH:MM A")}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header
                style={Platform.OS == 'ios' ?
                    { height: "18%" } :
                    // { height: "16%" }}
                    {}}
                title='Notifications'
                renderLeft={() => {
                    return (
                        <Image
                            // style={styles.image2}
                            source={require('../../images/home.png')}
                            style={{ width: 28, height: 28 }} />
                    );
                }}
                onPressLeft={() => {
                    // navigation.goBack()
                    navigation.OpenDrawer()
                }}

                renderRight={() => {
                    return (
                        <Image
                            // style={styles.image2}
                            source={require('../../images/Notifications.png')}
                            style={{ width: 28, height: 28 }} />
                    );
                }}
                onPressRight={() => {
                    // navigation.navigate('Notification')
                    navigation.goBack()
                }}
            />

            {IsLodding == true ?
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                :
                <View>
                    {BellData.length > 0 ?
                        <View style={{ marginHorizontal: '3%', marginVertical: '1%' }}>
                            <FlatList
                                style={{ marginVertical: '3%' }}
                                data={BellData}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        </View>
                        :
                        <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '40%' }}>No data Found</Text>
                    }

                </View>}
            {/* {
    BellData !==undefined && BellData
} */}
            {/* <View style={{ margin: '3%' }}> */}
            {/* <View>
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
                </View> */}

            {/* <View style={{marginTop:'2%'}}/> */}

            {/* <View style={{ marginTop: '2%' }} />

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
                </View> */}
            {/* </View> */}
        </View>
    );
}

