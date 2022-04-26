import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image, Modal, Pressable, ActivityIndicator, Dimensions } from 'react-native';
import Header from '../../component/header/index'
import { campaignAction, staffMemberAction, leadAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from "@react-navigation/core"
import moment from 'moment';

export default function Campaign({ navigation }) {

    isFocused = useIsFocused
    const { width, height } = Dimensions.get('window');
    const [CampaignData, setCampaignData] = useState('')
    const [IsLodding, setIsLodding] = useState(true)
    const [askDelete, setaskDelete] = useState(false);
    const [page, setPage] = useState(0);
    const [perPageItems, setperPageItems] = useState(10);
    const [totalItems, settotalItems] = useState(0);
    const dispatch = useDispatch()

    const loginData = useSelector(state => state.auth.data)
    const campaignList = useSelector(state => state.campaign.campaign)

    useEffect(() => {
        FetchData(page)
    }, [])

    const FetchData = (p) => {
        setIsLodding(true)
        const data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
            pageSize: perPageItems,
            pageNumber: p,
        }
        dispatch(campaignAction.CampaignList(data, loginData.data.token));
    }

    useEffect(() => {
        if (campaignList) {
            if (campaignList.status == "success") {
                settotalItems(campaignList.total_rows)
                setCampaignData(campaignList.data.rows)
                setIsLodding(false)
                dispatch(campaignAction.clearResponse())
            }
            else if (campaignList.status == "failed") {
                setIsLodding(false)
            }
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

    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        console.log(refreshing)
        FetchData(0)
    }

    const fetchNextItems = () => {
        console.log('load More Items.........', totalItems, CampaignData.length)
        if (totalItems > CampaignData.length) {
            let p = page + 1;
            setPage(p);
            FetchData(p)
        }
    }

    const CampaignView = ({ item }) => {
        return (
            <View style={styles.listData}>
                <View>
                    <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Name   </Text>
                    <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Status </Text>
                    <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Type</Text>
                </View>
                <View style={{ marginLeft: '2%', width: '60%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.campaign_name}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.status}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.campaign_type}</Text>
                </View>

                <View style={{ alignSelf: 'flex-end' }}>
                    <TouchableOpacity
                        style={{ alignItems: 'flex-end' }}
                        onPress={() => navigation.navigate('EditCampaign', { campData: item })}
                    >
                        <Image style={{ height: 22, width: 22, marginHorizontal: '5%' }}
                            source={require('../../images/editCall.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ alignItems: 'flex-end', marginTop: '20%' }}
                        onPress={() => Details(item)}
                    >
                        <Text style={{ color: '#000000', padding: 2 }}>More details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }



    return (
        <View style={{ flex: 1 }}>
            <Header
                style={{ height: height * 12 / 100 }}
                onPressLeft={() => { navigation.openDrawer() }}
                title='Campaigns'
                onPressRight={() => { navigation.navigate('Notification') }}
            />
            <View style={{ flex: 1, marginVertical: '2%' }}>
                {IsLodding == true ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                    :
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddCampaign')}
                            style={{
                                borderColor: '#fff',
                                borderWidth: 1,
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                                alignSelf: 'flex-end',
                                marginHorizontal: '3%',
                                marginTop: '-10%',
                                borderRadius: 15
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 12 }}>
                                +Add
                            </Text>
                        </TouchableOpacity>
                        <FlatList
                            style={{ marginTop: '5%' }}
                            data={CampaignData}
                            renderItem={CampaignView}
                            ListEmptyComponent={() => (!CampaignData.length ?
                                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>Data Not Found</Text>
                                : null)}
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            onEndReached={() => fetchNextItems()}
                            keyExtractor={item => item.id}
                        />
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
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>Campaign Name: </Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>Status:</Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>Start Date</Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>End Date</Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>Campaign Type</Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>Expected Revenue</Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>Budgeted Cost</Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>Description</Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>created Date</Text>
                        </View>
                        <View style={{ marginLeft: '3%', width: '60%' }}>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>:       {Objcet.CampaignName}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>:       {Objcet.Status}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>:       {Objcet.StartDate}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>:       {Objcet.EndDate}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>:       {Objcet.CampaignType}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>:       {Objcet.ExpectedRevenue}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>:       {Objcet.BudgetedCost}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>:       {Objcet.Description}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>:       {moment(Objcet.created_at).format('lll')}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}