import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image, Modal, Pressable, ActivityIndicator, Dimensions } from 'react-native';
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
    const [askDelete, setaskDelete] = useState(false);
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

    const [Objcet, setObjcet] = useState({
        CampaignName: '',
        Status: '',
        StartDate: '',
        EndDate: '',
        CampaignType: '',
        ExpectedRevenue: '',
        BudgetedCost: '',
        Description: '',
        created_at: '',
        updated_at: ''
    })
    const Details = (value) => {
        setObjcet({
            CampaignName: value.campaign_name,
            Status: value.status,
            StartDate: value.start_date,
            EndDate: value.end_date,
            CampaignType: value.campaign_type,
            ExpectedRevenue: value.expected_revenue,
            BudgetedCost: value.budgeted_cost,
            Description: value.description,
            created_at: value.created_at,
            updated_at: value.updated_at
        })
        setaskDelete(!askDelete)
    }
    const DetailsCancel = () => {
        setObjcet({
            CampaignName: '',
            Status: '',
            StartDate: '',
            EndDate: '',
            CampaignType: '',
            ExpectedRevenue: '',
            BudgetedCost: '',
            Description: '',
            created_at: '',
            updated_at: ''
        })
        setaskDelete(!askDelete)
    }
    // console.log('value...................',Objcet)
    const CampaignView = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => Details(item)}
            >
                <View style={styles.listData}>
                    <View>
                        <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Name   </Text>
                        <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Status </Text>
                        <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Type</Text>
                        {/* <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Start Date</Text> */}
                        {/* <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>End Date</Text> */}
                    </View>
                    <View style={{ marginLeft: '2%', width: '60%' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.campaign_name}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.status}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.campaign_type}</Text>
                        {/* <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.start_date}</Text> */}
                        {/* <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.end_date}</Text> */}
                    </View>

                    <View style={{ marginLeft: '-10%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('EditCampaign', { campData: item })}
                            >
                                <Image style={{ height: 22, width: 22, marginHorizontal: '5%' }}
                                    source={require('../../images/editCall.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                            // onPress={() => navigation.navigate('EditCampaign', {  campData: item})}
                            >
                                <Image style={{ height: 22, width: 22, marginHorizontal: '5%' }}
                                    source={require('../../images/deleteCall.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}></Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}></Text>
                        {/* <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}></Text> */}
                        {/* <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{moment(item.created_at).format('lll')}</Text> */}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }



    return (
        <View style={styles.container}>
            <Header
                style={{ height: "16%" }}
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
                                borderColor: '#fff',
                                borderWidth: 1,
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                                alignSelf: 'flex-end',
                                marginHorizontal: '5%',
                                marginTop: '-12%',
                                borderRadius: 15
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 12 }}>
                                +Add
                            </Text>
                        </TouchableOpacity>
                        {CampaignData
                            && CampaignData.length > 0 ?

                            <FlatList
                                style={{ height: "89%", marginTop: '5%' }}
                                data={CampaignData}
                                renderItem={CampaignView}
                            />
                            :
                            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>
                        }
                    </View>}
            </View>


            <Modal animationType="slide" transparent={true} visible={askDelete}
                onRequestClose={() => { setaskDelete(false); }}>
                <View style={styles.askModel}>
                    <Text style={styles.askTitle}> Campaign Detail</Text>
                    <TouchableOpacity
                        style={styles.askTitleR}
                        onPress={() => DetailsCancel()}
                    >
                        <Image
                            style={{ height: 14, width: 14, }}
                            source={require('../../images/cross.png')}
                        />
                    </TouchableOpacity>

                    <View style={styles.inputFields}>
                        <View>
                            <Text style={styles.DetailCampTitle}>Campaign Name </Text>
                            <Text style={styles.DetailCampTitle}>Status</Text>
                            <Text style={styles.DetailCampTitle}>Start Date</Text>
                            <Text style={styles.DetailCampTitle}>End Date</Text>
                            <Text style={styles.DetailCampTitle}>Campaign Type</Text>
                            <Text style={styles.DetailCampTitle}>Expected Revenue</Text>
                            <Text style={styles.DetailCampTitle}>Budgeted Cost</Text>
                            <Text style={styles.DetailCampTitle}>Description</Text>
                            <Text style={styles.DetailCampTitle}>created Date</Text>
                            <Text style={styles.DetailCampTitle}>updated Date</Text>
                        </View>
                        <View style={{ marginLeft: '3%', width: '60%' }}>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{Objcet.CampaignName}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{Objcet.Status}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{Objcet.StartDate}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{Objcet.EndDate}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{Objcet.CampaignType}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{Objcet.ExpectedRevenue}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{Objcet.BudgetedCost}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{Objcet.Description}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{moment(Objcet.created_at).format('lll')}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>{moment(Objcet.updated_at).format('lll')}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}