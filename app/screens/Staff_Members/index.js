import React, { useState, useEffect } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, TextInput, Picker, FlatList, Image, Button, ActivityIndicator,
    Modal, Alert, Pressable, StatusBar, Dimensions
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../../component/header/index'
import { taskmanagerAction, staffMemberAction, leadAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"
import moment from 'moment';

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
    const [leadOwnerData, setleadOwnerData] = useState('')
    const [IsLodding, setIsLodding] = useState(false)
    const dispatch = useDispatch()
    const isFocused = useIsFocused();

    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)
    const inviteResponse = useSelector(state => state.staffMember.inviteData)
    const leadOwner = useSelector(state => state.leads.leadOwner)


    useEffect(() => {
        if (loginData || registerData && isFocused) {
            if (loginData.status == "success") {
                const data = {
                    uid: loginData.data.uid,
                    org_uid: loginData.data.org_uid,
                    profile_id: loginData.data.cProfile.toString(),
                }
                dispatch(leadAction.LeadOwnerList(data, loginData.data.token));
            }
            else if (registerData.status == "success") {
                const data = {
                    profile_id: registerData.data.cProfile.toString(),
                    org_uid: registerData.data.org_uid,
                    uid: registerData.data.uid
                }
                dispatch(leadAction.LeadOwnerList(data, registerData.data.token));
            }
        }
    }, [loginData, registerData, isFocused])

    useEffect(() => {
        if (leadOwner) {
            if (leadOwner.status == "200") {
                setleadOwnerData(leadOwner.data.map((item, index) => item.user))
            }
            else if (leadOwner.status == "failed") {
            }
            else if (leadOwner.status == "fail") {
            }
        }
        else {
        }
    }, [leadOwner])

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
        if (Email == "") {
            Alert.alert(" Enter Email Id ")
        }
        else if (role == null) {
            Alert.alert(" Select Role")
        }
        else if (account == null) {
            Alert.alert(" Select Account Type ")
        }
        else {
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
                <View style={{ marginLeft: '-12%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{moment(item.created_at).format('MMMM Do YYYY')},</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{moment(item.created_at).format("h:mm A")}</Text>
                </View>
            </View>)
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

                        {leadOwnerData ?
                            <FlatList
                                data={leadOwnerData}
                                renderItem={UserLisView}
                            />
                            :
                            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>
                        }

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


