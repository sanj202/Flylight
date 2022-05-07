import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image, Modal, ToastAndroid, ActivityIndicator, Dimensions } from 'react-native';
import Header from '../../component/header/index'
import { campaignAction, profileAction, leadAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import navigationStrings from '../../constant/navigationStrings';
import { BottomSheet } from 'react-native-elements';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

export default function Campaign({ navigation }) {
    const [CampaignData, setCampaignData] = useState([])
    const [IsLodding, setIsLodding] = useState(true)
    const [askDelete, setaskDelete] = useState(false);
    const [page, setPage] = useState(0);
    const [perPageItems, setperPageItems] = useState(10);
    const [totalItems, settotalItems] = useState(0);
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const { width, height } = Dimensions.get('window');
    const loginData = useSelector(state => state.auth.data)
    const campaignList = useSelector(state => state.campaign.campaign)
    const PermissionData = useSelector(state => state.profile.permission)
    useEffect(() => {
        isFocused ? initialstate() : null
        isFocused ? FetchData(page) : null
    }, [isFocused])
    useEffect(() => {
        if (campaignList) {
            if (campaignList.status == "success") {
                settotalItems(campaignList.data.count)
                setCampaignData(campaignList.data.rows)
                setIsLodding(false)
                dispatch(campaignAction.clearResponse())
            }
            else if (campaignList.status == "failed") { setIsLodding(false) }
        }
    }, [campaignList])
    useEffect(() => {
        if (PermissionData) {
            if (PermissionData.status == "success") {
                if (PermissionCampaigns(JSON.parse(PermissionData.permissions)).includes('edit')) { seteditPermission(true) }
                if (PermissionCampaigns(JSON.parse(PermissionData.permissions)).includes('create')) { setcreatePermission(true) }
                if (PermissionCampaigns(JSON.parse(PermissionData.permissions)).includes('delete')) { setdeletePermission(true) }
            }
            else if (PermissionData.status == "failed") { ToastAndroid.show(PermissionData.message, ToastAndroid.SHORT); }
        }
    }, [PermissionData])
    const PermissionCampaigns = (permiss, account) => {
        return permiss.campaigns.map((el) => {
            return el.value;
        })
    }
    const [editPermission, seteditPermission] = useState(false)
    const [deletePermission, setdeletePermission] = useState(false)
    const [createPermission, setcreatePermission] = useState(false)
    const initialstate = () => {
        setIsLodding(true)
        setPage(0)
        seteditPermission(false)
        setdeletePermission(false)
        setcreatePermission(false)
    }
    const FetchData = (p) => {
        const data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
            pageSize: perPageItems,
            pageNumber: p
        }
        dispatch(campaignAction.CampaignList(data, loginData.data.token));
        dispatch(profileAction.GetPermission({ account_id: loginData.data.acId.toString() }, loginData.data.token))
    }
    const fetchNextItems = () => {
        if (totalItems > CampaignData.length) {
            let p = page + 1;
            setPage(p);
            FetchData(p)
        }
    }
    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        initialstate()
        FetchData(0)
    }
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
    const CampaignView = ({ item }) => {
        return (
            <View style={{ marginHorizontal: '3%', marginVertical: '1%', backgroundColor: '#e9ebf2', paddingHorizontal: '2%', borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#B5B8C0', paddingVertical: '2%' }}>
                    <View style={{ justifyContent: 'center', }}>
                        <Image
                            style={{ height: 48, width: 48, }}
                            source={require('../../images/profileCall.png')}
                        />
                    </View>
                    <View style={{ justifyContent: 'center', flex: 1, marginHorizontal: '3%', }}>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 15, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.campaign_name.charAt(0).toUpperCase() + item.campaign_name.slice(1)}</Text>
                        <Text numberOfLines={2}>{item.description}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', }}>
                        <Text style={{
                            backgroundColor: '#7a9bf5', color: '#0e4af0', borderRadius: 5,
                            paddingHorizontal: '4%', paddingVertical: '1%', fontSize: 15, fontWeight: 'bold'
                        }}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                {editPermission ?<TouchableOpacity
                        style={{
                            flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                            width: '50%', borderRightWidth: 1, borderColor: '#B5B8C0', paddingVertical: '3%',
                        }}
                        onPress={() => navigation.navigate(navigationStrings.EditCampaign, { campData: item })}>
                        <Image style={{ height: 16, width: 18, }}
                            source={require('../../images/newEdit.png')} />
                        <Text style={{ marginHorizontal: '3%', fontSize: 15 }}>Edit Campaign</Text>
                    </TouchableOpacity>:null}
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                            width: '50%', paddingVertical: '4%',
                        }}
                        onPress={() => Details(item)} >
                        <Text style={{ marginHorizontal: '3%', fontSize: 14 }}>More Detail</Text>
                        <Image style={{ height: 13, width: 9, }}
                            source={require('../../images/newDetail.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <Header style={{ height: height * 12 / 100 }} onPressLeft={() => { navigation.openDrawer() }}
                title='Campaigns'
                onPressRight={() => { navigation.navigate('Notification') }} />
            <View style={{ flex: 1, marginVertical: '2%' }}>
                {IsLodding == true ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                    :
                    <View style={{ flex: 1, }}>
                        {createPermission ? <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.AddCampaign)}
                            style={{
                                borderColor: '#fff',
                                borderWidth: 1,
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                                alignSelf: 'flex-end',
                                marginHorizontal: '3%',
                                marginTop: '-10%',
                                borderRadius: 15
                            }}>
                            <Text style={{ color: "#fff", fontSize: 12 }}>+Add</Text>
                        </TouchableOpacity> : null}
                        <FlatList style={{ marginTop: '2%' }}
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
            <BottomSheet modalProps={{
                animationType: 'fade', hardwareAccelerated: true,
                onRequestClose: () => DetailsCancel()
            }} onBackdropPress={() => DetailsCancel()} isVisible={askDelete}>
                <View style={{
                    flex: 1, backgroundColor: '#fff',
                    padding: '3%', paddingTop: '5%',
                    borderTopLeftRadius: 20, borderTopRightRadius: 20
                }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ borderBottomWidth: 1 }}>
                            <Text style={styles.askTitle}>Campaign Detail</Text>
                            <TouchableOpacity style={styles.askTitleR}
                                onPress={() => DetailsCancel()}>
                                <Image style={{ height: 14, width: 14, }}
                                    source={require('../../images/cross_blackIos.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: '2%', flex: 1 }}>
                        <View style={{ justifyContent: 'center' }}>
                            <Avatar.Image size={50}
                                style={{ backgroundColor: '#fff' }}
                                source={require('../../images/profileCall.png')} />
                        </View>
                        <View style={{ width: '60%', marginHorizontal: '2%', flex: 1 }}>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold' }]}>{Objcet.CampaignName.charAt(0).toUpperCase() + Objcet.CampaignName.slice(1)}</Text>
                            <Text style={styles.DetailCampTitle}>{moment(Objcet.EndDate).format('LL')} </Text>
                        </View>
                        <View style={{ marginRight: '2%', justifyContent: 'center' }}>
                            <Text style={{ backgroundColor: 'green', color: '#fff', paddingHorizontal: '3%', borderRadius: 20 }}>
                                {Objcet.Status.charAt(0).toUpperCase() + Objcet.Status.slice(1)}</Text>
                        </View>
                    </View>
                    {Objcet.CampaignType ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Campaign Type</Text> : null}
                    {Objcet.CampaignType ? <Text style={styles.DetailCampTitle}>{Objcet.CampaignType}</Text> : null}
                    {Objcet.StartDate || Objcet.EndDate ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Campaign Duration</Text> : null}
                    {Objcet.StartDate || Objcet.EndDate ? <Text style={styles.DetailCampTitle}>{moment(Objcet.StartDate).format('DD MMMM YYYY')} - {moment(Objcet.EndDate).format('DD MMMM YYYY')}</Text> : null}
                    {Objcet.BudgetedCost ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Budgeted Cost</Text> : null}
                    {Objcet.BudgetedCost ? <Text style={styles.DetailCampTitle}>{Objcet.BudgetedCost}</Text> : null}
                    {Objcet.ExpectedRevenue ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Expected Revenue</Text> : null}
                    {Objcet.ExpectedRevenue ? <Text style={styles.DetailCampTitle}>{Objcet.ExpectedRevenue}</Text> : null}
                    {Objcet.created_at ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Created Date</Text> : null}
                    {Objcet.created_at ? <Text style={styles.DetailCampTitle}>{moment(Objcet.created_at).format('lll')}</Text> : null}
                    {Objcet.Description ? <Text style={{ fontWeight: 'bold', color: '#000000' }}>Description</Text> : null}
                    {Objcet.Description ? <Text style={styles.DetailCampTitle}>{Objcet.Description}</Text> : null}
                </View>
            </BottomSheet>
        </View>
    )
}