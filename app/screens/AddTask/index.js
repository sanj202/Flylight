import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList,
    Image, Button, ScrollView, Modal, Alert, Pressable, StatusBar, Dimensions, Platform
} from 'react-native';
import styles from './styles';
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../../component/header';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { leadmanagerAction, leadAction, contactListAction, taskmanagerAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/core"

export default function AddContact({ navigation }) {

    const [modalVisible2, setModalVisible2] = useState(false);
    const [ListValues, setListValues] = useState(true)
    const [TaskOwnerList, setTaskOwnerList] = useState([])
    const [TaskOwner, setTaskOwner] = useState(null)
    const [isFocus3, setIsFocus3] = useState(false);
    const [title, settitle] = useState("")
    const [releetedToId, setreleetedToId] = useState('')
    const [releetedTo, setreleetedTo] = useState('')
    const [Status, setStatus] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [TaskFor, setTaskFor] = useState(null)
    const [isFocus2, setIsFocus2] = useState(false);
    const [Priority, setPriority] = useState(null)
    const [isFocus1, setIsFocus1] = useState(false);
    const [Description, setDescription] = useState("")
    const { width, height } = Dimensions.get('window');
    const [IsLodding, setIsLodding] = useState(false);
    const [startdate, setstartDate] = useState(new Date());
    const [startmode, setstartMode] = useState('date');
    const [startshow, setstartShow] = useState(false);
    const [starttext, setstarttext] = useState(true)

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

    const data = [
        { label: 'Not Started', value: 'Not Started', },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Completed', value: 'Completed' },
    ];

    const data1 = [
        { label: 'High', value: 'Not Started', },
        { label: 'Highest', value: 'In Progress' },
        { label: 'Low', value: 'Low' },
        { label: 'Lowest', value: 'Lowest' },
    ];

    const data2 = [
        { label: 'Lead', value: 'Lead', },
        { label: 'Contact', value: 'Contact' },
        { label: 'Account', value: 'Account' },
    ];



    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)
    const leadOwner = useSelector(state => state.leads.leadOwner)
    const responseAdd_Edit = useSelector(state => state.taskmanager.addTask)

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
                        setTaskOwnerList([user])
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
            // console.log('one<><><><>>>>>>>>>>>>>>>>>',responseAdd_Edit)
            if (responseAdd_Edit.status == "success") {
                Alert.alert(responseAdd_Edit.message)
                navigation.navigate('Task_Manager')
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
                dispatch(contactListAction.clearResponse())
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
                // console.log("leadlist..............", Lead_OpportunityList.data.lead)
                setListValues(Lead_OpportunityList.data.lead)
                setModalVisible2(true)
                dispatch(leadmanagerAction.clearResponse())
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

    const AddNewCampaign = () => {
        if (title == "") {
            Alert.alert(" Enter Title ")
        }
        else if (releetedTo == "") {
            Alert.alert(" Enter Related To")
        }
        else if (Status == null) {
            Alert.alert(" Select Status")
        }
        else if (Priority == null) {
            Alert.alert(" Select Priority")
        }
        else {
            let formateStartDate = moment(startdate).format("YYYY-MM-DD")

            if (loginData || registerData) {
                if (loginData.status == "success") {
                    setIsLodding(true)
                    const data = {
                        uid: loginData.data.uid,
                        org_uid: loginData.data.org_uid,
                        profile_id: loginData.data.cProfile,
                        created_by: loginData.data.cProfile,
                        modified_by: loginData.data.cProfile,
                        title: title,
                        task_for: TaskFor,                               //drop lead,account
                        task_related_to: releetedTo,                      // leead ya contact ka title
                        task_related_to_id: releetedToId,                 // lead ya contact ki Id
                        status: Status,
                        priority: Priority,
                        description: Description,
                        due_date: formateStartDate,
                    }
                    dispatch(taskmanagerAction.Add_EditTask(data, loginData.data.token));
                }
                else if (registerData.status == "success") {
                    setIsLodding(true)
                    const data = {
                        uid: registerData.data.uid,
                        org_uid: registerData.data.org_uid,
                        profile_id: registerData.data.cProfile,
                        created_by: registerData.data.cProfile,
                        modified_by: registerData.data.cProfile,
                        title: title,
                        task_for: TaskFor,
                        task_related_to: releetedTo,
                        task_related_to_id: releetedToId,
                        status: Status,
                        priority: Priority,
                        description: Description,
                        due_date: formateStartDate,
                    }
                    dispatch(taskmanagerAction.Add_EditTask(data, registerData.data.token));
                }
            }
        }
    }

    const RadioSelect = (value) => {
        // console.log('.....................', value)
        setreleetedToId(value.id)
        setreleetedTo(value.title)
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
                title='Add Task'
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
                            data={TaskOwnerList}
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus3 ? ' Task Owner' : '...'}
                            value={TaskOwner}
                            onFocus={() => setIsFocus3(true)}
                            onBlur={() => setIsFocus3(false)}
                            onChange={item => {
                                setTaskOwner(item.value);
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

                    <View style={{ marginTop: '2%' }}>
                        {/* {renderLabel()} */}

                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={data2}
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus2 ? 'Task For' : '...'}
                            value={TaskFor}
                            onFocus={() => setIsFocus2(true)}
                            onBlur={() => setIsFocus2(false)}
                            onChange={item => {
                                setTaskFor(item.value);
                                setIsFocus2(false);
                            }}

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
                            onChangeText={e2 => setreleetedTo(e2)}
                            placeholder="Related To" />
                    </View>

                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: '#C3C7E5',
                            borderRadius: 10,
                            // marginHorizontal: '3%',
                            paddingVertical: 5,
                            marginTop: '2%'
                        }}
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
                                    <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}>Due Date</Text>
                                    :
                                    <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}></Text>
                                }
                            </View>
                                :
                                <View>
                                    {starttext == true ?
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>Due Date</Text>
                                        :
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>{moment(startdate).format('MM/DD/YYYY')}</Text>
                                    }
                                </View>
                            }
                        </View>
                    </TouchableOpacity>

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
                            placeholder={!isFocus ? 'Status' : '...'}
                            value={Status}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setStatus(item.value);
                                setIsFocus(false);
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

                    <View style={{ marginTop: '2%' }}>
                        {/* {renderLabel()} */}

                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={data1}
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus1 ? 'Priority' : '...'}
                            value={Priority}
                            onFocus={() => setIsFocus1(true)}
                            onBlur={() => setIsFocus1(false)}
                            onChange={item => {
                                setPriority(item.value);
                                setIsFocus1(false);
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
                        onPress={() => AddNewCampaign()}
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

