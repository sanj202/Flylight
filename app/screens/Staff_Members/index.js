import React, { useState, useEffect } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, TextInput, Picker, FlatList, Image, Button, ActivityIndicator,
    Modal, Alert, Pressable, StatusBar, Dimensions
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import moment from 'moment';
import Header from '../../component/header/index'
import { taskmanagerAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"

export default function lead_manager({ navigation }) {

    const [fname, setfname] = useState('')
    const [title, settitle] = useState('')
    const [gender, setgender] = useState(null);
    const [isFocus2, setIsFocus2] = useState(false);
    const data = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
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
                                backgroundColor: 'red',
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
                                        onPress={() => EditTask()}
                                    >
                                        <Image
                                            style={{ height: 22, width: 22, marginTop: '8%', marginRight: '5%' }}
                                            source={require('../../images/editCall.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => DeleteTask()}
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
                        Please Enter Active Email Id  </Text>
                    <View style={styles.inputFields}>
                        <Image
                            style={styles.icon}
                            source={require('../../images/user.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={title}
                            onChangeText={e1 => settitle(e1)}
                            placeholder="Enter Email" />
                    </View>
                    <View style={{ marginTop: '2%' }}>
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={data}
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus2 ? 'Role' : '...'}
                            value={gender}
                            onFocus={() => setIsFocus2(true)}
                            onBlur={() => setIsFocus2(false)}
                            onChange={item => {
                                setgender(item.value);
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
                    <View style={{ marginTop: '2%' }}>
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={data}
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus2 ? 'Account Type' : '...'}
                            value={gender}
                            onFocus={() => setIsFocus2(true)}
                            onBlur={() => setIsFocus2(false)}
                            onChange={item => {
                                setgender(item.value);
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


                    <View style={{ flexDirection: 'row', justifyContent: 'center',marginVertical:'3%' }}>
                        <Pressable
                            style={[styles.askBtn, { paddingHorizontal: '5%' }]}
                        // onPress={() => deleteData()}
                        >
                            <Text style={styles.askBtnText}>YES</Text>
                        </Pressable>
                        <View style={{ margin: '5%' }} />
                        <Pressable
                            style={[styles.askBtn, { paddingHorizontal: '6.5%' }]}
                        // onPress={() => CencelFunction()}
                        >
                            <Text style={styles.askBtnText}>NO</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View >
    );
}


