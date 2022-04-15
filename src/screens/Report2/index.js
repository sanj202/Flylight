import React, { useState, useEffect } from "react";
import { ActivityIndicator, FlatList, View, Text, TouchableOpacity, Dimensions, Pressable, Image, ToastAndroid } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Card } from 'react-native-paper'
import styles from "./styles";
import Header from '../../component/header'
import { reportAction, campaignAction, dashboardAction, leadAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import PieChart from 'react-native-pie-chart';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function Report2({ navigation }) {

    const [totalChart, settotalChart] = useState({
        calledLeads: 0,
        pendingLeads: 0,
        totalLeads: 0,
        IsLodding: true,
    })
    const [userList, setuserList] = useState([]);
    const [user, setuser] = useState(null);
    const [value, setValue] = useState(null);
    const { width, height } = Dimensions.get('window');
    const [campaignData, setcampaignData] = useState([])
    const [filterKeys, setfilterKeys] = useState([])
    const [startDate, setstartDate] = useState(new Date());
    const [startmode, setstartMode] = useState('date');
    const [startshow, setstartshow] = useState(false);
    const [starttext, setstarttext] = useState(true)

    const [enddate, setendDate] = useState(new Date());
    const [endmode, setendMode] = useState('date');
    const [endshow, setendShow] = useState(false);
    const [endtext, setendtext] = useState(true)

    const widthAndHeight = 140
    // const series = [totalChart.calledLeads, totalChart.pendingLeads]
    const series = [totalChart.calledLeads, totalChart.pendingLeads]
    const sliceColor = ['#6191F3', '#FFBC04']

    const dispatch = useDispatch()
    const loginData = useSelector(state => state.auth.data)
    const reportData = useSelector(state => state.report.getReportList)
    const campaignList = useSelector(state => state.leads.campaign)
    const leadOwner = useSelector(state => state.leads.leadOwner)

    useEffect(() => {
        const data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
        }
        dispatch(reportAction.reportList(data, loginData.data.token));
        dispatch(campaignAction.CampaignList(data, loginData.data.token));
        dispatch(leadAction.LeadOwnerList(data, loginData.data.token));
    }, [])

    useEffect(() => {
        if (reportData) {
            if (reportData.status == "success") {
                let total = reportData.data.leadsCalled.count + reportData.data.leadsPending.count
                settotalChart({
                    calledLeads: reportData.data.leadsCalled.count,
                    pendingLeads: reportData.data.leadsPending.count,
                    totalLeads: total,
                    IsLodding: false
                })
            }
            else if (reportData.status == "failed") {
                settotalChart({
                    ...totalChart,
                    IsLodding: false
                })
                ToastAndroid.show(reportData.message, ToastAndroid.SHORT);
            }
        }
    }, [reportData])

    useEffect(() => {
        if (leadOwner) {
            if (leadOwner.status == "200") {
                setuserList(leadOwner.data.map((item, index) => item.user))
            }
            else if (leadOwner.status == "failed") {

            }
            else if (leadOwner.status == "fail") {

            }
        }
    }, [leadOwner])

    useEffect(() => {
        if (campaignList) {
            if (campaignList.status == "success") {
                setcampaignData(campaignList.data.rows)
            }
            else if (campaignList.status == "failed") {
            }
        }
    }, [campaignList])

    const Search = () => {
        let StartDate = moment(startDate).format("YYYY-MM-DD")
        let EndDate = moment(enddate).format("YYYY-MM-DD")
        let data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
            filters: []
        }
        if (starttext == false || endtext == false || value !== null || user !== null) {
            console.log('value...', starttext, endtext, value, user)
            if (StartDate !== EndDate) {
                if (starttext == true) {
                    ToastAndroid.show("Please Select Start Date", ToastAndroid.SHORT);
                }
                else if (endtext == true) {
                    ToastAndroid.show("Please Select End Date", ToastAndroid.SHORT);
                }
                else {
                    if (StartDate <= EndDate) {
                        settotalChart({
                            ...totalChart,
                            IsLodding: true
                        })
                        data.filters.push({ gte: StartDate, key: 'created_at' },
                            { lte: EndDate, key: 'created_at' })
                        dispatch(reportAction.reportList(data, loginData.data.token));
                    }
                    else {
                        ToastAndroid.show("Wrong Format", ToastAndroid.SHORT);
                    }
                }
            }
            else if (StartDate == EndDate && starttext == false && endtext == false) {
                settotalChart({
                    ...totalChart,
                    IsLodding: true
                })
                data.filters.push({ gte: StartDate, key: 'created_at' },
                    { lte: EndDate, key: 'created_at' })
                dispatch(reportAction.reportList(data, loginData.data.token));
            }
            if (value !== null) {
                if (value == 'none') {
                    ToastAndroid.show("campaign Not Available", ToastAndroid.SHORT);
                }
                else {
                    settotalChart({
                        ...totalChart,
                        IsLodding: true
                    })
                    data.filters.push({ eq: value, key: 'campaign' })
                    dispatch(reportAction.reportList(data, loginData.data.token));
                }
            }
            if (user !== null) {
                if (user == 'none') {
                    ToastAndroid.show("User Not Available", ToastAndroid.SHORT);
                }
                else {
                    settotalChart({
                        ...totalChart,
                        IsLodding: true
                    })
                    data.filters.push({ eq: user, key: 'profile_id' })
                    dispatch(reportAction.reportList(data, loginData.data.token));
                }
            }

            setfilterKeys(data.filters)
        }
        else {
            ToastAndroid.show('Please Select Search Criteria', ToastAndroid.SHORT);
        }
    }

    const Reset = () => {
        setValue(null)
        setuser(null)
        setstarttext(true)
        setendtext(true)
        setstartDate(new Date())
        setendDate(new Date())
        settotalChart({
            ...totalChart,
            IsLodding: true
        })
        const data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
        }
        dispatch(reportAction.reportList(data, loginData.data.token));
    }

    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        console.log(refreshing)
        Reset()
    }

    const checkStatusValue = (value) => {
        if (value == 'All') {
            navigation.navigate('LeadFilterScreen', { filters: filterKeys, value: 'All' })
            setfilterKeys([])
            Reset()
        }
        else if (value == 'Called') {
            navigation.navigate('LeadFilterScreen', { filters: filterKeys, value: 'Called' })
            setfilterKeys([])
            Reset()
        }
        else if (value == 'Pending') {
            navigation.navigate('LeadFilterScreen', { filters: filterKeys, value: 'Pending' })
            setfilterKeys([])
            Reset()
        }
    }

    const onChangeFrom = (event, selectedDate) => {
        if (event.type == 'dismissed') {
            setstartshow(!startshow);
        }
        else {
            console.log('date selected ')
            const currentDate = selectedDate || startDate;
            setstartshow(Platform.OS === 'ios' ? true : false);
            setstartDate(currentDate)
            setstarttext(false)
        }
    };
    const Mode = (currentMode) => {
        setstartshow(!startshow);
        setstartMode(currentMode);
    };
    const showDatepicker = () => {
        Mode('date');
    };

    const onChangeendDate = (event, selectedDate) => {
        if (event.type == 'dismissed') {
            setendShow(!endshow);
        }
        else {
            console.log('date selected ')
            const currentDate = selectedDate || enddate;
            setendShow(Platform.OS === 'ios' ? true : false);
            setendDate(currentDate)
            setendtext(false)
        }
    };
    const setEMode = (currentMode) => {
        setendShow(!endshow);
        setendMode(currentMode);
    };
    const showEDatepicker = () => {
        setEMode('date');
    };

    return (
        <View style={{ flex: 1 }}>
            <Header onPressLeft={() => navigation.openDrawer()}
                title='Reports'
                onPressRight={() => { navigation.navigate('Notification') }}
            />
            <View style={{ flex: 1, marginVertical: '2%' }}>
                <View >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: '2%' }}>
                        <Pressable style={styles.pickerStyle} onPress={showDatepicker} >
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={Platform.OS == 'ios' ? [styles.icon] : [styles.icon, { marginTop: '2%' }]}
                                    source={require('../../images/DOB.png')} />
                                {startshow && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        style={{ paddingVertical: '5%', width: '50%' }}
                                        // is24Hour={true}
                                        value={startDate}
                                        mode={startmode}
                                        display="default"
                                        onChange={onChangeFrom}
                                    />
                                )}
                                {Platform.OS == 'ios' ? <View>
                                    {starttext == true ?
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000' }}>From Date</Text>
                                        :
                                        null
                                    }
                                </View>
                                    :
                                    <View>
                                        {starttext == true ?
                                            <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>From Date</Text>
                                            :
                                            <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>{moment(startDate).format('DD/MM/YYYY')}</Text>
                                        }
                                    </View>
                                }
                            </View>
                        </Pressable>
                        <Pressable style={styles.pickerStyle} onPress={showEDatepicker} >
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={Platform.OS == 'ios' ? [styles.icon] : [styles.icon, { marginTop: '2%' }]}
                                    source={require('../../images/DOB.png')} />
                                {endshow && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        style={{ paddingVertical: '5%', width: '50%' }}
                                        // is24Hour={true}
                                        value={enddate}
                                        mode={endmode}
                                        display="default"
                                        onChange={onChangeendDate}
                                    />
                                )}
                                {Platform.OS == 'ios' ? <View>
                                    {endtext == true ?
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000' }}>To Date</Text>
                                        :
                                        null
                                    }
                                </View>
                                    :
                                    <View>
                                        {endtext == true ?
                                            <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>To Date</Text>
                                            :
                                            <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>{moment(enddate).format('DD/MM/YYYY')}</Text>
                                        }
                                    </View>
                                }
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.container3}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '-2%' }}>
                            <Dropdown
                                style={[styles.dropdown3, { width: '48%' }]}
                                placeholderStyle={styles.placeholderStyle3}
                                selectedTextStyle={styles.selectedTextStyle3}
                                // inputSearchStyle={styles.inputSearchStyle3}
                                iconStyle={styles.iconStyle3}
                                data={campaignData}
                                search={true}
                                searchPlaceholder='Search'
                                maxHeight={160}
                                labelField="campaign_name"
                                valueField="id"
                                placeholder='Select Campaign'
                                // searchPlaceholder="Search..."
                                value={value}
                                onChange={item => {
                                    setValue(item.id)
                                }}
                                renderLeftIcon={() => (
                                    <View>
                                        <Image source={require('../../images/list.png')}
                                            style={{ height: 23, width: 17, marginRight: '2%' }}
                                        />
                                    </View>
                                )}
                            />

                            <Dropdown
                                style={[styles.dropdown3, { width: '48%' }]}
                                placeholderStyle={styles.placeholderStyle3}
                                selectedTextStyle={styles.selectedTextStyle3}
                                // inputSearchStyle={styles.inputSearchStyle3}
                                iconStyle={styles.iconStyle3}
                                data={userList}
                                search={true}
                                searchPlaceholder='Search'
                                maxHeight={160}
                                labelField="name"
                                valueField="id"
                                placeholder='Select User'
                                // searchPlaceholder="Search..."
                                value={user}
                                onChange={item => { setuser(item.id) }}
                                renderLeftIcon={() => (
                                    <View>
                                        <Image
                                            source={require('../../images/list.png')}
                                            style={{ height: 23, width: 17, marginRight: '2%' }}
                                        />
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: '2%' }}>
                        <TouchableOpacity style={[styles.button, { width: '60%' }]} onPress={() => Search()} >
                            <Text style={styles.textButton}>Search</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginVertical: '3%' }} onPress={() => Reset()}>
                            <Image source={require('../../images/refreshButton.png')} style={{ height: 24, width: 24 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    {totalChart.IsLodding == true ?
                        <ActivityIndicator size="small" color="#0000ff" />
                        :
                        <FlatList
                            contentContainerStyle={{
                                // display: "flex",
                                flexGrow: 1,
                            }}
                            data={[{}]}
                            keyExtractor={() => 'childrenkeyflatlist'}
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            renderItem={() =>
                                <View style={{ marginHorizontal: '3%' }}>
                                    <Card style={{ padding: '3%' }}>
                                        <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 16, color: '#000000' }}>Leads</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={[styles.charttextIndicator, { backgroundColor: '#FFBC04' }]}>
                                                    </View>
                                                    <Text style={styles.chartText}>  Pending</Text>
                                                    <Text style={styles.chartText}>  {totalChart.pendingLeads}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                                                    <View style={[styles.charttextIndicator, { backgroundColor: '#6191F3' }]}>
                                                    </View>
                                                    <Text style={styles.chartText}>  Called</Text>
                                                    <Text style={styles.chartText}>  {totalChart.calledLeads}</Text>
                                                </View>
                                            </View>
                                            {totalChart.calledLeads || totalChart.pendingLeads ?
                                                <PieChart
                                                    widthAndHeight={widthAndHeight}
                                                    series={series}
                                                    sliceColor={sliceColor}
                                                /> :
                                                <View style={{ height: 140, width: 140, borderRadius: 80 }}>
                                                    <Text style={{ textAlign: 'center', marginTop: '40%' }}>Leads Zero</Text>
                                                </View>}
                                        </View>
                                    </Card>
                                    <Card style={[styles.card, { backgroundColor: '#6FD3F5' }]}>
                                        <TouchableOpacity onPress={() => checkStatusValue("All")} >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'Roboto' }} >Total Leads</Text>
                                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }} >{totalChart.totalLeads}</Text>
                                                </View>
                                                <View style={{
                                                    height: 37, width: 42, borderWidth: 2, marginTop: '3%',
                                                    padding: '2.5%', borderRadius: 10, borderColor: '#fff',
                                                    backgroundColor: '#04AEE8'
                                                }}>
                                                    <Image
                                                        source={require('../../images/arrow_white.png')}
                                                        style={{ height: 13, width: 20, }}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </Card>
                                    <Card style={[styles.card, { backgroundColor: '#2AEF4B' }]}>
                                        <TouchableOpacity onPress={() => checkStatusValue("Called")} >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'Roboto' }} >Lead Called</Text>
                                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }} >{totalChart.calledLeads}</Text>
                                                </View>
                                                <View style={{
                                                    height: 37, width: 42, borderWidth: 2, marginTop: '3%',
                                                    padding: '2.5%', borderRadius: 10, borderColor: '#fff', backgroundColor: '#2AEF4B'
                                                }}>
                                                    <Image
                                                        source={require('../../images/arrow_white.png')}
                                                        style={{ height: 13, width: 20, }}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </Card>
                                    <Card style={[styles.card, { backgroundColor: '#EF2AE2' }]}>
                                        <TouchableOpacity onPress={() => checkStatusValue("Pending")} >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'Roboto' }} >Leads Pending</Text>
                                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }} >{totalChart.pendingLeads}</Text>
                                                </View>
                                                <View style={{
                                                    height: 37, width: 42, borderWidth: 2, marginTop: '3%',
                                                    padding: '2.5%', borderRadius: 10, borderColor: '#fff', backgroundColor: '#EF2AE2'
                                                }}>
                                                    <Image
                                                        source={require('../../images/arrow_white.png')}
                                                        style={{ height: 13, width: 20, }}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </Card>
                                </View>}
                        />
                    }
                </View>
            </View>
        </View>
    );
}