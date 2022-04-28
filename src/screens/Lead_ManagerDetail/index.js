import React, { useState, useEffect, } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, Alert, Platform, Linking, ToastAndroid } from 'react-native';
import styles from './styles';
import Header from '../../component/header';
import { useDispatch, useSelector, connect } from 'react-redux';
import { leadmanagerAction } from '../../redux/Actions/index'
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

export default function Lead_ManagerDetail({ navigation, route }) {
    const [IsLodding, setIsLodding] = useState(true)
    const [leadDetail, setleadDetail] = useState('')
    const [GetMore, setGetMore] = useState(false)
    const dispatch = useDispatch()
    const loginData = useSelector(state => state.auth.data)
    const LeadInfo = useSelector(state => state.leadmanager.GetDetail)

    useEffect(() => {
        Get_Data()
    }, [])

    const Get_Data = () => {
        let data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
            lead_id: route.params ? route.params.item.id : ''
        }
        dispatch(leadmanagerAction.GetDetail(data, loginData.data.token));
    }
    useEffect(() => {
        if (LeadInfo) {
            if (LeadInfo.status == "200") {
                setIsLodding(false)
                setleadDetail(LeadInfo.lead)
                dispatch(leadmanagerAction.clearResponse())
            }
            else if (LeadInfo.status == "fail") {
                setIsLodding(false)
                ToastAndroid.show(LeadInfo.message, ToastAndroid.SHORT);
                dispatch(leadmanagerAction.clearResponse())
            }
        }
    }, [LeadInfo])

    const call = (mobileNo) => {
        let phoneNumber = mobileNo;
        if (Platform.OS !== "android") {
            phoneNumber = `telprompt:${mobileNo}`;
        } else {
            phoneNumber = `tel:${mobileNo}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    // Alert.alert("Number is not available");
                    ToastAndroid.show("Number is not available", ToastAndroid.SHORT);
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <View style={{ flex: 1 }}>
            <Header style={Platform.OS == 'ios' ? { height: "16%" } : null}
                onPressLeft={() => { navigation.openDrawer() }}
                title='Lead Detail'
                onPressRight={() => { navigation.navigate('Notification') }}
            />
            {IsLodding == true ?
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                :
                <ScrollView style={{ margin: '2%', flex: 1 }}>
                    <View>
                        <View style={{ justifyContent: 'center' }}>
                            <Avatar.Image
                                size={100}
                                style={{ alignSelf: 'center', backgroundColor: '#C6CCD1' }}
                                source={require('../../images/profileCall.png')} />
                        </View>
                        <Card.Content style={{ marginTop: '0%', marginLeft: '-2%' }}>
                            <Title style={{
                                fontSize: 18, fontFamily: 'Roboto',
                                fontWeight: 'bold', textAlign: 'center'
                            }}>
                                {leadDetail.first_name} {leadDetail.last_name}
                            </Title>
                            <Paragraph
                                style={{
                                    marginTop: '0%', fontSize: 13,
                                    fontFamily: 'Roboto', fontWeight: 'normal', textAlign: 'center'
                                }}>
                                {leadDetail.company}
                            </Paragraph>
                        </Card.Content>
                        <View style={{ flexDirection: 'row', marginLeft: '26%' }} >
                            <TouchableOpacity
                                onPress={() => call(leadDetail.phone)}
                            >
                                <Avatar.Image
                                    size={40}
                                    style={{ marginLeft: '8%' }}
                                    source={require('../../images/GroupCall.png')} />
                                <Text style={{ marginHorizontal: '15%', color: '#2B6EF2' }}>Call</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: '2%' }}>
                        <Text style={styles.textTitle}>Phone</Text>
                        <Text style={styles.textDainamic}>{leadDetail.phone}</Text>
                        {
                            leadDetail.phone2 ?
                                <View>
                                    <Text style={styles.textTitle}>Secondary Phone</Text>
                                    <Text style={styles.textDainamic}>{leadDetail.phone2}</Text>
                                </View>
                                :
                                <View />
                        }
                        <Text style={styles.textTitle}>Email</Text>
                        <TouchableOpacity
                            onPress={() => Linking.openURL(`mailto:${leadDetail.email}`)}>
                            <Text style={styles.textDainamic}>{leadDetail.email}</Text>
                        </TouchableOpacity>

                        {
                            leadDetail.email2 ?
                                <View>
                                    <Text style={styles.textTitle}>Secondary Email</Text>
                                    <TouchableOpacity
                                        onPress={() => Linking.openURL(`mailto:${leadDetail.email2}`)}>
                                        <Text style={styles.textDainamic}>{leadDetail.email2}</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                null
                        }
                        <Text style={styles.textTitle} >Fax</Text>
                        <Text style={styles.textDainamic}>{leadDetail.fax}</Text>
                        <Text style={styles.textTitle} >Website</Text>
                        <Text style={styles.textDainamic}>{leadDetail.website}</Text>
                        <Text style={styles.textTitle} >Gender</Text>
                        <Text style={styles.textDainamic}>{leadDetail.gender}</Text>
                        <Text style={styles.textTitle} >Date of Birth</Text>
                        <Text style={styles.textDainamic}>{leadDetail.dob}</Text>
                        <Text style={styles.textTitle} >Description</Text>
                        <Text style={styles.textDainamic}>{leadDetail.description}</Text>
                        <Text style={styles.textTitle} >Address</Text>
                        <Text style={{ fontWeight: 'bold', color: '#2B6EF2', width: '95%' }}>{leadDetail.address} {leadDetail.city} {leadDetail.state} {leadDetail.country} {leadDetail.zip} </Text>
                    </View>

                    <View style={{ borderBottomWidth: 0.5, marginVertical: '1%', marginHorizontal: '3%', color: 'gray' }}>
                    </View>
                    <TouchableOpacity
                        onPress={() => setGetMore(!GetMore)}
                        style={{
                            borderColor: '#fff',
                            borderWidth: 1,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            marginHorizontal: '30%',
                            marginVertical: '2%',
                            backgroundColor: '#2B6EF2',
                            borderRadius: 15
                        }}
                    >
                        <Text style={{ color: "#fff", textAlign: 'center' }}>
                            {GetMore ? 'Less' : 'More'}
                        </Text>
                    </TouchableOpacity>
                    {
                        GetMore ?
                            <View style={{ marginHorizontal: '2%' }}>
                                <Text style={styles.textTitle} >Lead Source</Text>
                                <Text style={styles.textDainamic}>{leadDetail.lead_source}</Text>
                                <Text style={styles.textTitle} >Lead Status</Text>
                                <Text style={styles.textDainamic}>{leadDetail.lead_status}</Text>
                                <Text style={styles.textTitle} >Industry</Text>
                                <Text style={styles.textDainamic}>{leadDetail.industry}</Text>
                                <Text style={styles.textTitle} >Number of employee</Text>
                                <Text style={styles.textDainamic}>{leadDetail.number_of_employee}</Text>
                                <Text style={styles.textTitle} >Annual Revenue</Text>
                                <Text style={styles.textDainamic}>{leadDetail.annual_revenue}</Text>
                            </View>
                            :
                            <View />
                    }

                </ScrollView>
            }
        </View>
    );
}