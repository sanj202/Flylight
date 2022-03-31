import React, { useState, useEffect } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, TextInput, ToastAndroid, FlatList, Image, Button, ActivityIndicator,
    Modal, Alert, Pressable, StatusBar, Dimensions
} from 'react-native';
import { BottomSheet, ListItem } from 'react-native-elements';
import moment from 'moment';
import Header from '../../component/header/index'
import { taskmanagerAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';

export default function Task_Manager({ navigation }) {

    const [StatusList, setStatusList] = useState([]);
    const [isService, setisService] = useState('All');
    const [modalVisible2, setModalVisible2] = useState(false);
    const [askDelete, setaskDelete] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [allTask, setallTask] = useState([])
    const [Status, setStatus] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [IsLodding, setIsLodding] = useState(false)
    const [EIsLodding, setEIsLodding] = useState(false)
    const [title, settitle] = useState('')
    const { width, height } = Dimensions.get('window');
    const [page, setPage] = useState(0);
    const [perPageItems, setperPageItems] = useState(10);
    const [totalItems, settotalItems] = useState('');
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, settext] = useState(true)

    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const taskList = useSelector(state => state.taskmanager.getList)
    const deleteTask = useSelector(state => state.taskmanager.deleteTask)
    const responseAdd_Edit = useSelector(state => state.taskmanager.addTask)
    const TaskStatus = useSelector(state => state.taskmanager.taskstatus)

    useEffect(() => {
        setIsLodding(true)
        const data = {
            uid: loginData.data.uid,
            profile_id: loginData.data.cProfile.toString(),
            org_uid: loginData.data.org_uid,
        }
        Get_Data(page)
        dispatch(taskmanagerAction.TaskStatusList(data, loginData.data.token));
    }, [isFocused])


    useEffect(() => {
        if (TaskStatus) {
            if (TaskStatus.status == "200") {
                setStatusList(TaskStatus.data.TaskStatus)
            }
            else if (TaskStatus.status == "failed") {
            }
            else if (TaskStatus.status == "fail") {
            }
        }
        else {
        }
    }, [TaskStatus])

    const onChangeFrom = (event, selectedDate) => {
        if (event.type == 'dismissed') {
            setShow(!show);
        }
        else {
            console.log('date selected ')
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
        setIsLodding(true)
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
        }
        else if (value == 'To-Do') {
            data.filters.push({ eq: '1', key: 'status' })
        }
        else {

        }
        dispatch(taskmanagerAction.TaskList(data, loginData.data.token));
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

    useEffect(() => {
        if (taskList) {
            if (taskList.status == "success") {
                // setallTask(taskList.data)
                settotalItems(taskList.total_rows)
                if (taskList.data.length != 0) {
                    let dataLive = taskList.data;
                    let listTemp = [...allTask, ...dataLive];
                    setallTask(listTemp)
                }
            }
            else if (taskList.status == "failed") {
            }
            else if (taskList.status == "fail") {
                ToastAndroid.show(taskList.message, ToastAndroid.SHORT);
            }
            else {
            }
            setIsLodding(false)
        }
        else {
        }
    }, [taskList])

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
        if (title == "") {
            ToastAndroid.show('Enter Title', ToastAndroid.SHORT);
        }
        else if (Status == null) {
            ToastAndroid.show('Select Status', ToastAndroid.SHORT);
        }
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

    useEffect(() => {
        if (responseAdd_Edit) {
            if (responseAdd_Edit.status == "success") {
                setIsVisible(false)
                ToastAndroid.show(responseAdd_Edit.message, ToastAndroid.SHORT);
                settitle('')
                setDate(new Date())
                settext(true)
                setStatus(null)
                settempObject("")
                Get_Data(0)
                dispatch(taskmanagerAction.clearResponse())
            }
            else if (responseAdd_Edit.status == "failed") {
            }
            else if (responseAdd_Edit.status == "fail") {
                ToastAndroid.show(responseAdd_Edit.message, ToastAndroid.SHORT);
                dispatch(taskmanagerAction.clearResponse())
            }
            setEIsLodding(false)
        }
        else {
        }
    }, [responseAdd_Edit])


    const [tempId, settempId] = useState('')
    const [tempType, settempType] = useState('')

    const CencelFunction = () => {
        settempType('')
        settempId('')
        setaskDelete(!askDelete)
    }

    const CheckDeleteFunction = (value) => {
        settempId(value.id)
        settempType(value.type)
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

    useEffect(() => {
        if (deleteTask) {
            if (deleteTask.status == "200") {
                setModalVisible2(!modalVisible2)
            }
            else if (deleteTask.status == "failed") {
            }
            else if (deleteTask.status == 'fail') {
            }
            setIsLodding(false)
        }
        else {
        }
    }, [deleteTask])

    const DeleteSuccessFully = () => {
        dispatch(taskmanagerAction.clearResponse());
        Get_Data(0)
        setModalVisible2(!modalVisible2)
    }


    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        console.log(refreshing)
        setIsLodding(true)
        setallTask([])
        setPage(0)
        Get_Data(0)
    }

    const fetchNextItems = () => {
        if (totalItems > allTask.length) {
            let p = page + 1;
            setPage(p);
            Get_Data(p)
        }
    }

    const AllView = ({ item }) => {

        return (
            <View style={{ marginTop: '1%' }}>
                <View style={styles.listData}>
                    <View style={{ backgroundColor: '', justifyContent: 'center', }}>
                        <Image style={{ height: 48, width: 48, }}
                            source={require('../../images/profileCall.png')} />
                    </View>
                    <View style={{ marginLeft: '2%', flex: 1, backgroundColor: '', }}>
                        <Text style={{
                            fontWeight: 'bold', fontSize: 14, color: '#0F0F0F',
                            fontFamily: 'Roboto'
                        }}>{item.profile ? item.profile.user.name : ''}</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ width: '45%', backgroundColor: '' }}>
                                <Text numberOfLines={1} style={{ color: 'black', fontFamily: 'Roboto', fontSize: 12, color: '#0F0F0F', flexShrink: 1 }}>
                                    {item.title ? item.title : "not available"}</Text>
                            </View>
                            <View
                                style={{
                                    backgroundColor: '#F69708', borderRadius: 15,
                                    paddingHorizontal: 8, marginLeft: '2%',
                                    borderWidth: 1, borderColor: '#F69708',
                                }}>
                                <Text style={{ color: '#fff', fontSize: 12 }}>{item.task_for}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', }}>
                            <Text style={{
                                color: 'black', fontFamily: 'Roboto', fontSize: 12, color: '#0F0F0F',
                                flexShrink: 1
                            }}>
                                {item.subject}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                        {item.status == 'completed' ?
                            < TouchableOpacity >
                                <Image style={{ height: 22, width: 22, marginRight: '2%' }}
                                    source={require('../../images/okCall.png')}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity>
                                <Image style={{ height: 22, width: 22, marginRight: '2%' }}
                                    source={require('../../images/to-do.png')}
                                />
                            </TouchableOpacity>
                        }
                        <TouchableOpacity
                            onPress={() => CheckEditTask(item)}
                        >
                            <Image style={{ height: 22, width: 22, marginRight: '2%' }}
                                source={require('../../images/editCall.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => CheckDeleteFunction({ type: "Task", id: item.id })}
                        >
                            <Image style={{ height: 22, width: 22, }}
                                source={require('../../images/deleteCall.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginLeft: '2%', backgroundColor: '', marginTop: '1%' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={{ height: 10, width: 10, marginRight: '2%' }}
                                source={require('../../images/material-call.png')}
                            />
                            <Text max style={{ color: 'black', fontSize: 10 }}>{item.phone ? item.phone : ' 8596547895'}</Text>
                        </View>
                        <Text style={{
                            marginTop: '30%', textAlign: 'right',
                            color: 'black', fontSize: 11
                        }}>{moment(item.updated_at).format('MM/DD/YYYY')} </Text>
                    </View>
                </View>
            </View >
        )
    }

    return (
        <View style={[styles.container, { width: width, height: height }]}>
            <Header
                style={{ height: "14%" }}
                onPressLeft={() => {
                    navigation.openDrawer()
                    // navigation.goBack()
                }}
                title='Task Manager'
                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: '5%',
                    marginTop: '-5%',
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    justifyContent: 'space-between'
                }}>
                {isService == 'All' ?
                    <TouchableOpacity style={[styles.headerBtn, { backgroundColor: '#4F46BA' }]}
                        onPress={() => checkValue("All")}
                    >
                        <Text style={{ color: '#FFF', textAlign: 'center', padding: 10, }}>All</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.headerBtn]}
                        onPress={() => checkValue("All")}
                    >
                        <Text style={{ textAlign: 'center', color: 'black', padding: 10, }}>All</Text>
                    </TouchableOpacity>
                }

                {isService == 'To-Do' ?
                    <TouchableOpacity style={[styles.headerBtn, { backgroundColor: '#4F46BA' }]}
                        onPress={() => checkValue("To-Do")}
                    >
                        <Text style={{ color: '#FFF', textAlign: 'center', padding: 10, }}>To-Do</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.headerBtn]}
                        onPress={() => checkValue("To-Do")}
                    >
                        <Text style={{ textAlign: 'center', color: 'black', padding: 10, }}>To-Do</Text>
                    </TouchableOpacity>
                }

                {isService == 'Done' ?

                    <TouchableOpacity style={[styles.headerBtn, { backgroundColor: '#4F46BA' }]}
                        onPress={() => checkValue("Done")}
                    >
                        <Text style={{ color: '#FFF', textAlign: 'center', padding: 10, }}>Done</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.headerBtn]}
                        onPress={() => checkValue("Done")}
                    >
                        <Text style={{ textAlign: 'center', color: 'black', padding: 10, }}>Done</Text>
                    </TouchableOpacity>
                }

            </View>

            <View style={{ marginTop: '3%' }}>
                {IsLodding == true ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                    :
                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddTask')}
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

                        {allTask !== undefined && allTask.length > 0 ?
                            <FlatList
                                style={{ height: "85%" }}
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
                            // <Text>test</Text>
                            :
                            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>}
                    </View>
                }
            </View>

            <BottomSheet modalProps={{
                animationType: 'fade',
                hardwareAccelerated: true,
                onRequestClose: () => { setIsVisible(false); },
            }}
                isVisible={isVisible}>

                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Edit Task Manager</Text>
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
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Pressable
                            style={{ marginLeft: '3%' }}
                        // onPress={showDatepicker}
                        >
                            <View style={styles.pickers}>
                                <Image
                                    style={{ height: 17.50, width: 15.91, marginTop: '2%', marginRight: '5%' }}
                                    source={require('../../images/DOB.png')}
                                />
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        style={{ backgroundColor: '', marginTop: '-5%', width: '100%' }}
                                        value={date}
                                        mode={mode}
                                        // is24Hour={true}
                                        display="default"
                                        onChange={onChangeFrom}
                                    />
                                )
                                }
                                {Platform.OS == 'ios' ? <View>
                                    {text == true ?
                                        <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000', }}>From</Text>
                                        :
                                        null
                                    }
                                </View>
                                    :
                                    <View>
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
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setStatus(item.id);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <Image
                                    style={[styles.icon, { height: 22, width: 22 }]}
                                    source={require('../../images/transgender.png')}
                                />)}
                        />
                    </View>

                    {EIsLodding == true ?
                        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '5%' }} />
                        :
                        <View />
                    }

                    <Pressable
                        style={styles.updateBtn}
                        onPress={() => EditFunction(temObject)} >
                        <Text style={styles.textStyle}>Update</Text>
                    </Pressable>
                </View>
            </BottomSheet>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => { setModalVisible2(!modalVisible2); }}
            >
                <View style={styles.centeredView3}>
                    <View style={styles.modalView3}>
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => setModalVisible2(!modalVisible2)}
                        >
                            <Image
                                style={{ margin: '5%', marginRight: '1%', marginTop: '3%', alignSelf: 'flex-end', height: 14, width: 14 }}
                                source={require('../../images/crossImgR.png')}
                            />
                        </TouchableOpacity>
                        <Image
                            source={require('../../images/checkmark-circle.png')}
                            style={{ width: 38.75, height: 38.75 }}
                        />
                        <Text style={[styles.modalText3, { fontWeight: 'bold' }]} >Successfully{'\n'}Deleted</Text>
                        <Pressable
                            style={[styles.button3, styles.buttonClose3, { paddingLeft: '10%', paddingRight: '10%' }]}
                            onPress={() => DeleteSuccessFully()}
                        >
                            <Text style={styles.textStyle3}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={askDelete}
                onRequestClose={() => { setaskDelete(!askDelete); }}>
                <View style={styles.askModel}>
                    <Text style={styles.askTitle}> Are you sure ?</Text>
                    <Text style={styles.askSubtitle}>
                        you want to delete this{'\n'} Task ?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Pressable style={[styles.askBtn, { paddingHorizontal: '6.5%' }]}
                            onPress={() => CencelFunction()}>
                            <Text style={styles.askBtnText}>NO</Text>
                        </Pressable>
                        <View style={{ margin: '5%' }} />
                        <Pressable style={[styles.askBtn, { paddingHorizontal: '5%' }]}
                            onPress={() => DeleteFunction()}  >
                            <Text style={styles.askBtnText}>YES</Text>
                        </Pressable>
                    </View>
                    <View style={{ margin: '2%' }} />
                </View>
            </Modal>
        </View >
    );
}


