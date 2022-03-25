import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image, ActivityIndicator, ToastAndroid, Dimensions } from 'react-native';
import moment from 'moment';
import Header from '../../component/header/index'
import { meetingAction, taskmanagerAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"
import { add_Edit_Meeting } from '../../redux/Actions/meetingAction';

import { useNavigation } from '@react-navigation/native';



export default function Meetings() {

    const data = [
        { label: 'Not Started', value: 'Not Started', },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Completed', value: 'Completed' },
    ];
    const navigation = useNavigation();
    const [allMeetings, setallMeetings] = useState()
    const [IsLodding, setIsLodding] = useState(false)
    const { width, height } = Dimensions.get('window');

    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const GetMeetings = useSelector(state => state.meeting.meetings)

    useEffect(() => {
        if (loginData  && isFocused) {
            Get_Data()
        }
    }, [loginData, isFocused])

    const Get_Data = () => {
            setIsLodding(true)
            const data = {
                uid: loginData.data.uid,
                profile_id: loginData.data.cProfile.toString(),
                org_uid: loginData.data.org_uid,
            }
            dispatch(meetingAction.MeetingList(data, loginData.data.token));
    }

    useEffect(() => {
        if (GetMeetings) {
            if (GetMeetings.status == "200") {
                setallMeetings(GetMeetings.data)
            }
            else if (GetMeetings.status == "failed") {
            }
            else if (GetMeetings.status == "fail") {
                ToastAndroid.show(GetMeetings.message, ToastAndroid.SHORT);
            }
            else {
            }
            setIsLodding(false)
        }
        else {
        }
    }, [GetMeetings])

    const EditMeeting = (value) => {
        // console.log('value of editdat............',value)
        navigation.navigate('EditMeetings', { item: value })
    }

    const MeetingDetails = (value) => {
        // console.log('value of editdat............',value)
        navigation.navigate('MeetingsDetail', { item: value })
    }



    const meetingListView = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => MeetingDetails(item)}
            >
                {/* <View style={styles.listData}>
                    <View>
                        <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Title   </Text>
                        <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Start Date </Text>
                        <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>End date</Text>
                        <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Releted</Text>
                    </View>
                    <View style={{ marginLeft: '2%', width: '67%' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.title}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>
                            {moment(item.from).format("YYYY-MM-DD HH:mm:ss A")}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>
                            {moment(item.to).format("YYYY-MM-DD HH:mm:ss A")}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.related_to}</Text>
                    </View>

                    <View >
                        <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                onPress={() => EditMeeting(item)}
                            >
                                <Image style={{ height: 22, width: 22, marginVertical: '3%' }}
                                    source={require('../../images/editCall.png')} />
                            </TouchableOpacity>
                            <Text style={{ marginVertical: '3%' }}></Text>
                            <TouchableOpacity
                            // onPress={() => navigation.navigate('EditMeetings', {  campData: item})}
                            >
                                <Image style={{ height: 22, width: 22, marginVertical: '3%' }}
                                    source={require('../../images/deleteCall.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> */}
                <View style={styles.listData}>
                    <Image style={{ height: 25, width: 22, marginVertical: '3%', marginHorizontal: '3%' }}
                        source={require('../../images/DOB.png')} />
                    <View style={{ width: '75%', marginLeft: '3%' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#30353d', fontFamily: 'Roboto' }}>
                            {item.title}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#0F0F0F', fontFamily: 'Roboto' }}>
                            {moment(item.from).format('lll')}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#0F0F0F', fontFamily: 'Roboto' }}>
                            {moment(item.to).format('lll')}</Text>

                    </View>
                    <Image
                        style={{ height: 16, width: 10, marginVertical: '5%', alignSelf: 'flex-end' }}
                        source={require('../../images/next.png')}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Header
                style={{ height: "14%" }}
                onPressLeft={() => {
                    //   navigation.openDrawer()
                    navigation.goBack()
                }}
                title='Meeting'
                onPressRight={() => { navigation.navigate('Notification') }}
            />

            <View style={{ marginTop: '3%' }}>
                {IsLodding == true ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                    :
                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddMeetings')}
                            style={{
                                borderColor: '#fff',
                                borderWidth: 1,
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                                alignSelf: 'flex-end',
                                marginHorizontal: '5%',
                                backgroundColor: '#2296E4',
                                borderRadius: 15
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 13 }}>
                                +Add
                            </Text>
                        </TouchableOpacity>
                        {allMeetings !== undefined && allMeetings.length > 0 ?
                            <FlatList
                                style={{ height: '85%' }}
                                data={allMeetings}
                                renderItem={meetingListView}
                            />
                            :
                            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>}
                    </View>
                }
            </View>
        </View>
    )
}
