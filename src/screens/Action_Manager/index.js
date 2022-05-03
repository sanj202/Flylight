import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, TextInput, FlatList, Platform,
    Image, ToastAndroid, Modal, Pressable, Dimensions} from 'react-native';
import { actionmanagerAction } from '../../redux/Actions/index'
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet } from 'react-native-elements';
import Header from '../../component/header/index'
import styles from './styles'
import { useIsFocused } from '@react-navigation/native';

export default function Action_Manager({ navigation }) {
    const [isService, setisService] = useState('Status');
    const [isVisible, setIsVisible] = useState(false);
    const [IsLoddingNew, setIsLoddingNew] = useState(false)
    const [IsLodding, setIsLodding] = useState({
        actionLodding: true,
        statusLodding: true,
        addActionLodding: false,
        addStausLodding: false,
        editDeteteActionLodding: false,
        editDeteteStatusLodding: false,
    })
    const [newAction, setnewAction] = useState()
    const [newStatus, setnewStatus] = useState()
    const [EditingValue, setEditingValue] = useState()
    const [EditingId, setEditingId] = useState()
    const [type, settype] = useState()
    const [allAction, setallAction] = useState([])
    const [allStatus, setallStatus] = useState([])
    const { width, height } = Dimensions.get('window');
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const addActionData = useSelector(state => state.actionmanager.addAction)
    const addStatusData = useSelector(state => state.actionmanager.addStatus)
    const actionList = useSelector(state => state.actionmanager.actionlist)
    const statusList = useSelector(state => state.actionmanager.statuslist)
    const deletestatus = useSelector(state => state.actionmanager.deleteStatus)
    const deleteaction = useSelector(state => state.actionmanager.deleteAction)
    useEffect(() => {
        isFocused ? Get_ActionStatus() : null
    }, [isFocused])
    useEffect(() => {
        if (actionList) {
            if (actionList.status == "200") {
                setallAction(actionList.data)
                setIsLodding({ ...IsLodding, actionLodding: false })
                dispatch(actionmanagerAction.clearActionResponse())
            }
            else if (actionList.status == "fail") {
                setIsLodding({ ...IsLodding, actionLodding: false })
                ToastAndroid.show(leadList.message, ToastAndroid.SHORT);
            }
        }
    }, [actionList])
    useEffect(() => {
        if (statusList) {
            if (statusList.status == "200") {
                setallStatus(statusList.data)
                setIsLodding({ ...IsLodding, statusLodding: false })
                dispatch(actionmanagerAction.clearStatusResponse())
            }
            else if (statusList.status == "fail") {
                setIsLodding({ ...IsLodding, statusLodding: false })
                ToastAndroid.show(statusList.message, ToastAndroid.SHORT);
            }
        }
    }, [statusList])
    useEffect(() => {
        if (addActionData) {
            if (addActionData.status == "success") {
                ToastAndroid.show(addActionData.message, ToastAndroid.SHORT);
                setnewAction('')
                setIsLodding({ ...IsLodding, addActionLodding: false, editDeteteActionLodding: false })
                dispatch(actionmanagerAction.clearAddActionResponse())
                Get_ActionStatus()
            }
            else if (addActionData.status == "failed") {
                setIsLodding({ ...IsLodding, addActionLodding: false, editDeteteActionLodding: false })
                ToastAndroid.show(addActionData.message, ToastAndroid.SHORT);
            }
        }
    }, [addActionData])
    useEffect(() => {
        if (addStatusData) {
            if (addStatusData.status == "success") {
                ToastAndroid.show(addStatusData.message, ToastAndroid.SHORT);
                setnewStatus('')
                setIsLodding({ ...IsLodding, addStausLodding: false, editDeteteStatusLodding: false })
                dispatch(actionmanagerAction.clearAddStatusResponse())
                Get_ActionStatus()
            }
            else if (addStatusData.status == "failed") {
                setIsLodding({ ...IsLodding, addStausLodding: false, editDeteteStatusLodding: false })
                ToastAndroid.show(addStatusData.message, ToastAndroid.SHORT);
            }
        }
    }, [addStatusData])
    useEffect(() => {
        if (deleteaction) {
            if (deleteaction.status == "200") {
                ToastAndroid.show(deleteaction.message, ToastAndroid.SHORT);
                setIsLodding({ ...IsLodding, editDeteteActionLodding: false })
                dispatch(actionmanagerAction.clearDeleteActionResponse())
                Get_ActionStatus()
            }
            else if (deleteaction.status == "fail") {
                setIsLodding({ ...IsLodding, editDeteteActionLodding: false })
                ToastAndroid.show(deleteaction.message, ToastAndroid.SHORT);
            }
        }
    }, [deleteaction])

    useEffect(() => {
        if (deletestatus) {
            if (deletestatus.status == "200") {
                ToastAndroid.show(deletestatus.message, ToastAndroid.SHORT);
                setIsLodding({ ...IsLodding, editDeteteStatusLodding: false })
                dispatch(actionmanagerAction.clearDeleteStatusResponse())
                Get_ActionStatus()
            }
            else if (deletestatus.status == "failed") {
                setIsLodding({ ...IsLodding, editDeteteStatusLodding: false })
                ToastAndroid.show(deletestatus.message, ToastAndroid.SHORT);
            }
        }
    }, [deletestatus])
    const checkValue = (value) => {
        setisService(value)
    }
    const Get_ActionStatus = () => {
        const data = {
            uid: loginData.data.uid,
            profile_id: loginData.data.cProfile.toString(),
            org_uid: loginData.data.org_uid
        }
        dispatch(actionmanagerAction.getAction(data, loginData.data.token));
        dispatch(actionmanagerAction.getStatus(data, loginData.data.token));
    }
    const AddActionFunction = (text) => {
        if (text == "Status") {
            if (newStatus == '') {ToastAndroid.show(`Please Enter New ${text}`, ToastAndroid.SHORT);}
            else {
                setIsLodding({...IsLodding,addStausLodding: true})
                const data = { uid: loginData.data.uid,
                    profile_id: loginData.data.cProfile.toString(),
                    status: newStatus,
                    org_uid: loginData.data.org_uid}
                dispatch(actionmanagerAction.add_EditStatus(data, loginData.data.token));
            }
        }
        else {
            if (newAction == '') {ToastAndroid.show(`Please Enter New ${text}`, ToastAndroid.SHORT);}
            else {
                setIsLodding({...IsLodding,addActionLodding: true})
                const data = {uid: loginData.data.uid,
                    profile_id: loginData.data.cProfile.toString(),
                    action: newAction,
                    org_uid: loginData.data.org_uid}
                dispatch(actionmanagerAction.add_EditAction(data, loginData.data.token,));
            }
        }
    }
    const EditDataFunction = (value) => {
        settype(value.text)
        setEditingId(value.Id)
        setEditingValue(value.status)
        setIsVisible(!isVisible)
    }
    const EditData = () => {
        setIsVisible(!isVisible)
        if (type == "Action") {
            setIsLodding({...IsLodding,editDeteteActionLodding: true})
            const data = {uid: loginData.data.uid,
                profile_id: loginData.data.cProfile.toString(),
                action: EditingValue,
                org_uid: loginData.data.org_uid,
                action_id: EditingId}
            dispatch(actionmanagerAction.add_EditAction(data, loginData.data.token));
        }
        else {
            setIsLodding({...IsLodding,editDeteteStatusLodding: true})
            const data = {uid: loginData.data.uid,
                profile_id: loginData.data.cProfile.toString(),
                status: EditingValue,
                org_uid: loginData.data.org_uid,
                status_id: EditingId}
            dispatch(actionmanagerAction.add_EditStatus(data, loginData.data.token));
        }
    }
    const [askDelete, setaskDelete] = useState(false);
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
    const deleteData = () => {
        // setIsLoddingNew(true)
        if (tempType == "Action") {
            setIsLodding({...IsLodding,editDeteteActionLodding: true})
            setaskDelete(!askDelete)
            const data = { uid: loginData.data.uid,
                profile_id: loginData.data.cProfile.toString(),
                org_uid: loginData.data.org_uid,
                action_id: tempId }
            dispatch(actionmanagerAction.delete_Action(data, loginData.data.token));
        }
        else if (tempType == "status") {
            setIsLodding({...IsLodding,editDeteteStatusLodding: true})
            setaskDelete(!askDelete)
            const data = { uid: loginData.data.uid,
                profile_id: loginData.data.cProfile.toString(),
                org_uid: loginData.data.org_uid,
                status_id: tempId}
            dispatch(actionmanagerAction.delete_Status(data, loginData.data.token));
        }
    }
    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        console.log(refreshing)
        Get_ActionStatus()
    }
    const StatusView = ({ item }) => {
        return ( <View style={[styles.listData, { marginTop: '1%', padding: '3%' }]}>
                <Text style={{ marginTop: '2%', fontFamily: 'Roboto', color: '#4A4A4A', fontSize: 13 }}> {item.status} </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => EditDataFunction({ text: 'Status', Id: item.id, status: item.status })}>
                        <Image style={{ height: 25, width: 25, marginTop: '8%', marginRight: '3%' }}
                            source={require('../../images/editCall.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => CheckDeleteFunction({ type: 'status', id: item.id })}>
                        <Image style={{ height: 25, width: 25, marginTop: '8%', }}
                            source={require('../../images/deleteCall.png')} />
                    </TouchableOpacity>
                </View>
            </View> )
    }

    const ActionView = ({ item }) => {
        return ( <View style={[styles.listData, { marginTop: '1%', padding: '3%' }]}>
                <Text style={{ marginTop: '2%', fontFamily: 'Roboto', color: '#4A4A4A', fontSize: 13 }}> {item.action} </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => EditDataFunction({ text: 'Action', Id: item.id, status: item.action })}>
                        <Image style={{ height: 25, width: 25, marginTop: '8%', marginRight: '3%' }}
                            source={require('../../images/editCall.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => CheckDeleteFunction({ type: 'Action', id: item.id })}>
                        <Image style={{ height: 25, width: 25, marginTop: '8%', }}
                            source={require('../../images/deleteCall.png')}/>
                    </TouchableOpacity>
                </View>
            </View>)
    }
    return (
        <View style={{ flex: 1 }}>
            <Header onPressLeft={() => { navigation.openDrawer() }}
                title='Action Manager'
                onPressRight={() => { navigation.navigate('Notification') }}
            />
            <View style={styles.headerTitleBtn}>
                {isService == 'Action' ?
                    <TouchableOpacity style={[styles.headerBtn, { backgroundColor: '#4F46BA' }]} onPress={() => checkValue("Action")}>
                        <Text style={{ color: '#FFF', padding: 10, }}>Action</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.headerBtn} onPress={() => checkValue("Action")}>
                        <Text style={{ padding: 5, color: 'black', padding: 10, }}>Action</Text>
                    </TouchableOpacity>
                }
                {isService == 'Status' ?
                    <TouchableOpacity style={[styles.headerBtn, { backgroundColor: '#4F46BA' }]} onPress={() => checkValue("Status")}>
                        <Text style={{ color: '#FFF', padding: 10, }}>Status</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.headerBtn} onPress={() => checkValue("Status")}>
                        <Text style={{ padding: 5, color: 'black', padding: 10, }}>Status</Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={{ flex: 1, marginVertical: '2%', marginHorizontal: '3%' }}>
                {IsLodding.statusLodding && IsLodding.actionLodding == true ?
                    <ActivityIndicator size="small" color="#0000ff" />
                    :
                    <View style={{ flex: 1, marginHorizontal: '1%' }}>
                        { isService == "Status" ?
                                <View style={{ flex: 1 }}>
                                    <View style={[styles.listData1]}>
                                        <Text style={styles.title}>Add Status</Text>
                                        <View style={styles.listData}>
                                            <Image style={Platform.OS == 'ios' ?
                                                [styles.icon, { height: 24, width: 26, marginHorizontal: '2%' }]
                                                :
                                                [styles.icon, { height: 24, width: 26, marginHorizontal: '2%', marginTop: '4%' }]}
                                                source={require('../../images/statusnet.png')}
                                            />
                                            <TextInput
                                                style={{ flex: 1 }}
                                                value={newStatus}
                                                onChangeText={e2 => setnewStatus(e2)}
                                                placeholder="Enter Status"
                                            />
                                        </View>
                                        {IsLodding.addStausLodding == true ?
                                            <ActivityIndicator size="small" color="#0000ff" style={{ marginVertical: '5%' }} />
                                            :
                                            <View style={{ height: '8%' }} />}
                                    </View>
                                    <TouchableOpacity onPress={() => AddActionFunction("Status")} style={styles.buttonClose3} >
                                        <Text style={styles.textStyle3}>Save Status</Text>
                                    </TouchableOpacity>
                                    <View style={[styles.listData1, { flex: 1 }]}>
                                        <Text style={styles.title}>Status</Text>
                                        {IsLodding.editDeteteStatusLodding == true ?
                                            <ActivityIndicator size="small" color="#0000ff" style={{ marginVertical: '5%' }} />
                                            :
                                            <FlatList
                                                data={allStatus}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={StatusView}
                                                ListEmptyComponent={() => (!allStatus.length ?
                                                    <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>Data Not Found</Text>
                                                    : null)}
                                                refreshing={refreshing}
                                                onRefresh={handleRefresh}
                                            />
                                        }
                                    </View>
                                </View>
                                :
                                isService == "Action" ?
                                    <View style={{ flex: 1 }}>
                                        <View style={[styles.listData1]}>
                                            <Text style={styles.title}>Add Action</Text>
                                            <View style={styles.listData}>
                                                <Image style={Platform.OS == 'ios' ?
                                                    [styles.icon, { height: 24, width: 26, marginHorizontal: '2%' }]
                                                    :
                                                    [styles.icon, { height: 24, width: 26, marginHorizontal: '2%', marginTop: '4%' }]}
                                                    source={require('../../images/statusnet.png')}
                                                />
                                                <TextInput
                                                    style={{ flex: 1 }}
                                                    value={newAction}
                                                    onChangeText={e => setnewAction(e)}
                                                    placeholder="Enter Action"
                                                />
                                            </View>
                                            {IsLodding.addActionLodding == true ?
                                                <ActivityIndicator size="small" color="#0000ff" style={{ marginVertical: '5%' }} />
                                                :
                                                <View style={{ height: '8%' }} />}
                                        </View>
                                        <TouchableOpacity onPress={() => AddActionFunction("Action")} style={styles.buttonClose3} >
                                            <Text style={styles.textStyle3}>Save Status</Text>
                                        </TouchableOpacity>

                                        <View style={[styles.listData1, { flex: 1 }]}>
                                            <Text style={styles.title}>Actions</Text>
                                            {IsLodding.editDeteteActionLodding == true ?
                                                <ActivityIndicator size="small" color="#0000ff" style={{ marginVertical: '5%' }} />
                                                :
                                                <FlatList
                                                    data={allAction}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    renderItem={ActionView}
                                                    ListEmptyComponent={() => (!allAction.length ?
                                                        <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>Data Not Found</Text>
                                                        : null)}
                                                    refreshing={refreshing}
                                                    onRefresh={handleRefresh}
                                                />}
                                        </View>
                                    </View>
                                    :
                                    null }
                    </View> }
            </View>
            <BottomSheet modalProps={{ animationType: 'fade', hardwareAccelerated: true,
                    onRequestClose: () => { setIsVisible(false); }}} isVisible={isVisible}>
                <View style={{ backgroundColor: '#fff', padding: '5%', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                    <Text style={styles.modalText3}>Edit {isService} Manager</Text>
                    <View style={styles.listDataModal}>
                        <Image style={[styles.icon, { height: 24, width: 26, marginTop: '4%', marginHorizontal: '1.5%' }]}
                            source={require('../../images/statusnet.png')}/>
                        <TextInput
                            style={{ flex: 1 }}
                            value={EditingValue}
                            onChangeText={e45 => setEditingValue(e45)}
                            placeholder="Enter new Value"
                        />
                    </View>
                    <Pressable style={[styles.buttonClose3, { marginTop: '5%' }]} onPress={() => EditData()}>
                        <Text style={[styles.textStyle3]}>Update</Text>
                    </Pressable>
                </View>
            </BottomSheet>
            <Modal animationType="slide" transparent={true} visible={askDelete}
                onRequestClose={() => { setaskDelete(!askDelete); }}>
                <View style={styles.askModel}>
                    <Text style={styles.askTitle}> Are you sure ?</Text>
                    <Text style={styles.askSubtitle}> you want to delete this{'\n'}{tempType} ?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Pressable style={[styles.askBtn, { paddingHorizontal: '5%' }]} onPress={() => deleteData()}>
                            <Text style={styles.askBtnText}>YES</Text>
                        </Pressable>
                        <View style={{ margin: '5%' }} />
                        <Pressable style={[styles.askBtn, { paddingHorizontal: '6.5%' }]} onPress={() => CencelFunction()}>
                            <Text style={styles.askBtnText}>NO</Text>
                        </Pressable>
                    </View>
                    <View style={{ margin: '2%' }} />
                </View>
            </Modal>
        </View >
    );
}