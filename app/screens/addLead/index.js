import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TextInput, Alert, Modal, Pressable, TouchableOpacity, ScrollView, ToastAndroid,
    StatusBar, Dimensions, ActivityIndicator,
} from 'react-native';
import styles from './styles';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../component/header/index'
import { leadAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/core"

export default function AddContact({ navigation, route }) {

    // const [LeadOwner, setLeadOwner] = useState(route.params.Edata ? null : null)
    // const [isFocus, setIsFocus] = useState(false);
    const [title, settitle] = useState("")
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [gender, setgender] = useState(null);
    const [isFocus2, setIsFocus2] = useState(false);
    const [phone, setphone] = useState("")
    const [Aphone, setAphone] = useState("")
    const [email, setemail] = useState("")
    const [Aemail, setAemail] = useState("")
    const [companyName, setcompanyName] = useState("")
    const [website, setwebsite] = useState("")
    const [fax, setfax] = useState("")
    const [Address, setAddress] = useState("")
    const [City, setCity] = useState("")
    const [State, setState] = useState(null)
    const [isFocus5, setIsFocus5] = useState(false);
    const [Country, setCountry] = useState("")
    const [ZipCode, setZipCode] = useState("")
    const [LeadSource, setLeadSource] = useState("")
    const [LeadStatus, setLeadStatus] = useState(null);
    const [isFocus3, setIsFocus3] = useState(false);
    const [Industry, setIndustry] = useState("")
    const [employee, setemployee] = useState("")
    const [revenue, setrevenue] = useState("")
    const [campaign, setcampaign] = useState(null);
    const [isFocus4, setIsFocus4] = useState(false);
    const [description, setdescription] = useState('');
    const [IsLodding, setIsLodding] = useState(false)

    // const [leadOwnerData, setleadOwnerData] = useState([])
    const [leadstatusData, setleadstatusData] = useState([])
    const [campaignData, setcampaignData] = useState([])
    const [stateData, setstateData] = useState([])
    const { width, height } = Dimensions.get('window');

    const dispatch = useDispatch()
    const isFocused = useIsFocused();

    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)
    const leadData = useSelector(state => state.leads.newLead)
    // const leadOwner = useSelector(state => state.leads.leadOwner)
    const campaignList = useSelector(state => state.leads.campaign)
    const leadstatusList = useSelector(state => state.leads.leadstatus)
    const stateList = useSelector(state => state.leads.states)
    const ZipList = useSelector(state => state.leads.ByZip)

    const [modalVisible, setModalVisible] = useState(false);

    const data = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];

    // const [date, setDate] = useState(new Date(1598051730000));
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, settext] = useState(true)

    const onChangeFrom = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate)
    };
    const showMode = (currentMode) => {
        setShow(!show);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        settext(false)
        showMode('date');
    };

    useEffect(() => {
        if (loginData || registerData && isFocused) {
            if (loginData.status == "success") {
                const data = {
                    uid: loginData.data.uid,
                    org_uid: loginData.data.org_uid,
                    profile_id: loginData.data.cProfile.toString(),
                }
                // dispatch(leadAction.LeadOwnerList(data, loginData.data.token));
                dispatch(leadAction.CampaignList(data, loginData.data.token));
                dispatch(leadAction.LeadStatusList(data, loginData.data.token));
                dispatch(leadAction.StateList(data, loginData.data.token));
            }
            else if (registerData.status == "success") {
                const data = {
                    profile_id: registerData.data.cProfile.toString(),
                    org_uid: registerData.data.org_uid,
                    uid: registerData.data.uid
                }
                // dispatch(leadAction.LeadOwnerList(data, registerData.data.token));
                dispatch(leadAction.CampaignList(data, registerData.data.token));
                dispatch(leadAction.LeadStatusList(data, registerData.data.token));
                dispatch(leadAction.StateList(data, registerData.data.token));
            }
        }
    }, [loginData, registerData, isFocused])

    useEffect(() => {
        if (ZipCode) {
            if (ZipCode.length == 6) {
                if (loginData.status == "success") {
                    const data = {
                        uid: loginData.data.uid,
                        zipcode: ZipCode
                    }
                    dispatch(leadAction.Get_By_ZipCodeList(data, loginData.data.token));
                }
                else if (registerData.status == "success") {
                    const data = {
                        uid: registerData.data.uid,
                        zipcode: ZipCode
                    }
                    dispatch(leadAction.Get_By_ZipCodeList(data, registerData.data.token));
                }
            }
            else {
                setState(null)
                setCity('')
            }
        }
        else {
        }
    }, [ZipCode])

    // useEffect(() => {
    //     if (leadOwner) {
    //         if (leadOwner.status == "200") {
    //             let userData = leadOwner.data && leadOwner.data.map((ld) => {
    //                 let user = { label: ld.user.name, value: ld.id }
    //                 return user;
    //             })
    //             setleadOwnerData(userData ? userData : [{ label: 'None', value: 'None' }])
    //         }
    //         else if (leadOwner.status == "failed") {
    //         }
    //         else if (leadOwner.status == "fail") {
    //         }
    //     }
    //     else {
    //     }
    // }, [leadOwner])

    useEffect(() => {
        if (campaignList) {
            if (campaignList.status == "200") {
                let campList = campaignList.data && campaignList.data.map((ld) => {
                    let user = { label: ld.campaign_name, value: ld.id }
                    return user;
                })
                setcampaignData(campList ? campList : [{ label: 'None', value: 'None' }])
            }
            else {

            }
        }
        else {
        }
    }, [campaignList])

    useEffect(() => {
        if (leadstatusList) {
            if (leadstatusList.status == "200") {
                setleadstatusData(leadstatusList.data.LeadStatus && leadstatusList.data.LeadStatus.map((item, index) =>
                    item ? { label: item.name, value: item.id } : { label: 'None', value: 'None' }))
            }
            else {
            }
        }
        else {
        }
    }, [leadstatusList])

    useEffect(() => {
        if (stateList) {
            // console.log("state........................",stateList)
            setstateData(stateList.states && stateList.states.map((item, index) =>
                item ? { label: item.name, value: item.name } : { label: 'None', value: 'None' }))
        }
        else {
        }
    }, [stateList])

    useEffect(() => {
        if (ZipList) {
            // console.log("dsamn...........",ZipList)
            if (ZipList.status == "success") {
                setState(ZipList.data.State)
                setCity(ZipList.data.City)
            }
            else if (ZipList.status == "failed") {
                setState(null)
                setCity('')
            }
            else if (ZipList.status == "fail") {
                setState(null)
                setCity('')
            }
        }
        else {
        }
    }, [ZipList])


    const AddLeadFuction = () => {
        if (title == "") {
            ToastAndroid.show('Enter Lead Title', ToastAndroid.SHORT);
        }
        else if (fname == "") {
            ToastAndroid.show('Enter First Name', ToastAndroid.SHORT);
        }
        else if (lname == "") {
            ToastAndroid.show('Enter Last Name', ToastAndroid.SHORT);
        }
        else if (gender == null) {
            ToastAndroid.show('select gender', ToastAndroid.SHORT);
        }
        else if (phone == "") {
            ToastAndroid.show('Enter phone Number', ToastAndroid.SHORT);
        }
        else if (Aphone == "") {
            ToastAndroid.show('Enter Alternative phone Number', ToastAndroid.SHORT);
        }
        else if (email == "") {
            ToastAndroid.show('Enter Email Id', ToastAndroid.SHORT);
        }
        else if (Country == "") {
            ToastAndroid.show('Enter Country Name', ToastAndroid.SHORT);
        }
        else {
            let formateDate = moment(date).format("YYYY-MM-DD")
            if (loginData || registerData) {
                if (loginData.status == "success") {
                    const data = {
                        profile_id: loginData.data.cProfile,
                        created_by: loginData.data.cProfile,
                        modified_by: loginData.data.cProfile,
                        org_uid: loginData.data.org_uid,
                        uid: loginData.data.uid,
                        title: title,
                        first_name: fname,
                        last_name: lname,
                        dob: formateDate,
                        gender: gender,
                        phone: phone,
                        phone2: Aphone,
                        email: email,
                        email2: Aemail,
                        company: companyName,
                        website: website,
                        fax: fax,
                        address: Address,
                        zip: ZipCode,
                        state: State,
                        city: City,
                        country: Country,
                        lead_source: LeadSource,
                        lead_status: LeadStatus,
                        industry: Industry,
                        number_of_employee: employee,
                        annual_revenue: revenue,
                        description: description,
                        campaign: campaign,
                    }
                    dispatch(leadAction.addLaed(data, loginData.data.token,));
                    setIsLodding(true)
                }
                else if (registerData.status == "success") {
                    const data = {
                        profile_id: registerData.data.cProfile,
                        created_by: registerData.data.cProfile,
                        modified_by: registerData.data.cProfile,
                        org_uid: registerData.data.org_uid,
                        uid: registerData.data.uid,
                        title: title,
                        first_name: fname,
                        last_name: lname,
                        dob: formateDate,
                        gender: gender,
                        phone: phone,
                        phone2: Aphone,
                        email: email,
                        email2: Aemail,
                        company: companyName,
                        website: website,
                        fax: fax,
                        address: Address,
                        zip: ZipCode,
                        state: State,
                        city: City,
                        country: Country,
                        lead_source: LeadSource,
                        lead_status: LeadStatus,
                        industry: Industry,
                        number_of_employee: employee,
                        annual_revenue: revenue,
                        description: description,
                        campaign: campaign,
                    }
                    dispatch(leadAction.addLaed(data, registerData.data.token,));
                    setIsLodding(true)
                }    
            }
        }
    }

    useEffect(() => {
        if (leadData) {
            if (leadData.status == "success") {
                setIsLodding(false)
                setModalVisible(true)
                setfname(''), setlname(''), settitle(''), setemail(''), setAemail(''), setgender(''), setphone(''),
                setAphone(''), setfax(''), setwebsite(''), setLeadSource(''), setLeadStatus(null), setIndustry(''),
                setemployee(''), setrevenue(''), setcompanyName(''), setAddress(''), setCity(''), setState(null), setCountry(''),
                setZipCode(''), setdescription(''), setcampaign(null),settext(true),setDate(new Date())
                navigation.navigate('lead_manager')
                dispatch(leadAction.clearResponse());
            }
            else if (leadData.status == "failed") {
                setIsLodding(false)
                ToastAndroid.show(leadData.message, ToastAndroid.SHORT);
                dispatch(leadAction.clearResponse());
            }
            else if (leadData.status == "fail") {
                setIsLodding(false)
                ToastAndroid.show(leadData.message, ToastAndroid.SHORT);
                dispatch(leadAction.clearResponse());
            }
        }
        else {
            setIsLodding(false)
        }
    }, [leadData])

    const addLeadSuccesfully = () => {
        setIsLodding(false)
        setModalVisible(!modalVisible);
        navigation.navigate('lead_manager')
    }

    return (
        <View style={{ flex: 1 }}>
            <Header
                // style={{ height: "14%" }}
                onPressLeft={() => {
                    navigation.goBack()
                }}
                title='Add Lead'
                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />

            <ScrollView style={{ width: width, height: height }}>
                <View style={{ margin: '3%', marginTop: '2%' }}>

                    {/* <View style={{ marginTop: '2%' }}>
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={leadOwnerData}
                            maxHeight={80}
                            labelField="label"
                            valueField="value"
                            placeholder='Lead Owner'
                            value={LeadOwner}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setLeadOwner(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <View>
                                    <Image
                                        style={[styles.icon, { height: 26, width: 20 }]}
                                        source={require('../../images/list.png')}
                                    />
                                </View>
                            )}
                        />
                    </View> */}

                    <View style={styles.inputFields}>
                        <Image
                            style={styles.icon}
                            source={require('../../images/user.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={title}
                            onChangeText={e1 => settitle(e1)}
                            placeholder="Lead Title" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={styles.icon}
                            source={require('../../images/user.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={fname}
                            onChangeText={e2 => setfname(e2)}
                            placeholder="First Name" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={styles.icon}
                            source={require('../../images/user.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={lname}
                            onChangeText={e3 => setlname(e3)}
                            placeholder="Last Name" />
                    </View>

                    <TouchableOpacity
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#C3C7E5',
                            borderRadius: 10,
                            paddingVertical: 11,
                            marginTop: '2%'
                        }}
                        onPress={showDatepicker} >
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={Platform.OS == 'ios' ?
                                    [styles.icon] : [styles.icon, { marginTop: '1%' }]}
                                source={require('../../images/DOB.png')}
                            />
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    style={{ paddingVertical: '5%', width: '50%', color: 'red' }}
                                    // is24Hour={true}
                                    value={date}
                                    mode={mode}
                                    display="default"
                                    onChange={onChangeFrom}
                                />
                            )}
                            {Platform.OS == 'ios' ? <View>
                                {text == true ?
                                    <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}>Date of Birth</Text>
                                    :
                                    <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}></Text>
                                }
                            </View>
                                :
                                <View>
                                    {text == true ?
                                        <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>Date of Birth</Text>
                                        :
                                        <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>{moment(date).format('MM/DD/YYYY')}</Text>
                                    }
                                </View>
                            }
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: '2%' }}>
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={data}
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder='Select Gender'
                            value={gender}
                            onFocus={() => setIsFocus2(true)}
                            onBlur={() => setIsFocus2(false)}
                            onChange={item => {
                                setgender(item.value);
                                setIsFocus2(false);
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
                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, {
                                height: 28, width: '4.8%',
                                marginRight: '3.8%'
                            }]}
                            source={require('../../images/mobile.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={phone}
                            maxLength={14}
                            keyboardType='numeric'
                            onChangeText={e5 => setphone(e5)}
                            placeholder="Enter Mobile Number" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, {
                                height: 28, width: '4.8%',
                                marginRight: '3.8%'
                            }]}
                            source={require('../../images/mobile.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={Aphone}
                            maxLength={14}
                            keyboardType='numeric'
                            onChangeText={e6 => setAphone(e6)}
                            placeholder="Alternate Mobile Number"
                        />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, {
                                height: 20, width: '7%',
                                marginRight: '1.5%'
                            }]}
                            source={require('../../images/mail.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={email}
                            onChangeText={e7 => setemail(e7)}
                            placeholder="Enter Email" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, {
                                height: 20, width: '7%',
                                marginRight: '1.5%'
                            }]}
                            source={require('../../images/mail.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={Aemail}
                            onChangeText={e8 => setAemail(e8)}
                            placeholder="Enter Alternate Email" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 22, width: '5%', marginLeft: '2.5%' }]}
                            source={require('../../images/building.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={companyName}
                            onChangeText={e9 => setcompanyName(e9)}
                            placeholder="Company Name" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 22, width: '6%', marginLeft: '2.5%' }]}
                            source={require('../../images/globe.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={website}
                            onChangeText={e10 => setwebsite(e10)}
                            placeholder="website" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 22, width: '5%', marginLeft: '2.5%' }]}
                            source={require('../../images/building.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={fax}
                            onChangeText={e11 => setfax(e11)}
                            placeholder="fax" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 26, width: '5.5%', marginRight: '3%' }]}
                            source={require('../../images/address.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={Address}
                            onChangeText={e12 => setAddress(e12)}
                            placeholder="Address" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 23, width: 23, }]}
                            source={require('../../images/info.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={ZipCode}
                            maxLength={6}
                            keyboardType='numeric'
                            onChangeText={e16 => setZipCode(e16)}
                            placeholder="Zip Code " />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 26, width: '4.5%', marginRight: '3%' }]}
                            source={require('../../images/city.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={City}
                            onChangeText={e13 => setCity(e13)}
                            placeholder="City" />
                    </View>

                    <View style={{ marginTop: '2%' }}>
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={stateData}
                            maxHeight={160}
                            labelField="label"
                            valueField="value"
                            placeholder='State'
                            value={State}
                            onFocus={() => setIsFocus5(true)}
                            onBlur={() => setIsFocus5(false)}
                            onChange={item => {
                                setState(item.value);
                                setIsFocus5(false);
                            }}
                            renderLeftIcon={() => (
                                <View>
                                    <Image
                                        style={[styles.icon, { height: 22, width: 22 }]}
                                        source={require('../../images/state.png')}
                                    />
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 23, width: 23, }]}
                            source={require('../../images/globe.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={Country}
                            onChangeText={e15 => setCountry(e15)}
                            placeholder="Country" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 19, width: 25, }]}
                            source={require('../../images/leadDetail.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={LeadSource}
                            onChangeText={e17 => setLeadSource(e17)}
                            placeholder="Lead Source" />
                    </View>

                    <View style={{ marginTop: '2%' }}>
                        {/* {renderLabel()} */}

                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={leadstatusData}
                            maxHeight={160}
                            labelField="label"
                            valueField="value"
                            placeholder='Lead Status'
                            value={LeadStatus}
                            onFocus={() => setIsFocus3(true)}
                            onBlur={() => setIsFocus3(false)}
                            onChange={item => {
                                setLeadStatus(item.value);
                                setIsFocus3(false);
                            }}
                            renderLeftIcon={() => (
                                <View>
                                    <Image
                                        style={[styles.icon, { height: 18, width: 25, marginRight: '-0.5%', marginTop: '5%' }]}
                                        source={require('../../images/leadDetail.png')}
                                    />
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 22, width: '5%', }]}
                            source={require('../../images/building.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={Industry}
                            onChangeText={e17 => setIndustry(e17)}
                            placeholder="Industry" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 23, width: 23, }]}
                            source={require('../../images/info.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={employee}
                            onChangeText={e18 => setemployee(e18)}
                            keyboardType='numeric'
                            placeholder="No. of Employee" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 23, width: 23, }]}
                            source={require('../../images/info.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={revenue}
                            keyboardType='decimal-pad'
                            onChangeText={e18 => setrevenue(e18)}
                            placeholder="Revenue" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 26, width: '5.5%', marginLeft: '2.5%' }]}
                            source={require('../../images/list.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={description}
                            onChangeText={e19 => setdescription(e19)}
                            placeholder="Description" />
                    </View>

                    <View style={{ marginTop: '2%' }}>
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={campaignData}
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder='Campaign'
                            value={campaign}
                            onFocus={() => setIsFocus4(true)}
                            onBlur={() => setIsFocus4(false)}
                            onChange={item => {
                                setcampaign(item.value);
                                setIsFocus4(false);
                            }}
                            renderLeftIcon={() => (
                                <View>
                                    <Image
                                        style={[styles.icon, { height: 26, width: 20 }]}
                                        source={require('../../images/list.png')}
                                    />
                                </View>
                            )}
                        />
                    </View>






                    {IsLodding == true ?
                        <ActivityIndicator size="small" color="#0000ff" />
                        :
                        <View />}


                    <TouchableOpacity style={[styles.button, { marginLeft: '2%', marginRight: '2%' }]}
                        onPress={() => AddLeadFuction()}
                    >
                        <Text style={[styles.textButton, { fontWeight: 'bold' }]}>Submit</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TouchableOpacity
                                    style={{ alignSelf: 'flex-end' }}
                                    onPress={() => addLeadSuccesfully()}
                                >
                                    <Image
                                        style={{ margin: '5%', marginRight: '1%', marginTop: '3%', alignSelf: 'flex-end', height: 14, width: 14 }}
                                        source={require('../../images/crossImgR.png')}
                                    />
                                </TouchableOpacity>
                                <Image
                                    source={require('../../images/checkmark-circle.png')}
                                    style={{ width: 38.75, height: 38.75 }}
                                />
                                <Text style={[styles.modalText3, { fontWeight: 'bold' }]}>Lead Updated{'\n'}Successfully</Text>
                                <Pressable
                                    style={[styles.button2, styles.buttonClose, { paddingLeft: '10%', paddingRight: '10%' }]}
                                    onPress={() => addLeadSuccesfully()}
                                >
                                    <Text style={styles.textStyle3}>OK</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>

            </ScrollView>
        </View>
    );
}

