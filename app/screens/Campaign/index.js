import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image, Button, ActivityIndicator, Dimensions } from 'react-native';
import Header from '../../component/header/index'
import { campaignAction, staffMemberAction, leadAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"
import moment from 'moment';

export default function Campaign({ navigation }) {

    const { width, height } = Dimensions.get('window');
    const [CampaignData, setCampaignData] = useState('')
    const [IsLodding, setIsLodding] = useState(false)
    const dispatch = useDispatch()
    const isFocused = useIsFocused();

    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)
    const campaignList = useSelector(state => state.campaign.campaign)

    // console.log("campaignList.............................", campaignList)
    useEffect(() => {
        if (loginData || registerData && isFocused) {
            if (loginData.status == "success") {
                const data = {
                    uid: loginData.data.uid,
                    org_uid: loginData.data.org_uid,
                    profile_id: loginData.data.cProfile,
                }
                dispatch(campaignAction.CampaignList(data, loginData.data.token));
            }
            else if (registerData.status == "success") {
                const data = {
                    profile_id: registerData.data.cProfile,
                    org_uid: registerData.data.org_uid,
                    uid: registerData.data.uid
                }
                dispatch(campaignAction.CampaignList(data, registerData.data.token));
            }
            setIsLodding(true)
        }
    }, [loginData, registerData, isFocused])

    useEffect(() => {
        if (campaignList) {
            if (campaignList.status == "200") {
                // console.log("datat.....................", campaignList.data)
                setCampaignData(campaignList.data)
            }
            else if (campaignList.status == "failed") {
            }
            else if (campaignList.status == "fail") {
            }
            setIsLodding(false)
        }
        else {
        }
    }, [campaignList])

    const CampaignView = ({ item }) => {

        return (
            <View style={styles.listData}>
                <View>
                    <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Name   </Text>
                    <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Status </Text>
                    <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Type</Text>
                </View>
                <View style={{ marginLeft: '2%', width: '58%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.campaign_name}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.status}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.campaign_type}</Text>
                </View>
                <View style={{ marginLeft: '-12%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('EditCampaign', {
                                campData: item
                            })}
                        >
                            <Image
                                style={{ height: 22, width: 22,marginRight:'2%' }}
                                source={require('../../images/editCall.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            // onPress={() => navigation.navigate('EditCampaign', {
                            //     campData: item
                            // })}
                        >
                            <Image
                                style={{ height: 22, width: 22, marginRight:'2%'}}
                                source={require('../../images/deleteCall.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{moment(item.created_at).format('MMMM Do YYYY')},</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto',alignSelf:'flex-end',marginRight:'2%' }}>{moment(item.created_at).format("h:mm A")}</Text>
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
                title='Campaigns'
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
                            onPress={() => navigation.navigate('AddCampaign')}
                            style={{
                                backgroundColor: '#73f233',
                                padding: 5,
                                alignSelf: 'flex-end',
                                marginHorizontal: '5%',
                                marginVertical: '0%',
                                borderRadius: 5
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 16 }}>
                                Add Campaigns
                            </Text>
                        </TouchableOpacity>

                        {CampaignData
                            && CampaignData.length > 0 ?
                            <FlatList
                                style={{ height: "84.5%" }}
                                data={CampaignData}
                                renderItem={CampaignView}
                            />
                            :
                            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>
                        }

                    </View>}
            </View>
        </View>
    )
}