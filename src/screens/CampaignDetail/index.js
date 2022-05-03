import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image, Modal, ToastAndroid, ActivityIndicator, Dimensions } from 'react-native';
import Header from '../../component/header/index'
import { campaignAction, profileAction, leadAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles'
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import navigationStrings from '../../constant/navigationStrings';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

export default function Campaign({ navigation, route }) {

    const isFocused = useIsFocused();
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
    const PermissionData = useSelector(state => state.profile.permission)

    // useEffect(() => {
    //     isFocused ? initialstate() : null
    //     isFocused ? FetchData(page) : null
    // }, [isFocused])
    useEffect(() => {
        if (campaignList) {
            if (campaignList.status == "success") {
                settotalItems(campaignList.data.count)
                setCampaignData(campaignList.data.rows)
                setIsLodding(false)
                dispatch(campaignAction.clearResponse())
            }
            else if (campaignList.status == "failed") {
                setIsLodding(false)
            }
        }
    }, [campaignList])
    useEffect(() => {
        if (PermissionData) {
            if (PermissionData.status == "success") {
                if (PermissionCampaigns(JSON.parse(PermissionData.permissions)).includes('edit')) { seteditPermission(true) }
                if (PermissionCampaigns(JSON.parse(PermissionData.permissions)).includes('create')) { setcreatePermission(true) }
                if (PermissionCampaigns(JSON.parse(PermissionData.permissions)).includes('delete')) { setdeletePermission(true) }
            }
            else if (PermissionData.status == "failed") {
                ToastAndroid.show(PermissionData.message, ToastAndroid.SHORT);
            }
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
        console.log(',..............', item)
        return (
            // <View style={styles.listData}>
            //         <View>
            //             <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Name   </Text>
            //             <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Status </Text>
            //             <Text style={{ fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>Type</Text>
            //         </View>
            //         <View style={{ marginLeft: '2%', width: '60%' }}>
            //             <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.campaign_name}</Text>
            //             <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.status}</Text>
            //             <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.campaign_type}</Text>
            //         </View>
            //         <View style={{ alignSelf: 'flex-end' }}>
            //             {editPermission ? <TouchableOpacity style={{ alignItems: 'flex-end' }}
            //                 onPress={() => navigation.navigate(navigationStrings.EditCampaign, { campData: item })}>
            //                 <Image style={{ height: 22, width: 22, marginHorizontal: '5%' }}
            //                     source={require('../../images/editCall.png')} />
            //             </TouchableOpacity> : null}
            //             <TouchableOpacity
            //                 style={{ alignItems: 'flex-end', marginTop: '20%', backgroundColor: '#3373F3', borderRadius: 20 }}
            //                 onPress={() => Details(item)} >
            //                 <Text style={{ color: '#fff', padding: '1%' }}>More Detail</Text>
            //             </TouchableOpacity>
            //         </View>
            //     </View>
            <View style={{ marginHorizontal: '3%', marginVertical: '1%', backgroundColor: '#dce3f7', padding: '2%', borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, paddingBottom: '1%' }}>
                    <View style={{ justifyContent: 'center', }}>
                        <Image
                            style={{ height: 48, width: 48, }}
                            source={require('../../images/profileCall.png')}
                        />
                    </View>
                    <View style={{ justifyContent: 'center', flex: 1, marginHorizontal: '2%', }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.campaign_name.charAt(0).toUpperCase() + item.campaign_name.slice(1)}</Text>
                        <Text numberOfLines={2}>{item.description}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', }}>
                        <Text style={{
                            backgroundColor: '#7a9bf5', color: '#0e4af0', borderRadius: 5,
                            paddingHorizontal: '5%', paddingVertical: '2%', fontSize: 15, fontWeight: 'bold'
                        }}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                    {editPermission ? <TouchableOpacity style={{
                        flexDirection: 'row',
                        paddingHorizontal: '7%', borderRightWidth: 1
                    }}
                        onPress={() => navigation.navigate(navigationStrings.EditCampaign, { campData: item })}>
                        <Image style={{ height: 22, width: 24, marginTop: '5%' }}
                            source={require('../../images/newEdit.png')} />
                        <Text style={{ marginHorizontal: '3%', paddingTop: '3%', fontSize: 13 }}>Edit Campaign</Text>
                    </TouchableOpacity> : null}

                    <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: '7%' }}
                        onPress={() => Details(item)} >
                        <Text style={{ marginHorizontal: '3%', paddingTop: '3%', fontSize: 13 }}>More Detail</Text>
                        <Image style={{ height: 22, width: 15, marginTop: '5%' }}
                            source={require('../../images/newDetail.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <Header style={{ height: height * 12 / 100 }} onPressLeft={() => { navigation.openDrawer() }}
                title='Campaigns Detail'
                onPressRight={() => { navigation.navigate('Notification') }} />
            <View style={{ flex: 1, marginVertical: '2%' }}>
                {IsLodding == true ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                    :
                    <View style={{ flex: 1 ,marginHorizontal:'3%'}}>

                        <Card style={{ marginTop: '-12%' }}>
                            <View style={{ padding: '2%', flexDirection: 'row' }}>
                                <Avatar.Image
                                    size={60}
                                    style={{ backgroundColor: '#C6CCD1' }}
                                    source={require('../../images/profileCall.png')} />
                                <View style={{ flex: 1, marginHorizontal: '2%' }}>
                                    <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Roboto', fontWeight: 'bold', }}>
                                        {/* {leadDetail.first_name} {leadDetail.last_name} */}sfczdsfsd
                                        </Text>
                                    <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Roboto', fontWeight: 'bold', }}>
                                        {/* {leadDetail.company ? leadDetail.company.charAt(0).toUpperCase() + leadDetail.company.slice(1) : ''} */}
                                        545455454
                                        </Text>
                                    <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Roboto', fontWeight: 'bold', }}>
                                        {/* +91 {leadDetail.phone} */}
                                        5454545
                                        </Text>
                                </View>
                                <Avatar.Image
                                    size={45}
                                    style={{ backgroundColor: '#C6CCD1', marginTop: '2%' }}
                                    source={require('../../images/GroupCall.png')} />
                            </View>
                        </Card>
                        {/* {createPermission ? <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.AddCampaign)}
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
                        </TouchableOpacity> : null} */}
                        {/* <FlatList style={{ marginTop: '5%' }}
                            data={CampaignData}
                            renderItem={CampaignView}
                            ListEmptyComponent={() => (!CampaignData.length ?
                                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>Data Not Found</Text>
                                : null)}
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            onEndReached={() => fetchNextItems()}
                            keyExtractor={item => item.id}
                        /> */}
                    </View>}
            </View>
            <Modal animationType="slide" transparent={true} visible={askDelete} onRequestClose={() => { setaskDelete(false); }}>
                <View style={styles.askModel}>
                    <Text style={styles.askTitle}> Campaign Detail</Text>
                    <TouchableOpacity style={styles.askTitleR} onPress={() => DetailsCancel()}>
                        <Image style={{ height: 14, width: 14, }} source={require('../../images/cross.png')} />
                    </TouchableOpacity>
                    <View style={styles.inputFields}>
                        <View>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>Campaign Name:</Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>Status:</Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>Start Date</Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>End Date</Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>Campaign Type</Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>Expected Revenue</Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>Budgeted Cost</Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>created Date</Text>
                            <Text style={[styles.DetailCampTitle, { marginVertical: '1.6%' }]}>Description</Text>
                        </View>
                        <View style={{ marginLeft: '3%', width: '60%' }}>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>: {Objcet.CampaignName}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>: {Objcet.Status}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>: {Objcet.StartDate}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>: {Objcet.EndDate}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>: {Objcet.CampaignType}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>: {Objcet.ExpectedRevenue}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>: {Objcet.BudgetedCost}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>: {moment(Objcet.created_at).format('lll')}</Text>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold', }]}>: {Objcet.Description}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}