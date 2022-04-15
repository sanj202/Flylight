import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image, Modal, ActivityIndicator, ToastAndroid } from 'react-native';
import moment from 'moment';
import styles from './styles'
import Header from '../../component/header/index'
import { historyAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/core"

export default function HistoryOne({ navigation, route }) {

    const [Data, setData] = useState('')
    const [User, setUser] = useState('')
    const [LeadId, setLeadId] = useState(route.params ? route.params.id : '')
    const [IsLodding, setIsLodding] = useState(true)
    const [page, setPage] = useState(0);
    const [perPageItems, setperPageItems] = useState(10);
    const [totalItems, settotalItems] = useState(0);

    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const DetailData = useSelector(state => state.history.detailHistory)

    useEffect(() => {
        GetHistoryDetail(page)
    }, [])
    useEffect(() => {
        if (DetailData) {
            if (DetailData.status == "success") {
                settotalItems(DetailData.total_rows)
                setUser(DetailData.data[0].lead)
                setData([...Data, ...DetailData.data])
                setIsLodding(false)
                dispatch(historyAction.clearResponse())
            }
            else if (DetailData.status == "failed") {
                ToastAndroid.show(DetailData.message, ToastAndroid.SHORT);
                setIsLodding(false)
                dispatch(historyAction.clearResponse())
            }
        }
    }, [DetailData])
    const GetHistoryDetail = (p) => {
        let data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
            pageSize: perPageItems,
            pageNumber: p,
            lead_id: LeadId,
            filters: []
        }
        dispatch(historyAction.HistoryDetail(data, loginData.data.token));
    }
    const LoadMore = () => {
        if (totalItems > Data.length) {
            let p = page + 1;
            setPage(p);
            GetHistoryDetail(p)
        }
    }
    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        console.log(refreshing)
        setIsLodding(true)
        setPage(0)
        setData([])
        GetHistoryDetail(0)
    }
    const [bottom, setbottom] = useState({
        isVisible4: false,
        audio: '',
        callDate: '',
        callTime: '',
        status: '',
        callAction: '',
        message: '',
        businessCard: ''
    })
    const OpenDetail = (item) => {
        setbottom({
            isVisible4: true,
            audio: item.audio_file,
            callDate: moment(item.created_at).format("YYYY-MM-DD"),
            callTime: moment(item.created_at).format("LT"),
            status: item.feedbackStatus ? item.feedbackStatus.status : '',
            callAction: item.callAction ? item.callAction.action : '',
            message: item.feedbackMessage ? {
                messageT: item.feedbackMessage.message,
                phoneT: item.feedbackMessage.phone,
                emailT: item.feedbackMessage.email
            } : '',
            businessCard: item.businessCard ? {
                orgName: item.businessCard.organization_name,
                contactName: item.businessCard.contact_person,
                mobile: item.businessCard.mobile_number,
                orgAddress: item.businessCard.company_address,
                orgLink: item.businessCard.company_url,
            } : '',
        })
    }
    const CloseBottomSheet = (item) => {
        setbottom({
            isVisible4: false,
            audio: '',
            callDate: '',
            callTime: '',
            status: '',
            callAction: '',
            message: '',
            businessCard: ''
        })
    }
    const DetailView = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => OpenDetail(item)} >
                <View style={{ paddingHorizontal: 10, borderWidth: 1, borderRadius: 10, borderColor: '#DBDBDB', margin: '3%', marginTop: '0%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: '3%' }}>
                        <View>
                            <Text style={{
                                fontWeight: 'bold', fontSize: 18, color: '#0F0F0F', fontFamily: 'Roboto'
                            }}>{moment(item.created_at).format("HH:mm A")}</Text>
                            <Text style={{
                                color: '#0F0F0F', paddingBottom: '2%',
                                fontSize: 12, fontFamily: 'Roboto'
                            }}>Call On - {moment(item.created_at).format("YYYY-MM-DD")}</Text>
                        </View>
                        <View>
                            {item.feedbackStatus ?
                                <Text style={{
                                    color: '#fff', backgroundColor: '#F69708',
                                    paddingLeft: 15, paddingRight: 15,
                                    padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 10,
                                    marginTop: '20%'
                                }}>{item.feedbackStatus.status ? item.feedbackStatus.status : ''}</Text>
                                :
                                null}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <Header onPressLeft={() => { navigation.openDrawer() }}
                title='History'
                onPressRight={() => { navigation.navigate('Notification') }}
            />
            <View style={{ flex: 1, marginVertical: '2%' }}>
                {IsLodding == true ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
                    :
                    <View style={{flex: 1 }}>
                        <View style={styles.listData}>
                            <Image style={{ height: 53, width: 53, margin: '2%' }}
                                source={require('../../images/profileCall.png')}
                            />
                            <View style={{ marginHorizontal: '2%', width: '50%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 19, fontFamily: 'Roboto', marginTop: '5%', color: '#0F0F0F' }}>{User.first_name} {User.last_name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ height: 12, width: 12, marginRight: '3%', marginTop: '8%' }}
                                        source={require('../../images/material-call.png')}
                                    />
                                    <Text style={{ fontWeight: 'bold', marginTop: '5%', fontSize: 12, color: '#0F0F0F' }}>+91 {User.phone}</Text>
                                </View>
                            </View>
                            <View style={{ width: '25%' }}>
                                <Text style={{ color: '#565656', fontFamily: 'Roboto', fontSize: 12, marginRight: '2%', marginTop: '35%' }}>{User.company}</Text>
                            </View>
                        </View>
                        <FlatList
                            data={Data}
                            renderItem={DetailView}
                            ListEmptyComponent={() => (!Data.length ?
                                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>Data Not Found</Text>
                                : null)}
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            onEndReached={() => LoadMore}
                            keyExtractor={item => item.id}
                        />
                    </View>}
            </View>
            <Modal animationType="slide" transparent={true} visible={bottom.isVisible4}
                onRequestClose={() => CloseBottomSheet()}>
                <View style={styles.askModel}>
                    <Text style={styles.askTitle}>History Detail</Text>
                    <TouchableOpacity style={styles.askTitleR}
                        onPress={() => CloseBottomSheet()}>
                        <Image style={{ height: 14, width: 14, }}
                            source={require('../../images/cross.png')}
                        />
                    </TouchableOpacity>
                    <View style={[styles.inputFields, { padding: 10 }]}>
                        <View>
                            <Text style={styles.DetailCampTitle}>
                                Call Date
                                {'\n'}
                                Call Time
                                {'\n'}
                                Call Action
                                {'\n'}
                                Call Status
                                {bottom.message ? '\n' + 'Message' : null}
                                {bottom.businessCard ? '\n' + 'businessCard' : null}
                            </Text>
                        </View>
                        <View style={{ marginLeft: '3%', width: '70%' }}>
                            <Text style={[styles.DetailCampTitle, { fontWeight: 'bold' }]}>
                                :   {bottom.callDate}
                                {'\n'}
                                :   {bottom.callTime}
                                {'\n'}
                                :   {bottom.callAction}
                                {'\n'}
                                :   {bottom.status}
                                {bottom.message ? '\n' + ':   ' + bottom.message.messageT + '\n' + ':   ' + bottom.message.phoneT + '\n' + ':   ' + bottom.message.emailT : null}
                                {bottom.businessCard ? '\n' + ':   ' + bottom.businessCard.contactName + '\n' + ':   ' + bottom.businessCard.mobile
                                    + '\n' + ':   ' + bottom.businessCard.orgName + '\n' + ':   ' + bottom.businessCard.orgLink + '\n' + ':   ' + bottom.businessCard.orgAddress : null}
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    );
}


