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
import { useIsFocused } from "@react-navigation/core"

export default function AddContact({ navigation }) {

    const [CampaignOwnerList, setCampaignOwnerList] = useState([])
    const [CampaignOwner, setCampaignOwner] = useState(null)
    const [campaignName, setcampaignName] = useState("")
    const [Status, setStatus] = useState(null);
    const [campaignType, setcampaignType] = useState("")
    const [Description, setDescription] = useState("")
    const [Revenue, setRevenue] = useState("")
    const [BudgetedCost, setBudgetedCost] = useState("")
    const { width, height } = Dimensions.get('window');
    const [IsLodding, setIsLodding] = useState(false);

    const [startdate, setstartDate] = useState(new Date());
    const [startmode, setstartMode] = useState('date');
    const [startshow, setstartShow] = useState(false);
    const [starttext, setstarttext] = useState(true)

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

    const [enddate, setendDate] = useState(new Date());
    const [endmode, setendMode] = useState('date');
    const [endshow, setendShow] = useState(false);
    const [endtext, setendtext] = useState(true)

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
        const data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
        }
        dispatch(leadAction.LeadOwnerList(data, loginData.data.token));
    }, [isFocused])

    useEffect(() => {
        if (leadOwner) {
            if (leadOwner.status == "200") {
                let userData = leadOwner.data && leadOwner.data.map((ld) => {
                    let user = { label: ld.user.name, value: ld.id }
                    if (user !== undefined) {
                        setCampaignOwnerList([user])
                    }
                    return user;
                })
            }
            else if (leadOwner.status == "failed") {
            }
            else if (leadOwner.status == "fail") {
            }
        }
        else {
        }
    }, [leadOwner])

    useEffect(() => {
        if (responseAdd_Edit) {
            // console.log("dsfvghf.......................",responseAdd_Edit)
            if (responseAdd_Edit.status == "success") {
                setcampaignName(""),
                    setStatus(null),
                    setcampaignType(""),
                    setRevenue(""),
                    setBudgetedCost(""),
                    setDescription(""),
                    setstarttext(true),
                    setendtext(true)
                setCampaignOwner(null)
                setIsLodding(false)
                ToastAndroid.show(responseAdd_Edit.message, ToastAndroid.SHORT);
                navigation.navigate('Campaign')
            }
            else if (responseAdd_Edit.status == "failed") {
            }
            else if (responseAdd_Edit.status == "fail") {
            }
        }
        else {
        }
    }, [responseAdd_Edit])



    const AddNewCampaign = () => {
        if (campaignName == "") {
            ToastAndroid.show('Enter campaign Name', ToastAndroid.SHORT);
        }
        else if (Status == null) {
            ToastAndroid.show('Enter campaign Status', ToastAndroid.SHORT);
        }
        else {
            let formateStartDate = moment(startdate).format("YYYY-MM-DD")
            let formateEndDate = moment(enddate).format("YYYY-MM-DD")
            setIsLodding(true)
            const data = {
                uid: loginData.data.uid,
                profile_id: loginData.data.cProfile.toString(),
                org_uid: loginData.data.org_uid,
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



    return (
        <View style={{ flex: 1 }}>
            <Header
                // style={{ height: "12%" }}
                onPressLeft={() => {
                    // navigation.openDrawer()
                    navigation.goBack()
                }}
                title='Add Campaign'
                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />

            <ScrollView style={{ width: width, height: height }}>

                <View style={{ margin: '5%' }}>
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
                            labelField="label"
                            valueField="value"
                            placeholder='Campaign Owner'
                            value={CampaignOwner}
                            onChange={item => {
                                setCampaignOwner(item.value);
                            }}
                            renderLeftIcon={() => (
                                <View>
                                    <Image
                                        style={styles.icon}
                                        source={require('../../images/user.png')}
                                    />
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, {
                                height: 20, width: 18,
                            }]}
                            source={require('../../images/user.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={campaignName}
                            onChangeText={e1 => setcampaignName(e1)}
                            placeholder="Campaign Name" />
                    </View>

                    <View style={{ marginTop: '2%' }}>
                        {/* {renderLabel()} */}

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
                            placeholder="Campaign Status"
                            value={Status}
                            onChange={item => {
                                setStatus(item.value);
                            }}
                            renderLeftIcon={() => (
                                <View>
                                    <Image
                                        style={[styles.icon, { height: 22, width: 22 }]}
                                        source={require('../../images/transgender.png')}
                                    />
                                </View>
                            )}
                        />
                    </View>

                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: '#000000',
                            borderRadius: 10,
                            // marginHorizontal: '3%',
                            paddingVertical: 5,
                            marginTop: '2%'
                        }}
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
                                    minimumDate={new Date()}
                                    display="default"
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
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>Start Date</Text>
                                        :
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>{moment(startdate).format('MM/DD/YYYY')}</Text>
                                    }
                                </View>
                            }
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: '#000000',
                            borderRadius: 10,
                            // marginHorizontal: '3%',
                            paddingVertical: 5,
                            marginTop: '2%'
                        }}
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
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>End Date</Text>
                                        :
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>{moment(enddate).format('MM/DD/YYYY')}</Text>
                                    }
                                </View>
                            }
                        </View>
                    </TouchableOpacity>

                    <View style={styles.inputFields}>
                    <Image
                            style={[styles.icon, {
                                height: 27, width: 20,
                            }]}
                            source={require('../../images/list.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={campaignType}
                            onChangeText={e2 => setcampaignType(e2)}
                            placeholder="Campaign Type" />
                    </View>

                    <View style={styles.inputFields}>
                    <Image
                            style={[styles.icon, {
                                height: 27, width: 20,
                            }]}
                            source={require('../../images/list.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={Revenue}
                            keyboardType='numeric'
                            onChangeText={e3 => setRevenue(e3)}
                            placeholder="Expected Revenue" />
                    </View>

                    <View style={styles.inputFields}>
                    <Image
                            style={[styles.icon, {
                                height: 27, width: 20,
                            }]}
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
                        <Image
                            style={[styles.icon, {
                                height: 27, width: 20,
                            }]}
                            source={require('../../images/list.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={Description}
                            onChangeText={e5 => setDescription(e5)}
                            placeholder="Description" />
                    </View>



                    {IsLodding == true ?
                        <ActivityIndicator size="small" color="#0000ff" />
                        :
                        <View />}

                    <TouchableOpacity style={styles.button}
                        // onPress={() => setModalVisible2(!modalVisible2)}
                        onPress={() => AddNewCampaign()}
                    >
                        <Text style={[styles.textButton, { fontWeight: 'bold' }]}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>


        </View>
    );
}

