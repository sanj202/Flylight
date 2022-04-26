import React, { useState, useEffect } from 'react';
import {
    Text, View, ToastAndroid, TouchableOpacity, TextInput, Picker, FlatList, Image, Button, ActivityIndicator,
    Modal, Pressable, StatusBar, Dimensions
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../../component/header/index'
import { staffMemberAction, leadAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"
import moment from 'moment';

export default function Staff_Members({ navigation }) {

    const [Email, setEmail] = useState('')
    const [role, setrole] = useState(null);
    const [account, setaccount] = useState(null);
    const [Roles, setRoles] = useState([])
    const [AccountType, setAccountType] = useState([])
    const [askDelete, setaskDelete] = useState(false);
    const [askDelete1, setaskDelete1] = useState(false);
    const { width, height } = Dimensions.get('window');
    const [leadOwnerData, setleadOwnerData] = useState('')
    const [IsLodding, setIsLodding] = useState({
        userLodding: true,
        inviteLodding: false,
        roleLodding: true
    })
    const [page, setPage] = useState(0);
    const [perPageItems, setperPageItems] = useState(10);
    const [totalItems, settotalItems] = useState(0);
    const dispatch = useDispatch()
    const isFocused = useIsFocused();

    const loginData = useSelector(state => state.auth.data)
    const inviteResponse = useSelector(state => state.staffMember.inviteData)
    const leadOwner = useSelector(state => state.staffMember.userList)
    const roleResponse = useSelector(state => state.staffMember.role)

    useEffect(() => {
        FetchData(page)
    }, [])

    const FetchData = (p) => {
        setIsLodding({
            ...IsLodding,
            userLodding: true,
            roleLodding: true
        })
        const data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
            pageSize: perPageItems,
            pageNumber: p,
        }
        dispatch(staffMemberAction.ProfileRoleList(data, loginData.data.token));
        dispatch(staffMemberAction.UserList(data, loginData.data.token));
    }


    useEffect(() => {
        if (roleResponse) {
            if (roleResponse.status == "200") {
                setAccountType(roleResponse.data.acTypes)
                setRoles(roleResponse.data.rolelist)
                setIsLodding({
                    ...IsLodding,
                    roleLodding: false
                })
            }
            else if (roleResponse.status == "failed") {
                setIsLodding({
                    ...IsLodding,
                    roleLodding: false
                })
            }
            else if (roleResponse.status == "fail") {
                setIsLodding({
                    ...IsLodding,
                    roleLodding: false
                })
            }
        }
    }, [roleResponse])

    useEffect(() => {
        if (leadOwner) {
            if (leadOwner.status == "success") {
                setleadOwnerData(leadOwner.data.map((item, index) => item.user))
                setIsLodding({
                    ...IsLodding,
                    roleLodding: false
                })
            }
            else if (leadOwner.status == "failed") {
                setIsLodding({
                    ...IsLodding,
                    roleLodding: false
                })
            }
        }
    }, [leadOwner])

    useEffect(() => {
        if (inviteResponse) {
            if (inviteResponse.status == "success") {
                setaskDelete(false)
                ToastAndroid.show(inviteResponse.message, ToastAndroid.SHORT);
                dispatch(staffMemberAction.clearResponse())
                setIsLodding({
                    ...IsLodding,
                    inviteLodding: false
                })
                setEmail("")
                setrole(null)
                setaccount(null)
            }
            else if (inviteResponse.status == "failed") {
                setaskDelete(false)
                ToastAndroid.show(inviteResponse.message, ToastAndroid.SHORT);
                dispatch(staffMemberAction.clearResponse())
                setIsLodding({
                    ...IsLodding,
                    inviteLodding: false
                })
            }
        }
    }, [inviteResponse])

    const CencelFunction = () => {
        setEmail("")
        setrole(null)
        setaccount(null)
        setaskDelete(!askDelete)
    }

    const invite_Members = () => {
        if (Email == "") {
            ToastAndroid.show('Enter Email Id', ToastAndroid.SHORT);
        }
        else if (role == null) {
            ToastAndroid.show('Select Role', ToastAndroid.SHORT);
        }
        else if (account == null) {
            ToastAndroid.show('Select Account Type', ToastAndroid.SHORT);
        }
        else {
            setIsLodding({
                ...IsLodding,
                inviteLodding: true
            })
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
    }

    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        console.log(refreshing)
        FetchData()
    }

    const UserLisView = ({ item }) => {
        return (
            <View style={styles.listData}>
                <View>
                    <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Name   </Text>
                    <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Mobile </Text>
                    <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Email  </Text>
                </View>
                <View style={{ marginLeft: '2%', width: '58%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.name}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.phone}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.email}</Text>
                </View>
                <View style={{ marginLeft: '-18%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{moment(item.created_at).format('lll')}</Text>
                    <TouchableOpacity
                        onPress={() => Details(item)}
                        style={{  alignSelf: 'flex-end', paddingHorizontal:'5%', backgroundColor: '#3373F3', borderRadius: 20, marginVertical: '10%' }}>
                        <Text style={{ textAlign: 'center', color: '#fff', }}>More...</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const [Objcet, setObjcet] = useState({
        name: '',
        organization: '',
        dob: '',
        phone: '',
        email: '',
        Address: '',
        created_at: '',
        updated_at: ''
    })
    const Details = (value) => {
        setObjcet({
            name: value.name,
            organization: value.organization,
            dob: value.dob,
            phone: value.phone,
            email: value.email,
            Address: (value.street ? value.street : '' + value.city ? value.city : '' + value.state ? value.state : '' + value.zip ? value.zip : ''),
            created_at: value.created_at,
            updated_at: value.updated_at
        })
        setaskDelete1(!askDelete1)
    }

    const DetailsCancel = () => {
        setObjcet({
            name: '',
            organization: '',
            dob: '',
            phone: '',
            email: '',
            Address: '',
            BudgetedCost: '',
            Description: '',
            created_at: '',
            updated_at: ''
        })
        setaskDelete1(!askDelete1)
    }

    return (
        <View style={{ flex: 1, position: 'absolute' }}>
            <Header
                style={{ height: height * 12 / 100 }}
                onPressLeft={() => { navigation.openDrawer() }}
                title='Users'
                onPressRight={() => { navigation.navigate('Notification') }}
            />
            <TouchableOpacity onPress={() => setaskDelete(!askDelete)}
                style={{
                    borderColor: '#fff',
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    alignSelf: 'flex-end',
                    marginHorizontal: '3%',
                    marginTop: '-10%',
                    borderRadius: 15
                }}
            >
                <Text style={{ color: "#fff", fontSize: 12 }}>
                    +Add
                </Text>
            </TouchableOpacity>
            <View style={{ marginVertical: '2%', flex: 1, }}>
                {IsLodding.userLodding && IsLodding.roleLodding ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                    :
                    <View style={{ flex: 1, marginVertical: '2%' }}>
                        <FlatList
                            data={leadOwnerData}
                            renderItem={UserLisView}
                            ListEmptyComponent={() => (!leadOwnerData.length ?
                                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>Data Not Found</Text>
                                : null)}
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            keyExtractor={item => item.id}
                        />
                    </View>
                }
            </View>
            <Modal animationType="slide" transparent={true} visible={askDelete}
                onRequestClose={() => CencelFunction()}>
                <View style={styles.askModel}>
                    <Text style={styles.askTitle}> Invite New Member</Text>
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
                        search={true}
                        searchPlaceholder='Search'
                        maxHeight={160}
                        labelField="name"
                        valueField="id"
                        placeholder='Role'
                        value={role}
                        onChange={item => {
                            setrole(item.id);
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
                            search={true}
                            searchPlaceholder='Search'
                            maxHeight={160}
                            labelField="name"
                            valueField="id"
                            placeholder='Account Type'
                            value={account}
                            onChange={item => {
                                setaccount(item.id);
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

                    {IsLodding.inviteLodding == true ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        :
                        null
                    }
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: '3%' }}>
                        <Pressable
                            style={[styles.askBtn]}
                            onPress={() => CencelFunction()}
                        >
                            <Text style={styles.askBtnText}>Cancel</Text>
                        </Pressable>
                        <View style={{ margin: '5%' }} />
                        <Pressable
                            style={[styles.askBtn]}
                            onPress={() => invite_Members()}
                        >
                            <Text style={styles.askBtnText}>Send</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal animationType="slide" transparent={true} visible={askDelete1}
                onRequestClose={() => { setaskDelete1(false); }}>
                <View style={styles.askModel}>
                    <Text style={styles.askTitle}> Staff Member Detail</Text>
                    <TouchableOpacity
                        style={styles.askTitleR}
                        onPress={() => DetailsCancel()}
                    >
                        <Image
                            style={{ height: 14, width: 14, }}
                            source={require('../../images/cross.png')}
                        />
                    </TouchableOpacity>
                    <View style={[styles.inputFields, { padding: 10 }]}>
                        <View>
                            <Text style={styles.DetailCampTitle}>Name </Text>
                            <Text style={styles.DetailCampTitle}>Organization</Text>
                            <Text style={styles.DetailCampTitle}>Dob</Text>
                            <Text style={styles.DetailCampTitle}>Phone</Text>
                            <Text style={styles.DetailCampTitle}>Email</Text>
                            <Text style={styles.DetailCampTitle}>Address</Text>
                            <Text style={styles.DetailCampTitle}>created Date</Text>
                            <Text style={styles.DetailCampTitle}>updated Date</Text>
                        </View>
                        <View style={{ marginLeft: '3%', width: '70%' }}>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{Objcet.name}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{Objcet.organization}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{Objcet.dob}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{Objcet.phone}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{Objcet.email}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{Objcet.Address}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{moment(Objcet.created_at).format('lll')}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{moment(Objcet.updated_at).format('lll')}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    );
}


