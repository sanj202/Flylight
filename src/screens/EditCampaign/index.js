import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList,
    Image, Button, ScrollView, Modal, Alert, ToastAndroid, StatusBar, Dimensions, Platform
} from 'react-native';
import styles from './styles';
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../../component/header';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { addcontactManuallyAction, leadAction, campaignAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import navigationStrings from '../../constant/navigationStrings';
export default function EditCampaign({ navigation, route }) {
    const [CampaignOwnerList, setCampaignOwnerList] = useState([])
    const [CampaignOwner, setCampaignOwner] = useState(null)
    const [campaignName, setcampaignName] = useState(route.params.campData ? route.params.campData.campaign_name : "")
    const [Status, setStatus] = useState(route.params.campData ? route.params.campData.status : null);
    const [campaignType, setcampaignType] = useState(route.params.campData ? route.params.campData.campaign_type : "")
    const [Description, setDescription] = useState(route.params.campData ? route.params.campData.description : "")
    const [Revenue, setRevenue] = useState(route.params.campData ? route.params.campData.actual_cost : "")
    const [BudgetedCost, setBudgetedCost] = useState(route.params.campData ? route.params.campData.budgeted_cost : "")
    const { width, height } = Dimensions.get('window');
    const [IsLodding, setIsLodding] = useState(false);
    const [startdate, setstartDate] = useState(new Date());
    const [startmode, setstartMode] = useState('date');
    const [startshow, setstartShow] = useState(false);
    const [starttext, setstarttext] = useState(true)
    const [enddate, setendDate] = useState(new Date());
    const [endmode, setendMode] = useState('date');
    const [endshow, setendShow] = useState(false);
    const [endtext, setendtext] = useState(true)
    const data = [
        { label: 'active', value: 'active' },
        { label: 'planning', value: 'planning' },
        { label: 'inctive', value: 'inctive' },
        { label: 'complete', value: 'complete' },
    ];
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const leadOwner = useSelector(state => state.leads.leadOwner)
    const responseAdd_Edit = useSelector(state => state.campaign.addCampaign)

    useEffect(() => {
        setCampaignOwner(route.params.campData ? route.params.campData.profile_id : null)
        setcampaignName(route.params.campData ? route.params.campData.campaign_name : "")
        setStatus(route.params.campData ? route.params.campData.status : null);
        setcampaignType(route.params.campData ? route.params.campData.campaign_type : "")
        setDescription(route.params.campData ? route.params.campData.description : "")
        setRevenue(route.params.campData ? route.params.campData.expected_revenue : "")
        setBudgetedCost(route.params.campData ? route.params.campData.budgeted_cost : "")
        setstartDate(route.params.campData ? new Date(route.params.campData.start_date) : new Date());
        setstarttext(route.params.campData ? route.params.campData.start_date ? false : true : true)
        setendDate(route.params.campData ? new Date(route.params.campData.end_date) : new Date());
        setendtext(route.params.campData ? route.params.campData.end_date ? false : true : true)
    }, [route.params])
    useEffect(() => {
        const data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
        }
        isFocused ? dispatch(leadAction.LeadOwnerList(data, loginData.data.token)) : null
    }, [isFocused])
    useEffect(() => {
        if (leadOwner) {
            if (leadOwner) {
                if (leadOwner.status == "200") { setCampaignOwnerList(leadOwner.data.map((item, index) => item.user)) }
                else if (leadOwner.status == "fail") { ToastAndroid.show(leadOwner.message, ToastAndroid.SHORT); }
            }
        }
    }, [leadOwner])
    useEffect(() => {
        if (responseAdd_Edit) {
            setIsLodding(false)
            if (responseAdd_Edit.status == "success") {
                ToastAndroid.show(responseAdd_Edit.message, ToastAndroid.SHORT);
                dispatch(campaignAction.AddEditclearResponse())
                navigation.navigate(navigationStrings.Campaign)
            }
            else if (responseAdd_Edit.status == "failed") {
                ToastAndroid.show(responseAdd_Edit.message, ToastAndroid.SHORT);
            }
        }
    }, [responseAdd_Edit])
    const AddNewCampaign = () => {
        if (campaignName == "") {
            ToastAndroid.show('Enter campaign Name', ToastAndroid.SHORT);
        }
        else if (Status == null) {
            ToastAndroid.show('Enter campaign Status', ToastAndroid.SHORT);
        }
        else if (starttext == true) {
            ToastAndroid.show('Select Start Date', ToastAndroid.SHORT);
        }
        else if (endtext == true) {
            ToastAndroid.show('Select End Date', ToastAndroid.SHORT);
        }
        else {
            let formateStartDate = moment(startdate).format("YYYY-MM-DD")
            let formateEndDate = moment(enddate).format("YYYY-MM-DD")
            setIsLodding(true)
            const data = {
                uid: loginData.data.uid,
                profile_id: CampaignOwner ? CampaignOwner : loginData.data.cProfile.toString(),
                org_uid: loginData.data.org_uid,
                campaign_id: route.params.campData.id,
                campaign_name: campaignName,
                campaign_status: Status,
                campaign_type: campaignType,
                expected_revenue: Revenue,
                budgeted_cost: BudgetedCost,
                description: Description,
                start_date: formateStartDate,
                end_date: formateEndDate
            }
            dispatch(campaignAction.Add_EditCampaign(data, loginData.data.token));
        }
    }
    const onChangeStartDate = (event, selectedDate) => {
        if (event.type == 'dismissed') {
            setstartShow(!startshow);
        }
        else {
            const currentDate = selectedDate || startdate;
            setstartShow(Platform.OS === 'ios');
            setstartDate(currentDate)
            setstarttext(false)
        }
    };
    const setMode = (currentMode) => {
        setstartShow(!startshow);
        setstartMode(currentMode);
    };
    const showDatepicker = () => {
        setMode('date');
    };
    const onChangeEndDate = (event, selectedDate) => {
        if (event.type == 'dismissed') {
            setendShow(!endshow);
        }
        else {
            const currentDate = selectedDate || enddate;
            setendShow(Platform.OS === 'ios');
            setendDate(currentDate)
            setendtext(false)
        }
    };
    const showMode2 = (currentMode) => {
        setendShow(!endshow);
        setendMode(currentMode);
    };
    const showDatepicker2 = () => {
        showMode2('date');
    };
    return (
        <View style={{ flex: 1 }}>
            <Header onPressLeft={() => { navigation.openDrawer() }}
                title='Edit Campaign'
                onPressRight={() => { navigation.navigate('Notification') }}
            />
            <ScrollView style={{ flex: 1, marginVertical: '2%', marginHorizontal: '3%' }}>
                <View style={{ marginTop: '2%' }}>
                    <Dropdown
                        style={styles.dropdown3}
                        placeholderStyle={styles.placeholderStyle3}
                        selectedTextStyle={styles.selectedTextStyle3}
                        iconStyle={styles.iconStyle3}
                        data={CampaignOwnerList}
                        search={true}
                        searchPlaceholder='Search'
                        maxHeight={160}
                        labelField="name"
                        valueField="id"
                        placeholder='Campaign Owner'
                        value={CampaignOwner}
                        onChange={item => { setCampaignOwner(item.id); }}
                        renderLeftIcon={() => (
                            <View>
                                <Image style={styles.icon}
                                    source={require('../../images/user.png')}
                                />
                            </View>
                        )}
                    />
                </View>
                <View style={styles.inputFields}>
                    <Image style={[styles.icon, { height: 20, width: 18 }]}
                        source={require('../../images/user.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={campaignName}
                        onChangeText={e1 => setcampaignName(e1)}
                        placeholder="Campaign Name" />
                    {!campaignName.length ?
                        <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                        : null}
                </View>
                <View style={{ marginTop: '2%' }}>
                    <Dropdown
                        style={styles.dropdown3}
                        placeholderStyle={styles.placeholderStyle3}
                        selectedTextStyle={styles.selectedTextStyle3}
                        iconStyle={styles.iconStyle3}
                        data={data}
                        search={true}
                        searchPlaceholder='Search'
                        maxHeight={160}
                        labelField="label"
                        valueField="value"
                        placeholder='Campaign Status'
                        value={Status}
                        onChange={item => { setStatus(item.value); }}
                        renderLeftIcon={() => (
                            <View>
                                <Image
                                    style={[styles.icon, { height: 22, width: 22 }]}
                                    source={require('../../images/transgender.png')}
                                />
                            </View>
                        )}
                        renderRightIcon={() => (
                            <View>
                                {Status == null ?
                                    <Text style={{ fontSize: 15, marginTop: '-350%', color: 'red' }}>*</Text>
                                    : null}
                            </View>
                        )}
                    />
                </View>
                <TouchableOpacity style={styles.pickerStyle}
                    onPress={showDatepicker} >
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={Platform.OS == 'ios' ?
                                [styles.icon] :
                                [styles.icon, { marginVertical: '2%' }]}
                            source={require('../../images/DOB.png')}
                        />
                        {startshow && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                style={{ paddingVertical: '5%', width: '50%' }}
                                // is24Hour={true}
                                value={startdate}
                                mode={startmode}
                                display="default"
                                timeZoneOffsetInMinutes={60}
                                onChange={onChangeStartDate}
                            />
                        )}
                        {Platform.OS == 'ios' ? <View>
                            {starttext == true ?
                                <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000' }}>Start Date</Text>
                                :
                                null
                            }
                        </View>
                            :
                            <View>
                                {starttext == true ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ marginTop: '4%', fontSize: 12, width: '90%', color: '#000000', marginLeft: '2%' }}>Start Date</Text>
                                        <Text style={{ fontSize: 15, color: 'red', marginTop: '-1%' }}>*</Text>
                                    </View>
                                    :
                                    <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>{moment(startdate).format('MM/DD/YYYY')}</Text>
                                }
                            </View>
                        }
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pickerStyle}
                    onPress={showDatepicker2} >
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={Platform.OS == 'ios' ?
                                [styles.icon] :
                                [styles.icon, { marginVertical: '2%' }]}
                            source={require('../../images/DOB.png')}
                        />
                        {endshow && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                style={{ paddingVertical: '5%', width: '50%' }}
                                // is24Hour={true}
                                value={enddate}
                                mode={endmode}
                                minimumDate={new Date()}
                                display="default"
                                onChange={onChangeEndDate}
                            />
                        )}
                        {Platform.OS == 'ios' ? <View>
                            {endtext == true ?
                                <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000' }}>End Date</Text>
                                :
                                null
                            }
                        </View>
                            :
                            <View>
                                {endtext == true ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ marginTop: '4%', fontSize: 12, width: '90%', color: '#000000', marginLeft: '2%' }}>End Date</Text>
                                        <Text style={{ fontSize: 15, color: 'red', marginTop: '-1%' }}>*</Text>
                                    </View>
                                    :
                                    <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>{moment(enddate).format('MM/DD/YYYY')}</Text>
                                }
                            </View>
                        }
                    </View>
                </TouchableOpacity>
                <View style={styles.inputFields}>
                    <Image style={[styles.icon, { height: 27, width: 20 }]}
                        source={require('../../images/list.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={campaignType}
                        onChangeText={e2 => setcampaignType(e2)}
                        placeholder="Campaign Type" />
                </View>
                <View style={styles.inputFields}>
                    <Image style={[styles.icon, { height: 20, width: 18 }]}
                        source={require('../../images/user.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={Revenue}
                        keyboardType='numeric'
                        onChangeText={e3 => setRevenue(e3)}
                        placeholder="Expected Revenue" />
                </View>
                <View style={styles.inputFields}>
                    <Image style={[styles.icon, { height: 27, width: 20 }]}
                        source={require('../../images/list.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={BudgetedCost}
                        keyboardType='numeric'
                        onChangeText={e4 => setBudgetedCost(e4)}
                        placeholder="Budgeted Cost" />
                </View>
                <View style={styles.inputFields}>
                    <Image style={[styles.icon, { height: 27, width: 20 }]}
                        source={require('../../images/list.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={Description}
                        onChangeText={e5 => setDescription(e5)}
                        placeholder="Description" />
                </View>
                {IsLodding == true ? <ActivityIndicator size="small" color="#0000ff" /> : <View />}
                <TouchableOpacity style={styles.button}
                    onPress={() => AddNewCampaign()}>
                    <Text style={[styles.textButton, { fontWeight: 'bold' }]}>UPDATE</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

