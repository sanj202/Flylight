import React, { useState, useEffect } from 'react';
import {ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, TextInput, Picker, FlatList, Platform,
    Image, Button, ScrollView, Modal, Alert, Pressable, StatusBar, Dimensions} from 'react-native';
import { actionmanagerAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { BottomSheet, ListItem } from 'react-native-elements';
import Header from '../../component/header/index'
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"

export default function action_manager({ navigation }) {

    const [isService, setisService] = useState('Status');
    const [isVisible, setIsVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [IsLodding, setIsLodding] = useState(false)

    const checkValue = (value) => {
        setisService(value)
    }

    const [newAction, setnewAction] = useState()
    const [newStatus, setnewStatus] = useState()
    const [EditingValue, setEditingValue] = useState()
    const [EditingId, setEditingId] = useState()
    const [type, settype] = useState()
    const [allAction, setallAction] = useState()
    const [allStatus, setallStatus] = useState()

    const { width, height } = Dimensions.get('window');

    const dispatch = useDispatch()
    const isFocused = useIsFocused();

    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)

    const addActionData = useSelector(state => state.actionmanager.addAction)
    const addStatusData = useSelector(state => state.actionmanager.addStatus)

    const actionList = useSelector(state => state.actionmanager.actionlist)
    const statusList = useSelector(state => state.actionmanager.statuslist)

    const deletestatus = useSelector(state => state.actionmanager.deleteStatus)
    const deleteaction = useSelector(state => state.actionmanager.deleteAction)

    useEffect(() => {
        if (loginData || registerData && isFocused) {
            if (loginData.status == "success") {
                const data = {
                    uid: loginData.data.uid,
                    profile_id: loginData.data.cProfile.toString(),
                    org_uid: loginData.data.org_uid,
                }
                dispatch(actionmanagerAction.getAction(data, loginData.data.token));
                dispatch(actionmanagerAction.getStatus(data, loginData.data.token));
                setIsLodding(true)
            }
            else if (registerData.status == "success") {
                const data = {
                    uid: registerData.data.uid,
                    profile_id: registerData.data.cProfile.toString(),
                    org_uid: registerData.data.org_uid,
                }
                dispatch(actionmanagerAction.getAction(data, registerData.data.token));
                dispatch(actionmanagerAction.getStatus(data, registerData.data.token));
                setIsLodding(true)
            }
        }
    }, [loginData,registerData, isFocused])


    useEffect(() => {
        if (actionList) {
            if (actionList.status == "200") {
                setallAction(actionList.data)
                setIsLodding(false)
                dispatch(actionmanagerAction.clearActionResponse())
            }
            else if (actionList.status == "failed") {
                setIsLodding(false)
                Alert.alert(leadList.message)
            }
            else if (actionList.status == "fail") {
                setIsLodding(false)
                Alert.alert(actionList.message)
            }
            else {
                setIsLodding(false)
            }
        }
        else {
        }
    }, [actionList])

    useEffect(() => {
        if (statusList) {
            if (statusList.status == "200") {
                setallStatus(statusList.data)
                setIsLodding(false)
                dispatch(actionmanagerAction.clearStatusResponse())
            }
            else if (statusList.status == "failed") {
                setIsLodding(false)
                Alert.alert(statusList.message)
            }
            else if (statusList.status == "fail") {
                setIsLodding(false)
                Alert.alert(statusList.message)
            }
            else {
                setIsLodding(false)
            }
        }
        else {
        }
    }, [statusList])

    const Get_ActionStatus = () => {
        if (loginData.status == "success") {
            const data = {
                uid: loginData.data.uid,
                profile_id: loginData.data.cProfile.toString(),
                org_uid: loginData.data.org_uid,
            }
            dispatch(actionmanagerAction.getAction(data, loginData.data.token));
            dispatch(actionmanagerAction.getStatus(data, loginData.data.token));
            setIsLodding(true)
        }
        else if (registerData.status == "success") {
            const data = {
                uid: registerData.data.uid,
                profile_id: registerData.data.cProfile.toString(),
                org_uid: registerData.data.org_uid,
            }
            dispatch(actionmanagerAction.getAction(data, registerData.data.token));
            dispatch(actionmanagerAction.getStatus(data, registerData.data.token));
            setIsLodding(true)
        }
        setIsLodding(true)
    }

    const AddActionFunction = (text) => {
        if (loginData || registerData ) {
            if (loginData.status == "success") {
                if (text == "Status") {
                    const data = {
                        uid: loginData.data.uid,
                        profile_id: loginData.data.cProfile.toString(),
                        orgId: loginData.data.user.org_id.toString(),
                        status: newStatus,
                        org_uid: loginData.data.org_uid,
                    }
                    dispatch(actionmanagerAction.add_EditStatus(data, loginData.data.token));
                }
                else {
                    const data = {
                        uid: loginData.data.uid,
                        profile_id: loginData.data.cProfile.toString(),
                        orgId: loginData.data.user.org_id.toString(),
                        action: newAction,
                        org_uid: loginData.data.org_uid,
                    }
                    dispatch(actionmanagerAction.add_EditAction(data, loginData.data.token,));
                }
            }
            else if (registerData.status == "success") {
                if (text == "Status") {
                    const data = {
                        uid: registerData.data.uid,
                        profile_id: registerData.data.cProfile.toString(),
                        orgId: registerData.data.org_id.toString(),
                        status: newStatus,
                        org_uid: registerData.data.org_uid,
                    }
                    dispatch(actionmanagerAction.add_EditStatus(data, registerData.data.token));
                }
                else {
                    const data = {
                        uid: registerData.data.uid,
                        profile_id: registerData.data.cProfile.toString(),
                        orgId: registerData.data.org_id.toString(),
                        action: newAction,
                        org_uid: registerData.data.org_uid,
                    }
                    dispatch(actionmanagerAction.add_EditAction(data, registerData.data.token,));
                }
            }
            setIsLodding(true)
        }
    }

    useEffect(() => {
        if (addActionData) {
            if (addActionData.status == "success") {
                Alert.alert(addActionData.message)
                setIsLodding(false)
                setnewAction('')
                dispatch(actionmanagerAction.clearAddActionResponse())
                Get_ActionStatus()
            }
            else if (addActionData.status == "failed") {
                setIsLodding(false)
                Alert.alert(leadList.message)
            }
            else if (addActionData.status == "fail") {
                setIsLodding(false)
                Alert.alert(addActionData.message)
            }
            else {
                setIsLodding(false)
            }
        }
        else {
        }
    }, [addActionData])

    useEffect(() => {
        if (addStatusData) {
            if (addStatusData.status == "success") {
                Alert.alert(addStatusData.message)
                setnewStatus('')
                setIsLodding(false)
                dispatch(actionmanagerAction.clearAddStatusResponse())
                Get_ActionStatus()
            }
            else if (addStatusData.status == "failed") {
                setIsLodding(false)
            }
            else if (addStatusData.status == "fail") {
                setIsLodding(false)
                Alert.alert(addStatusData.message)
            }
            else {
                setIsLodding(false)
            }
        }
        else {
        }
    }, [addStatusData])

    const EditDataFunction = (value) => {
        settype(value.text)
        setEditingId(value.Id)
        setEditingValue(value.status)
        setIsVisible(!isVisible)
    }

    const EditData = (value) => {
        setIsVisible(!isVisible)
        if (loginData || registerData ) {
            if (loginData.status == "success") {
                if (type == "Action") {
                    const data = {
                        uid: loginData.data.uid,
                        profile_id: loginData.data.cProfile.toString(),
                        orgId: loginData.data.user.org_id.toString(),
                        action: EditingValue,
                        org_uid: loginData.data.org_uid,
                        action_id: EditingId
                    }
                    dispatch(actionmanagerAction.add_EditAction(data, loginData.data.token));
                }
                else {
                    // console.log("satsu........................edit")
                    const data = {
                        uid: loginData.data.uid,
                        profile_id: loginData.data.cProfile.toString(),
                        orgId: loginData.data.user.org_id.toString(),
                        status: EditingValue,
                        org_uid: loginData.data.org_uid,
                        status_id: EditingId
                    }
                    dispatch(actionmanagerAction.add_EditStatus(data, loginData.data.token));
                }
                setIsLodding(true)
            }
            else if (registerData.status == "success") {
                    if (type == "Action") {
                        const data = {
                            uid: registerData.data.uid,
                            profile_id: registerData.data.cProfile.toString(),
                            orgId: registerData.data.org_id.toString(),
                            action: EditingValue,
                            org_uid: registerData.data.org_uid,
                            action_id: EditingId
                        }
                        dispatch(actionmanagerAction.add_EditAction(data, registerData.data.token));
                    }
                    else {
                        // console.log("satsu........................edit")
                        const data = {
                            uid: registerData.data.uid,
                            profile_id: registerData.data.cProfile.toString(),
                            orgId: registerData.data.org_id.toString(),
                            status: EditingValue,
                            org_uid: registerData.data.org_uid,
                            status_id: EditingId
                        }
                        dispatch(actionmanagerAction.add_EditStatus(data, registerData.data.token));
                    }
                    setIsLodding(true)
                }
        }
        // setModalVisible4(!modalVisible4)

        // if (value == 'Status') {
        //     setModalVisible(!modalVisible)
        //     setModalVisible4(!modalVisible4)
        // }
        // else {
        //     setModalVisible3(!modalVisible3)
        //     setModalVisible4(!modalVisible4)
        // }
    }

    const deleteData = (value) => {
        if (loginData || registerData ) {
            if (loginData.status == "success") {
                if (value.type == "Delete_Action") {
                    const data = {
                        uid: loginData.data.uid,
                        profile_id: loginData.data.cProfile.toString(),
                        orgId: loginData.data.user.org_id.toString(),
                        action: EditingValue,
                        org_uid: loginData.data.org_uid,
                        action_id: value.id
                    }
                    dispatch(actionmanagerAction.delete_Action(data, loginData.data.token));
                }
                else if (value.type == "Delete_status") {
                    const data = {
                        uid: loginData.data.uid,
                        profile_id: loginData.data.cProfile.toString(),
                        orgId: loginData.data.user.org_id.toString(),
                        status: EditingValue,
                        org_uid: loginData.data.org_uid,
                        status_id: value.id
                    }
                    dispatch(actionmanagerAction.delete_Status(data, loginData.data.token));
                }
                else {
                }
                setIsLodding(true)
            }
            else if (registerData.status == "success") {
                if (value.type == "Delete_Action") {
                    const data = {
                        uid: registerData.data.uid,
                        profile_id: registerData.data.cProfile.toString(),
                        orgId: registerData.data.org_id.toString(),
                        action: EditingValue,
                        org_uid: registerData.data.org_uid,
                        action_id: value.id
                    }
                    dispatch(actionmanagerAction.delete_Action(data, registerData.data.token));
                }
                else if (value.type == "Delete_status") {
                    const data = {
                        uid: registerData.data.uid,
                        profile_id: registerData.data.cProfile.toString(),
                        orgId: registerData.data.org_id.toString(),
                        status: EditingValue,
                        org_uid: registerData.data.org_uid,
                        status_id: value.id
                    }
                    dispatch(actionmanagerAction.delete_Status(data, registerData.data.token));
                }
                else {
                }
                setIsLodding(true)
            }
        }



        // setModalVisible4(!modalVisible4)
        // if (value == 'Status') {
        //     setModalVisible(!modalVisible)
        //     setModalVisible4(!modalVisible4)
        // }
        // else {
        //     setModalVisible3(!modalVisible3)
        //     setModalVisible4(!modalVisible4)
        // }
    }

    useEffect(() => {
        if (deleteaction) {
            if (deleteaction.status == "200") {
                Alert.alert(deleteaction.message)
                setIsLodding(false)
                dispatch(actionmanagerAction.clearDeleteActionResponse())
                Get_ActionStatus()
            }
            else if (deleteaction.status == "failed") {
                setIsLodding(false)
                Alert.alert(leadList.message)
            }
            else if (deleteaction.status == "fail") {
                setIsLodding(false)
                Alert.alert(deleteaction.message)
            }
            else {
                setIsLodding(false)
            }
        }
        else {
        }
    }, [deleteaction])

    useEffect(() => {
        if (deletestatus) {
            if (deletestatus.status == "200") {
                Alert.alert(deletestatus.message)
                setIsLodding(false)
                dispatch(actionmanagerAction.clearDeleteStatusResponse())
                Get_ActionStatus()
            }
            else if (deletestatus.status == "failed") {
                setIsLodding(false)
                Alert.alert(leadList.message)
            }
            else if (deletestatus.status == "fail") {
                setIsLodding(false)
                Alert.alert(deletestatus.message)
            }
            else {
                setIsLodding(false)
            }
        }
        else {
        }
    }, [deletestatus])

    const StatusView = ({ item }) => {
        return (
            <View style={[styles.listData, { marginTop: '1%' }]}>
                <Text style={{ marginTop: '2%', fontFamily: 'Roboto', color: '#4A4A4A', fontSize: 13 }}> {item.status} </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => EditDataFunction({ text: 'Status', Id: item.id, status: item.status })}
                    >
                        <Image
                            style={{ height: 25, width: 25, marginTop: '8%', marginRight: '3%' }}
                            source={require('../../images/editCall.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => deleteData({ type: 'Delete_status', id: item.id })}
                    // onPress={() => setModalVisible2(true)}
                    >
                        <Image
                            style={{ height: 25, width: 25, marginTop: '8%', }}
                            source={require('../../images/deleteCall.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const ActionView = ({ item }) => {
        return (
            <View style={[styles.listData, { marginTop: '1%' }]}>
                <Text style={{ marginTop: '2%', fontFamily: 'Roboto', color: '#4A4A4A', fontSize: 13 }}> {item.action} </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => EditDataFunction({ text: 'Action', Id: item.id, status: item.action })}
                    >
                        <Image
                            style={{ height: 25, width: 25, marginTop: '8%', marginRight: '3%' }}
                            source={require('../../images/editCall.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        // onPress={() => setModalVisible2(true)}
                        onPress={() => deleteData({ type: 'Delete_Action', id: item.id })}
                    >
                        <Image
                            style={{ height: 25, width: 25, marginTop: '8%', }}
                            source={require('../../images/deleteCall.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
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
                title='Action Manager'
                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />
            <View
                style={{
                    flexDirection: 'row',
                    marginLeft: '20%',
                    marginRight: '20%',
                    marginTop: '-4%',
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 35,

                }}>
                {isService == 'Action' ?
                    <TouchableOpacity style={{
                        backgroundColor: '#4F46BA',
                        borderRadius: 20, paddingLeft: 20, paddingRight: 20, paddding: 10,
                    }}
                        onPress={() => checkValue("Action")}
                    >
                        <Text style={{ color: '#FFF', padding: 10, }}>Action</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={{ borderRadius: 20, paddingLeft: 20, paddingRight: 20, paddding: 10, }}
                        onPress={() => checkValue("Action")}
                    >
                        <Text style={{ padding: 5, color: 'black', padding: 10, }}>Action</Text>
                    </TouchableOpacity>
                }
                {isService == 'Status' ?
                    <TouchableOpacity style={{
                        backgroundColor: '#4F46BA',
                        borderRadius: 20, paddingLeft: 20, paddingRight: 20, paddding: 10,
                    }}
                        onPress={() => checkValue("Status")}
                    >
                        <Text style={{ color: '#FFF', padding: 10, }}>Status</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={{ borderRadius: 20, paddingLeft: 20, paddingRight: 20, paddding: 10, }}
                        onPress={() => checkValue("Status")}
                    >
                        <Text style={{ padding: 5, color: 'black', padding: 10, }}>Status</Text>
                    </TouchableOpacity>
                }
            </View>
            {IsLodding == true ?
                <ActivityIndicator size="small" color="#0000ff" />
                :
                <View>
                    {
                        isService == "Status" ?
                            <View style={{ marginLeft: '3%', marginRight: '3%' }}>
                                <View style={{ marginTop: '4%' }}>
                                    <View style={{ marginTop: '2.5%' }}>
                                        <View style={[styles.listData1, { paddingBottom: "10%" }]}>
                                            <Text style={{ marginLeft: '3%', fontSize: 19, fontWeight: 'bold', color: '#2D2D2D', paddingTop: '1%', padding: '2%' }}>Add Status</Text>
                                            <View style={styles.listData}>
                                                <Image
                                                    style={
                                                        Platform.OS == 'ios' ?
                                                            [styles.icon, { height: 24, width: 26, marginHorizontal: '2%' }]
                                                            :
                                                            [styles.icon, { height: 24, width: 26, marginHorizontal: '2%', marginTop: '5%' }]}
                                                    source={require('../../images/statusnet.png')}
                                                />
                                                <TextInput
                                                    style={{ flex: 1 }}
                                                    value={newStatus}
                                                    onChangeText={e2 => setnewStatus(e2)}
                                                    placeholder="Enter Status"
                                                />

                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => AddActionFunction("Status")}
                                            style={styles.buttonClose3}
                                        >
                                            <Text style={styles.textStyle3}>Save Status</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ marginTop: '10%' }}>
                                    <View style={[styles.listData1]}>
                                        <Text style={{
                                            marginLeft: '3%',
                                            fontSize: 19,
                                            fontFamily: 'Roboto',
                                            fontWeight: 'bold', color: '#2D2D2D', padding: '3%'
                                        }}>Status</Text>
                                        {allStatus !== undefined && allStatus.length > 0 ?
                                            <FlatList
                                                style={
                                                    Platform.OS == 'ios' ?
                                                        { height: "69%" }
                                                        :
                                                        { height: "58%" }}
                                                data={allStatus}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={StatusView}
                                            />
                                            :
                                            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>
                                        }
                                    </View>
                                </View>

                            </View>
                            :
                            <View />
                    }
                    {
                        isService == "Action" ?
                            <View style={{ marginLeft: '3%', marginRight: '3%' }}>
                                <View style={{ marginTop: '4%' }}>
                                    <View style={{ marginTop: '2.5%' }}>
                                        <View style={[styles.listData1, { paddingBottom: "10%" }]}>
                                            <Text style={{ marginLeft: '3%', fontSize: 19, fontWeight: 'bold', color: '#2D2D2D', paddingTop: '1%', padding: '2%' }}>Add Action</Text>
                                            <View style={styles.listData}>
                                                <Image
                                                    style={
                                                        Platform.OS == 'ios' ?
                                                            [styles.icon, { height: 24, width: 26, marginHorizontal: '2%' }]
                                                            :
                                                            [styles.icon, { height: 24, width: 26, marginHorizontal: '2%', marginTop: '5%' }]}
                                                    source={require('../../images/statusnet.png')}
                                                />
                                                <TextInput style={{ flex: 1 }}
                                                    value={newAction}
                                                    onChangeText={e => setnewAction(e)}
                                                    placeholder="Enter Action"
                                                />
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => AddActionFunction("Action")}
                                            style={styles.buttonClose3}
                                        >
                                            <Text style={styles.textStyle3}>Save Action</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ marginTop: '10%' }}>
                                    <View style={[styles.listData1,]}>
                                        <Text style={{ marginLeft: '3%', fontSize: 19, fontFamily: 'Roboto', fontWeight: 'bold', color: '#2D2D2D', padding: '3%' }}>Actions</Text>
                                        {allAction !== undefined && allAction.length > 0 ?
                                            <FlatList
                                                style=
                                                {Platform.OS == 'ios' ?
                                                    { height: "69%" }
                                                    :
                                                    { height: "58%" }}
                                                data={allAction}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={ActionView}
                                            />
                                            :
                                            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>
                                        }
                                    </View>
                                </View>
                            </View>
                            :
                            <View />
                    }
                </View>
            }

            <BottomSheet
                modalProps={{
                    animationType: 'fade',
                    hardwareAccelerated: true,
                    onRequestClose: () => {
                        setIsVisible(false);
                    },
                }}
                isVisible={isVisible}>
                <View style={{ backgroundColor: '#fff', padding: '5%', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                    <Text style={styles.modalText3}>Edit {isService} Manager</Text>
                    <View style={styles.listDataModal}>
                        <Image
                            style={[styles.icon, { height: 24, width: 26, marginTop: '5%', marginLeft: '2%' }]}
                            source={require('../../images/statusnet.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={EditingValue}
                            onChangeText={e45 => setEditingValue(e45)}
                            placeholder="Enter new Value"
                        />
                    </View>
                    <Pressable
                        style={[styles.buttonClose2Modal, { marginLeft: '20%', marginRight: '20%' }]}
                        onPress={() => EditData()}
                    >
                        <Text style={[styles.textStyle3]}>Update</Text>
                    </Pressable>
                </View>

            </BottomSheet>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setModalVisible2(!modalVisible2);
                }}
            >
                <View style={styles.centeredView3} >

                    <View style={styles.modalView3}>
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end' }}
                            // onPress={() => DeleteFunction()}
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
                        <Text style={[styles.modalText3Modal, { fontWeight: 'bold' }]}>Deleted{'\n'}Successfully</Text>

                        <Pressable
                            style={[styles.buttonClose2Modal, {
                                paddingRight: 30, paddingLeft: 30,
                                paddingTop: 5, paddingBottom: 5, marginTop: '1%',
                            }]}
                            // onPress={() => DeleteFunction()}
                            >
                            <Text style={{ fontSize: 21, color: '#FFFFFF', textAlign: 'center', padding: 5, paddingLeft: 20, paddingRight: 20 }}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible4}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setModalVisible4(!modalVisible4);
                }}
            >
                <View style={styles.centeredView3}>

                    <View style={styles.modalView3}>


                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => setModalVisible4(!modalVisible4)}
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
                        <Text style={[styles.modalText3Modal, { fontWeight: 'bold' }]}> {isService} Add {'\n'} Successfully</Text>

                        <Pressable
                            style={[styles.buttonClose2Modal, { paddingRight: 20, paddingLeft: 20, paddingTop: 5, paddingBottom: 5, marginTop: '1%' }]}


                            onPress={() => setModalVisible4(!modalVisible4)}
                        >
                            <Text style={{ fontSize: 21, color: '#FFFFFF', textAlign: 'center', padding: 5, paddingLeft: 20, paddingRight: 20 }}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View >
    );
}


