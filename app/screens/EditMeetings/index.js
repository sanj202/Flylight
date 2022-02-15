import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator, Text, View, TouchableOpacity, TextInput, FlatList, Image, ScrollView, Modal, Alert, Dimensions, Platform
} from 'react-native';
import styles from './styles';
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../../component/header';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { leadmanagerAction, leadAction, contactListAction, taskmanagerAction, meetingAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/core"

export default function AddContact({ navigation, route }) {

    // console.log('sdfbsd.....................', route.params)
    const [modalVisible2, setModalVisible2] = useState(false);
    const [ListValues, setListValues] = useState(true)
    const [HostList, setHostList] = useState([])
    const [Host, setHost] = useState(null)
    const [isFocus3, setIsFocus3] = useState(false);
    const [title, settitle] = useState(route.params.item ? route.params.item.title : "")
    const [releetedToId, setreleetedToId] = useState(route.params.item ? route.params.item.related_to_id : '')
    const [Attatchment, setAttatchment] = useState(route.params.item ? route.params.item.link : '');
    const [releetedTo, setreleetedTo] = useState(route.params.item ? route.params.item.related_to : '')
    const [location, setlocation] = useState(route.params.item ? route.params.item.location : '')
    const [meetingFor, setmeetingFor] = useState(route.params.item ? route.params.item.meeting_for : null)
    const [isFocus2, setIsFocus2] = useState(false);
    const [Description, setDescription] = useState(route.params.item ? route.params.item.description : "")
    const { width, height } = Dimensions.get('window');
    const [IsLodding, setIsLodding] = useState(false);

    const [startdate, setstartDate] = useState(route.params.item ? new Date(route.params.item.from) : new Date(1598051730000));
    const [startmode, setstartMode] = useState('date');
    const [startshow, setstartShow] = useState(false);
    const [starttext, setstarttext] = useState(route.params.item.from ? false : true)

    const onChangeStartDate = (event, selectedDate) => {
        const currentDate = selectedDate || startdate;
        setstartShow(Platform.OS === 'ios');
        setstartDate(currentDate)
    };
    const setMode = (currentMode) => {
        setstartShow(!startshow);
        setstartMode(currentMode);
    };
    const showDatepicker = () => {
        setstarttext(false)
        setMode('date');
    };

    const [time, setTime] = useState(route.params.item ? new Date(route.params.item.from) : new Date(1598051730000))
    const [Timemode, setTimeMode] = useState('date');
    const [show, setShow] = useState(false);
    // const [starttext, setstarttext] = useState(true)

    const onChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShow(Platform.OS === 'ios');
        setTime(currentTime);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setTimeMode(currentMode);
    };

    const showDatepicker1 = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        setstarttext(false)
        showMode('time');
    };

    const [enddate, setendDate] = useState(route.params.item ? new Date(route.params.item.to) : new Date(1598051730000));
    const [endmode, setendMode] = useState('date');
    const [endshow, setendShow] = useState(false);
    const [endtext, setendtext] = useState(route.params.item.to ? false : true)

    const onChangeendDate = (event, selectedDate) => {
        const currentDate = selectedDate || enddate;
        setendShow(Platform.OS === 'ios');
        setendDate(currentDate)
    };
    const setEMode = (currentMode) => {
        setendShow(!endshow);
        setendMode(currentMode);
    };
    const showEDatepicker = () => {
        setendtext(false)
        setEMode('date');
    };

    const [endtime, setendtime] = useState(route.params.item ? new Date(route.params.item.to) : new Date(1598051730000));
    const [endtimemode, setendtimeMode] = useState('date');
    const [endtimeshow, setendtimeShow] = useState(false);


    const endtimeonChange = (event, selectedEndTime) => {
        const currentETime = selectedEndTime || endtime;
        setendtimeShow(Platform.OS === 'ios');
        setendtime(currentETime);
    };

    const EndshowMode = (currentMode) => {
        setendtimeShow(true);
        setendtimeMode(currentMode);
    };

    const showDatepicker2 = () => {
        EndshowMode('date');
    };

    const showEndTimepicker = () => {
        setendtext(false)
        EndshowMode('time');
    };

    const data = [
        { label: 'Lead', value: 'Lead', },
        { label: 'Contact', value: 'Contact' },
        { label: 'Account', value: 'Account' },
    ];

    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)
    const leadOwner = useSelector(state => state.leads.leadOwner)
    const responseAdd_Edit = useSelector(state => state.meeting.newMeeting)

    const Lead_OpportunityList = useSelector(state => state.leadmanager.GetList)
    const contactData = useSelector(state => state.contactList.contacts)

    useEffect(() => {
        if (loginData || registerData && isFocused) {
            if (loginData.status == "success") {
                const data = {
                    uid: loginData.data.uid,
                    org_uid: loginData.data.org_uid,
                    profile_id: loginData.data.cProfile.toString(),
                }
                dispatch(leadAction.LeadOwnerList(data, loginData.data.token));
            }
            else if (registerData.status == "success") {
                const data = {
                    profile_id: registerData.data.cProfile.toString(),
                    org_uid: registerData.data.org_uid,
                    uid: registerData.data.uid
                }
                dispatch(leadAction.LeadOwnerList(data, registerData.data.token));
            }
        }
    }, [loginData, registerData, isFocused])

    useEffect(() => {
        if (leadOwner) {
            if (leadOwner.status == "200") {
                let userData = leadOwner.data && leadOwner.data.map((ld) => {
                    let user = { label: ld.user.name, value: ld.user.id }
                    if (user !== undefined) {
                        setHostList([user])
                    }
                    return user;
                })
            }
            else if (leadOwner.status == "failed") {
            }
            else if (leadOwner.status == "fail") {
            }
        }
        else {
        }
    }, [leadOwner])

    useEffect(() => {
        if (responseAdd_Edit) {
            if (responseAdd_Edit.status == "success") {
                // setlocation(''),
                //     setmeetingFor(null),
                //     setreleetedTo(''),
                //     setreleetedToId(''),
                //     setDescription(''),
                //     settitle(''),
                //     setAttatchment(''),
                Alert.alert(responseAdd_Edit.message)
                navigation.navigate('Meetings')
                dispatch(taskmanagerAction.clearResponse())
            }
            else if (responseAdd_Edit.status == "failed") {
            }
            else if (responseAdd_Edit.status == "fail") {
                Alert.alert(responseAdd_Edit.message)
                dispatch(taskmanagerAction.clearResponse())
            }
            setIsLodding(false)
        }
        else {
        }
    }, [responseAdd_Edit])

    useEffect(() => {
        if (contactData) {
            if (contactData.status == "200") {
                console.log('contact list ...............', contactData.data)
                setListValues(contactData.data)
                setModalVisible2(true)
            }
            else if (contactData.status == "failed") {
                setIsLodding(false)
            }
            else {
                setIsLodding(false)
            }
        }
        else {

        }
    }, [contactData])

    useEffect(() => {
        if (Lead_OpportunityList) {
            if (Lead_OpportunityList.status == "200") {
                setListValues(Lead_OpportunityList.data.lead)
                setModalVisible2(true)
            }
            else if (Lead_OpportunityList.status == "failed") {
                setIsLodding(false)
            }
            else {
                setIsLodding(false)
            }
        }
        else {
        }
    }, [Lead_OpportunityList])


    const selectOneFile = (value) => {
        if (loginData.status == "success") {
            const data = {
                uid: loginData.data.uid,
                profile_id: loginData.data.cProfile.toString(),
                org_uid: loginData.data.org_uid,
            }
            if (value == 'Lead') {
                dispatch(leadmanagerAction.lead_OpprtunityList(data, loginData.data.token));
            }
            else if (value == 'Contact') {
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
                dispatch(leadmanagerAction.lead_OpprtunityList(data, registerData.data.token));
            }
            else if (value == 'Contact') {
                dispatch(contactListAction.contactList(data, registerData.data.token));
            }
            else {
                console.log('account APi.................................. ')
            }
        }
    }

    const AddNewMeeting = () => {

        if (title == "") {
            Alert.alert(" Enter Title ")
        }
        else if (location == "") {
            Alert.alert(" Enter location")
        }
        else if (meetingFor == null) {
            Alert.alert(" select Meeting for")
        }
        else if (startdate > enddate) {
            Alert.alert(" select valid date")
        }
        else if (Attatchment == "") {
            Alert.alert(" Enter Attatchment link")
        }
        else if (releetedTo == "") {
            Alert.alert(" Enter Releted to")
        }
        else if (Description == "") {
            Alert.alert(" Enter Description")
        }
        else {
            let formateStartDate = moment(startdate).format("YYYY-MM-DD")
            let formateEndDate = moment(enddate).format("YYYY-MM-DD")
            let formateStartTime = moment(time).format("HH:mm:ss")
            let formateEndTime = moment(endtime).format("HH:mm:ss")

            if (loginData || registerData) {
                if (loginData.status == "success") {
                    setIsLodding(true)
                    const data = {
                        // uid: loginData.data.uid,
                        meeting_id: route.params.item.id,
                        org_uid: loginData.data.org_uid,
                        profile_id: loginData.data.cProfile,
                        location: location,
                        from: formateStartDate + ' ' + formateStartTime,
                        to: formateEndDate + ' ' + formateEndTime,
                        meeting_for: meetingFor,
                        related_to: releetedTo,
                        related_to_id: releetedToId,
                        description: Description,
                        title: title,
                        link: Attatchment,
                    }
                    dispatch(meetingAction.add_Edit_Meeting(data, loginData.data.token));
                }
                else if (registerData.status == "success") {
                    setIsLodding(true)
                    const data = {
                        // uid: registerData.data.uid,
                        meeting_id: route.params.item.id,
                        org_uid: registerData.data.org_uid,
                        profile_id: registerData.data.cProfile,
                        location: location,
                        from: formateStartDate + ' ' + formateStartTime,
                        to: formateEndDate + ' ' + formateEndTime,
                        meeting_for: meetingFor,
                        related_to: releetedTo,
                        related_to_id: releetedToId,
                        description: Description,
                        title: title,
                        link: Attatchment,
                    }
                    dispatch(meetingAction.add_Edit_Meeting(data, registerData.data.token));
                }
            }
        }
    }

    const RadioSelect = (value) => {
        setreleetedToId(value.id)
        setlocation(value.title)
        setModalVisible2(false)
    }

    const AllView = ({ item }) => {
        return (
            // console.log('value of ...........................', item),
            <ScrollView style={
                releetedToId !== undefined && releetedToId == item.id ?
                    { borderBottomWidth: 1, borderRadius: 10, margin: '1%', paddingHorizontal: '3%', backgroundColor: '#24BCFF' }
                    :
                    { borderBottomWidth: 1, borderRadius: 10, margin: '1%', paddingHorizontal: '3%', }
            }>
                <TouchableOpacity
                    onPress={() => RadioSelect({ id: item.id, title: item.title })}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '20%', marginLeft: '1%' }}>
                            <Text>Name</Text>
                            <Text>Mobile</Text>
                            <Text>email</Text>
                        </View>
                        <View style={{ width: '60%', marginLeft: '1%' }}>
                            <Text>{item.first_name} {item.last_name}</Text>
                            <Text>{item.phone}</Text>
                            <Text>{item.email}</Text>
                        </View>
                        <View>
                            <Image
                                source={require('../../images/white_check.png')}
                                style={{ height: 16, width: 25, marginTop: '40%', marginRight: '5%', }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header
                // style={{ height: "12%" }}
                onPressLeft={() => {
                    // navigation.openDrawer()
                    navigation.goBack()
                }}
                title='Edit Meeting'
                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />
            <ScrollView style={{ width: width, height: height }}>

                <View style={{ margin: '5%' }}>
                    <View style={{ marginTop: '2%' }}>
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={HostList}
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus3 ? ' Host ' : '...'}
                            value={Host}
                            onFocus={() => setIsFocus3(true)}
                            onBlur={() => setIsFocus3(false)}
                            onChange={item => {
                                setHost(item.value);
                                setIsFocus3(false);
                            }}
                            renderLeftIcon={() => (
                                <View>
                                    <Image
                                        style={styles.icon}
                                        source={require('../../images/user.png')}
                                    />
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, {
                                height: 20, width: 18,
                            }]}
                            source={require('../../images/user.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={title}
                            onChangeText={e1 => settitle(e1)}
                            placeholder="Title" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, {
                                height: 20, width: 18,
                            }]}
                            source={require('../../images/user.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={location}
                            onChangeText={e21 => setlocation(e21)}
                            placeholder="location" />
                    </View>



                    <View style={{ marginTop: '2%' }}>
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
                            placeholder={!isFocus2 ? 'Meeting For' : '...'}
                            value={meetingFor}
                            onFocus={() => setIsFocus2(true)}
                            onBlur={() => setIsFocus2(false)}
                            onChange={item => {
                                setmeetingFor(item.value);
                                setIsFocus2(false);
                            }}

                            onChange={item => {
                                selectOneFile(item.value)
                                setmeetingFor(item.value);
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



                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            style={styles.pickerStyle}
                            onPress={showDatepicker} >
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={Platform.OS == 'ios' ?
                                        [styles.icon] :
                                        [styles.icon, { marginTop: '2%' }]}
                                    source={require('../../images/DOB.png')}
                                />
                                {startshow && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        style={{ paddingVertical: '5%', width: '50%' }}
                                        // is24Hour={true}
                                        value={startdate}
                                        mode={startmode}
                                        display="default"
                                        onChange={onChangeStartDate}
                                    />
                                )}
                                {Platform.OS == 'ios' ? <View>
                                    {starttext == true ?
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}>From Date</Text>
                                        :
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}></Text>
                                    }
                                </View>
                                    :
                                    <View>
                                        {starttext == true ?
                                            <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>From Date</Text>
                                            :
                                            <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>{moment(startdate).format('MM/DD/YYYY')}</Text>
                                        }
                                    </View>
                                }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.pickerStyle}
                            onPress={showTimepicker} >
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={Platform.OS == 'ios' ?
                                        [styles.icon] :
                                        [styles.icon, { marginTop: '2%', width: 20 }]}
                                    source={require('../../images/clockIcon.png')}
                                />
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={time}
                                        mode={Timemode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}
                                {/* {startshow && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        style={{ paddingVertical: '5%', width: '50%' }}
                                        // is24Hour={true}
                                        value={startdate}
                                        mode={startmode}
                                        display="default"
                                        onChange={onChangeStartDate}
                                    />
                                )} */}
                                {Platform.OS == 'ios' ? <View>
                                    {starttext == true ?
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}>From Time</Text>
                                        :
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}></Text>
                                    }
                                </View>
                                    :
                                    <View>
                                        {starttext == true ?
                                            <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>From Time</Text>
                                            :
                                            <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>{moment(time).format('h:mm:ss a')}</Text>
                                        }
                                    </View>
                                }
                            </View>
                        </TouchableOpacity>


                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            style={styles.pickerStyle}
                            onPress={showEDatepicker} >
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={Platform.OS == 'ios' ?
                                        [styles.icon] :
                                        [styles.icon, { marginTop: '2%' }]}
                                    source={require('../../images/DOB.png')}
                                />
                                {endshow && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        style={{ paddingVertical: '5%', width: '50%' }}
                                        // is24Hour={true}
                                        value={enddate}
                                        mode={endmode}
                                        display="default"
                                        onChange={onChangeendDate}
                                    />
                                )}
                                {Platform.OS == 'ios' ? <View>
                                    {endtext == true ?
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}>To Date</Text>
                                        :
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}></Text>
                                    }
                                </View>
                                    :
                                    <View>
                                        {endtext == true ?
                                            <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>To Date</Text>
                                            :
                                            <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>{moment(enddate).format('MM/DD/YYYY')}</Text>
                                        }
                                    </View>
                                }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.pickerStyle}
                            onPress={showEndTimepicker} >
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={Platform.OS == 'ios' ?
                                        [styles.icon] :
                                        [styles.icon, { marginTop: '2%', width: 20 }]}
                                    source={require('../../images/clockIcon.png')}
                                />
                                {endtimeshow && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={endtime}
                                        mode={endtimemode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={endtimeonChange}
                                    />
                                )}
                                {/* {endshow && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        style={{ paddingVertical: '5%', width: '50%' }}
                                        // is24Hour={true}
                                        value={enddate}
                                        mode={endmode}
                                        display="default"
                                        onChange={onChangeendDate}
                                    />
                                )} */}
                                {Platform.OS == 'ios' ? <View>
                                    {endtext == true ?
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}>To Time</Text>
                                        :
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}></Text>
                                    }
                                </View>
                                    :
                                    <View>
                                        {endtext == true ?
                                            <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>To Time</Text>
                                            :
                                            <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>{moment(endtime).format('h:mm:ss a')}</Text>
                                        }
                                    </View>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, {
                                height: 20, width: 18,
                            }]}
                            source={require('../../images/user.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={Attatchment}
                            onChangeText={e51 => setAttatchment(e51)}
                            placeholder="Attatchment" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, {
                                height: 20, width: 18,
                            }]}
                            source={require('../../images/user.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={releetedTo}
                            onChangeText={e5 => setreleetedTo(e5)}
                            placeholder="Releeted To" />
                    </View>


                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, {
                                height: 20, width: 18,
                            }]}
                            source={require('../../images/user.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={Description}
                            onChangeText={e5 => setDescription(e5)}
                            placeholder="Description" />
                    </View>

                    {IsLodding == true ?
                        <ActivityIndicator size="small" color="#0000ff" />
                        :
                        <View />}

                    <TouchableOpacity style={styles.button}
                        // onPress={() => setModalVisible2(!modalVisible2)}
                        onPress={() => AddNewMeeting()}
                    >
                        <Text style={[styles.textButton, { fontWeight: 'bold' }]}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>


            <Modal animationType="slide" transparent={true} visible={modalVisible2}
                onRequestClose={() => { setModalVisible2(!modalVisible2); }}>
                <View style={styles.askModel}>

                    <Text style={styles.askTitle}>Select</Text>
                    <TouchableOpacity
                        onPress={() => setModalVisible2(false)}
                    >
                        <Image
                            style={styles.askTitleR}
                            source={require('../../images/cross.png')}
                        />
                    </TouchableOpacity>
                    {ListValues !== undefined && ListValues.length > 0 ?
                        <View>
                            <FlatList
                                data={ListValues}
                                style={{ height: '75%' }}
                                renderItem={AllView}
                            />
                        </View>
                        :
                        <View>
                            <Text style={{ marginVertical: '10%', textAlign: 'center' }}>Data Not Available</Text>
                        </View>
                    }
                </View>
            </Modal >

        </View >
    );
}

