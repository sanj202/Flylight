import React, { useState, useEffect, } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Dimensions, Alert, Platform, Linking, ToastAndroid } from 'react-native';
import styles from './styles';
import Header from '../../component/header';
import { useDispatch, useSelector, connect } from 'react-redux';
import { leadmanagerAction } from '../../redux/Actions/index'
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

export default function Lead_ManagerDetail({ navigation, route }) {
    const [IsLodding, setIsLodding] = useState(true)
    const [leadDetail, setleadDetail] = useState([])
    const isFocused = useIsFocused();
    const dispatch = useDispatch()
    const loginData = useSelector(state => state.auth.data)
    const LeadInfo = useSelector(state => state.leadmanager.GetDetail)
    const { width, height } = Dimensions.get('window');

    useEffect(() => {
        isFocused ? initialstate : null
        isFocused ? Get_Data() : null
    }, [isFocused])
    useEffect(() => {
        if (LeadInfo) {
            if (LeadInfo.status == "success") {
                // console.log('LeadInfo.lead.leadStatus.......',LeadInfo.lead)
                setIsLodding(false)
                // setleadDetail(LeadInfo.lead)
                setleadDetail(LeadInfo.data)
                dispatch(leadmanagerAction.clearResponse())
            }
            else if (LeadInfo.status == "failed") {
                setIsLodding(false)
                ToastAndroid.show(LeadInfo.message, ToastAndroid.SHORT);
                dispatch(leadmanagerAction.clearResponse())
            }
        }
    }, [LeadInfo])
    const Get_Data = () => {
        let data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
            lead_id: route.params ? route.params.item.id : ''
        }
        dispatch(leadmanagerAction.GetDetail(data, loginData.data.token));
    }
    const initialstate = () => {
        setIsLodding(true)
        setleadDetail([])
    }
    const call = (mobileNo) => {
        let phoneNumber = mobileNo;
        if (Platform.OS !== "android") { phoneNumber = `telprompt:${mobileNo}`; } else {
            phoneNumber = `tel:${mobileNo}`;
        }
        Linking.canOpenURL(phoneNumber).then(supported => {
            if (!supported) {
                ToastAndroid.show("Number is not available", ToastAndroid.SHORT);
            } else { return Linking.openURL(phoneNumber); }
        })
            .catch(err => console.log(err));
    };
    return (
        <View style={{ flex: 1 }}>
            <Header style={Platform.OS == 'ios' ? { height: "16%" } : { height: height * 14 / 100 }}
                onPressLeft={() => { navigation.openDrawer() }}
                title='Lead Detail'
                onPressRight={() => { navigation.navigate('Notification') }}
            />
            {IsLodding == true ?
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                :
                <View style={{ flex: 1, marginHorizontal: '2%', marginBottom: '2%' }}>
                    <Card style={{ marginTop: '-12%' }}>
                        <View style={{ padding: '2%', flexDirection: 'row' }}>
                            <Avatar.Image
                                size={60}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/profileCall.png')} />
                            <View style={{ flex: 1, marginHorizontal: '2%' }}>
                                <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Roboto', fontWeight: 'bold', }}>{leadDetail.first_name} {leadDetail.last_name}</Text>
                                <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Roboto', fontWeight: 'bold', }}>{leadDetail.company ? leadDetail.company.charAt(0).toUpperCase() + leadDetail.company.slice(1) : ''}</Text>
                                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Roboto', fontWeight: 'bold', }}>+91 {leadDetail.phone}</Text>
                            </View>
                            <Avatar.Image
                                size={45}
                                style={{ backgroundColor: '#C6CCD1', marginTop: '2%' }}
                                source={require('../../images/GroupCall.png')} />
                        </View>
                    </Card>
                    <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Roboto', fontWeight: 'bold', marginVertical: '2%' }}>Personal Information</Text>
                    <ScrollView>
                        {leadDetail.email ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
                            <Avatar.Image
                                size={50}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/newEmail.png')} />
                            <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                                <Text style={styles.infoText}>Email Address</Text>
                                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.email}</Text>
                            </View>
                        </View> : null}
                        {leadDetail.email2 ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
                            <Avatar.Image
                                size={50}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/newEmail.png')} />
                            <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                                <Text style={styles.infoText}>Secondary Email Address</Text>
                                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.email2}</Text>
                            </View>
                        </View> : null}
                        {leadDetail.phone2 ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
                            <Avatar.Image
                                size={50}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/newCall.png')} />
                            <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                                <Text style={styles.infoText}>secondary Phone</Text>
                                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.phone2}</Text>
                            </View>
                        </View> : null}
                        {leadDetail.fax ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
                            <Avatar.Image
                                size={50}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/newFax.png')} />
                            <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                                <Text style={styles.infoText}>Fax</Text>
                                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.fax}</Text>
                            </View>
                        </View> : null}
                        {leadDetail.website ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
                            <Avatar.Image
                                size={50}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/newGlobe.png')} />
                            <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                                <Text style={styles.infoText}>Website</Text>
                                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.website}</Text>
                            </View>
                        </View> : null}
                        {leadDetail.gender ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
                            <Avatar.Image
                                size={50}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/newGender.png')} />
                            <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                                <Text style={styles.infoText}>Gender</Text>
                                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.gender}</Text>
                            </View>
                        </View> : null}
                        {leadDetail.dob ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
                            <Avatar.Image
                                size={50}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/newDob.png')} />
                            <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                                <Text style={styles.infoText}>Date Of Birth</Text>
                                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.dob}</Text>
                            </View>
                        </View> : null}
                        {leadDetail.address ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
                            <Avatar.Image
                                size={50}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/newAddress.png')} />
                            <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                                <Text style={styles.infoText}>Address</Text>
                                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.address ? leadDetail.address + ',' : null}{leadDetail.city ? leadDetail.city + ',' : null}{leadDetail.state ? leadDetail.state + ',' : null}{leadDetail.country ? leadDetail.country + ',' : null}{leadDetail.zip}</Text>
                            </View>
                        </View> : null}
                        {leadDetail.lead_source ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
                            <Avatar.Image
                                size={50}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/newLeadsource.png')} />
                            <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                                <Text style={styles.infoText}>Lead Source</Text>
                                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.lead_source}</Text>
                            </View>
                        </View> : null}
                        {leadDetail.leadStatus ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
                            <Avatar.Image
                                size={50}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/newLeadsource.png')} />
                            <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                                <Text style={styles.infoText}>Lead Status</Text>
                                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.leadStatus.name}</Text>
                            </View>
                        </View> : null}
                        {leadDetail.industry ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
                            <Avatar.Image
                                size={50}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/newIndustry.png')} />
                            <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                                <Text style={styles.infoText}>Industry</Text>
                                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.industry}</Text>
                            </View>
                        </View> : null}
                        {leadDetail.number_of_employee ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
                            <Avatar.Image
                                size={50}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/newMember.png')} />
                            <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                                <Text style={styles.infoText}>Number Of Employee</Text>
                                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.number_of_employee}</Text>
                            </View>
                        </View> : null}
                        {leadDetail.annual_revenue ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
                            <Avatar.Image
                                size={50}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/newRevenue.png')} />
                            <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                                <Text style={styles.infoText}>Annual Revenue</Text>
                                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.annual_revenue}</Text>
                            </View>
                        </View> : null}
                        {leadDetail.description ? <View style={{ flexDirection: 'row', marginVertical: '1%' }}>
                            <Avatar.Image
                                size={50}
                                style={{ backgroundColor: '#C6CCD1' }}
                                source={require('../../images/newDescription.png')} />
                            <View style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center' }}>
                                <Text style={styles.infoText}>Description</Text>
                                <Text style={[styles.infoText, { fontWeight: 'bold' }]}>{leadDetail.description}</Text>
                            </View>
                        </View> : null}
                    </ScrollView>
                </View>}
        </View>
    );
}