
import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, View, FlatList, TextInput, TouchableOpacity, Image, Modal, Dimensions,
    ActivityIndicator, Linking, Platform, ScrollView, Alert} from 'react-native';
import styles from './styles';
import { Card } from 'react-native-paper';
import { BottomSheet, Button, ListItem } from 'react-native-elements';
import Header from '../../component/header/index'
import { contactListAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/core"
import { Dropdown } from 'react-native-element-dropdown';
import moment from 'moment';

export default function Contacts({ navigation }) {

    const { width, height } = Dimensions.get('window');
    const isFocused = useIsFocused();
    const dispatch = useDispatch()
    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)
    const contactData = useSelector(state => state.contactList.contacts)
    const [EditcontactId, setEditConatctId] = useState([])
    const [isVisible, setIsVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [search, setSearch] = useState('');
    const [IsLodding, setIsLodding] = useState(false)
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    const call = (mobileNo) => {
        let phoneNumber = mobileNo;
        if (Platform.OS !== "android") {
            phoneNumber = `telprompt:${mobileNo}`;
        } else {
            phoneNumber = `tel:${mobileNo}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    ToastAndroid.show('Number is not available', ToastAndroid.SHORT);
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        if (loginData || registerData && isFocused) {
            if (loginData.status == "success") {
                setIsLodding(true)
                dispatch(contactListAction.contactList(
                    loginData.data.token,
                    loginData.data.uid,
                    loginData.data.cProfile.toString(),
                    loginData.data.org_uid,
                ));
            }
            else if (registerData.status == "success") {
                setIsLodding(true)
                dispatch(contactListAction.contactList(
                    registerData.data.token,
                    registerData.data.uid,
                    registerData.data.cProfile.toString(),
                    registerData.data.org_uid,
                ));
            }
        }
    }, [loginData, registerData, isFocused])

    useEffect(() => {
        if (contactData) {
            if (contactData.status == "200") {

                setFilteredDataSource(contactData.data)
                setMasterDataSource(contactData.data)

                if (contactData.data == []) {
                    setModalVisible2(true)
                }
                else {
                    setModalVisible2(false)
                }
                setIsLodding(false)
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

    const addContacts = () => {
        setModalVisible2(!modalVisible2),
            setModalVisible3(!modalVisible3)
    }

    const ManuallyAdd = () => {
        setModalVisible3(!modalVisible3)
        navigation.push("AddContact")
    }

    const Edit_Contact_Function = (id) => {
        setEditConatctId(id)
        setIsVisible(true)
    }










    const [value1, setValue1] = useState('All_List');
    const [isFocus1, setIsFocus1] = useState(false);

    const data1 = [
        { label: 'All List', value: 'All_List' },
        { label: 'My List', value: 'My_List' },
        { label: 'Fashion List', value: 'Fashion_List' },
    ];




    const Contact = [
        {
            title: 'Name',
            subtitle: 'Conneckt',
            mobile: '+91 258564859',
            date: 'Mar 03, 18:00Hrs'
        },
        {
            title: 'Name2',
            subtitle: 'Conneckt2',
            mobile: '+91 25856489',
            date: 'Mar 04, 18:20Hrs'
        },
        {
            title: 'Name3',
            subtitle: 'Conneckt3',
            mobile: '+91 25856459',
            date: 'Mar 05, 18:09Hrs'
        },
        {
            title: 'Name4',
            subtitle: 'Conneckt4',
            mobile: '+91 258564592',
            date: 'Mar 05, 18:19Hrs'
        }
    ];


    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            // console.log("SADFsdfsdfs.......", masterDataSource)
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.first_name    //|| item.last_name
                        ? item.first_name.toUpperCase()  //|| item.last_name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const ItemView = ({ item }) => {
        return (
            // Flat List Item
            <Text
                style={styles.itemStyle}
                onPress={() => getItem(item)}>
                {item.id}
                {'.'}
                {item.title.toUpperCase()}
            </Text>
        );
    };

    const ContactView = ({ item }) => {
        return (
            // <TouchableOpacity onPress={() => navigation.navigate('ContactsTwo')} >
            <View style={styles.listData} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000', fontFamily: 'Roboto' }}>{item.first_name} {item.last_name}</Text>
                        <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Roboto', paddingTop: 3 }}>{item.company}</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => Edit_Contact_Function(item)} >
                                <Image style={{ height: 40, width: 40 }}
                                    source={require('../../images/Group.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: '2%' }} onPress={() => call(item.phone)} >
                                <Image style={{ height: 40, width: 40, }}
                                    source={require('../../images/GroupCall.png')} />
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={{ marginLeft: '2%' }} onPress={() => newFunction()} >
                                    <Image style={{ height: 40, width: 40, }}
                                        source={require('../../images/GroupCall.png')} />
                                </TouchableOpacity> */}
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: '3%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ height: 20.7, width: 20.7, }}
                            source={require('../../images/detailcall.png')} />
                        <Text style={{ fontSize: 13, marginTop: '2%', color: '#000000', fontFamily: 'Roboto', marginLeft: '2%' }}>{item.phone}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ height: 19, width: 18.47, }}
                            source={require('../../images/calendar.png')} />
                        <Text style={{ fontSize: 13, marginTop: '2%', color: '#000000', fontFamily: 'Roboto', marginLeft: '2%' }} >{moment(item.created_at).format('LLL')}</Text>
                    </View>
                </View>
            </View>

        );
    }



    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '',
                }}
            />
        );
    };

    const getItem = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.title);
    };


    // const AddFunction = () => {
    //     setModalVisible2(!modalVisible2)
    //     setIsVisible(!isVisible)
    //     navigation.navigate("Edit_Contact")

    // };

    const AddFunction = (key, id) => {
        setIsVisible(!isVisible)
        // console.log("Add fuction...............", key, id)
        navigation.navigate("Edit_Contact", {
            Edata: id
        })
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header
                style={{ height: "16%" }}
                onPressLeft={() => {
                    // navigation.openDrawer()
                    navigation.navigate('AddContact')
                }}
                title='Contacts'

                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />

            <View style={{ flexDirection: 'row', marginBottom: '2%' }}>
                <View style={styles.inputFields2}>
                    <Image
                        style={[styles.icon, { height: 26, width: 25, marginTop: '5%', marginLeft: '5%' }]}
                        source={require('../../images/search.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={search}
                        onChangeText={(text) => searchFilterFunction(text)}
                        placeholder="Search for contacts"
                        underlineColorAndroid="transparent"
                   />
                </View>

                <View style={{ marginTop: '-8%', borderRadius: 10, width: '30%', backgroundColor: '#fff' }}>
                    <Dropdown
                        style={styles.dropdown3}
                        placeholderStyle={styles.placeholderStyle3}
                        selectedTextStyle={styles.selectedTextStyle3}
                        // inputSearchStyle={styles.inputSearchStyle3}
                        iconStyle={styles.iconStyle3}
                        data={data1}
                        // search
                        maxHeight={160}
                        labelField="label"
                        valueField="value"
                        placeholder='All List'
                        // searchPlaceholder="Search..."
                        value={value1}
                        onFocus={() => setIsFocus1(true)}
                        onBlur={() => setIsFocus1(false)}
                        onChange={item => {
                            setValue1(item.value);
                            setIsFocus1(false);
                        }}
                        renderLeftIcon={() => (

                            <View>
                                {/* <Image
                                    style={[styles.icon, { height: 30, width: 23, marginTop: '4%' }]}
                                    source={require('../../images/list.png')}
                                /> */}
                            </View>
                        )}
                    />
                </View>

            </View>






            {/* 


            {value1 == "All_List" ?

                <View>

                    <TouchableOpacity

                    >
                        <View container style={styles.listData}>

                            <View style={{ paddingTop: 5, marginBottom: '-1%' }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000000', fontFamily: 'Roboto' }}>Name</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Roboto' }}>Conneckt</Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: '#FFFFFF',
                                            fontFamily: 'Roboto',
                                            marginLeft: '2%',
                                            backgroundColor: '#FFBC04',
                                            borderRadius: 10,
                                            paddingLeft: 5, paddingRight: 5, padding: 1
                                        }}>My List</Text>


                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Image
                                        style={{ height: 20.70, width: 20.70, marginTop: '8%' }}
                                        source={require('../../images/detailcall.png')}
                                    />
                                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Roboto', marginTop: '9%', marginLeft: '2%' }}>+91 258564859</Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: '-5%' }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 5 }}>
                                    <TouchableOpacity
                                        // onPress={() => setModalVisible2(true)}
                                        onPress={() => setIsVisible(true)}
                                    >
                                        <Image
                                            style={{ height: 40, width: 40, marginTop: '2%', marginLeft: '6%' }}
                                            source={require('../../images/Group.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ReportFeedback')}
                                    >
                                        <Image
                                            style={{ height: 40, width: 40, marginTop: '2%', marginLeft: '2%' }}
                                            source={require('../../images/GroupCall.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: '7%', flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: 5 }}>
                                    <Image
                                        style={{ height: 19, width: 18.47, marginTop: '10%' }}
                                        source={require('../../images/calendar.png')}
                                    />
                                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Roboto', marginTop: '12%', marginLeft: '2%' }} >Mar 03, 18:00Hrs</Text>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity

                    >
                        <View container style={styles.listData}>

                            <View style={{ paddingTop: 5, marginBottom: '-1%' }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000000', fontFamily: 'Roboto' }}>Name</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Roboto' }}>Conneckt</Text>

                                    <Text style={{
                                        fontSize: 14,
                                        color: '#FFFFFF',
                                        fontFamily: 'Roboto',
                                        marginLeft: '2%',
                                        backgroundColor: '#D704FF',
                                        borderRadius: 10,
                                        paddingLeft: 5, paddingRight: 5, padding: 1
                                    }}>Fashion List</Text>

                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Image
                                        style={{ height: 20.70, width: 20.70, marginTop: '8%' }}
                                        source={require('../../images/detailcall.png')}
                                    />
                                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Roboto', marginTop: '9%', marginLeft: '2%' }}>+91 258564859</Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: '-5%' }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 5 }}>
                                    <TouchableOpacity
                                        // onPress={() => setModalVisible2(true)}
                                        onPress={() => setIsVisible(true)}
                                    >
                                        <Image
                                            style={{ height: 40, width: 40, marginTop: '2%', marginLeft: '6%' }}
                                            source={require('../../images/Group.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ReportFeedback')}
                                    >
                                        <Image
                                            style={{ height: 40, width: 40, marginTop: '2%', marginLeft: '2%' }}
                                            source={require('../../images/GroupCall.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: '7%', flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: 5 }}>
                                    <Image
                                        style={{ height: 19, width: 18.47, marginTop: '10%' }}
                                        source={require('../../images/calendar.png')}
                                    />
                                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Roboto', marginTop: '12%', marginLeft: '2%' }} >Mar 03, 18:00Hrs</Text>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity

                    >
                        <View container style={styles.listData}>

                            <View style={{ paddingTop: 5, marginBottom: '-1%' }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000000', fontFamily: 'Roboto' }}>Name</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Roboto' }}>Conneckt</Text>


                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: '#FFFFFF',
                                            fontFamily: 'Roboto',
                                            marginLeft: '2%',
                                            backgroundColor: '#FFBC04',
                                            borderRadius: 10,
                                            paddingLeft: 5, paddingRight: 5, padding: 1
                                        }}>My List</Text>



                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Image
                                        style={{ height: 20.70, width: 20.70, marginTop: '8%' }}
                                        source={require('../../images/detailcall.png')}
                                    />
                                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Roboto', marginTop: '9%', marginLeft: '2%' }}>+91 258564859</Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: '-5%' }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 5 }}>
                                    <TouchableOpacity
                                        // onPress={() => setModalVisible2(true)}
                                        onPress={() => setIsVisible(true)}
                                    >
                                        <Image
                                            style={{ height: 40, width: 40, marginTop: '2%', marginLeft: '6%' }}
                                            source={require('../../images/Group.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ReportFeedback')}
                                    >
                                        <Image
                                            style={{ height: 40, width: 40, marginTop: '2%', marginLeft: '2%' }}
                                            source={require('../../images/GroupCall.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: '7%', flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: 5 }}>
                                    <Image
                                        style={{ height: 19, width: 18.47, marginTop: '10%' }}
                                        source={require('../../images/calendar.png')}
                                    />
                                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Roboto', marginTop: '12%', marginLeft: '2%' }} >Mar 03, 18:00Hrs</Text>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>


                </View> :
                <View />
                // <FlatList
                //     data={Contact}
                //     renderItem={ContactView}
                // />
            }
 */}
            {IsLodding == true ?
                <ActivityIndicator size="small" color="#0000ff" />
                :
                <View>
                    {filteredDataSource !== undefined && filteredDataSource.length > 0 ?
                        <FlatList
                            data={filteredDataSource}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={ItemSeparatorView}
                            renderItem={ContactView}
                        />
                        :
                        <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>
                    }
                </View>
            }

            <View style={{ height: '3%' }}></View>

            <BottomSheet
                modalProps={{
                    animationType: 'fade',
                    hardwareAccelerated: true,
                    onRequestClose: () => { setIsVisible(false); },
                }}
                isVisible={isVisible}>
                <View style={
                    Platform.OS == 'ios' ?
                        { width: width, height: height / 6 }
                        :
                        { width: width, height: height / 5.1 }
                }>
                    <View style={styles.headerView2}>
                        <TouchableOpacity
                            onPress={() => AddFunction('Call Next', EditcontactId)}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                                <Text style={styles.title3}>Call Next</Text>
                                <Image
                                    style={{ height: 13.5, width: 20.24, marginRight: '2%' }}
                                    source={require('../../images/arrowforward.png')} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => AddFunction('Shift Up', EditcontactId)}>
                            <View style={{ borderWidth: 0.3, borderColor: '#B9BAC8', margin: '2%' }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '3%' }}>
                                <Text style={styles.title3}>Shift Up</Text>
                                <Image
                                    style={{ height: 13.5, width: 20.24, marginRight: '2%' }}
                                    source={require('../../images/arrowforward.png')}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => AddFunction('Shift Down', EditcontactId)}>
                            <View style={{ borderWidth: 0.3, borderColor: '#B9BAC8', margin: '2%' }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '3%' }}>
                                <Text style={styles.title3}>Shift Down</Text>
                                <Image
                                    style={{ height: 13.5, width: 20.24, marginRight: '2%' }}
                                    source={require('../../images/arrowforward.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheet>


            <Modal animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => { setModalVisible2(!modalVisible2) }}>
                <View style={styles.centeredViewM}>
                    <View style={styles.modalViewM}>
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end', }}
                            onPress={() => setModalVisible2(!modalVisible2)}>
                            <Image
                                style={{ margin: '5%', marginTop: '3%', height: 14, width: 14 }}
                                source={require('../../images/crossImgR.png')} />
                        </TouchableOpacity>
                        <Text style={styles.titleM}>Do You Want To{'\n'}Add Contacts?</Text>
                        <View style={{ flexDirection: 'row' }} >
                            <TouchableOpacity onPress={() => addContacts()}
                                style={[styles.btnM, { backgroundColor: '#4581F8' }]}>
                                <Text style={styles.btnTextM} >  OK</Text>
                            </TouchableOpacity>

                            <View style={{ marginLeft: '2%' }} />
                            <TouchableOpacity onPress={() => setModalVisible2(!modalVisible2)}
                                style={[styles.btnM, { backgroundColor: '#B8B8B8' }]} >
                                <Text style={styles.btnTextM} > SKIP </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide"
                transparent={true}
                visible={modalVisible3}
                onRequestClose={() => { setModalVisible3(!modalVisible3) }}>
                <Card style={[styles.headerViewA, { paddingBottom: '-5%', }]}>
                    <View style={styles.headerView2A}>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Image
                                style={{ margin: '5%', marginTop: '3%', alignSelf: 'flex-end', height: 14, width: 14 }}
                                source={require('../../images/crossImgR.png')} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.titleA, { marginTop: '-5%' }]}>Add Contacts </Text>
                    <View style={{ marginTop: '3%' }}>
                        <TouchableOpacity>
                            <View style={styles.listDataA}>
                                <Image style={styles.titleImgA}
                                    source={require('../../images/book.png')} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.btnTextA}>Import from contact book</Text>
                                    <Image style={styles.navigateImgA}
                                        source={require('../../images/navR.png')} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: '3%' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('AddContactUpload')}>
                            <View style={styles.listDataA}>
                                <Image style={styles.titleImgA}
                                    source={require('../../images/upload.png')} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.btnTextA}>Upload contact file</Text>
                                    <Image style={[styles.navigateImgA, { marginLeft: '25%' }]}
                                        source={require('../../images/navR.png')} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: '3%' }}>
                        <TouchableOpacity onPress={() => ManuallyAdd()} >
                            <View style={[styles.listDataA, { borderBottomWidth: 0, }]}>
                                <Image style={styles.titleImgA}
                                    source={require('../../images/addR.png')} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.btnTextA}>Add manually</Text>
                                    <Image style={[styles.navigateImgA, { marginLeft: '37%' }]}
                                        source={require('../../images/navR.png')} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </Card>
            </Modal>

        </View>
    );
};


