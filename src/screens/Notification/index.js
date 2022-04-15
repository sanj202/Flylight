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
        if (loginData && isFocused) {
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
        }
    }, [notificationInfo])

    const renderItem = ({ item }) => {
        return (
            <View style={{ marginBottom: '1%' }} >
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
                style={Platform.OS == 'ios' ? { height: "18%" } : {}}
                onPressLeft={() => { navigation.openDrawer() }}
                title='Notifications'
                onPressRight={() => { navigation.goBack() }}
            />
            <View style={{ flex: 1, marginVertical: '2%',marginHorizontal:'3%' }}>
                {IsLodding == true ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                    :
                    <View style={{flex:1}}>
                        <FlatList
                            data={BellData}
                            renderItem={renderItem}
                            ListEmptyComponent={() => (!BellData.length ?
                                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>Data Not Found</Text>
                                : null)}
                            keyExtractor={item => item.id}
                        />
                    </View>}
            </View>
        </View>
    );
}

