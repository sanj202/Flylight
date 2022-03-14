import React, { useState, useEffect } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, ToastAndroid, Picker, FlatList, Image, Button, ActivityIndicator,
    Modal, Alert, Pressable, StatusBar, Dimensions
} from 'react-native';
import moment from 'moment';
import Header from '../../component/header/index'
import { taskmanagerAction, organizationAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"

export default function lead_manager({ navigation }) {

    const { width, height } = Dimensions.get('window');
    const [IsLodding, setIsLodding] = useState(true)
    const [Package, setPackage] = useState('')
    const [TopUp, setTopUp] = useState('')
    const [isService, setisService] = useState('Package');
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)
    const OrderDetail = useSelector(state => state.organization.getpackHistory)

    const checkValue = (value) => {
        setisService(value)
    }

    useEffect(() => {
        if (loginData || registerData && isFocused) {
            if (loginData.status == "success") {
                dispatch(organizationAction.orderHistoryList(
                    loginData.data.uid,
                    loginData.data.org_uid,
                    loginData.data.cProfile.toString(), loginData.data.token));
            }
            else if (registerData.status == "success") {
                dispatch(organizationAction.orderHistoryList(
                    registerData.data.uid,
                    registerData.data.org_uid,
                    registerData.data.cProfile.toString(), registerData.data.token));
            }
        }
    }, [loginData, registerData, isFocused])

    useEffect(() => {
        if (OrderDetail) {
            // console.log(OrderDetail, 'useEffect')
            if (OrderDetail.status == "success") {
                setPackage(OrderDetail.data.packageTransactions)
                setTopUp(OrderDetail.data.topupTransactions)
                setIsLodding(false)
            }
            else if (OrderDetail.status == "failed") {
                ToastAndroid.show(OrderDetail.message, ToastAndroid.SHORT);
                setIsLodding(false)
            }
            else if (OrderDetail.status == "fail") {
                ToastAndroid.show(OrderDetail.message, ToastAndroid.SHORT);
                setIsLodding(false)
            }
            else {
            }
        }
    }, [OrderDetail])


    const PackView = ({ item, index }) => {

        return (
            <View style={item.is_active == 1 ?
                { flexDirection: 'row', borderWidth: 1, borderColor: 'blue', marginHorizontal: '5%', borderRadius: 10, marginTop: '2%', padding: 5 }
                :
                { flexDirection: 'row', borderWidth: 1, marginHorizontal: '5%', borderRadius: 10, marginTop: '2%', padding: 5 }
            }>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.textDetail}>#Id</Text>
                    <Text></Text>
                    <Text style={styles.textDetail}>Package	</Text>
                    <Text style={styles.textDetail}>Amount</Text>
                    {/* <Text style={styles.textDetail}>Expiration</Text> */}
                    <Text style={styles.textDetail}>Status</Text>
                    <Text style={styles.textDetail}>Validity</Text>
                    <Text style={styles.textDetail}>Purchased</Text>
                    {/* <Text style={styles.textDetail}>Expired</Text> */}
                </View>
                <View style={{ flexDirection: 'column', marginLeft: '5%' }}>
                    <Text style={[styles.textDetail, { fontWeight: 'bold', width: '75%', marginLeft: '2%' }]}>:{item.order_id}</Text>
                    <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :{item.ppackage.title}</Text>
                    <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :Rs.{item.ppackage.amount}</Text>
                    {/* <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :After 26 days</Text> */}
                    {item.is_active == 1 ?
                        <Text style={[styles.textDetail, { fontWeight: 'bold', color: '#09db25' }]}> :{item.is_active == 1 ? 'Enable' : 'Disable'}</Text>
                        :
                        <Text style={[styles.textDetail, { fontWeight: 'bold', color: '#de2e0b' }]}> :{item.is_active == 1 ? 'Enable' : 'Disable'}</Text>}
                    <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :{item.validity}</Text>
                    <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :{moment(item.created_at).format('lll')}</Text>
                    {/* <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :{moment(item.created_at).format('lll')}</Text> */}
                </View>
            </View>
        )
    }

    const TopUpView = ({ item, index }) => {
        return (
            <View style={item.is_active == 1 ?
                { flexDirection: 'row', borderWidth: 1, borderColor: 'blue', marginHorizontal: '5%', borderRadius: 10, marginTop: '2%', padding: 5 }
                :
                { flexDirection: 'row', borderWidth: 1, marginHorizontal: '5%', borderRadius: 10, marginTop: '2%', padding: 5 }
            }>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.textDetail}>#Id</Text>
                    <Text></Text>
                    <Text style={styles.textDetail}>Package	</Text>
                    <Text style={styles.textDetail}>Amount</Text>
                    {/* <Text style={styles.textDetail}>Expiration</Text> */}
                    <Text style={styles.textDetail}>Status</Text>
                    {/* <Text style={styles.textDetail}>Validity</Text> */}
                    <Text style={styles.textDetail}>Purchased</Text>
                    {/* <Text style={styles.textDetail}>Expired</Text> */}
                </View>
                <View style={{ flexDirection: 'column', marginLeft: '5%' }}>
                    <Text style={[styles.textDetail, { fontWeight: 'bold', width: '75%', marginLeft: '2%' }]}>:{item.order_id}</Text>
                    <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :{item.ptopup.title}</Text>
                    <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :Rs.{item.ptopup.amount}</Text>
                    {/* <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :After 26 days</Text> */}
                    {item.is_active == 1 ?
                        <Text style={[styles.textDetail, { fontWeight: 'bold', color: '#09db25' }]}> :{item.is_active == 1 ? 'Enable' : 'Disable'}</Text>
                        :
                        <Text style={[styles.textDetail, { fontWeight: 'bold', color: '#de2e0b' }]}> :{item.is_active == 1 ? 'Enable' : 'Disable'}</Text>}
                    {/* <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :{item.validity}</Text> */}
                    <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :{moment(item.created_at).format('lll')}</Text>
                    {/* <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :{moment(item.created_at).format('lll')}</Text> */}
                </View>
            </View>
        )
    }

    return (
        <View style={[styles.container, { height: height, width: width }]}>
            <Header
                style={{ height: "14%" }}
                onPressLeft={() => {
                    //   navigation.openDrawer()
                    navigation.goBack()
                }}
                title='Order History'
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
            <TouchableOpacity
                onPress={() => navigation.navigate('packegeTopups')}
                style={{
                    borderColor: '#fff',
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginHorizontal: '30%',
                    marginVertical: '2%',
                    backgroundColor: '#2296E4',
                    borderRadius: 15
                }}
            >
                <Text style={{ color: "#fff", textAlign: 'center' }}>
                    Buy New {isService}
                </Text>
            </TouchableOpacity>
            {isService == "Package" ?
                <View >
                    {IsLodding == true ?
                        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                        :
                        <View style={{ height: height * 0.62 }}>
                            {Package !== undefined && Package.length > 0 ?
                                <FlatList
                                    // horizontal={true}
                                    data={Package}
                                    renderItem={PackView}
                                    ItemSeparatorComponent={
                                        () => <View style={{ width: 5 }} />
                                    }
                                />
                                :
                                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>
                            }

                        </View>
                    }
                </View>
                :
                <View />
            }

            {
                isService == "Topups" ?

                    <View >
                        {IsLodding == true ?
                            <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                            :
                            <View style={{ height: height * 0.62 }}>
                                {TopUp !== undefined && TopUp.length > 0 ?
                                    <FlatList
                                        // horizontal={true}
                                        data={TopUp}
                                        renderItem={TopUpView}
                                        ItemSeparatorComponent={
                                            () => <View style={{ width: 5 }} />
                                        }
                                    />
                                    :
                                    <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>
                                }

                            </View>
                        }
                    </View>
                    :
                    <View />


            }
        </View >
    );
}


