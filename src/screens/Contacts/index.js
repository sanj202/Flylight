
import React, { useState, useEffect } from 'react';
import {
    Text, ToastAndroid, View, FlatList, TextInput, TouchableOpacity, Image, Modal, Dimensions,
    ActivityIndicator, Linking, Platform, PermissionsAndroid
} from 'react-native';
import styles from './styles';
import { Card } from 'react-native-paper';
import Header from '../../component/header/index'
import { contactListAction, profileAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import moment from 'moment';
import Contacts from 'react-native-contacts';
import { useIsFocused } from '@react-navigation/native';
import navigationStrings from '../../constant/navigationStrings';
export default function Contact({ navigation }) {
    const { width, height } = Dimensions.get('window');
    const dispatch = useDispatch()
    const loginData = useSelector(state => state.auth.data)
    const contactData = useSelector(state => state.contactList.contacts)
    const PermissionData = useSelector(state => state.profile.permission)
    const [isVisible2, setIsVisible2] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [search, setSearch] = useState('');
    const [IsLodding, setIsLodding] = useState(true)
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [search2, setSearch2] = useState('');
    const [mob, setmob] = useState([]);
    const [Filteredmob, setFilteredmob] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused ? initialstate() : null
        isFocused ? Get_Data() : null
    }, [isFocused])
    const Get_Data = () => {
        setIsLodding(true)
        const data = { uid: loginData.data.uid,
            profile_id: loginData.data.cProfile,
            org_uid: loginData.data.org_uid}
        dispatch(profileAction.GetPermission({ account_id: loginData.data.acId.toString() }, loginData.data.token))
        dispatch(contactListAction.contactList(data, loginData.data.token));
    }
    useEffect(() => {
        if (PermissionData) {
            if (PermissionData.status == "success") {
                if (PermissionContacts(JSON.parse(PermissionData.permissions)).includes('edit')) { seteditPermission(true) }
                if (PermissionContacts(JSON.parse(PermissionData.permissions)).includes('create')) { setcreatePermission(true) }
                if (PermissionContacts(JSON.parse(PermissionData.permissions)).includes('delete')) { setdeletePermission(true) }
            }
            else if (PermissionData.status == "failed") {
                ToastAndroid.show(PermissionData.message, ToastAndroid.SHORT);
            }
        }
    }, [PermissionData])
    useEffect(() => {
        if (contactData) {
            if (contactData.status == "200") {
                setFilteredDataSource(contactData.data)
                setMasterDataSource(contactData.data)
                if (contactData.data == []) { setModalVisible2(true) }
                else { setModalVisible2(false) }
                setIsLodding(false)
                dispatch(contactListAction.clearResponse())
            }
            else if (contactData.status == "fail") {
                setIsLodding(false)
                ToastAndroid.show(contactData.message, ToastAndroid.SHORT);
            }
        }
    }, [contactData])
    const initialstate = () => {
        seteditPermission(false)
        setdeletePermission(false)
        setcreatePermission(false)
    }
    const PermissionContacts = (permiss, account) => {
        console.log(permiss)
        return permiss.contacts.map((el) => {
            return el.value;
        })
    }
    const [editPermission, seteditPermission] = useState(false)
    const [deletePermission, setdeletePermission] = useState(false)
    const [createPermission, setcreatePermission] = useState(false)
    const AskForAddContact = () => {
        setModalVisible3(!modalVisible3)
    }
    const CancelAskForAddContact = () => {
        setModalVisible3(!modalVisible3)
    }
    const GetContactFromMobile = () => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: 'Contacts',
                message: 'This app would like to view your contacts.',
            }).then(() => {
                Contacts.checkPermission().then(permission => {
                    // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
                    if (permission === 'undefined') {
                        Contacts.requestPermission().then(permission => { })
                    }
                    if (permission === 'authorized') {
                        CancelAskForAddContact()
                        loadContacts();
                        setIsVisible2(true)
                    }
                    if (permission === 'denied') { CancelAskForAddContact() }
                })
            }).catch(function (e) {
                setIsVisible2(false)
                console.error(e.message); // "oh, no!"
            })
        } else { loadContacts(); }
    }
    const loadContacts = () => {
        Contacts.getAll().then(contacts => {
            contacts.sort((a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),);
            setmob(contacts);
            setFilteredmob(contacts);
        }).catch(e => {
            alert('Permission to access contacts was denied');
            console.warn('Permission to access contacts was denied');
        });
    };
    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.first_name ? item.first_name.toUpperCase() : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };
    const searchFilterphoneContact = (text) => {
        if (text) {
            const newData = mob.filter(function (item) {
                const itemData = item.displayName ? item.displayName.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredmob(newData);
            setSearch2(text);
        } else {
            setFilteredmob(mob);
            setSearch2(text);
        }
    };
    const call = (mobileNo) => {
        let phoneNumber = mobileNo;
        if (Platform.OS !== "android") {
            phoneNumber = `telprompt:${mobileNo}`;
        } else { phoneNumber = `tel:${mobileNo}`; }
        Linking.canOpenURL(phoneNumber).then(supported => {
            if (!supported) { ToastAndroid.show('Number is not available', ToastAndroid.SHORT); } else {
                return Linking.openURL(phoneNumber);
            }
        }).catch(err => console.log(err));
    };
    const Edit_Contact_Function = (id) => {
        navigation.navigate(navigationStrings.Edit_Contact, { Edata: id })
    }
    const AddNewContact = (item) => {
        navigation.navigate(navigationStrings.AddContact, {
            name: item.phoneNumbers[0] ? item.phoneNumbers[0].number !== item.displayName ? item.displayName : '' : '',
            phone: item.phoneNumbers[0] ? item.phoneNumbers[0].number : '',
            phone2: item.phoneNumbers[1] ? item.phoneNumbers[1].number : ''
        })
        setIsVisible2(false)
    }
    const ManuallyAdd = () => {
        setModalVisible3(!modalVisible3)
        navigation.navigate(navigationStrings.AddContact)
    }
    const addContacts = () => {
        setModalVisible2(!modalVisible2),
            setModalVisible3(!modalVisible3)
    }
    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        initialstate()
        Get_Data()
    }
    const ContactView = ({ item }) => {
        return (<View style={styles.listData} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000', fontFamily: 'Roboto' }}>{item.first_name} {item.last_name}</Text>
                    <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Roboto', paddingTop: 3 }}>{item.company}</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => call(item.phone)} >
                            <Image style={{ height: 35, width: 35, }}
                                source={require('../../images/GroupCall.png')} />
                        </TouchableOpacity>
                        {editPermission ? <TouchableOpacity style={{ marginLeft: '2%' }} onPress={() => Edit_Contact_Function(item)} >
                            <Image style={{ height: 35, width: 35 }}
                                source={require('../../images/editConatct.png')}
                            />
                        </TouchableOpacity> : null}
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%' }}>
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
        </View>);
    }
    const ContactView2 = ({ item }) => {
        return (<TouchableOpacity onPress={() => AddNewContact(item)} style={{ padding: 5, marginTop: '1%', marginHorizontal: '3%' }}>
            <Text style={{ fontSize: 16 }}>{item.displayName}</Text>
        </TouchableOpacity>
        )
    }
    const ItemSeparatorView = () => {
        return (<View style={{ height: 0.5, width: '100%', backgroundColor: '' }} />);
    };
    return (
        <View style={{ flex: 1 }}>
            <Header style={{ height: height * 12 / 100 }}
                onPressLeft={() => { navigation.openDrawer() }}
                title='Contacts'
                onPressRight={() => { navigation.navigate('Notification') }}
            />
            <View style={styles.inputFields2}>
                <Image style={[styles.icon, { height: 26, width: 25, margin: '1%', marginTop: '4%', padding: 10 }]}
                    source={require('../../images/search.png')} />
                <TextInput
                    style={{ flex: 1 }}
                    value={search}
                    onChangeText={(text) => searchFilterFunction(text)}
                    placeholder="Search for contacts"
                    underlineColorAndroid="transparent"
                />
            </View>
            {createPermission ? <TouchableOpacity onPress={() => AskForAddContact()} style={styles.addNewBtn} >
                <Text style={{ color: "#fff", fontSize: 13 }}> Import From Storage</Text>
            </TouchableOpacity> : null}
            <View style={{ flex: 1, marginVertical: '2%' }}>
                {IsLodding == true ?
                    <ActivityIndicator size="small" color="#0000ff" />
                    :
                    <FlatList
                        data={filteredDataSource}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ContactView}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        ListEmptyComponent={() => (!filteredDataSource.length ?
                            <Text style={{ textAlign: 'center', marginTop: '5%', fontSize: 20 }}>Data Not Found</Text>
                            : null)}
                    />
                }
            </View>
            <Modal animationType="slide" transparent={true} visible={modalVisible3}
                onRequestClose={() => CancelAskForAddContact()}>
                <Card style={[styles.headerViewA, { paddingBottom: '-5%', }]}>
                    <View style={styles.headerView2A}>
                        <TouchableOpacity onPress={() => CancelAskForAddContact()} >
                            <Image style={{ margin: '5%', marginTop: '3%', alignSelf: 'flex-end', height: 14, width: 14 }}
                                source={require('../../images/crossImgR.png')} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.titleA, { marginTop: '-5%' }]}>Add Contacts </Text>
                    <View style={{ marginTop: '3%' }}>
                        <TouchableOpacity onPress={() => GetContactFromMobile()} >
                            <View style={styles.listDataA}>
                                <Image style={styles.titleImgA} source={require('../../images/book.png')} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.btnTextA}>Import from contact book</Text>
                                    <Image style={styles.navigateImgA} source={require('../../images/navR.png')} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: '3%' }}>
                        <TouchableOpacity onPress={() => ManuallyAdd()}>
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
            <Modal animationType="slide" transparent={true} visible={isVisible2}
                onRequestClose={() => setIsVisible2(false)}>
                <View style={{ backgroundColor: '#fff', height: height * 85 / 100, margin: '3%' }}>
                    <TouchableOpacity style={{ margin: '3%', width: '20%', alignSelf: 'flex-end' }} onPress={() => setIsVisible2(false)}>
                        <Image style={{ alignSelf: 'flex-end', marginRight: '5%', height: 18, width: 18 }}
                            source={require('../../images/crossImgR.png')} />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', marginVertical: '1%', fontSize: 16, fontWeight: 'bold' }}>Select Any One</Text>
                    <View style={{ flexDirection: 'row', marginHorizontal: '3%', paddingHorizontal: '2%', borderWidth: 1, }}>
                        <Image style={[styles.icon, { height: 22, width: 22, margin: '1%', marginTop: '4%', padding: 10 }]}
                            source={require('../../images/search.png')} />
                        <TextInput
                            style={{ flex: 1 }}
                            value={search2}
                            onChangeText={(text) => searchFilterphoneContact(text)}
                            placeholder="Search for contacts"
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <FlatList
                        data={Filteredmob}
                        keyExtractor={(item, index) => index.toString()}
                        // ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ContactView2}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        ListEmptyComponent={() => (!Filteredmob.length ?
                            <Text style={{ textAlign: 'center', marginTop: '5%', fontSize: 20 }}>Data Not Found</Text>
                            : null)}
                    />
                </View>
            </Modal>
            <Modal animationType="slide" transparent={true} visible={modalVisible2} onRequestClose={() => CancelAskForAddContact()}>
                <View style={styles.centeredViewM}>
                    <View style={styles.modalViewM}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', }} onPress={() => CancelAskForAddContact()}>
                            <Image style={{ margin: '5%', marginTop: '3%', height: 14, width: 14 }}
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
        </View>
    );
};