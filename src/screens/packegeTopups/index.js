import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, ToastAndroid, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import Header from '../../component/header/index'
import { organizationAction } from '../../redux/Actions/index'
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"
import RazorpayCheckout from 'react-native-razorpay';

export default function PackegeTopups({ navigation }) {

    const [isService, setisService] = useState('Package');
    const [IsLodding, setIsLodding] = useState(false)
    const [IsLoddingBuy, setIsLoddingBuy] = useState(false)
    const { width, height } = Dimensions.get('window');

    const [Package, setPackage] = useState('')
    const [TopUp, setTopUp] = useState('')
    const dispatch = useDispatch()
    const loginData = useSelector(state => state.auth.data)
    const packDetail = useSelector(state => state.organization.getpack)
    const packOrder = useSelector(state => state.organization.getpackOrder)
    const packOrderVerify = useSelector(state => state.organization.verifypackorder)
    const topOrder = useSelector(state => state.organization.gettopOrder)
    const topOrderVerify = useSelector(state => state.organization.verifytoporder)

    useEffect(() => {
        setIsLodding(true)
        Get_Data()
    }, [])

    const Get_Data = () => {
        setIsLodding(true)
        const data = {
            uid: loginData.data.uid,
            profile_id: loginData.data.cProfile.toString(),
            org_uid: loginData.data.org_uid,
        }
        dispatch(organizationAction.packageList(data, loginData.data.token));
    }

    const checkValue = (value) => {
        setisService(value)
    }

    const BuyPlane = (value) => {
        setIsLoddingBuy(true)
        const data = {
            uid: loginData.data.uid,
            profile_id: loginData.data.cProfile.toString(),
            org_uid: loginData.data.org_uid,
            package_id: value
        }
        dispatch(organizationAction.getpackageOrder(data, loginData.data.token));
    }
    const BuyPlaneTopUp = (value) => {
        setIsLoddingBuy(true)
        const data = {
            uid: loginData.data.uid,
            profile_id: loginData.data.cProfile.toString(),
            org_uid: loginData.data.org_uid,
            topup_id: value
        }
        dispatch(organizationAction.getTopOrder(data, loginData.data.token));
    }
    useEffect(() => {
        if (packOrder) {
            if (packOrder.status == "success") {
                setIsLodding(false)
                var options = {
                    description: "Package Transaction",
                    image: packOrder.data.user.avatar,
                    currency: "INR",
                    key: "rzp_test_iijGgC2DfISWDR",
                    amount: packOrder.data.amount,
                    name: packOrder.data.organization,
                    order_id: packOrder.data.ordid,
                    prefill: {
                        email: packOrder.data.user.email,
                        contact: packOrder.data.user.phone,
                        name: packOrder.data.user.name,
                    },
                    notes: {
                        address: "Flylight CRM indore"
                    },
                    theme: { color: 'blue' }
                }
                RazorpayCheckout.open(options).then((data) => {
                    dispatch(organizationAction.VerifypackageOrder(data));
                }).catch((error) => {
                });
                dispatch(organizationAction.packclearResponse());
            }
            else if (packOrder.status == "failed") {
                ToastAndroid.show(packOrder.message, ToastAndroid.SHORT);
                setIsLodding(false)
            }
            else if (packOrder.status == "fail") {
                ToastAndroid.show(packOrder.message, ToastAndroid.SHORT);
                setIsLodding(false)
            }
            else {
            }
        }
    }, [packOrder])

    useEffect(() => {
        if (packDetail) {
            if (packDetail.status == "success") {
                setPackage(packDetail.data.package)
                setTopUp(packDetail.data.topups)
                setIsLodding(false)
                dispatch(organizationAction.packclearResponse());
            }
            else if (packDetail.status == "failed") {
                ToastAndroid.show(packDetail.message, ToastAndroid.SHORT);
                setIsLodding(false)
                dispatch(organizationAction.packclearResponse());
            }
            else if (packDetail.status == "fail") {
                ToastAndroid.show(packDetail.message, ToastAndroid.SHORT);
                setIsLodding(false)
                dispatch(organizationAction.packclearResponse());
            }
            else {
            }
        }
    }, [packDetail])

    useEffect(() => {
        if (packOrderVerify) {
            if (packOrderVerify.status == "success") {
                setIsLoddingBuy(false)
                ToastAndroid.show(packOrderVerify.message, ToastAndroid.SHORT);
                dispatch(organizationAction.packclearResponse());
                navigation.navigate('orderHistory')
            }
            else if (packOrderVerify.status == "failed") {
                ToastAndroid.show(packOrderVerify.message, ToastAndroid.SHORT);
                setIsLoddingBuy(false)
                dispatch(organizationAction.packclearResponse());
            }
            else if (packOrderVerify.status == "fail") {
                ToastAndroid.show(packOrderVerify.message, ToastAndroid.SHORT);
                setIsLoddingBuy(false)
                dispatch(organizationAction.packclearResponse());
            }
            else {
            }
        }
    }, [packOrderVerify])

    useEffect(() => {
        if (topOrder) {
            if (topOrder.status == "success") {
                setIsLodding(false)
                var options = {
                    description: "Package Transaction",
                    image: topOrder.data.user.avatar,
                    currency: "INR",
                    key: "rzp_test_iijGgC2DfISWDR",
                    amount: topOrder.data.amount,
                    name: topOrder.data.organization,
                    order_id: topOrder.data.ordid,
                    prefill: {
                        email: topOrder.data.user.email,
                        contact: topOrder.data.user.phone,
                        name: topOrder.data.user.name,
                    },
                    notes: {
                        address: "Flylight CRM indore"
                    },
                    theme: { color: 'blue' }
                }
                RazorpayCheckout.open(options).then((data) => {
                    dispatch(organizationAction.VerifyTopOrder(data));
                }).catch((error) => {
                });
                dispatch(organizationAction.packclearResponse());
            }
            else if (topOrder.status == "failed") {
                ToastAndroid.show(topOrder.message, ToastAndroid.SHORT);
                setIsLodding(false)
            }
            else if (topOrder.status == "fail") {
                ToastAndroid.show(topOrder.message, ToastAndroid.SHORT);
                setIsLodding(false)
            }
            else {
            }
        }
    }, [topOrder])

    useEffect(() => {
        if (topOrderVerify) {
            if (topOrderVerify.status == "success") {
                setIsLoddingBuy(false)
                ToastAndroid.show(topOrderVerify.message, ToastAndroid.SHORT);
                dispatch(organizationAction.packclearResponse());
                navigation.navigate('orderHistory')
            }
            else if (topOrderVerify.status == "failed") {
                ToastAndroid.show(topOrderVerify.message, ToastAndroid.SHORT);
                setIsLoddingBuy(false)
                dispatch(organizationAction.packclearResponse());
            }
            else if (topOrderVerify.status == "fail") {
                ToastAndroid.show(topOrderVerify.message, ToastAndroid.SHORT);
                setIsLoddingBuy(false)
                dispatch(organizationAction.packclearResponse());
            }
            else {
            }
        }
    }, [topOrderVerify])



    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        console.log(refreshing)
        Get_Data()
    }
    const PackView = ({ item, index }) => {
        return (
            <View style={{ borderWidth: 0.5, borderRadius: 10, padding: 5, marginVertical: '1%' }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#111211' }}>{item.aleas.toUpperCase()}</Text>
                <Text style={{ fontSize: 24, textAlign: 'center', color: 'blue' }}>₹{item.amount} </Text>
                <Text style={{ textAlign: 'center', color: '#111211', }}> /{item.duration} Days</Text>
                <Text style={{ textAlign: 'center', fontSize: 20, color: '#111211' }}>Everything in {item.aleas}+</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ backgroundColor: '#0c5aeb', color: '#0c5aeb', borderRadius: 10, height: 15, width: 15, marginTop: '2%', marginRight: '2%' }}></Text>
                    <Text style={styles.serviceItems}>{item.services.map((item, index) => item.service_name)[0]}  {item.services.map((item, index) => item.quantity)[0]}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ backgroundColor: '#0c5aeb', color: '#0c5aeb', borderRadius: 10, height: 15, width: 15, marginTop: '2%', marginRight: '2%' }}></Text>
                    <Text style={styles.serviceItems}>{item.services.map((item, index) => item.service_name)[1]}  {item.services.map((item, index) => item.quantity)[1]}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ backgroundColor: '#0c5aeb', color: '#0c5aeb', borderRadius: 10, height: 15, width: 15, marginTop: '2%', marginRight: '2%' }}></Text>
                    <Text style={styles.serviceItems}>{item.services.map((item, index) => item.service_name)[2]}  {item.services.map((item, index) => item.quantity)[2]}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ backgroundColor: '#0c5aeb', color: '#0c5aeb', borderRadius: 10, height: 15, width: 15, marginTop: '2%', marginRight: '2%' }}></Text>
                    <Text style={styles.serviceItems}>{item.services.map((item, index) => item.service_name)[3]}  {item.services.map((item, index) => item.quantity)[3]}</Text>
                </View>
                {item.services.map((item, index) => item.quantity)[4] ?
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ backgroundColor: '#0c5aeb', color: '#0c5aeb', borderRadius: 10, height: 15, width: 15, marginTop: '2%', marginRight: '2%' }}></Text>
                        <Text style={styles.serviceItems}>{item.services.map((item, index) => item.service_name)[4] ? item.services.map((item, index) => item.service_name)[4] : null}
                            {item.services.map((item, index) => item.quantity)[4] ? item.services.map((item, index) => item.quantity)[4] : null}</Text>
                    </View>
                    :
                    null}
                <TouchableOpacity
                    onPress={() => BuyPlane(item.uid)}
                    style={{ alignSelf: 'center', borderRadius: 10, backgroundColor: '#1a64ed', paddingHorizontal: 10, paddingVertical: 12 }}
                >
                    <Text style={{ color: '#fff' }}>Start Now</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const TopUpView = ({ item, index }) => {
        return (
            <View style={{ borderWidth: 0.5, borderRadius: 10, padding: 5, marginVertical: '1%' }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#020303' }}>{item.title}</Text>
                <Text style={{ fontSize: 24, textAlign: 'center', color: 'blue' }}>₹{item.amount} </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ backgroundColor: '#0c5aeb', color: '#0c5aeb', borderRadius: 10, height: 15, width: 15, marginTop: '2%', marginRight: '2%' }}></Text>
                    <Text style={styles.serviceItems}>{item.services.map((item, index) => item.service_name)[0]}({item.services.map((item, index) => item.quantity)[0]})</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ backgroundColor: '#0c5aeb', color: '#0c5aeb', borderRadius: 10, height: 15, width: 15, marginTop: '2%', marginRight: '2%' }}></Text>
                    <Text style={styles.serviceItems}>{item.services.map((item, index) => item.service_name)[1]}({item.services.map((item, index) => item.quantity)[1]})</Text>
                </View>
                <TouchableOpacity onPress={() => BuyPlaneTopUp(item.uid)}
                    style={{ alignSelf: 'center', borderRadius: 10, backgroundColor: 'blue', padding: 10 }}
                >
                    <Text style={{ color: '#fff' }}>Start Now</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header
                style={{ height: height * 12 / 100 }}
                onPressLeft={() => { navigation.openDrawer() }}
                title='Package & Topups'
                onPressRight={() => { navigation.navigate('Notification') }}
            />
            <View style={styles.headerTab}>
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
            <View style={{ flex: 1,  marginVertical: '2%', marginHorizontal: '3%' }}>
                {isService == "Package" ?
                    <View style={{flex:1}}>
                        {IsLodding == true ?
                            <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                            :
                            <View >
                                {IsLoddingBuy == true ?
                                    <ActivityIndicator size="large" color="#0000ff" /> : null}
                                <FlatList
                                    data={Package}
                                    renderItem={PackView}
                                    ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                                    refreshing={refreshing}
                                    onRefresh={handleRefresh}
                                    ListEmptyComponent={() => (!Package.length ?
                                        <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>Data Not Found</Text>
                                        : null)}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        }
                    </View>
                    :
                    null
                }
                {
                    isService == "Topups" ?
                    <View style={{flex:1}}>
                            {IsLodding == true ?
                                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                                :
                                <View>
                                    {IsLoddingBuy == true ?
                                        <ActivityIndicator size="large" color="#0000ff" /> : null}
                                    <FlatList
                                        // horizontal={true}
                                        data={TopUp}
                                        renderItem={TopUpView}
                                        ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                                        refreshing={refreshing}
                                        onRefresh={handleRefresh}
                                        ListEmptyComponent={() => (!TopUp.length ?
                                            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>Data Not Found</Text>
                                            : null)}
                                        keyExtractor={item => item.id}
                                    />
                                </View>
                            }
                        </View>
                        :
                        null}
            </View>
        </View >
    );
}


