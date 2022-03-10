import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ToastAndroid, Picker, FlatList, Image, Button, ActivityIndicator,
    Modal, Alert, Pressable, StatusBar, Dimensions} from 'react-native';
import moment from 'moment';
import Header from '../../component/header/index'
import { taskmanagerAction, organizationAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"
import RazorpayCheckout from 'react-native-razorpay';

export default function lead_manager({ navigation }) {

    const [packegeVisible, setpackegeVisible] = useState(false);

    const [isService, setisService] = useState('Package');
    const [modalVisible2, setModalVisible2] = useState(false);
    const [askDelete, setaskDelete] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [allTask, setallTask] = useState()
    const [Status, setStatus] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [IsLodding, setIsLodding] = useState(false)
    const [EIsLodding, setEIsLodding] = useState(false)
    const [title, settitle] = useState('')
    const { width, height } = Dimensions.get('window');

    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)
    const taskList = useSelector(state => state.taskmanager.getList)
    const deleteTask = useSelector(state => state.taskmanager.deleteTask)
    const responseAdd_Edit = useSelector(state => state.taskmanager.addTask)




    const BuyPlane = (value) => {
        console.log('value...',value)
        // var options = {
        //     description: "Package Transaction",
        //     image: "assets/images/logo.png",
        //     currency: "INR",
        //     key:  "rzp_test_iijGgC2DfISWDR",
        //     amount: '5000',
        //     name: 'Flylight',
        //     order_id: 'order_J5LRYWmrPyerIn',
        //     prefill: {
        //         email: 'gaurav.kumar@example.com',
        //         contact: '9655577124',
        //         name: 'Gaurav Kumar',
        //     },
        //     notes: {
        //         address: "Flylight CRM indore"
        //     },
        //     theme: { color: 'blue' }
        // }

        // console.log(options)
        // RazorpayCheckout.open(options).then((data) => {
        //     // handle success
        //     // alert(`Success: ${data.razorpay_payment_id}`);

        //     console.log('razar................',data)

        // }).catch((error) => {
        //     // handle failure
        //     alert(`Error: ${error.code} | ${error.description}`);
        // });
    }







    const onChangeFrom = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        settext(false)
        setDate(currentDate)
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
    }

    useEffect(() => {
        if (loginData || registerData && isFocused) {
            Get_Data()
        }
    }, [loginData, registerData, isFocused])

    const Get_Data = () => {
        if (loginData.status == "success") {
            setIsLodding(true)
            const data = {
                uid: loginData.data.uid,
                profile_id: loginData.data.cProfile.toString(),
                org_uid: loginData.data.org_uid,
            }
            dispatch(taskmanagerAction.TaskList(data, loginData.data.token));
            // dispatch(organizationAction.packageList(data, loginData.data.token));
        }
        else if (registerData.status == "success") {
            setIsLodding(true)
            const data = {
                uid: registerData.data.uid,
                profile_id: registerData.data.cProfile.toString(),
                org_uid: registerData.data.org_uid,
            }
            dispatch(taskmanagerAction.TaskList(data, registerData.data.token))
        }
    }

    useEffect(() => {
        if (taskList) {
            if (taskList.status == "200") {
                setallTask(taskList.data)
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
        // console.log('values of .......................', value.priority);
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
            // setIsVisible(false)
            let formateStartDate = moment(date).format("YYYY-MM-DD")
            // console.log('..................................', value.priority)
            if (loginData || registerData) {
                if (loginData.status == "success") {
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
                else if (registerData.status == "success") {
                    setEIsLodding(true)
                    const data = {
                        uid: registerData.data.uid,
                        org_uid: registerData.data.org_uid,
                        profile_id: registerData.data.cProfile,
                        created_by: registerData.data.cProfile,
                        modified_by: registerData.data.cProfile,
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
                    dispatch(taskmanagerAction.Add_EditTask(data, registerData.data.token));
                }
            }
        }
    }

    useEffect(() => {
        if (responseAdd_Edit) {
            // console.log('one<><><><>>>>>>>>>>>>>>>>>', responseAdd_Edit)
            if (responseAdd_Edit.status == "success") {
                setIsVisible(false)
                ToastAndroid.show(responseAdd_Edit.message, ToastAndroid.SHORT);
                settitle('')
                setDate(new Date())
                settext(true)
                setStatus(null)
                settempObject("")
                Get_Data()
                dispatch(taskmanagerAction.clearResponse())
            }
            else if (responseAdd_Edit.status == "failed") {
                ToastAndroid.show(responseAdd_Edit.message, ToastAndroid.SHORT);
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
        // console.log('API.................')
        if (loginData.status == "success") {
            setaskDelete(!askDelete)
            const data = {
                uid: loginData.data.uid,
                profile_id: loginData.data.cProfile,
                org_uid: loginData.data.org_uid,
                task_id: tempId
            }
            dispatch(taskmanagerAction.deleteTask(data, loginData.data.token));
        }
        else if (registerData.status == "success") {
            setaskDelete(!askDelete)
            const data = {
                uid: registerData.data.uid,
                profile_id: registerData.data.cProfile.toString(),
                org_uid: registerData.data.org_uid,
                task_id: tempId
            }
            dispatch(taskmanagerAction.deleteTask(data, registerData.data.token));
        }
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
        Get_Data()
        setModalVisible2(!modalVisible2)
    }





    const getDataUsingGet = () => {
        //GET request
        fetch('http://3.23.113.168/admin/public/api/mobile/Packages', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + loginData.data.token
            }
        })
            .then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                //Success
                // alert(JSON.stringify(responseJson));
                console.log('ssss', responseJson);
            })
            //If response is not in json then in error
            .catch((error) => {
                //Error
                // alert(JSON.stringify(error));
                console.error('rrrrr', JSON.parse(error));
            });
    };









    const AllView = ({ item }) => {
        return (
            <View style={{ marginTop: '1%' }}>
                <View style={styles.listData}>
                    <View style={{ backgroundColor: '', justifyContent: 'center', }}>
                        {item.profile ?
                            item.profile.user ?
                                <Image style={{ height: 48, width: 48, borderRadius: 24 }}
                                    source={{ uri: 'http://3.23.113.168/admin/public/uploads/avatar/' + item.profile.user.avatar }}
                                />
                                : <Image style={{ height: 48, width: 48, }}
                                    source={require('../../images/profileCall.png')} />
                            : ''}
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

    // const DoneView = ({ item }) => {
    //     return (
    //         <View>
    //             {item.status == 'completed' ?
    //                 <View style={{ marginTop: '1%' }}>
    //                     <View style={styles.listData}>
    //                         <View style={{ backgroundColor: '', justifyContent: 'center', }}>
    //                             {item.profile ?
    //                                 item.profile.user ?
    //                                     <Image style={{ height: 48, width: 48, borderRadius: 24 }}
    //                                         source={{ uri: 'http://3.23.113.168/admin/public/uploads/avatar/' + item.profile.user.avatar }}
    //                                     />
    //                                     : <Image style={{ height: 48, width: 48, }}
    //                                         source={require('../../images/profileCall.png')}
    //                                     />
    //                                 : ''}
    //                         </View>
    //                         <View style={{ marginLeft: '2%', flex: 1, backgroundColor: '', }}>
    //                             <Text style={{
    //                                 fontWeight: 'bold', fontSize: 14, color: '#0F0F0F',
    //                                 fontFamily: 'Roboto'
    //                             }}>{item.profile ? item.profile.user.name : ''}</Text>
    //                             <View style={{ flexDirection: 'row', }}>
    //                                 <View style={{ width: '45%', backgroundColor: '' }}>
    //                                     <Text
    //                                         numberOfLines={1}
    //                                         style={{
    //                                             color: 'black', fontFamily: 'Roboto',
    //                                             fontSize: 12, color: '#0F0F0F', flexShrink: 1
    //                                         }}>
    //                                         {item.related_to ? item.related_to : "not available"}</Text>
    //                                 </View>
    //                                 <View
    //                                     style={{
    //                                         backgroundColor: '#F69708', borderRadius: 15,
    //                                         paddingHorizontal: 8, marginLeft: '2%',
    //                                         borderWidth: 1, borderColor: '#F69708',
    //                                     }}>
    //                                     <Text style={{ color: '#fff', fontSize: 12 }}>{item.task_for}</Text>
    //                                 </View>
    //                             </View>
    //                             <View style={{ flexDirection: 'column', }}>
    //                                 <Text
    //                                     style={{
    //                                         color: 'black', fontFamily: 'Roboto',
    //                                         fontSize: 12, color: '#0F0F0F', flexShrink: 1
    //                                     }}>
    //                                     {item.subject}</Text>
    //                             </View>
    //                         </View>

    //                         <View style={{ flexDirection: 'row', marginTop: '10%' }}>
    //                             <TouchableOpacity>
    //                                 <Image
    //                                     style={{ height: 22, width: 22, marginRight: '2%' }}
    //                                     source={require('../../images/okCall.png')}
    //                                 />
    //                             </TouchableOpacity>

    //                             <TouchableOpacity
    //                             // onPress={() => EditTask()}
    //                             >
    //                                 <Image
    //                                     style={{ height: 22, width: 22, marginRight: '2%' }}
    //                                     source={require('../../images/editCall.png')}
    //                                 />
    //                             </TouchableOpacity>
    //                             <TouchableOpacity
    //                             // onPress={() => DeleteTask()}
    //                             >
    //                                 <Image
    //                                     style={{ height: 22, width: 22, }}
    //                                     source={require('../../images/deleteCall.png')}
    //                                 />
    //                             </TouchableOpacity>
    //                         </View>

    //                         <View style={{ marginLeft: '2%', backgroundColor: '', marginTop: '1%' }}>
    //                             <View style={{ flexDirection: 'row' }}>
    //                                 <Image
    //                                     style={{ height: 10, width: 10, marginRight: '2%' }}
    //                                     source={require('../../images/material-call.png')}
    //                                 />
    //                                 <Text max style={{ color: 'black', fontSize: 10 }}>{item.phone ? item.phone : ' 8596547895'}</Text>
    //                             </View>
    //                             <Text style={{
    //                                 marginTop: '30%', textAlign: 'right',
    //                                 color: 'black', fontSize: 11
    //                             }}>{moment(item.updated_at).format('MM/DD/YYYY')} </Text>
    //                         </View>
    //                     </View>
    //                 </View >
    //                 :
    //                 <View>
    //                 </View>
    //             }
    //         </View>
    //     )
    // }

    const TODOView = ({ item }) => {
        return (
            <View>
                {item.status !== 'completed' ?
                    <View style={{ marginTop: '1%' }}>
                        <View style={styles.listData}>
                            <View style={{ backgroundColor: '', justifyContent: 'center', }}>
                                {item.profile ?
                                    item.profile.user ?
                                        <Image

                                            style={{ height: 48, width: 48, borderRadius: 24 }}
                                            source={{ uri: 'http://3.23.113.168/admin/public/uploads/avatar/' + item.profile.user.avatar }}
                                        />
                                        : <Image

                                            style={{ height: 48, width: 48, }}
                                            source={require('../../images/profileCall.png')}
                                        />
                                    : ''}
                            </View>
                            <View style={{ marginLeft: '2%', flex: 1, backgroundColor: '', }}>
                                <Text style={{
                                    fontWeight: 'bold', fontSize: 14, color: '#0F0F0F',
                                    fontFamily: 'Roboto'
                                }}>{item.profile ? item.profile.user.name : ''}</Text>

                                <View style={{ flexDirection: 'row', }}>

                                    <View style={{ width: '45%', backgroundColor: '' }}>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                color: 'black', fontFamily: 'Roboto',
                                                fontSize: 12, color: '#0F0F0F', flexShrink: 1
                                            }}>
                                            {item.related_to ? item.related_to : "not available"}</Text>
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
                                    <Text
                                        style={{
                                            color: 'black', fontFamily: 'Roboto',
                                            fontSize: 12, color: '#0F0F0F', flexShrink: 1
                                        }}>
                                        {item.subject}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                <TouchableOpacity>
                                    <Image
                                        style={{ height: 22, width: 22, marginRight: '2%' }}
                                        source={require('../../images/to-do.png')}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                // onPress={() => EditTask()}
                                >
                                    <Image
                                        style={{ height: 22, width: 22, marginRight: '2%' }}
                                        source={require('../../images/editCall.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                // onPress={() => DeleteTask()}
                                >
                                    <Image
                                        style={{ height: 22, width: 22, }}
                                        source={require('../../images/deleteCall.png')}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginLeft: '2%', backgroundColor: '', marginTop: '1%' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        style={{ height: 10, width: 10, marginRight: '2%' }}
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
                    :
                    <View>
                    </View>
                }
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
                title='Package & Topups'
                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: '20%',
                    marginTop: '-5%',
                    backgroundColor: '#fff',
                    // height: 35,
                    borderRadius: 20,
                }}>
                {isService == 'Package' ?
                    <TouchableOpacity style={[styles.headerBtn, { backgroundColor: '#4F46BA' }]}
                        onPress={() => checkValue("Package")}
                    >
                        <Text style={{ color: '#FFF', textAlign: 'center', }}>Package</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.headerBtn]}
                        onPress={() => checkValue("Package")}
                    >
                        <Text style={{ textAlign: 'center', color: 'black', }}>Package</Text>
                    </TouchableOpacity>
                }

                {isService == 'Topups' ?
                    <TouchableOpacity style={[styles.headerBtn, { backgroundColor: '#4F46BA' }]}
                        onPress={() => checkValue("Topups")}
                    >
                        <Text style={{ color: '#FFF', textAlign: 'center', }}>Topups</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.headerBtn]}
                        onPress={() => checkValue("Topups")}
                    >
                        <Text style={{ textAlign: 'center', color: 'black', }}>Topups</Text>
                    </TouchableOpacity>
                }
            </View>

            {isService == "Package" ?
                <View style={{ marginTop: '3%' }}>
                    {IsLodding == true ?
                        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                        :
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                marginHorizontal: '10%',
                                borderWidth: 2, borderRadius: 10, padding: 5
                            }} >
                                <View style={{ flexDirection: 'column' }}>
                                    <Text>#Id</Text>
                                    <Text></Text>
                                    <Text>Package	</Text>
                                    <Text>Amount</Text>
                                    <Text>Expiration</Text>
                                    <Text>Status</Text>
                                    <Text>Validity</Text>
                                    <Text>Purchased</Text>
                                    <Text>Expired</Text>
                                    <Text>Invoice/Details
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'column', marginLeft: '5%' }}>
                                    <Text style={{ fontWeight: 'bold', width: '75%' }}>:ORDER-af4G1cMzL61645081809</Text>
                                    <Text style={{ fontWeight: 'bold' }}>:Free	</Text>
                                    <Text style={{ fontWeight: 'bold' }}>:Rs. 0.00</Text>
                                    <Text style={{ fontWeight: 'bold' }}>:After 26 days</Text>
                                    <Text style={{ fontWeight: 'bold' }}>:Enable</Text>
                                    <Text style={{ fontWeight: 'bold' }}>:30</Text>
                                    <Text style={{ fontWeight: 'bold' }}>:Feb 17, 2022</Text>
                                    <Text style={{ fontWeight: 'bold' }}>:Mar 19, 2022</Text>
                                    <Text style={{ fontWeight: 'bold' }}>:Invoice/Details
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                // onPress={()=>getDataUsingGet()}
                                onPress={() => setpackegeVisible(!packegeVisible)}
                                style={{
                                    borderColor: '#fff',
                                    borderWidth: 1,
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    marginHorizontal: '30%',
                                    marginVertical: '5%',
                                    backgroundColor: '#2296E4',
                                    borderRadius: 15
                                }}
                            >
                                <Text style={{ color: "#fff", textAlign: 'center' }}>
                                    Buy New Package
                                </Text>
                            </TouchableOpacity>

                            {packegeVisible ?
                                <View>
                                    {/* {allTask !== undefined && allTask.length > 0 ?
                                        <FlatList
                                            // style={{ height: height / 1.55 }}
                                            data={allTask}
                                            renderItem={AllView}
                                        />

                                        :
                                        <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>
                                    } */}
                                    <View style={{
                                        marginHorizontal: '10%',
                                        borderWidth: 2, borderRadius: 10, padding: 5
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => BuyPlane()}
                                            style={{ alignSelf: 'center', backgroundColor: 'blue', paddingHorizontal: 10, paddingVertical: 5 }}
                                        >
                                            <Text style={{ color: '#fff' }}>Start Now</Text>
                                        </TouchableOpacity>

                                        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', }}>
                                            STARTUP
                                        </Text>
                                        <Text style={{ fontSize: 24, textAlign: 'center', color: 'blue' }}>
                                            ₹500.00 </Text>
                                        <Text style={{ textAlign: 'center', }}> /60 Days
                                        </Text>
                                        <Text style={{ textAlign: 'center', }}>Everything in STARTUP+</Text>
                                        <Text style={{ textAlign: 'center', }}>24/7supports (1)</Text>
                                        <Text style={{ textAlign: 'center', }}>emails  (5)</Text>
                                        <Text style={{ textAlign: 'center', }}>organizations  (1)</Text>
                                        <Text style={{ textAlign: 'center', }}>leads  (50)</Text>
                                        <Text style={{ textAlign: 'center', }}>users  (4)</Text>

                                    </View>

                                </View>
                                :
                                <View />
                            }


                        </View>
                    }
                </View>
                :
                <View />
            }

            {
                isService == "Topups" ?
                    <View style={{ marginTop: '3%' }}>
                        {IsLodding == true ?
                            <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                            :
                            <View>
                                <View style={{
                                    flexDirection: 'row',
                                    //  justifyContent: 'space-between',
                                    marginHorizontal: '10%',
                                    borderWidth: 2, borderRadius: 10, padding: 5
                                }} >
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text>#Id</Text>
                                        <Text></Text>
                                        <Text>Topup	</Text>
                                        <Text>Amount</Text>
                                        <Text>Status</Text>
                                        <Text>Purchased</Text>
                                        <Text>Invoice/Details
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'column', marginLeft: '5%' }}>
                                        <Text style={{ fontWeight: 'bold', width: '75%' }}>:ORDER-af4G1cMzL61645081809</Text>
                                        <Text style={{ fontWeight: 'bold' }}>:Free	</Text>
                                        <Text style={{ fontWeight: 'bold' }}>:Amount</Text>
                                        <Text style={{ fontWeight: 'bold' }}>:Status</Text>
                                        <Text style={{ fontWeight: 'bold' }}>:Purchased</Text>
                                        <Text style={{ fontWeight: 'bold' }}>:Invoice/Details
                                        </Text>
                                    </View>
                                </View>


                                {allTask !== undefined && allTask.length > 0 ?
                                    <FlatList
                                        // style={{ height: height / 1.55 }}
                                        data={allTask}
                                        renderItem={TODOView}
                                    />
                                    :
                                    <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>}
                            </View>
                        }
                    </View>
                    :
                    <View />
            }
        </View >
    );
}


