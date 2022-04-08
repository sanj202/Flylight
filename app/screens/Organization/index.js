import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image, ActivityIndicator, ToastAndroid, Dimensions } from 'react-native';
import Header from '../../component/header/index'
import { organizationAction, authAction, varificationAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"

export default function Organization({ navigation }) {

    const { width, height } = Dimensions.get('window');
    const [allOrg, setallOrg] = useState()
    const [currentOrg, setcurrentOrg] = useState("")
    const [IsLodding, setIsLodding] = useState(false)
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const orgList = useSelector(state => state.organization.getList)

    useEffect(() => {
            const data = {
                uid: loginData.data.uid,
                profile_id: loginData.data.cProfile,
                org_uid: loginData.data.org_uid,
            }
            setcurrentOrg(loginData.data.org_uid)
            dispatch(organizationAction.OrganizationList(data, loginData.data.token));
            setIsLodding(true)
    }, [ isFocused])

    useEffect(() => {
        if (orgList) {
            if (orgList.status == "200") {
                setallOrg(orgList.data)
                dispatch(organizationAction.clearResponse())
                setIsLodding(false)
            }
            else if (orgList.status == "failed") {
                setIsLodding(false)
            }
            else if (orgList.status == "fail") {
                ToastAndroid.show(orgList.message, ToastAndroid.SHORT);
                setIsLodding(false)
            }        
        }
    }, [orgList])

    const ChangeOrg = (value) => {
        setIsLodding(true)
        dispatch(authAction.SwitchOrg(loginData, value.cProfile, value.orgUid));
        navigation.navigate('Home')
    }

    // useEffect(() => {
    //     if (loginData) {
    //         if (loginData.status == "success") {
    //             setIsLodding(false)
    //         }
    //         else if (loginData.status == "failed") {
    //             setIsLodding(false)
    //             ToastAndroid.show(loginData.message, ToastAndroid.SHORT);                                                                                  //otherwise alert show 
    //         }
    //     }
    // }, [loginData])



    const AllView = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => ChangeOrg({
                    orgUid: item.organization.org_unique_id,
                    cProfile: item.organization.profile_id
                })}
            >
                <View style={{ marginTop: '1%' }}>
                    <View style={currentOrg !== '' && currentOrg == item.organization.org_unique_id ?
                        [styles.listData, { backgroundColor: '#24BCFF' }]
                        :
                        styles.listData}>
                        <View style={{ backgroundColor: '', justifyContent: 'center', }}>
                            {item.organization.logo ?
                                <Image
                                    style={{ height: 48, width: 48, borderRadius: 24, backgroundColor: '#fff' }}
                                    source={require('../../images/profileCall.png')}
                                // source={{ uri: 'http://3.23.113.168/admin/public/uploads/avatar/' + item.organization.logo }}
                                />
                                : <Image
                                    style={{ height: 48, width: 48, }}
                                    source={require('../../images/profileCall.png')}
                                />
                            }
                        </View>
                        <View style={{ marginLeft: '3%', flex: 1, backgroundColor: '', }}>
                            <Text
                                style={currentOrg !== '' && currentOrg == item.organization.org_unique_id ?
                                    { fontWeight: 'bold', fontSize: 14, color: '#FFFF', fontFamily: 'Roboto' }
                                    :
                                    { fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }
                                }>
                                {item.organization.name ? item.organization.name : ''}</Text>
                            <Text
                                numberOfLines={1}
                                style={currentOrg !== '' && currentOrg == item.organization.org_unique_id ?
                                    { fontFamily: 'Roboto', fontSize: 13, color: '#FFFF', flexShrink: 1 }
                                    :
                                    { fontFamily: 'Roboto', fontSize: 13, color: '#0F0F0F', flexShrink: 1 }
                                }>
                                {item.role.name ? item.role.name : "not available"}</Text>
                        </View>
                        <Image
                            source={require('../../images/white_check.png')}
                            style={{ height: 16, width: 25, marginTop: '4%', marginRight: '5%', }}
                        />
                    </View>
                </View >
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Header
                style={{ height: "14%" }}
                onPressLeft={() => {
                      navigation.openDrawer()
                    // navigation.goBack()
                }}
                title='Organizations'
                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />
            <View style={{ marginTop: '3%' }}>
                {IsLodding == true ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                    :
                    <View>
                        {allOrg !== undefined && allOrg.length > 0 ?
                            <FlatList
                                // style={{ height: height / 1.55 }}
                                data={allOrg}
                                renderItem={AllView}
                            />
                            :
                            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>}
                    </View>
                }
            </View>
        </View >
    );
}


