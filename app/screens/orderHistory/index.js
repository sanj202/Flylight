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

export default function OrderHistory({ navigation }) {

    const [askDelete1, setaskDelete1] = useState(false);
    const { width, height } = Dimensions.get('window');
    const [IsLodding, setIsLodding] = useState(true)
    const [Package, setPackage] = useState('')
    const [TopUp, setTopUp] = useState('')
    const [isService, setisService] = useState('Package');
    const dispatch = useDispatch()
    const loginData = useSelector(state => state.auth.data)
    const OrderDetail = useSelector(state => state.organization.getpackHistory)

    const checkValue = (value) => {
        setisService(value)
    }

    useEffect(() => {
        setIsLodding(true)
        Get_Data()
    }, [])

    const Get_Data = () => {
        setIsLodding(true)
        dispatch(organizationAction.orderHistoryList(
            loginData.data.uid,
            loginData.data.org_uid,
            loginData.data.cProfile.toString(), loginData.data.token));
    }


    useEffect(() => {
        if (OrderDetail) {
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


    const DetailPackAPI = (item) => {
        console.log('.......................', item.order_id)
        // setaskDelete1(true)
        return fetch(`http://13.235.42.46/admin/public/api/mobile/v1/PackageInvoice/
        uid=${loginData.data.uid}/profile_id=${loginData.data.cProfile.toString()}/org_uid=${loginData.data.org_uid}/
        order_id=${item.order_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loginData.data.token,
            }
        })
            .then((response) => response)
            .then((json) => {
                console.log('movie.......................', json)
                return json.movies;
            })
            .catch((error) => {
                console.error(error);
            });

    }

    const detailPackClose = () => {
        setaskDelete1(false)
    }

    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        console.log(refreshing)
        Get_Data()
    }

    const PackView = ({ item, index }) => {
        return (
            // <TouchableOpacity onPress={() => DetailPackAPI(item)}>
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
                    <Text style={styles.textDetail}>Status</Text>
                    <Text style={styles.textDetail}>Validity</Text>
                    <Text style={styles.textDetail}>Purchased</Text>
                </View>
                <View style={{ flexDirection: 'column', marginLeft: '5%' }}>
                    <Text style={[styles.textDetail, { fontWeight: 'bold', width: '75%', marginLeft: '2%' }]}>:{item.order_id}</Text>
                    <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :{item.ppackage.title}</Text>
                    <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :Rs.{item.ppackage.amount}</Text>
                    {item.is_active == 1 ?
                        <Text style={[styles.textDetail, { fontWeight: 'bold', color: '#09db25' }]}> :{item.is_active == 1 ? 'Enable' : 'Disable'}</Text>
                        :
                        <Text style={[styles.textDetail, { fontWeight: 'bold', color: '#de2e0b' }]}> :{item.is_active == 1 ? 'Enable' : 'Disable'}</Text>}
                    <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :{item.validity}</Text>
                    <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :{moment(item.created_at).format('lll')}</Text>
                </View>
            </View>
            // </TouchableOpacity>
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
                    <Text style={styles.textDetail}>Status</Text>
                    <Text style={styles.textDetail}>Purchased</Text>
                </View>
                <View style={{ flexDirection: 'column', marginLeft: '5%' }}>
                    <Text style={[styles.textDetail, { fontWeight: 'bold', width: '75%', marginLeft: '2%' }]}>:{item.order_id}</Text>
                    <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :{item.ptopup.title}</Text>
                    <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :Rs.{item.ptopup.amount}</Text>
                    {item.is_active == 1 ?
                        <Text style={[styles.textDetail, { fontWeight: 'bold', color: '#09db25' }]}> :{item.is_active == 1 ? 'Enable' : 'Disable'}</Text>
                        :
                        <Text style={[styles.textDetail, { fontWeight: 'bold', color: '#de2e0b' }]}> :{item.is_active == 1 ? 'Enable' : 'Disable'}</Text>}
                    <Text style={[styles.textDetail, { fontWeight: 'bold' }]}> :{moment(item.created_at).format('lll')}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={[styles.container, { height: height, width: width }]}>
            <Header
                style={{ height: "14%" }}
                onPressLeft={() => {
                      navigation.openDrawer()
                    // navigation.goBack()
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
                                    data={Package}
                                    renderItem={PackView}
                                    ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                                    refreshing={refreshing}
                                    onRefresh={handleRefresh}
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
                                        data={TopUp}
                                        renderItem={TopUpView}
                                        ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                                        refreshing={refreshing}
                                        onRefresh={handleRefresh}
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


            <Modal animationType="slide" transparent={true} visible={askDelete1}
                onRequestClose={() => { setaskDelete1(false); }}>
                <View style={styles.askModel}>
                    <Text style={styles.askTitle}>Package Services Detail</Text>
                    <TouchableOpacity
                        style={styles.askTitleR}
                        onPress={() => detailPackClose()}
                    >
                        <Image
                            style={{ height: 14, width: 14, }}
                            source={require('../../images/cross.png')}
                        />
                    </TouchableOpacity>

                    <View style={[styles.inputFields, { padding: 10 }]}>
                        <View>
                            <Text style={styles.DetailCampTitle}>users</Text>
                            <Text style={styles.DetailCampTitle}>emails</Text>
                            <Text style={styles.DetailCampTitle}>organizations </Text>
                            <Text style={styles.DetailCampTitle}>leads</Text>
                        </View>
                        <View style={{ marginLeft: '3%', width: '70%' }}>
                            <Text style={styles.DetailCampTitle}>users</Text>
                            <Text style={styles.DetailCampTitle}>emails</Text>
                            <Text style={styles.DetailCampTitle}>organizations </Text>
                            <Text style={styles.DetailCampTitle}>leads</Text>
                        </View>
                    </View>
                </View>
            </Modal>


        </View >
    );
}


