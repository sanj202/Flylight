import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, Picker, FlatList, Image, Button, ActivityIndicator,
    Modal, Alert, Pressable, StatusBar, Dimensions} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../../component/header/index'
import { taskmanagerAction, staffMemberAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"

export default function lead_manager({ navigation }) {

    const [Email, setEmail] = useState('')
    const [role, setrole] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [account, setaccount] = useState(null);
    const [isFocus2, setIsFocus2] = useState(false);
    const Roles = [
        { label: 'CEO', value: 1 },
        { label: 'Manager', value: 2 },
        { label: 'Assistant MAnager', value: 3 },
        { label: 'New', value: 4 },
    ];
    const AccountType = [
        { label: 'Administrator', value: 1 },
        { label: 'Editor', value: 2 },
        { label: 'Visitor', value: 3 },
    ];
    const [askDelete, setaskDelete] = useState(false);

    const { width, height } = Dimensions.get('window');


    const [allTask, setallTask] = useState()
    const [IsLodding, setIsLodding] = useState(false)
    const dispatch = useDispatch()
    const isFocused = useIsFocused();

    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)
    const taskList = useSelector(state => state.taskmanager.getList)
    const inviteResponse = useSelector(state => state.staffMember.inviteData)



    useEffect(() => {
        if (loginData || registerData && isFocused) {
            if (loginData.status == "success") {
                dispatch(taskmanagerAction.TaskList(
                    loginData.data.token,
                    loginData.data.uid,
                    loginData.data.cProfile.toString(),
                    loginData.data.user.org_id.toString()
                ));
            }
            else if (registerData.status == "success") {
                dispatch(taskmanagerAction.TaskList(
                    registerData.data.token,
                    registerData.data.uid,
                    registerData.data.cProfile.toString(),
                    registerData.data.org_id.toString()
                ));
            }
            setIsLodding(true)
        }
    }, [loginData, registerData, isFocused])

    useEffect(() => {
        if (taskList) {
            if (taskList.status == "200") {
                setallTask(taskList.data)
                setIsLodding(false)
            }
            else if (taskList.status == "failed") {
                setIsLodding(false)
            }
            else if (taskList.status == "fail") {

                setIsLodding(false)
                Alert.alert(taskList.message)
            }
            else {
                setIsLodding(false)
            }
        }
        else {

        }
    }, [taskList])

    useEffect(() => {
        if (inviteResponse) {
            if (inviteResponse.status == "success") {
                setIsLodding(false)
                Alert.alert(inviteResponse.message)
                dispatch(staffMemberAction.clearResponse())
            }
            else if (inviteResponse.status == "failed") {
                setIsLodding(false)
                Alert.alert(inviteResponse.message)
                dispatch(staffMemberAction.clearResponse())
            }
            else if (inviteResponse.status == "fail") {
                setIsLodding(false)
                Alert.alert(inviteResponse.message)
                dispatch(staffMemberAction.clearResponse())
            }
            else {
                setIsLodding(false)
            }
            setaskDelete(false)
        }
        else {
        }
    }, [inviteResponse])

    const CencelFunction = () => {
        // settempType('')
        setEmail("")
        setaskDelete(!askDelete)
    }

    const invite_Members = () => {

        // Email,
        // role,
        // account

        if (loginData.status == "success") {
            setIsLodding(true)
            const data = {
                uid: loginData.data.uid,
                profile_id: loginData.data.cProfile.toString(),
                org_uid: loginData.data.org_uid,
                role: role,
                account_type: account,
                email: Email,
            }
            dispatch(staffMemberAction.Invitation(data, loginData.data.token))
        }
        else if (registerData.status == "success") {
            setIsLodding(true)
            const data = {
                uid: registerData.data.uid,
                profile_id: registerData.data.cProfile.toString(),
                org_uid: registerData.data.org_uid,
                role: role,
                account_type: account,
                email: Email,
            }
            dispatch(staffMemberAction.Invitation(data, registerData.data.token));
        }
    }

    return (
        <View style={styles.container}>
            <Header
                style={{ height: "14%" }}
                onPressLeft={() => {
                    //   navigation.openDrawer()
                    navigation.goBack()
                }}
                title='Staff Members'
                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />
            <View style={{ marginTop: '3%' }}>
                {IsLodding == true ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                    :
                    <View>
                        <TouchableOpacity
                            onPress={() => setaskDelete(!askDelete)}
                            style={{
                                backgroundColor: '#73f233',
                                padding: 5,
                                alignSelf: 'flex-end',
                                marginHorizontal: '5%',
                                marginVertical: '2%',
                                borderRadius: 5
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 16 }}>
                                Add Members
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.listData}>
                            <Image
                                style={{ height: 48, width: 48, marginTop: '2%', marginRight: '2%' }}
                                source={require('../../images/profileCall.png')}
                            />
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Johne Doe</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: 'black', fontFamily: 'Roboto', fontSize: 12, color: '#0F0F0F' }}>Meeting with Mr. George</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>

                                    <TouchableOpacity>
                                        <Image
                                            style={{ height: 22, width: 22, marginTop: '8%', marginRight: '5%' }}
                                            source={require('../../images/to-do.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    // onPress={() => EditTask()}
                                    >
                                        <Image
                                            style={{ height: 22, width: 22, marginTop: '8%', marginRight: '5%' }}
                                            source={require('../../images/editCall.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    // onPress={() => DeleteTask()}
                                    >
                                        <Image
                                            style={{ height: 22, width: 22, marginTop: '8%', }}
                                            source={require('../../images/deleteCall.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Image
                                style={{ height: 10, width: 10, marginTop: '2%' }}
                                source={require('../../images/material-call.png')}
                            />

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginTop: '4%', color: 'black', fontSize: 10 }}>+91 1234567890</Text>
                                <Text style={{ marginTop: '20%', textAlign: 'right', marginRight: '2%', color: 'black', fontSize: 11 }}>Wed, 08 Sep ,{'\n'}14:00PM</Text>
                            </View>
                        </View>

                    </View>}

            </View>

            <Modal animationType="slide" transparent={true} visible={askDelete}
                onRequestClose={() => { setaskDelete(!askDelete); }}>
                <View style={styles.askModel}>
                    <Text style={styles.askTitle}> Invite New Member</Text>
                    <Text style={styles.askSubtitle}>
                        *Please Enter Active Email Id*</Text>
                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, {
                                height: 18, width: '7%',
                                marginRight: '1.5%', marginTop: '4%'
                            }]}
                            source={require('../../images/mail.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={Email}
                            onChangeText={e1 => setEmail(e1)}
                            placeholder="Enter Email" />
                    </View>

                    <Dropdown
                        style={styles.dropdown3}
                        placeholderStyle={styles.placeholderStyle3}
                        selectedTextStyle={styles.selectedTextStyle3}
                        iconStyle={styles.iconStyle3}
                        data={Roles}
                        maxHeight={100}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Role' : '...'}
                        value={role}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setrole(item.value);
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
                    <View style={{ marginTop: '2%' }}>
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={AccountType}
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus2 ? 'Account Type' : '...'}
                            value={account}
                            onFocus={() => setIsFocus2(true)}
                            onBlur={() => setIsFocus2(false)}
                            onChange={item => {
                                setaccount(item.value);
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

                    {IsLodding == true ?
                        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                        :
                        <View />
                    }


                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: '3%' }}>
                        <Pressable
                            style={[styles.askBtn, { paddingHorizontal: '5%' }]}
                            onPress={() => CencelFunction()}
                        >
                            <Text style={styles.askBtnText}>Cancel</Text>
                        </Pressable>
                        <View style={{ margin: '5%' }} />
                        <Pressable
                            style={[styles.askBtn, { paddingHorizontal: '6.5%' }]}
                            onPress={() => invite_Members()}
                        >
                            <Text style={styles.askBtnText}>Send</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View >
    );
}


