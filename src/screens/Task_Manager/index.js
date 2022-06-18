import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, ToastAndroid, FlatList, Image, Linking, ActivityIndicator, Modal, Pressable } from 'react-native';
import { BottomSheet } from 'react-native-elements';
import moment from 'moment';
import Header from '../../component/header/index'
import { taskmanagerAction, profileAction } from '../../redux/Actions/index'
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import navigationStrings from '../../constant/navigationStrings';
import { useIsFocused } from '@react-navigation/native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

export default function Task_Manager({ navigation, route }) {
    const [StatusList, setStatusList] = useState([]);
    const [isService, setisService] = useState(route.params ? route.params.type : 'All');
    const [modalVisible2, setModalVisible2] = useState(false);
    const [askDelete, setaskDelete] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [allTask, setallTask] = useState([])
    const [Status, setStatus] = useState(null);
    const [IsLodding, setIsLodding] = useState(true)
    const [EIsLodding, setEIsLodding] = useState(false)
    const [title, settitle] = useState('')
    const [page, setPage] = useState(0);
    const [perPageItems, setperPageItems] = useState(10);
    const [totalItems, settotalItems] = useState(0);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, settext] = useState(true)
    const [editPermission, seteditPermission] = useState(false)
    const [deletePermission, setdeletePermission] = useState(false)
    const [createPermission, setcreatePermission] = useState(false)
    const isFocused = useIsFocused();
    const dispatch = useDispatch()
    const loginData = useSelector(state => state.auth.data)
    const taskList = useSelector(state => state.taskmanager.getList)
    const deleteTask = useSelector(state => state.taskmanager.deleteTask)
    const responseAdd_Edit = useSelector(state => state.taskmanager.addTask)
    const TaskStatus = useSelector(state => state.taskmanager.taskstatus)
    const PermissionData = useSelector(state => state.profile.permission)
    useEffect(() => {
        const data = {
            uid: loginData.data.uid,
            profile_id: loginData.data.cProfile.toString(),
            org_uid: loginData.data.org_uid
        }
        isFocused ? Get_Data(page) : null
        isFocused ? dispatch(taskmanagerAction.TaskStatusList(data, loginData.data.token)) : null
        isFocused ? dispatch(profileAction.GetPermission({ account_id: loginData.data.acId.toString() }, loginData.data.token)) : null
    }, [isFocused])
    useEffect(() => {
        if (TaskStatus) {
            if (TaskStatus.status == "200") { setStatusList(TaskStatus.data.TaskStatus) }
            else if (TaskStatus.status == "fail") { ToastAndroid.show(taskList.message, ToastAndroid.SHORT); }
        }
    }, [TaskStatus])
    useEffect(() => {
        if (taskList) {
            if (taskList.status == "success") {
                settotalItems(taskList.total_rows)
                if (page == 0 && taskList.data.length != 0) {
                    setallTask(taskList.data)
                } else if (taskList.data.length != 0) {
                    let dataLive = taskList.data;
                    let listTemp = [...allTask, ...dataLive];
                    setallTask(listTemp)
                }
                setIsLodding(false)
            }
            else if (taskList.status == "failed") {
                ToastAndroid.show(taskList.message, ToastAndroid.SHORT);
                setIsLodding(false)
            }
        }
    }, [taskList])
    useEffect(() => {
        if (PermissionData) {
            if (PermissionData.status == "success") {
                if (PermissionTasks(JSON.parse(PermissionData.permissions)).includes('edit')) { seteditPermission(true) }
                if (PermissionTasks(JSON.parse(PermissionData.permissions)).includes('create')) { setcreatePermission(true) }
                if (PermissionTasks(JSON.parse(PermissionData.permissions)).includes('delete')) { setdeletePermission(true) }
            }
            else if (PermissionData.status == "failed") {
                ToastAndroid.show(PermissionData.message, ToastAndroid.SHORT);
            }
        }
    }, [PermissionData])
    const PermissionTasks = (permiss, account) => {
        return permiss.tasks.map((el) => {
            return el.value;
        })
    }
    useEffect(() => {
        if (responseAdd_Edit) {
            if (responseAdd_Edit.status == "success") {
                setIsVisible(false)
                setEIsLodding(false)
                ToastAndroid.show(responseAdd_Edit.message, ToastAndroid.SHORT);
                initialstate()
                checkValue(isService)
                dispatch(taskmanagerAction.clearResponse())
            }
            else if (responseAdd_Edit.status == "failed") {
                setEIsLodding(false)
                ToastAndroid.show(responseAdd_Edit.message, ToastAndroid.SHORT);
                dispatch(taskmanagerAction.clearResponse())
            }
        }
    }, [responseAdd_Edit])
    useEffect(() => {
        if (deleteTask) {
            if (deleteTask.status == "200") {
                setModalVisible2(!modalVisible2)
                setIsLodding(false)
            }
            else if (deleteTask.status == 'fail') {
                setIsLodding(false)
                ToastAndroid.show(deleteTask.message, ToastAndroid.SHORT);
            }
        }
    }, [deleteTask])
    const initialstate = () => {
        setIsLodding(true)
        setallTask([])
        setPage(0)
        settitle('')
        setDate(new Date())
        settext(true)
        setStatus(null)
        settempObject("")
        seteditPermission(false)
        setdeletePermission(false)
        setcreatePermission(false)
    }
    const Get_Data = (p) => {
        const data = {
            uid: loginData.data.uid,
            profile_id: loginData.data.cProfile.toString(),
            org_uid: loginData.data.org_uid,
            pageSize: perPageItems,
            pageNumber: p,
            filters: []
        }
        dispatch(taskmanagerAction.TaskList(data, loginData.data.token));
    }
    const fetchNextItems = () => {
        if (totalItems > allTask.length) {
            let p = page + 1;
            setPage(p);
            Get_Data(p)
        }
    }
    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        initialstate()
        checkValue(isService)
    }
    const [temObject, settempObject] = useState('')
    const CheckEditTask = (value) => {
        settitle(value.title)
        if (value.due_date) {
            const dateStr = new Date(value.due_date);
            setDate(dateStr)
            settext(false)
        }
        setStatus(value.status)
        settempObject(value)
        setIsVisible(true)
    };
    const EditFunction = (value) => {
        if (title == "") { ToastAndroid.show('Enter Title', ToastAndroid.SHORT); }
        else if (Status == null) { ToastAndroid.show('Select Status', ToastAndroid.SHORT); }
        else {
            let formateStartDate = moment(date).format("YYYY-MM-DD")
            setEIsLodding(true)
            const data = {
                uid: loginData.data.uid,
                org_uid: loginData.data.org_uid,
                profile_id: loginData.data.cProfile,
                created_by: loginData.data.cProfile,
                modified_by: loginData.data.cProfile,
                task_id: value.id ? value.id : '',
                title: title,
                task_for: value.task_for ? value.task_for : '',
                task_related_to: value.related_to ? value.related_to : '',
                task_related_to_id: value.what_id ? value.what_id : '',
                status: Status,
                priority: value.priority ? value.priority : '',
                description: value.description ? value.description : '',
                due_date: formateStartDate,
            }
            dispatch(taskmanagerAction.Add_EditTask(data, loginData.data.token));
        }
    }
    const [tempId, settempId] = useState('')
    const CencelFunction = () => {
        settempId('')
        setaskDelete(!askDelete)
    }
    const CheckDeleteFunction = (value) => {
        settempId(value.id)
        setaskDelete(!askDelete)
    }
    const DeleteFunction = () => {
        setaskDelete(!askDelete)
        const data = {
            uid: loginData.data.uid,
            profile_id: loginData.data.cProfile,
            org_uid: loginData.data.org_uid,
            task_id: tempId
        }
        dispatch(taskmanagerAction.deleteTask(data, loginData.data.token));
        setIsLodding(true)
    }
    const DeleteSuccessFully = () => {
        dispatch(taskmanagerAction.clearResponse());
        initialstate()
        checkValue(isService)
        setModalVisible2(!modalVisible2)
    }
    const onChangeFrom = (event, selectedDate) => {
        if (event.type == 'dismissed') {
            setShow(!show);
        }
        else {
            const currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            setDate(currentDate)
            settext(false)
        }
    };
    const showMode = (currentMode) => {
        setShow(!show);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const checkValue = (value) => {
        setisService(value)
        initialstate()
        const data = {
            uid: loginData.data.uid,
            profile_id: loginData.data.cProfile.toString(),
            org_uid: loginData.data.org_uid,
            pageSize: perPageItems,
            pageNumber: '0',
            filters: []
        }
        if (value == 'Done') {
            data.filters.push({ eq: '3', key: 'status' })
            dispatch(taskmanagerAction.TaskList(data, loginData.data.token));
        }
        else if (value == 'To-Do') {
            data.filters.push({ eq: '1', key: 'status' })
            dispatch(taskmanagerAction.TaskList(data, loginData.data.token));
        }
        else if (value == 'All') {
            dispatch(taskmanagerAction.TaskList(data, loginData.data.token));
        }
        dispatch(profileAction.GetPermission({ account_id: loginData.data.acId.toString() }, loginData.data.token));
    }
    const [detail, setDetail] = useState(false)
    const [detailObject, setdetailObject] = useState({
        name: '',
        mobile: '',
        email: '',
        title: '',
        taskFor: '',
        reletedTo: '',
        status: '',
        priority: '',
        DueData: '',
        description: ''
    })
    const ShowDetail = (item) => {
        setDetail(true)
        setdetailObject({
            name: item.profile.user.name,
            mobile: item.profile.user.phone,
            email: item.profile.user.email,
            title: item.title,
            taskFor: item.task_for,
            reletedTo: item.related_to,
            status: item.taskstatus.status,
            priority: item.taskpriority.priority,
            DueData: item.due_date,
            description: item.description
        })
    }
    const HideDetail = (item) => {
        setDetail(false)
        setdetailObject({
            name: '',
            mobile: '',
            email: '',
            title: '',
            taskFor: '',
            reletedTo: '',
            status: '',
            priority: '',
            DueData: '',
            description: ''
        })
    }
    const AllView = ({ item }) => {
        return (
            <View style={{ marginHorizontal: '3%', marginVertical: '1%', backgroundColor: '#e9ebf2', paddingHorizontal: '2%', borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#B5B8C0', paddingVertical: '2%' }}>
                    <View style={{ justifyContent: 'center', }}>
                        <Image style={{ height: 48, width: 48, }}
                            source={require('../../images/profileCall.png')}
                        />
                    </View>
                    <View style={{ justifyContent: 'center', flex: 1, marginHorizontal: '3%', }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.profile.user.name.charAt(0).toUpperCase() + item.profile.user.name.slice(1)}</Text>
                        <Text style={{ fontSize: 15, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.title}</Text>
                        <Text numberOfLines={1}>{item.description}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', }}>
                        <Text style={{
                            backgroundColor: '#7a9bf5', color: '#0e4af0', borderRadius: 5,
                            paddingHorizontal: '3%', paddingVertical: '1%', fontSize: 15, fontWeight: 'bold'
                        }}>{item.task_for.charAt(0).toUpperCase() + item.task_for.slice(1)}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    {editPermission ? <TouchableOpacity
                        style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                            width: '33%', borderRightWidth: 1, borderColor: '#B5B8C0', paddingVertical: '3%'}}
                        onPress={() => CheckEditTask(item)}>
                        <Image style={{ height: 16, width: 18, }}
                            source={require('../../images/newEdit.png')} />
                        <Text style={{ marginHorizontal: '3%', fontSize: 14 }}>Edit Task</Text>
                    </TouchableOpacity> : null}
                    {deletePermission ? <TouchableOpacity
                        style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                            width: '34%', borderRightWidth: 1, borderColor: '#B5B8C0', paddingVertical: '3%'}}
                        onPress={() => CheckDeleteFunction({ type: "Task", id: item.id })}>
                        <Image style={{ height: 16, width: 16, }}
                            source={require('../../images/deleteCall.png')} />
                        <Text style={{ marginHorizontal: '3%', fontSize: 14 }}>Delete Task</Text>
                    </TouchableOpacity> : null}
                    <TouchableOpacity
                        onPress={() => ShowDetail(item)}
                        style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                            width: '33%', paddingVertical: '4%'}}>
                        <Text style={{ marginHorizontal: '3%', fontSize: 14 }}>More Detail</Text>
                        <Image style={{ height: 13, width: 9, }}
                            source={require('../../images/newDetail.png')} />
                    </TouchableOpacity>
                </View>
            </View>)
    }
    return (
        <View style={{ flex: 1 }}>
            <Header onPressLeft={() => { navigation.openDrawer() }}
                title='Task Manager'
                onPressRight={() => { navigation.navigate('Notification') }} />
            <View style={{
                flexDirection: 'row',
                marginHorizontal: '5%',
                marginTop: '-5%',
                backgroundColor: '#fff',
                borderRadius: 20,
                justifyContent: 'space-between'
            }}>
                {isService == 'All' ?
                    <TouchableOpacity style={[styles.headerBtn, { backgroundColor: '#4F46BA' }]} onPress={() => checkValue("All")}>
                        <Text style={{ color: '#FFF', textAlign: 'center', padding: 10, }}>All</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.headerBtn]} onPress={() => checkValue("All")}>
                        <Text style={{ textAlign: 'center', color: 'black', padding: 10, }}>All</Text>
                    </TouchableOpacity>
                }
                {isService == 'To-Do' ?
                    <TouchableOpacity style={[styles.headerBtn, { backgroundColor: '#4F46BA' }]} onPress={() => checkValue("To-Do")}>
                        <Text style={{ color: '#FFF', textAlign: 'center', padding: 10, }}>To-Do</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.headerBtn]} onPress={() => checkValue("To-Do")}>
                        <Text style={{ textAlign: 'center', color: 'black', padding: 10, }}>To-Do</Text>
                    </TouchableOpacity>
                }
                {isService == 'Done' ?
                    <TouchableOpacity style={[styles.headerBtn, { backgroundColor: '#4F46BA' }]} onPress={() => checkValue("Done")}>
                        <Text style={{ color: '#FFF', textAlign: 'center', padding: 10, }}>Done</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.headerBtn]} onPress={() => checkValue("Done")}>
                        <Text style={{ textAlign: 'center', color: 'black', padding: 10, }}>Done</Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={{ marginVertical: '3%', flex: 1 }}>
                {IsLodding == true ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                    :
                    <View style={{ flex: 1 }}>
                        {createPermission ? <TouchableOpacity
                            onPress={() => navigation.navigate(navigationStrings.AddTask)}
                            style={{
                                borderColor: '#3373F3',
                                borderWidth: 1,
                                paddingHorizontal: '5%',
                                paddingVertical: '1%',
                                alignSelf: 'flex-end',
                                marginHorizontal: '5%',
                                backgroundColor: '#edeef5',
                                borderRadius: 15
                            }}>
                            <Text style={{ color: "#3373F3", fontSize: 13 }}>
                                +Add
                            </Text>
                        </TouchableOpacity> : <TouchableOpacity
                            // onPress={() => navigation.navigate(navigationStrings.AddTask)}
                            style={{
                                // borderColor: '#fff',
                                // borderWidth: 1,
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                                alignSelf: 'flex-end',
                                marginHorizontal: '5%',
                                // backgroundColor: '#2296E4',
                                borderRadius: 15
                            }}>
                            <Text style={{ color: "#fff", fontSize: 13 }}>
                                {/* +Add */}
                            </Text>
                        </TouchableOpacity>}
                        <FlatList
                            // style={{ height: "85%" }}
                            data={allTask}
                            renderItem={AllView}
                            ListEmptyComponent={() => (!allTask.length ?
                                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>Data Not Found</Text>
                                : null)}
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            onEndReached={() => fetchNextItems()}
                            keyExtractor={item => item.id}
                        />
                    </View>
                }
            </View>
            <BottomSheet modalProps={{
                animationType: 'fade',
                hardwareAccelerated: true,
                onRequestClose: () => { setIsVisible(false); }
            }}
                isVisible={isVisible}>
                <View style={{ backgroundColor: '#fff', paddingHorizontal: '3%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', marginVertical: '2%', justifyContent: 'space-between', }}>
                        <Text style={styles.modalTextLL}>Edit Task</Text>
                        <Pressable style={styles.askTitleEdit}
                            onPress={() => setIsVisible(false)}>
                            <Image style={{ height: 14, width: 14, }}
                                source={require('../../images/cross_blackIos.png')}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.inputFields}>
                        <Image style={styles.icon}
                            source={require('../../images/user.png')}
                        />
                        <TextInput
                            placeholder="Meeting with Mr.George"
                            placeholderTextColor='#4A4A4A'
                            value={title}
                            onChangeText={e19 => settitle(e19)}
                            style={{ paddingRight: '20%', flex: 1, }}
                        />
                        {!title.length ?
                            <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                            : null}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable
                        // onPress={showDatepicker}
                        >
                            <View style={styles.pickers}>
                                <Image style={{ height: 17.50, width: 15.91, marginTop: '2%', marginRight: '5%' }}
                                    source={require('../../images/DOB.png')} />
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        style={{ backgroundColor: '', marginTop: '-5%', width: '100%' }}
                                        value={date}
                                        mode={mode}
                                        // is24Hour={true}
                                        display="default"
                                        onChange={onChangeFrom}
                                    />)}
                                {Platform.OS == 'ios' ? <View>
                                    {text == true ? <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000', }}>From</Text> : null}
                                </View> : <View>
                                    {text == true ?
                                        <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000', paddingRight: '15%' }}>From</Text>
                                        :
                                        <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000' }}>{moment(date).format('MM/DD/YYYY')}</Text>
                                    }
                                </View>
                                }
                            </View>
                        </Pressable>
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            data={StatusList}
                            maxHeight={100}
                            labelField="status"
                            valueField="id"
                            placeholder='Status'
                            value={Status}
                            onChange={item => { setStatus(item.id); }}
                            renderLeftIcon={() => (
                                <Image style={[styles.icon, { height: 22, width: 22 }]}
                                    source={require('../../images/transgender.png')} />)}
                        />
                    </View>
                    {EIsLodding == true ? <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '5%' }} /> : null}
                    <Pressable style={styles.updateBtn} onPress={() => EditFunction(temObject)} >
                        <Text style={styles.textStyle}>Update</Text>
                    </Pressable>
                </View>
            </BottomSheet>

            <BottomSheet modalProps={{
                animationType: 'fade', hardwareAccelerated: true,
                onRequestClose: () => { HideDetail() }
            }} isVisible={detail}>
                <View style={{ backgroundColor: '#fff', paddingHorizontal: '3%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ borderBottomWidth: 1, flexDirection: 'row', marginVertical: '2%', justifyContent: 'space-between', }}>
                        <Text style={styles.modalTextLL}>Task Detail</Text>
                        <Pressable style={styles.askTitleEdit}
                            onPress={() => HideDetail()}>
                            <Image style={{ height: 14, width: 14, }}
                                source={require('../../images/cross_blackIos.png')}
                            />
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: '2%', flex: 1 }}>
                        <View style={{ justifyContent: 'center' }}>
                            <Avatar.Image size={50}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/profileCall.png')} />
                        </View>
                        <View style={{ justifyContent: 'center', marginHorizontal: '2%', flex: 1 }}>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', fontSize: 15, color: '#000000' }]}>{detailObject.name}</Text>
                            {detailObject.mobile ? <TouchableOpacity >
                                <Text style={[styles.DetailCampTitle, { color: '#000000' }]}>{detailObject.mobile}</Text>
                            </TouchableOpacity> : null}
                            {detailObject.email ? <TouchableOpacity onPress={() => Linking.openURL(`mailto:${detailObject.email}`)}>
                                <Text style={[styles.DetailCampTitle, { color: '#000000' }]}>{detailObject.email}</Text>
                            </TouchableOpacity> : null}
                        </View>
                        <View style={{ marginRight: '2%', justifyContent: 'center' }}>
                            {detailObject.status === 'Completed' ?
                                <Text style={{ backgroundColor: 'green', color: '#fff', paddingHorizontal: '3%', borderRadius: 20 }}>
                                    {detailObject.status.charAt(0).toUpperCase() + detailObject.status.slice(1)}</Text>
                                :
                                <Text style={{ backgroundColor: 'red', color: '#fff', paddingHorizontal: '3%', borderRadius: 20 }}>
                                    {detailObject.status.charAt(0).toUpperCase() + detailObject.status.slice(1)}</Text>}
                        </View>
                    </View>
                    {detailObject.title ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Title</Text> : null}
                    <Text style={styles.DetailCampTitle}>{detailObject.title ? detailObject.title : null}</Text>
                    {detailObject.taskFor ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Task For</Text> : null}
                    <Text style={styles.DetailCampTitle}>{detailObject.taskFor ? detailObject.taskFor : null}</Text>
                    {detailObject.reletedTo ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Related To</Text> : null}
                    <Text style={styles.DetailCampTitle}>{detailObject.reletedTo ? detailObject.reletedTo : null}</Text>
                    {detailObject.DueData ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Due Data</Text> : null}
                    <Text style={styles.DetailCampTitle}>{detailObject.reletedTo ? detailObject.DueData : null}</Text>
                    {detailObject.status ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Status</Text> : null}
                    <Text style={styles.DetailCampTitle}>{detailObject.status ? detailObject.status : null}</Text>
                    {detailObject.priority ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Priority</Text> : null}
                    <Text style={styles.DetailCampTitle}>{detailObject.priority ? detailObject.priority : null}</Text>
                    {detailObject.description ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Description</Text> : null}
                    <Text style={styles.DetailCampTitle}>{detailObject.priority ? detailObject.description : null}</Text>
                </View>
            </BottomSheet>

            <Modal animationType="slide" transparent={true} visible={modalVisible2}
                onRequestClose={() => { setModalVisible2(!modalVisible2); }} >
                <View style={styles.centeredView3}>
                    <View style={styles.modalView3}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => DeleteSuccessFully()} >
                            <Image style={{ margin: '5%', marginRight: '1%', marginTop: '3%', alignSelf: 'flex-end', height: 14, width: 14 }}
                                source={require('../../images/crossImgR.png')} />
                        </TouchableOpacity>
                        <Image source={require('../../images/checkmark-circle.png')}
                            style={{ width: 38.75, height: 38.75 }} />
                        <Text style={[styles.modalText3, { fontWeight: 'bold' }]} >Successfully{'\n'}Deleted</Text>
                        <Pressable style={[styles.button3, styles.buttonClose3, { paddingLeft: '10%', paddingRight: '10%' }]} onPress={() => DeleteSuccessFully()}>
                            <Text style={styles.textStyle3}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal animationType="slide" transparent={true} visible={askDelete} onRequestClose={() => { setaskDelete(!askDelete); }}>
                <View style={styles.askModel}>
                    <Text style={styles.askTitle}> Are you sure ?</Text>
                    <Text style={styles.askSubtitle}> you want to delete this{'\n'} Task ?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Pressable style={[styles.askBtn, { paddingHorizontal: '6.5%' }]} onPress={() => CencelFunction()}>
                            <Text style={styles.askBtnText}>NO</Text>
                        </Pressable>
                        <View style={{ margin: '5%' }} />
                        <Pressable style={[styles.askBtn, { paddingHorizontal: '5%' }]} onPress={() => DeleteFunction()}  >
                            <Text style={styles.askBtnText}>YES</Text>
                        </Pressable>
                    </View>
                    <View style={{ margin: '2%' }} />
                </View>
            </Modal>


            {/* <Modal animationType="slide" transparent={true} visible={detail} onRequestClose={() => { setDetail(!detail); }}>
                <View style={styles.askModel}>
                    <Text style={styles.askTitle}>Task Detail</Text>
                    <Pressable  style={styles.askTitleR} onPress={() => HideDetail()} >
                        <Image style={{ height: 14, width: 14, }} source={require('../../images/cross.png')}/>
                    </Pressable>
                    <View style={[styles.inputFields, { padding: 10 }]}>
                        <View>
                            <Text style={styles.DetailCampTitle}>Task Owner </Text>
                            <Text style={styles.DetailCampTitle}>Title</Text>
                            <Text style={styles.DetailCampTitle}>Task For</Text>
                            <Text style={styles.DetailCampTitle}>Related To</Text>
                            <Text style={styles.DetailCampTitle}>Due Date</Text>
                            <Text style={styles.DetailCampTitle}>Status</Text>
                            <Text style={styles.DetailCampTitle}>Priority</Text>
                        </View>
                        <View style={{ marginLeft: '3%', width: '70%' }}>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{detailObject.name}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{detailObject.title}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{detailObject.taskFor}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{detailObject.reletedTo}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{detailObject.DueData}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{detailObject.status}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{detailObject.priority}</Text>
                        </View>
                    </View>
                    <View style={{ margin: '2%' }} />
                </View>
            </Modal> */}
        </View >
    );
}