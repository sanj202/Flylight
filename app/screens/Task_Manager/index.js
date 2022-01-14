import React, { useState, useEffect } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, TextInput, Picker, FlatList, Image, Button, ActivityIndicator,
    Modal, Alert, Pressable, StatusBar, Dimensions
} from 'react-native';
import { BottomSheet, ListItem } from 'react-native-elements';
import moment from 'moment';
import Header from '../../component/header/index'
import { taskmanagerAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"

export default function lead_manager({ navigation }) {

    const [isService, setisService] = useState('All');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const [isVisible, setIsVisible] = useState(false);


    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, settext] = useState(true)

    const [dates, setDates] = useState(new Date());
    const [modes, setModes] = useState('time');
    const [shows, setShows] = useState(false);
    const [texts, settexts] = useState(true)

    const onChangeFrom = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        settext(false)
        showMode('date');
    };


    const onChangeTo = (event, selectedDates) => {
        const currentDates = selectedDates || dates;
        setShows(Platform.OS === 'ios');
        setDates(currentDates);
    };

    const showModes = (currentModes) => {
        setShows(true);
        setModes(currentModes);
    };

    const showDatepickers = () => {
        settexts(false)
        showModes('time');
    };


    const EditTask = () => {
        setIsVisible(true)
        // setModalVisible(!modalVisible)
        // ToastAndroid.show("Add Succesfully !", ToastAndroid.SHORT);
        // navigation.navigate('lead_manager')
    };

    const DeleteTask = () => {
        setModalVisible2(!modalVisible2)
    }


    const checkValue = (value) => {
        // console.log("data,......................", A)
        setisService(value)
    }


    const { width, height } = Dimensions.get('window');
    const [allTask, setallTask] = useState()
    const [IsLodding, setIsLodding] = useState(false)
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const taskList = useSelector(state => state.taskmanager.getList)

    // console.log("taskList................", taskList)

    useEffect(() => {
        if (loginData || isFocused) {
            if (loginData.status == "success") {
                dispatch(taskmanagerAction.TaskList(
                    loginData.data.token,
                    loginData.data.uid,
                    loginData.data.cProfile.toString(),
                    loginData.data.user.org_id.toString()
                ));
            }
            setIsLodding(true)
        }
    }, [loginData, isFocused])


    //   console.log("taskList.....................",taskList)
    useEffect(() => {
        if (taskList) {
            if (taskList.status == "200") {
                setallTask(taskList.data)
                setIsLodding(false)
                // dispatch(leadAction.clearResponse())
                //   Alert.alert(taskList.message)
            }
            else if (taskList.status == "failed") {

                setIsLodding(false)
                // Alert.alert(leadList.message)
                // console.log("sucess..failed........")
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






    const AllView = ({ item }) => {
        return (
            <View style={{ marginTop: '1%' }}>

                <View style={styles.listData}>
                    <View style={{ backgroundColor: '', justifyContent: 'center', }}>
                        <Image
                            style={{ height: 48, width: 48, }}
                            source={require('../../images/profileCall.png')}
                        />
                    </View>
                    <View style={{ marginLeft: '2%', flex: 1, backgroundColor: '', }}>
                        <Text style={{
                            fontWeight: 'bold', fontSize: 14, color: '#0F0F0F',
                            fontFamily: 'Roboto'
                        }}>User Name</Text>

                        <View style={{ flexDirection: 'row', }}>
                            <Text
                                style={{
                                    color: 'black', fontFamily: 'Roboto',
                                    fontSize: 12, color: '#0F0F0F', flexShrink: 1
                                }}>
                                Meeting with Mr. {item.description}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', marginTop: '1%' }}>
                            <TouchableOpacity>
                                <Image
                                    style={{ height: 22, width: 22, marginRight: '2%' }}
                                    source={require('../../images/okCall.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => EditTask()}
                            >
                                <Image
                                    style={{ height: 22, width: 22, marginRight: '2%' }}
                                    source={require('../../images/editCall.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => DeleteTask()}
                            >
                                <Image
                                    style={{ height: 22, width: 22, }}
                                    source={require('../../images/deleteCall.png')}
                                />
                            </TouchableOpacity>
                        </View>
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
                            marginTop: '40%', textAlign: 'right',
                            color: 'black', fontSize: 11
                        }}>{moment(item.updated_at).format('MM/DD/YYYY')} </Text>
                    </View>
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
                title='Task Manager'
                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />

            <View
                style={{
                    flexDirection: 'row',
                    marginLeft: '7%',
                    marginRight: '7%',
                    marginTop: '-5%',
                    backgroundColor: '#fff',
                    height: 35,
                    borderRadius: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>

                {isService == 'All' ?
                    <TouchableOpacity style={{
                        backgroundColor: '#4F46BA',
                        borderRadius: 20,
                        width: '30%',
                        paddding: 10,
                    }}

                        onPress={() => checkValue("All")}
                    >

                        <Text style={{ color: '#FFF', textAlign: 'center', padding: 10, }}>All</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{

                        // backgroundColor: '#4F46BA',
                        borderRadius: 20,
                        width: '30%',
                        paddding: 10,
                    }}
                        onPress={() => checkValue("All")}
                    >
                        <Text style={{ textAlign: 'center', color: 'black', padding: 10, }}>All</Text>
                    </TouchableOpacity>
                }

                {isService == 'To-Do' ?
                    <TouchableOpacity style={{
                        backgroundColor: '#4F46BA',
                        borderRadius: 20,
                        width: '30%',
                        paddding: 10,
                    }}
                        onPress={() => checkValue("To-Do")}
                    >
                        <Text style={{ color: '#FFF', textAlign: 'center', padding: 10, }}>To-Do</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{

                        // backgroundColor: '#4F46BA',
                        borderRadius: 20,
                        width: '30%',
                        paddding: 10,
                    }}
                        onPress={() => checkValue("To-Do")}
                    >
                        <Text style={{ textAlign: 'center', color: 'black', padding: 10, }}>To-Do</Text>
                    </TouchableOpacity>
                }




                {isService == 'Done' ?

                    <TouchableOpacity style={{
                        backgroundColor: '#4F46BA',
                        borderRadius: 20,
                        width: '30%',
                        paddding: 10,
                    }}
                        onPress={() => checkValue("Done")}
                    >
                        <Text style={{ color: '#FFF', textAlign: 'center', padding: 10, }}>Done</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{

                        // backgroundColor: '#4F46BA',
                        borderRadius: 20,
                        width: '30%',
                        paddding: 10,
                    }}
                        onPress={() => checkValue("Done")}
                    >
                        <Text style={{ textAlign: 'center', color: 'black', padding: 10, }}>Done</Text>
                    </TouchableOpacity>
                }

            </View>

            {isService == "All" ?
                <View style={{ marginTop: '3%' }}>
                    {IsLodding == true ?
                        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                        :
                        <View>
                         
                         {allTask !==undefined && allTask.length > 0 ?
                            <FlatList
                                // style={{ height: height / 1.55 }}
                                data={allTask}
                                renderItem={AllView}
                            />
                            :
                            <Text style={{fontSize:20,textAlign:'center',marginTop:'3%'}}>No data Found</Text> }
                        </View>
                    }
                </View>
                :
                <View />
            }







            {
                isService == "To-Do" ?
                    <View style={{ marginTop: '3%' }}>


                        <View style={{ marginTop: '1%' }}>
                            <View style={styles.listData}>
                                <Image
                                    style={{ height: 48, width: 48, marginTop: '2%', marginRight: '2%' }}
                                    source={require('../../images/profileCall.png')}
                                />
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Johne Doe</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: 'black', fontFamily: 'Roboto', fontSize: 12, color: '#0F0F0F' }}>Meeting with Mr. George</Text>
                                        {/* <Text style={{
                                                color: '#fff', backgroundColor: '#F69708', paddingLeft: 10, paddingRight: 10,
                                                padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 12
                                            }}>Lead</Text> */}
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
                        </View>



                        <View style={{ marginTop: '-1%' }}>
                            <View style={styles.listData}>
                                <Image
                                    style={{ height: 48, width: 48, marginTop: '2%', marginRight: '2%' }}
                                    source={require('../../images/profileCall.png')}
                                />
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Johne Doe</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: 'black', fontFamily: 'Roboto', fontSize: 12, color: '#0F0F0F' }}>Meeting with Mr. George</Text>
                                        {/* <Text style={{
                                                color: '#fff', backgroundColor: '#F69708', paddingLeft: 10, paddingRight: 10,
                                                padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 12
                                            }}>Lead</Text> */}
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
                        </View>


                        <View style={{ marginTop: '-1%' }}>
                            <View style={styles.listData}>
                                <Image
                                    style={{ height: 48, width: 48, marginTop: '2%', marginRight: '2%' }}
                                    source={require('../../images/profileCall.png')}
                                />
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Johne Doe</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: 'black', fontFamily: 'Roboto', fontSize: 12, color: '#0F0F0F' }}>Meeting with Mr. George</Text>
                                        {/* <Text style={{
                                                color: '#fff', backgroundColor: '#F69708', paddingLeft: 10, paddingRight: 10,
                                                padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 12
                                            }}>Lead</Text> */}
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
                        </View>




                    </View>

                    :
                    <View />
            }

            {
                isService == "Done" ?
                    <View style={{ marginTop: '3%' }}>

                        <View style={{ marginTop: '1%' }}>
                            <View style={styles.listData}>
                                <Image
                                    style={{ height: 48, width: 48, marginTop: '2%', marginRight: '2%' }}
                                    source={require('../../images/profileCall.png')}
                                />
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Johne Doe</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: 'black', fontFamily: 'Roboto', fontSize: 12, color: '#0F0F0F' }}>Meeting with Mr. George</Text>
                                        {/* <Text style={{
                                                color: '#fff', backgroundColor: '#F69708', paddingLeft: 10, paddingRight: 10,
                                                padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 12
                                            }}>Lead</Text> */}
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity>
                                            <Image
                                                style={{ height: 22, width: 22, marginTop: '8%', marginRight: '5%' }}
                                                source={require('../../images/okCall.png')}
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
                        </View>


                        <View style={{ marginTop: '-1%' }}>
                            <View style={styles.listData}>
                                <Image
                                    style={{ height: 48, width: 48, marginTop: '2%', marginRight: '2%' }}
                                    source={require('../../images/profileCall.png')}
                                />
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Johne Doe</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: 'black', fontFamily: 'Roboto', fontSize: 12, color: '#0F0F0F' }}>Meeting with Mr. George</Text>
                                        {/* <Text style={{
                                                color: '#fff', backgroundColor: '#F69708', paddingLeft: 10, paddingRight: 10,
                                                padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 12
                                            }}>Lead</Text> */}
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity>
                                            <Image
                                                style={{ height: 22, width: 22, marginTop: '8%', marginRight: '5%' }}
                                                source={require('../../images/okCall.png')}
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
                        </View>


                    </View >

                    :
                    <View />
            }

            {/* ================================================== */}



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
                            style={{ paddingRight: '20%', flex: 1, }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: '1%' }}>
                        <TouchableOpacity style={{ width: '45%', backgroundColor: '' }}
                            onPress={showDatepicker}
                        >
                            <Image
                                style={{ height: 32, width: "16%", }}
                                source={require('../../images/pikerCalander.png')}
                            />

                        </TouchableOpacity>

                        <View style={{ marginLeft: '1%' }}></View>

                        <TouchableOpacity style={{ width: '45%', backgroundColor: '' }}
                            onPress={showDatepickers}
                        >
                            <Image
                                style={{ height: 30, width: "17%", }}
                                source={require('../../images/clockIcon.png')}
                            />
                            {/* <DateTimePicker
                                testID="dateTimePicker"
                                style={{ backgroundColor: '', marginTop: '-18%' }}
                                value={dates}
                                mode={modes}
                                // is24Hour={true}
                                display="default"
                                onChange={onChangeTo}
                            /> */}
                        </TouchableOpacity>
                    </View>

                    <Pressable
                        style={[styles.button2, styles.buttonClose]}
                        onPress={() => setIsVisible(false)} >
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
                            onPress={() => DeleteTask()}
                        >
                            <Text style={styles.textStyle3}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View >
    );
}


