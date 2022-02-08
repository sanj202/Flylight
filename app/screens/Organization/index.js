import React, { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity, FlatList, Image, ActivityIndicator,Alert, Dimensions} from 'react-native';
import Header from '../../component/header/index'
import { organizationAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"

export default function Organization({ navigation }) {

    const { width, height } = Dimensions.get('window');
    const [allOrg, setallOrg] = useState()
    const [IsLodding, setIsLodding] = useState(false)
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)
    const orgList = useSelector(state => state.organization.getList)

    useEffect(() => {
        if (loginData || registerData && isFocused) {
            if (loginData.status == "success") {
                const data = {
                    uid: loginData.data.uid,
                    profile_id: loginData.data.cProfile,
                    org_uid: loginData.data.org_uid,
                }
                dispatch(organizationAction.OrganizationList(data, loginData.data.token));
            }
            else if (registerData.status == "success") {
                const data = {
                    uid: registerData.data.uid,
                    profile_id: registerData.data.cProfile,
                    org_uid: registerData.data.org_uid,
                }
                dispatch(organizationAction.OrganizationList(data, registerData.data.token))
            }
            setIsLodding(true)
        }
    }, [loginData, registerData, isFocused])

    useEffect(() => {
        if (orgList) {
            console.log("orgList...........", orgList.data)
            if (orgList.status == "200") {
                setallOrg(orgList.data)
                setIsLodding(false)
            }
            else if (orgList.status == "failed") {
                setIsLodding(false)
            }
            else if (orgList.status == "fail") {
                setIsLodding(false)
                Alert.alert(orgList.message)
            }
            else {
                setIsLodding(false)
            }
        }
        else {

        }
    }, [orgList])

    const AllView = ({ item }) => {
        // console.log("allOrg veiw...................", item.organization.logo)
        return (
            <TouchableOpacity>
                            <View style={{ marginTop: '1%' }}>
                <View style={styles.listData}>
                    <View style={{ backgroundColor: '', justifyContent: 'center', }}>
                        {item.organization.logo ?
                            <Image

                                style={{ height: 48, width: 48, borderRadius: 24 }}
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
                        <Text style={{
                            fontWeight: 'bold', fontSize: 14, color: '#0F0F0F',
                            fontFamily: 'Roboto'
                        }}>{item.organization.name ? item.organization.name : ''}</Text>
                        <Text
                            numberOfLines={1}
                            style={{
                                color: 'black', fontFamily: 'Roboto',
                                fontSize: 12, color: '#0F0F0F', flexShrink: 1
                            }}>
                            {item.role.name ? item.role.name : "not available"}</Text>
                    </View>
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
                    //   navigation.openDrawer()
                    navigation.goBack()
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


