import React, { useState, useEffect } from 'react';
import {
    Text, View, ToastAndroid, TouchableOpacity, TextInput, Picker, FlatList, Image, Button, ActivityIndicator,
    Modal, Pressable, StatusBar, Dimensions
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../../component/header/index'
import { staffMemberAction, leadAction, profileAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { BottomSheet } from 'react-native-elements';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

export default function Staff_Members({ navigation }) {

    const [Email, setEmail] = useState("")
    const [role, setrole] = useState(null);
    const [account, setaccount] = useState(null);
    const [Roles, setRoles] = useState([])
    const [AccountType, setAccountType] = useState([])
    const [askDelete, setaskDelete] = useState(false);
    const [askDelete1, setaskDelete1] = useState(false);
    const { width, height } = Dimensions.get('window');
    const [leadOwnerData, setleadOwnerData] = useState('')
    const [IsLodding, setIsLodding] = useState({ userLodding: true, inviteLodding: false, roleLodding: true })
    const [page, setPage] = useState(0);
    const [perPageItems, setperPageItems] = useState(10);
    const [totalItems, settotalItems] = useState(0);
    const dispatch = useDispatch()
    const isFocused = useIsFocused();

    const loginData = useSelector(state => state.auth.data)
    const inviteResponse = useSelector(state => state.staffMember.inviteData)
    const leadOwner = useSelector(state => state.staffMember.userList)
    const roleResponse = useSelector(state => state.staffMember.role)
    const PermissionData = useSelector(state => state.profile.permission)

    useEffect(() => {
        isFocused ? initialstate() : null
        isFocused ? FetchData(page) : null
    }, [isFocused])
    const FetchData = (p) => {
        setIsLodding({ ...IsLodding, userLodding: true, roleLodding: true })
        const data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
            pageSize: '10',
            pageNumber: p,
        }
        dispatch(profileAction.GetPermission({ account_id: loginData.data.acId.toString() }, loginData.data.token))
        dispatch(staffMemberAction.UserList(data, loginData.data.token));
        dispatch(staffMemberAction.ProfileRoleList(data, loginData.data.token));
    }
    useEffect(() => {
        if (PermissionData) {
            if (PermissionData.status == "success") {
                if (PermissionUser(JSON.parse(PermissionData.permissions)).includes('edit')) { seteditPermission(true) }
                if (PermissionUser(JSON.parse(PermissionData.permissions)).includes('create')) { setcreatePermission(true) }
                if (PermissionUser(JSON.parse(PermissionData.permissions)).includes('delete')) { setdeletePermission(true) }
            }
            else if (PermissionData.status == "failed") {
                ToastAndroid.show(PermissionData.message, ToastAndroid.SHORT);
            }
        }
    }, [PermissionData])
    useEffect(() => {
        if (leadOwner) {
            if (leadOwner.status == "success") {
                setleadOwnerData(leadOwner.data.map((item, index) => item.user))
                setIsLodding({ ...IsLodding, roleLodding: false })
            }
            else if (leadOwner.status == "failed") {
                setIsLodding({ ...IsLodding, roleLodding: false })
            }
        }
    }, [leadOwner])
    useEffect(() => {
        if (roleResponse) {
            if (roleResponse.status == "200") {
                setAccountType(roleResponse.data.acTypes)
                setRoles(roleResponse.data.rolelist)
                setIsLodding({ ...IsLodding, roleLodding: false })
            }
            else if (roleResponse.status == "fail") {
                setIsLodding({ ...IsLodding, roleLodding: false })
                ToastAndroid.show(roleResponse.message, ToastAndroid.SHORT);
            }
        }
    }, [roleResponse])
    useEffect(() => {
        if (inviteResponse) {
            if (inviteResponse.status == "success") {
                setaskDelete(false)
                ToastAndroid.show(inviteResponse.message, ToastAndroid.SHORT);
                dispatch(staffMemberAction.clearResponse())
                setIsLodding({ ...IsLodding, inviteLodding: false })
                initialstate()
                FetchData(0)
            }
            else if (inviteResponse.status == "failed") {
                setaskDelete(false)
                ToastAndroid.show(inviteResponse.message, ToastAndroid.SHORT);
                dispatch(staffMemberAction.clearResponse())
                setIsLodding({ ...IsLodding, inviteLodding: false })
            }
        }
    }, [inviteResponse])
    const initialstate = () => {
        setIsLodding({ ...IsLodding, userLodding: true, roleLodding: true })
        setEmail("")
        setrole(null)
        setaccount(null)
        seteditPermission(false)
        setdeletePermission(false)
        setcreatePermission(false)
    }
    const PermissionUser = (permiss, account) => {
        return permiss.users.map((el) => {
            return el.value;
        })
    }
    const [editPermission, seteditPermission] = useState(false)
    const [deletePermission, setdeletePermission] = useState(false)
    const [createPermission, setcreatePermission] = useState(false)
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
            setIsLodding({ ...IsLodding, inviteLodding: true })
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
    const CencelFunction = () => {
        setEmail("")
        setrole(null)
        setaccount(null)
        setaskDelete(!askDelete)
    }
    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        initialstate()
        FetchData()
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
    const UserLisView = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => Details(item)}
                style={{
                    marginHorizontal: '3%', marginVertical: '1%', backgroundColor: '#e9ebf2',
                    padding: '2%', borderRadius: 10
                }}>
                <View style={{ flexDirection: 'row', paddingBottom: '1%' }}>
                    <View style={{ justifyContent: 'center', }}>
                        <Image
                            style={{ height: 48, width: 48, }}
                            source={require('../../images/profileCall.png')}
                        />
                    </View>
                    <View style={{ justifyContent: 'center', flex: 1, marginHorizontal: '2%', }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
                        <Text numberOfLines={1}>{item.organization}</Text>
                        <Text numberOfLines={1}>{item.email}</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end', }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'flex-end', }}
                            onPress={() => Details(item)} >
                            <Text style={{ paddingRight: '2%', fontSize: 13 }}>More Detail</Text>
                            <Image style={{height: 18, width: 12  }}
                                source={require('../../images/newDetail.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1, position: 'absolute' }}>
            <Header
                style={{ height: height * 12 / 100 }}
                onPressLeft={() => { navigation.openDrawer() }}
                title='Users'
                onPressRight={() => { navigation.navigate('Notification') }}
            />
            {createPermission ? <TouchableOpacity onPress={() => setaskDelete(!askDelete)}
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
            </TouchableOpacity> :
                <TouchableOpacity
                    // onPress={() => setaskDelete(!askDelete)}
                    style={{
                        // borderColor: '#fff',
                        // borderWidth: 1,
                        paddingHorizontal: 10,
                        paddingVertical: 2,
                        alignSelf: 'flex-end',
                        marginHorizontal: '3%',
                        marginTop: '-10%',
                        borderRadius: 15
                    }}>
                    <Text style={{ color: "#fff", fontSize: 12 }}>
                        {/* +Add */}
                    </Text>
                </TouchableOpacity>}
            <View style={{ marginVertical: '2%', flex: 1, }}>
                {IsLodding.userLodding && IsLodding.roleLodding ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                    :
                    <View style={{ flex: 1, marginVertical: '2%' }}>
                        <FlatList
                            data={leadOwnerData}
                            renderItem={UserLisView}
                            ListEmptyComponent={() => (!leadOwnerData.length ?
                                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '30%' }}>Data Not Found</Text>
                                : null)}
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            keyExtractor={item => item.id}
                        />
                    </View>
                }
            </View>
            <BottomSheet modalProps={{
                animationType: 'fade', hardwareAccelerated: true,
                onRequestClose: () => CencelFunction()
            }} onBackdropPress={() => CencelFunction()} isVisible={askDelete}>
                <View style={{
                    flex: 1, backgroundColor: '#fff', position: 'relative',
                    paddingHorizontal: '3%', paddingTop: '5%', paddingBottom: '10%',
                    borderTopLeftRadius: 20, borderTopRightRadius: 20
                }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ borderBottomWidth: 1 }}>
                            <Text style={styles.askTitleDetail}>Invite New Member</Text>
                            <TouchableOpacity style={styles.askTitleDetailR}
                                onPress={() => CencelFunction()}>
                                <Image style={{ height: 14, width: 14, }}
                                    source={require('../../images/cross_blackIos.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: height * 2.7 / 100, width: '8%', marginRight: '1.5%', marginTop: '4%' }]}
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
                    <Dropdown
                        style={[styles.dropdown3, { marginTop: '2%' }]}
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
                                <Image style={[styles.icon, { height: 22, width: 22 }]}
                                    source={require('../../images/transgender.png')} />
                            </View>
                        )}
                    />
                    {IsLodding.inviteLodding == true ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: '3%' }}>
                        <Pressable style={[styles.askBtn]} onPress={() => CencelFunction()}>
                            <Text style={styles.askBtnText}>Cancel</Text>
                        </Pressable>
                        <View style={{ margin: '5%' }} />
                        <Pressable style={[styles.askBtn]} onPress={() => invite_Members()}>
                            <Text style={styles.askBtnText}>Send</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheet>
            <BottomSheet modalProps={{
                animationType: 'fade', hardwareAccelerated: true,
                onRequestClose: () => DetailsCancel()
            }} onBackdropPress={() => DetailsCancel()} isVisible={askDelete1}>
                <View style={{
                    flex: 1, backgroundColor: '#fff',
                    padding: '3%', paddingTop: '5%',
                    borderTopLeftRadius: 20, borderTopRightRadius: 20
                }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ borderBottomWidth: 1 }}>
                            <Text style={styles.askTitleDetail}>User Detail</Text>
                            <TouchableOpacity style={styles.askTitleDetailR}
                                onPress={() => DetailsCancel()}>
                                <Image style={{ height: 14, width: 14, }}
                                    source={require('../../images/cross_blackIos.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: '2%', flex: 1 }}>
                        <View style={{ justifyContent: 'center' }}>
                            <Avatar.Image size={50}
                                style={{ backgroundColor: '#fff' }}
                                source={require('../../images/profileCall.png')} />
                        </View>
                        <View style={{ marginHorizontal: '2%', flex: 1, justifyContent: 'center' }}>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold' }]}>{Objcet.name.charAt(0).toUpperCase() + Objcet.name.slice(1)}</Text>
                            <Text style={styles.DetailCampTitle}>{Objcet.organization.charAt(0).toUpperCase() + Objcet.organization.slice(1)}</Text>
                        </View>
                    </View>
                    {Objcet.phone ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Phone</Text> : null}
                    {Objcet.phone ? <Text style={styles.DetailCampTitle}>{Objcet.phone}</Text> : null}
                    {Objcet.email ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Email</Text> : null}
                    {Objcet.email ? <Text style={styles.DetailCampTitle}>{Objcet.email}</Text> : null}
                    {Objcet.dob ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Date Of Birth</Text> : null}
                    {Objcet.dob ? <Text style={styles.DetailCampTitle}>{Objcet.dob}</Text> : null}
                    {Objcet.created_at ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Created </Text> : null}
                    {Objcet.created_at ? <Text style={styles.DetailCampTitle}>{moment(Objcet.created_at).format('lll')}</Text> : null}
                    {Objcet.Address ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Address</Text> : null}
                    {Objcet.Address ? <Text style={styles.DetailCampTitle}>{Objcet.Address}</Text> : null}
                </View>
            </BottomSheet>
        </View >
    );
}