import React, { useState, useEffect } from 'react';
import {ActivityIndicator, Text, View, TouchableOpacity, TextInput, FlatList,Image, ScrollView, Modal, Dimensions,
    Platform, ToastAndroid} from 'react-native';
import styles from './styles';
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../../component/header';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { leadmanagerAction, contactListAction, taskmanagerAction } from '../../redux/Actions/index'
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from "@react-navigation/core"

export default function AddContact({ navigation }) {

    const [modalVisible2, setModalVisible2] = useState(false);
    const [ListValues, setListValues] = useState([])
    const [TaskOwnerList, setTaskOwnerList] = useState([])
    const [TaskOwner, setTaskOwner] = useState(null)
    const [title, settitle] = useState("")
    const [releetedToId, setreleetedToId] = useState('')
    const [releetedTo, setreleetedTo] = useState('')
    const [releetedToFname, setreleetedToFname] = useState('Contact')
    const [releetedToLname, setreleetedToLname] = useState('Person')
    const [StatusList, setStatusList] = useState([]);
    const [Status, setStatus] = useState(null);
    const [TaskForList, setTaskForList] = useState([])
    const [TaskFor, setTaskFor] = useState(null)
    const [PriorityList, setPriorityList] = useState([])
    const [Priority, setPriority] = useState(null)
    const [Description, setDescription] = useState("")

    const { width, height } = Dimensions.get('window');
    const [IsLodding, setIsLodding] = useState(false);
    const [startdate, setstartDate] = useState(new Date());
    const [startmode, setstartMode] = useState('date');
    const [startshow, setstartShow] = useState(false);
    const [starttext, setstarttext] = useState(true)

    const onChangeStartDate = (event, selectedDate) => {
        if (event.type == 'dismissed') {
            setstartShow(!startshow);
        }
        else {
            const currentDate = selectedDate || startdate;
            setstartShow(Platform.OS === 'ios');
            setstartDate(currentDate)
            setstarttext(false)
        }
    };
    const setMode = (currentMode) => {
        setstartShow(!startshow);
        setstartMode(currentMode);
    };
    const showDatepicker = () => {
        // setstarttext(false)
        setMode('date');
    };

    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const leadOwner = useSelector(state => state.taskmanager.taskOwner)
    const responseAdd_Edit = useSelector(state => state.taskmanager.addTask)
    const Lead_OpportunityList = useSelector(state => state.taskmanager.tasklead)
    const contactData = useSelector(state => state.taskmanager.taskcontact)
    const TaskStatus = useSelector(state => state.taskmanager.taskstatus)

    useEffect(() => {
        const data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
        }
        dispatch(taskmanagerAction.TaskOwnerList(data, loginData.data.token));
        dispatch(taskmanagerAction.TaskStatusList(data, loginData.data.token));
    }, [isFocused])

    useEffect(() => {
        if (leadOwner) {
            if (leadOwner.status == "200") {
                let userData = leadOwner.data && leadOwner.data.map((ld) => {
                    let user = { label: ld.user.name, value: ld.id }
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
    }, [leadOwner])

    useEffect(() => {
        if (TaskStatus) {
            if (TaskStatus.status == "200") {
                setStatusList(TaskStatus.data.TaskStatus)
                setTaskForList(TaskStatus.data.TaskFor)
                setPriorityList(TaskStatus.data.TaskPriority)
            }
            else if (TaskStatus.status == "failed") {
            }
            else if (TaskStatus.status == "fail") {
            }
        }
    }, [TaskStatus])

    useEffect(() => {
        if (contactData) {
            if (contactData.status == "200") {
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
    }, [contactData])

    useEffect(() => {
        if (Lead_OpportunityList) {
            if (Lead_OpportunityList.status == "200") {
                setListValues(Lead_OpportunityList.data.lead ? Lead_OpportunityList.data.lead : Lead_OpportunityList.data)
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
    }, [Lead_OpportunityList])


    const selectOneFile = (value) => {
        const data = {
            uid: loginData.data.uid,
            profile_id: loginData.data.cProfile.toString(),
            org_uid: loginData.data.org_uid,
        }
        if (value == 'lead') {
            dispatch(taskmanagerAction.TaskleadList(data, loginData.data.token));
        }
        else if (value == 'contact') {
            dispatch(taskmanagerAction.TaskcontactList(data, loginData.data.token));
        }
        else {
            console.log('account APi..........account........................ ')
        }
    }

    const AddNewCampaign = () => {
        if (title == "") {
            ToastAndroid.show("Enter Title", ToastAndroid.SHORT);
        }
        else if (TaskFor == null) {
            ToastAndroid.show("Select TaskFor", ToastAndroid.SHORT);
        }
        else if (releetedTo == "") {
            ToastAndroid.show("Enter Related To", ToastAndroid.SHORT);
        }
        else if (releetedToId == "") {
            ToastAndroid.show("TaskFor contact person not selected", ToastAndroid.SHORT);
        }
        else if (starttext == true) {
            ToastAndroid.show("Select Due Date", ToastAndroid.SHORT);
        }
        else if (Status == null) {
            ToastAndroid.show("Select Status", ToastAndroid.SHORT);
        }
        else if (Priority == null) {
            ToastAndroid.show("Select Priority", ToastAndroid.SHORT);
        }
        else {
            let formateStartDate = moment(startdate).format("YYYY-MM-DD")
            setIsLodding(true)
            const data = {
                uid: loginData.data.uid,
                org_uid: loginData.data.org_uid,
                profile_id: TaskOwner !== null ? TaskOwner : loginData.data.cProfile,
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
    }

    useEffect(() => {
        if (responseAdd_Edit) {
            if (responseAdd_Edit.status == "success") {
                ToastAndroid.show(responseAdd_Edit.message, ToastAndroid.SHORT);
                navigation.navigate('Task_Manager')
                settitle(''), setTaskFor(null), setreleetedTo(''),
                    setreleetedToId(), setreleetedToFname('Contact'), setreleetedToLname('Person'),
                    setStatus(null), setPriority(null),
                    setDescription(), setstartDate(new Date()), setstarttext(true)
                dispatch(taskmanagerAction.clearResponse())
            }
            else if (responseAdd_Edit.status == "failed") {
            }
            else if (responseAdd_Edit.status == "fail") {
                ToastAndroid.show(responseAdd_Edit.message, ToastAndroid.SHORT);
                dispatch(taskmanagerAction.clearResponse())
            }
            setIsLodding(false)
        }
    }, [responseAdd_Edit])

    const RadioSelect = (value) => {
        setreleetedToFname(value.first_name)
        setreleetedToLname(value.last_name)
        setreleetedToId(value.id)
        setreleetedTo(value.title)
        setModalVisible2(false)
    }

    const AllView = ({ item }) => {
        return (
            <ScrollView style={
                releetedToId !== undefined && releetedToId == item.id ?
                    { borderBottomWidth: 1, borderRadius: 10, margin: '1%', paddingHorizontal: '3%', backgroundColor: '#24BCFF' }
                    :
                    { borderBottomWidth: 1, borderRadius: 10, margin: '1%', paddingHorizontal: '3%', }
            }>
                <TouchableOpacity onPress={() => RadioSelect(item)}>
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
        <View style={{ flex: 1, height: height, width: width }}>
            <Header
                onPressLeft={() => {
                    navigation.openDrawer()
                    // navigation.goBack()
                }}
                title='Add Task'
                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />
            <ScrollView style={{ width: width, height: height }}>
                <View style={{ marginHorizontal: '3%' }}>
                    <View style={{ marginTop: '2%' }}>
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={TaskOwnerList}
                            search={true}
                            searchPlaceholder='Search'
                            maxHeight={160}
                            labelField="label"
                            valueField="value"
                            placeholder='Task Owner'
                            value={TaskOwner}
                            onChange={item => {
                                setTaskOwner(item.value);
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
                        {!title.length ?
                            <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                            : null}
                    </View>
                    <View style={{ marginTop: '2%' }}>
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={TaskForList}
                            search={true}
                            searchPlaceholder='Search'
                            maxHeight={160}
                            labelField="task_for"
                            valueField="task_for"
                            placeholder='Task For'
                            value={TaskFor}
                            onChange={item => {
                                selectOneFile(item.task_for)
                                setTaskFor(item.task_for);
                            }}
                            renderLeftIcon={() => (
                                <View>
                                    <Image
                                        style={[styles.icon, { height: 22, width: 22 }]}
                                        source={require('../../images/transgender.png')}
                                    />
                                </View>
                            )}
                            renderRightIcon={() => (
                                <View>
                                    {TaskFor == null ?
                                        <Text style={{ fontSize: 15, marginTop: '-350%', color: 'red' }}>*</Text>
                                        : null}
                                </View>
                            )}
                        />
                    </View>
                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 20, width: 18 }]}
                            source={require('../../images/user.png')}
                        />
                        <Text style={{ marginTop: '4%' }}>{releetedToFname} {releetedToLname}</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 20, width: 18 }]}
                            source={require('../../images/user.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={releetedTo}
                            onChangeText={e2 => setreleetedTo(e2)}
                            placeholder="Related To" />
                        {!releetedTo.length ?
                            <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                            : null}
                    </View>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: '#000000',
                            borderRadius: 10,
                            // marginHorizontal: '3%',
                            paddingVertical: 8,
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
                                    minimumDate={new Date()}
                                    display="default"
                                    onChange={onChangeStartDate}
                                />
                            )}
                            {Platform.OS == 'ios' ? <View>
                                {starttext == true ?
                                    <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000' }}>Due Date</Text>
                                    :
                                    null
                                }
                            </View>
                                :
                                <View>
                                    {starttext == true ?
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>Due Date</Text>
                                            <Text style={{ fontSize: 15, color: 'red' }}>*</Text>
                                        </View>
                                        :
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>{moment(startdate).format('MM/DD/YYYY')}</Text>
                                    }
                                </View>
                            }
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: '2%' }}>
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={StatusList}
                            search={true}
                            searchPlaceholder='Search'
                            maxHeight={160}
                            labelField="status"
                            valueField="id"
                            placeholder='Status'
                            value={Status}
                            onChange={item => {
                                setStatus(item.id);
                            }}
                            renderLeftIcon={() => (
                                <View>
                                    <Image
                                        style={[styles.icon, { height: 25, width: 18 }]}
                                        source={require('../../images/list.png')}
                                    />
                                </View>
                            )}
                            renderRightIcon={() => (
                                <View>
                                    {Status == null ?
                                        <Text style={{ fontSize: 15, marginTop: '-350%', color: 'red' }}>*</Text>
                                        : null}
                                </View>
                            )}
                        />
                    </View>
                    <View style={{ marginTop: '2%' }}>
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={PriorityList}
                            search={true}
                            searchPlaceholder='Search'
                            maxHeight={160}
                            labelField="priority"
                            valueField="id"
                            placeholder='Priority'
                            value={Priority}
                            onChange={item => {
                                setPriority(item.id);
                            }}
                            renderLeftIcon={() => (
                                <View>
                                    <Image
                                        style={[styles.icon, { height: 25, width: 18 }]}
                                        source={require('../../images/list.png')}
                                    />
                                </View>
                            )}
                            renderRightIcon={() => (
                                <View>
                                    {Priority == null ?
                                        <Text style={{ fontSize: 15, marginTop: '-350%', color: 'red' }}>*</Text>
                                        : null}
                                </View>
                            )}
                        />
                    </View>
                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, {
                                height: 25, width: 18,
                            }]}
                            source={require('../../images/list.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={Description}
                            onChangeText={e5 => setDescription(e5)}
                            placeholder="Description" />
                        {!Description.length ?
                            <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                            : null}
                    </View>



                    {IsLodding == true ?
                        <ActivityIndicator size="small" color="#0000ff" />
                        :
                        null}

                    <TouchableOpacity style={styles.button} onPress={() => AddNewCampaign()} >
                        <Text style={[styles.textButton, { fontWeight: 'bold' }]}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal animationType="slide" transparent={true} visible={modalVisible2}
                onRequestClose={() => { setModalVisible2(!modalVisible2); }}>
                <View style={styles.askModel}>
                    <Text style={styles.askTitle}>Select</Text>
                    <TouchableOpacity onPress={() => setModalVisible2(false)}>
                        <Image style={styles.askTitleR}
                            source={require('../../images/cross.png')} />
                    </TouchableOpacity>
                    <FlatList
                        data={ListValues}
                        // style={{ height: '75%' }}
                        renderItem={AllView}
                        ListEmptyComponent={() => (!ListValues.length ?
                            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>Data Not Found</Text>
                            : null)}
                        keyExtractor={item => item.id}
                    />
                </View>
            </Modal >
        </View >
    );
}

