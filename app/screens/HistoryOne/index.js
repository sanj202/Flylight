import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image, Alert, ActivityIndicator, ToastAndroid } from 'react-native';
import moment from 'moment';
import styles from './styles'
import Header from '../../component/header/index'
import { historyAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/core"

export default function HistoryOne({ navigation, route }) {

    const [Data, setData] = useState('')
    const [User, setUser] = useState('')
    const [IsLodding, setIsLodding] = useState(true)

    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const UserData = useSelector(state => state.auth.data)
    const loginData = useSelector(state => state.auth.data)
    const DetailData = useSelector(state => state.history.detailHistory)

    useEffect(() => {
        setIsLodding(true)
        if (loginData  && isFocused) {
                let data = {
                    uid: loginData.data.uid,
                    org_uid: loginData.data.org_uid,
                    profile_id: loginData.data.cProfile.toString(),
                    pageSize: '40',
                    pageNumber: '0',
                    lead_id: route.params ? route.params.id : '',
                    filters: []
                }
                dispatch(historyAction.HistoryDetail(data, loginData.data.token));
        }
    }, [loginData ,isFocused])

    useEffect(() => {
        if (DetailData) {
            if (DetailData.status == "success") {
                setData(DetailData.data)
                setUser(DetailData.data[0].lead)
                setIsLodding(false)
                dispatch(historyAction.clearResponse())
            }
            else if (DetailData.status == "failed") {
                ToastAndroid.show(DetailData.message, ToastAndroid.SHORT);
                setIsLodding(false)
                dispatch(historyAction.clearResponse())
            }
            else if (DetailData.status == "fail") {
                ToastAndroid.show(DetailData.message, ToastAndroid.SHORT);
                setIsLodding(false)
                dispatch(historyAction.clearResponse())
            }
            else {
            }
        }
    }, [DetailData])


    const DetailView = ({ item }) => {

        // console.log(item)
        return (
            <View style={{
                paddingHorizontal: 10, borderWidth: 1, borderRadius: 10,
                borderColor: '#DBDBDB', margin: '3%', marginTop: '0%'
            }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    paddingTop: '3%'
                }}>
                    <View>
                        <Text style={{
                            fontWeight: 'bold', fontSize: 18,
                            color: '#0F0F0F', fontFamily: 'Roboto'
                        }}>{moment(item.created_at).format("HH:mm A")}</Text>

                        <Text style={{
                            color: '#0F0F0F', paddingBottom: '2%',
                            fontSize: 12, fontFamily: 'Roboto'
                        }}>Call On - {moment(item.created_at).format("YYYY-MM-DD")}</Text>
                    </View>
                    <View>
                        {item.feedbackStatus ?
                            <Text style={{
                                color: '#fff', backgroundColor: '#F69708',
                                paddingLeft: 15, paddingRight: 15,
                                padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 10,
                                marginTop: '20%'
                            }}>{item.feedbackStatus.status ? item.feedbackStatus.status : ''}</Text>
                            :
                            null}
                    </View>
                </View>
            </View>
        )
    }



    return (
        <View style={styles.container}>
            <Header
                style={Platform.OS == 'ios' ?
                    { height: "20%" } :
                    // { height: "16%" }}
                    {}}
                title='History'
                renderLeft={() => {
                    return (
                        <Image
                            // style={styles.image2}
                            source={require('../../images/home.png')}
                            style={{ width: 28, height: 28 }} />
                    );
                }}
                onPressLeft={() => {
                    navigation.navigate('History')
                    // navigation.goBack()
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
                    navigation.navigate('Notification')
                }}
            />
            {IsLodding == true ?
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                :
                <View>
                    <View style={{ marginTop: '2.5%' }}>
                        <TouchableOpacity
                        // onPress={() => navigation.navigate('History_Feedback')}
                        >
                            <View style={styles.listData}>
                                <Image
                                    style={{ height: 53, width: 53, margin: '2%' }}
                                    source={require('../../images/profileCall.png')}
                                />
                                <View style={{ marginHorizontal: '2%', width: '50%' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 19, fontFamily: 'Roboto', marginTop: '5%', color: '#0F0F0F' }}>{User.first_name} {User.last_name}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={{ height: 12, width: 12, marginRight: '3%', marginTop: '8%' }}
                                            source={require('../../images/material-call.png')}
                                        />
                                        <Text style={{ fontWeight: 'bold', marginTop: '5%', fontSize: 12, color: '#0F0F0F' }}>+91 {User.phone}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <Text style={{ color: '#565656', fontFamily: 'Roboto', fontSize: 12, marginRight: '2%', marginTop: '35%' }}>{User.company}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        style={{ height: '65%' }}
                        data={Data}
                        renderItem={DetailView}
                    />
                </View>
            }
            {/* :
            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>
         } */}
        </View >
    );
}


