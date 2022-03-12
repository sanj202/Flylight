import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, Pressable, ToastAndroid, Image, ActivityIndicator, Alert, Dimensions } from 'react-native';
import moment from 'moment';
import Header from '../../component/header/index'
import { meetingAction, leadmanagerAction, contactListAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"
import { add_Edit_Meeting } from '../../redux/Actions/meetingAction';
import SelectMultiple from 'react-native-select-multiple'
import { Dropdown } from 'react-native-element-dropdown';

export default function lead_manager({ navigation, route }) {

    const data = [
        { label: 'Lead', value: 'Lead', },
        { label: 'Contact', value: 'Contact' },
        { label: 'Account', value: 'Account' },
    ];

    const [state, setstate] = useState({
        allMeetings: '',
        modalVisible2: false,
        IsLodding: false,
        modelLodding: false,
        selectedFruits: [],
        ListValues: ''
        // TaskFor: null,
        // IsFocus2: false
    })
    const [TaskFor, setTaskFor] = useState(null)
    const [IsFocus2, setIsFocus2] = useState(false)
    const fruits = ['Apples', 'Oranges', 'Pears']
    const { width, height } = Dimensions.get('window');

    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)
    const GetMeetings = useSelector(state => state.meeting.meetings)

    const Lead_OpportunityList = useSelector(state => state.leadmanager.GetList)
    const contactData = useSelector(state => state.contactList.contacts)

    useEffect(() => {
        if (loginData || registerData && isFocused) {
            Get_Data()
        }
    }, [loginData, registerData, isFocused])

    const Get_Data = () => {
        if (loginData.status == "success") {
            setstate({
                ...state,
                IsLodding: true
            })
            const data = {
                uid: loginData.data.uid,
                profile_id: loginData.data.cProfile.toString(),
                org_uid: loginData.data.org_uid,
            }
            dispatch(meetingAction.MeetingList(data, loginData.data.token));
        }
        else if (registerData.status == "success") {
            setstate({
                ...state,
                IsLodding: true
            })
            const data = {
                uid: registerData.data.uid,
                profile_id: registerData.data.cProfile.toString(),
                org_uid: registerData.data.org_uid,
            }
            dispatch(meetingAction.MeetingList(data, registerData.data.token))
        }
    }

    useEffect(() => {
        if (GetMeetings) {
            if (GetMeetings.status == "200") {
                setstate({ ...state, allMeetings: GetMeetings.data })
            }
            else if (GetMeetings.status == "failed") {
            }
            else if (GetMeetings.status == "fail") {
                ToastAndroid.show(GetMeetings.message, ToastAndroid.SHORT);     
            }
            else {
            }
            setstate({
                ...state,
                IsLodding: false
            })
        }
        else {
        }
    }, [GetMeetings])

    const selectOneFile = (value) => {
        console.log('............................', value)
        if (loginData.status == "success") {
            const data = {
                uid: loginData.data.uid,
                profile_id: loginData.data.cProfile.toString(),
                org_uid: loginData.data.org_uid,
            }
            if (value == 'Lead') {
                setstate({
                    ...state,
                    ListValues: '',
                    modelLodding: true
                })
                dispatch(leadmanagerAction.lead_OpprtunityList(data, loginData.data.token));
            }
            else if (value == 'Contact') {
                setstate({
                    ...state,
                    ListValues: '',
                    modelLodding: true
                })
                dispatch(contactListAction.contactList(data, loginData.data.token));
            }
            else {
                console.log('account APi.................................. ')
            }
        }
        else if (registerData.status == "success") {
            const data = {
                uid: registerData.data.uid,
                profile_id: registerData.data.cProfile.toString(),
                org_uid: registerData.data.org_uid,
            }
            if (value == 'Lead') {
                setstate({
                    ...state,
                    ListValues: '',
                    modelLodding: true
                })
                dispatch(leadmanagerAction.lead_OpprtunityList(data, registerData.data.token));
            }
            else if (value == 'Contact') {
                setstate({
                    ...state,
                    ListValues: '',
                    modelLodding: true
                })
                dispatch(contactListAction.contactList(data, registerData.data.token));
            }
            else {
                console.log('account APi.................................. ')
            }
        }
    }

    useEffect(() => {
        if (contactData) {
            if (contactData.status == "200") {
                console.log('contact list ...............', contactData.data)
                let usetdetail = contactData.data && contactData.data.map((ld) => {
                    let user = { label: ld.email, value: ld.id }
                    if (user !== undefined) {
                    }
                    return user;
                })
                setstate({ ...state, ListValues: usetdetail, modelLodding: false })
            }
            else if (contactData.status == "failed") {
                setstate({ ...state, modelLodding: false })
            }
            else {
                setstate({ ...state, modelLodding: false })
            }
        }
        else {

        }
    }, [contactData])

    useEffect(() => {
        if (Lead_OpportunityList) {
            if (Lead_OpportunityList.status == "200") {
                let usetdetail = Lead_OpportunityList.data && Lead_OpportunityList.data.lead.map((ld) => {
                    let user = { label: ld.email, value: ld.id }
                    if (user !== undefined) {
                    }
                    return user;
                })
                setstate({ ...state, ListValues: usetdetail, modelLodding: false })
            }
            else if (Lead_OpportunityList.status == "failed") {
                setstate({ ...state, modelLodding: false })
            }
            else {
                setstate({ ...state, modelLodding: false })
            }
        }
        else {
        }
    }, [Lead_OpportunityList])


    const renderLabel = (label, style) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginLeft: 10 }}>
                    <Text style={style}>{label}</Text>
                </View>
            </View>
        )
    }

    const addParticipents = () => {
        setstate({
            ...state,
            modalVisible2: true,
            selectedFruits: '',
            ListValues: '',
        })
    }

    onSelectionsChange = (selectedFruits) => {
        setstate({
            ...state,
            selectedFruits: selectedFruits
        })
    }


    const cancelAddParticipents = (value) => {
        setstate({
            ...state,
            modalVisible2: false,
            selectedFruits: '',
            ListValues: '',
            modelLodding: false,
        })
        setTaskFor(null);
        setIsFocus2(false);
    }

    const EditMeeting = (value) => {
        // console.log('value of editdat............',value)
        navigation.navigate('EditMeetings', { item: value })
    }

    const participentsListView = ({ item }) => {
        return (
            <TouchableOpacity
            // onPress={() => Details(item)}
            >
                <View style={styles.listData}>
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
                title='Meeting Details'
                onPressRight={() => { navigation.navigate('Notification') }}
            />

            <View style={{ marginTop: '3%' }}>
                {state.IsLodding == true ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                    :
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '5%' }}>
                            <Text style={{ fontWeight: 'bold' }}>Meeting Details</Text>
                            <Pressable
                                onPress={() => EditMeeting (route.params.item)}
                                style={{
                                    borderColor: '#fff',
                                    borderWidth: 0.5,
                                    paddingHorizontal: 10,
                                    paddingVertical: 2,
                                    marginBottom: '2%',
                                    backgroundColor: '#2296E4',
                                    borderRadius: 15
                                }}
                            >
                                <Text style={{ color: "#fff", fontSize: 13 }}>
                                    Edit
                                </Text>
                            </Pressable>
                        </View>

                        <View style={{
                            marginHorizontal: '5%', marginVertical: '2%',
                            borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 5
                        }}>
                            <View style={{ flexDirection: 'row', }}>
                                <View>

                                    <Text >Title </Text>
                                    <Text>Host Name </Text>
                                    <Text>from date </Text>
                                    <Text>to date </Text>
                                </View>
                                <View style={{ marginLeft: '2%', width: '65%', }}>

                                    <Text style={{ fontWeight: 'bold' }}>:   {route.params.item ? route.params.item.title : ''}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>:   Host Name </Text>
                                    <Text style={{ fontWeight: 'bold' }}>:   {moment(route.params.item ? route.params.item.from : '').format("YYYY-MM-DD ,HH:mm:ss A")}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>:   {moment(route.params.item ? route.params.item.to : '').format("YYYY-MM-DD ,HH:mm:ss A")}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '5%' }}>
                            <Text style={{ fontWeight: 'bold' }}>Participants </Text>
                            {/* <Pressable
                                onPress={() => addParticipents()}
                                style={{
                                    borderColor: '#fff',
                                    borderWidth: 0.5,
                                    paddingHorizontal: 10,
                                    paddingVertical: 2,
                                    marginBottom: '2%',
                                    backgroundColor: '#2296E4',
                                    borderRadius: 15
                                }}
                            >
                                <Text style={{ color: "#fff", fontSize: 13 }}>
                                    +Add
                                </Text>
                            </Pressable> */}
                        </View>
                        <View style={{ marginHorizontal: '5%', borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 5 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <View>
                                    <Text> Name </Text>
                                    <Text> Email </Text>
                                    <Text> Phone </Text>
                                    <Text> Action </Text>
                                </View>
                                <View style={{ marginLeft: '5%', width: '65%', }}>
                                    <Text>Participents Name </Text>
                                    <Text>Participents Email </Text>
                                    <Text>Participents Phone </Text>
                                    <Text>Participents Action </Text>
                                </View>
                            </View>
                        </View>
                        {/* {allMeetings !== undefined && allMeetings.length > 0 ?
                            <FlatList
                                style={{ height: '85%' }}
                                data={allMeetings}
                                renderItem={participentsListView}
                            />
                            :
                            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>} */}
                    </View>
                }
            </View>
            <Modal animationType="slide" transparent={true}
                visible={state.modalVisible2}
                onRequestClose={() => cancelAddParticipents()}>
                <View style={styles.askModel}>

                    <Text style={styles.askTitle}>Select Participants</Text>

                    <Pressable
                        style={styles.askTitleR}
                        onPress={() => cancelAddParticipents()}
                    >
                        <Image
                            style={{ height: 14, width: 14, }}
                            source={require('../../images/cross.png')}
                        />
                    </Pressable>

                    <View style={{ marginTop: '5%' }}>
                        {/* {renderLabel()} */}
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={data}
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder='Task For'
                            value={TaskFor}
                            onFocus={() => setIsFocus2(true)}
                            onBlur={() => setIsFocus2(false)}
                            // onChange={item => {
                            //     setTaskFor(item.value);
                            //     setIsFocus2(false);
                            // }}
                            onChange={item => {
                                selectOneFile(item.value)
                                setTaskFor(item.value);
                                setIsFocus2(false);
                            }}
                            renderLeftIcon={() => (
                                <View>
                                    <Image
                                        style={[styles.icon, { height: 22, width: 22 }]}
                                        source={require('../../images/transgender.png')}
                                    />
                                </View>
                            )}
                        />
                    </View>

                    {
                        state.modelLodding == true ?
                            <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: '40%' }} />
                            :
                            <View></View>}

                    {state.ListValues !== undefined && state.ListValues.length > 0 ?
                        <View>
                            <SelectMultiple
                                style={{ height: '60%', marginTop: '5%' }}
                                items={state.ListValues}
                                renderLabel={renderLabel}
                                selectedItems={state.selectedFruits}
                                onSelectionsChange={onSelectionsChange} />

                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: '3%' }}>
                                <Pressable
                                    style={[styles.askBtn, { paddingHorizontal: '5%' }]}
                                    onPress={() => cancelAddParticipents()}
                                >
                                    <Text style={styles.askBtnText}>Cancel</Text>
                                </Pressable>
                                <View style={{ margin: '5%' }} />
                                <Pressable
                                    style={[styles.askBtn, { paddingHorizontal: '6.5%' }]}
                                // onPress={() => invite_Members()}
                                >
                                    <Text style={styles.askBtnText}>Send</Text>
                                </Pressable>
                            </View>
                        </View>
                        :
                        <View>
                            <Text
                                style={
                                    state.modelLodding == true ?
                                        { textAlign: 'center', color: '#fff' }
                                        :
                                        { marginVertical: '50%', textAlign: 'center' }}>Data Not Available</Text>
                        </View>
                    }
                </View>
            </Modal >
        </View>
    )
}
