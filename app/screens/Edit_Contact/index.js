import React, { useState, useEffect } from 'react';
import {
    ToastAndroid, Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList,
    Image, Button, ScrollView, Modal, Alert, Pressable, StatusBar, Dimensions, ActivityIndicator
} from 'react-native';
import styles from './styles';
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../../component/header';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { editContactAction, leadAction, campaignAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/core"

export default function EditContact({ navigation, route }) {

    const [LeadOwner, setLeadOwner] = useState(route.params.Edata ? route.params.Edata.title : null)
    const [isFocus3, setIsFocus3] = useState(false);
    const [title, settitle] = useState(route.params.Edata ? route.params.Edata.title : "")
    const [fname, setfname] = useState(route.params.Edata ? route.params.Edata.first_name : "")
    const [lname, setlname] = useState(route.params.Edata ? route.params.Edata.last_name : "")
    const [dateB, setdateB] = useState(route.params.Edata ? route.params.Edata.dob : "")
    const [gender, setgender] = useState(route.params.Edata ? route.params.Edata.gender : null);
    const [isFocus, setIsFocus] = useState(false);
    const [phone, setphone] = useState(route.params.Edata ? route.params.Edata.phone : "")
    const [Aphone, setAphone] = useState(route.params.Edata ? route.params.Edata.phone2 : "")
    const [email, setemail] = useState(route.params.Edata ? route.params.Edata.email : "")
    const [Aemail, setAemail] = useState(route.params.Edata ? route.params.Edata.email2 : "")
    const [companyName, setcompanyName] = useState(route.params.Edata ? route.params.Edata.company : "")
    const [website, setwebsite] = useState(route.params.Edata ? route.params.Edata.website : "")
    const [fax, setfax] = useState(route.params.Edata ? route.params.Edata.fax : "")
    const [Address, setAddress] = useState(route.params.Edata ? route.params.Edata.address : "")
    const [City, setCity] = useState(route.params.Edata ? route.params.Edata.city : "")
    const [State, setState] = useState(route.params.Edata ? route.params.Edata.state : null)
    const [isFocus5, setIsFocus5] = useState(false);
    const [Country, setCountry] = useState(route.params.Edata ? route.params.Edata.country : "")
    const [ZipCode, setZipCode] = useState(route.params.Edata ? route.params.Edata.zip : "")
    const [LeadSource, setLeadSource] = useState(route.params.Edata ? route.params.Edata.lead_source : "")
    const [LeadStatus, setLeadStatus] = useState(route.params.Edata ? route.params.Edata.lead_status : null);
    const [isFocus2, setIsFocus2] = useState(false);
    const [Industry, setIndustry] = useState(route.params.Edata ? route.params.Edata.industry : "")
    const [employee, setemployee] = useState(route.params.Edata ? route.params.Edata.number_of_employee : "")
    const [revenue, setrevenue] = useState(route.params.Edata ? route.params.Edata.annual_revenue : "")
    const [Campagin, setCampagin] = useState(route.params.Edata ? route.params.Edata.campaign : null);
    const [isFocus1, setIsFocus1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [IsLodding, setIsLodding] = useState(false)

    const { width, height } = Dimensions.get('window');

    const [leadOwnerData, setleadOwnerData] = useState([])
    const [leadstatusData, setleadstatusData] = useState([])
    const [campaignData, setcampaignData] = useState([])
    const [stateData, setstateData] = useState([])

    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)
    const leadOwner = useSelector(state => state.leads.leadOwner)
    const campaignList = useSelector(state => state.leads.campaign)
    const leadstatusList = useSelector(state => state.leads.leadstatus)
    const stateList = useSelector(state => state.leads.states)
    const ZipList = useSelector(state => state.leads.ByZip)

    const Data = useSelector(state => state.ManuallyAddContact.EditedData)

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, settext] = useState(true)


    const onChangeFrom = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate)
        // let formattedDate = moment(currentDate).format('YYYY-MM-DD');
    };
    const showMode = (currentMode) => {
        setShow(!show);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        // setFollowDate(false)
        settext(false)
        showMode('date');
    };

    const data = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];

    useEffect(() => {
        if (loginData || registerData && isFocused) {
            if (loginData.status == "success") {
                const data = {
                    uid: loginData.data.uid,
                    org_uid: loginData.data.org_uid,
                    profile_id: loginData.data.cProfile.toString(),
                }
                dispatch(leadAction.LeadOwnerList(data, loginData.data.token));
                dispatch(campaignAction.CampaignList(data, loginData.data.token));
                dispatch(leadAction.LeadStatusList(data, loginData.data.token));
                dispatch(leadAction.StateList(data, loginData.data.token));
            }
            else if (registerData.status == "success") {
                const data = {
                    profile_id: registerData.data.cProfile.toString(),
                    org_uid: registerData.data.org_uid,
                    uid: registerData.data.uid
                }
                dispatch(leadAction.LeadOwnerList(data, registerData.data.token));
                dispatch(campaignAction.CampaignList(data, registerData.data.token));
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

    useEffect(() => {
        if (stateList) {
            setstateData(stateList.states && stateList.states.map((item, index) =>
                item ? { label: item.name, value: item.name } : { label: 'None', value: 'None' }))
        }
        else {
        }
    }, [stateList])

    useEffect(() => {
        if (ZipList) {
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

    useEffect(() => {
        if (leadOwner) {
            if (leadOwner.status == "200") {
                let userData = leadOwner.data && leadOwner.data.map((ld) => {
                    let user = { label: ld.user.name, value: ld.user.id }
                    if (user !== undefined) {
                        setleadOwnerData([user])
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
        if (campaignList) {
            if (campaignList.status == "200") {
                let campList = campaignList.data && campaignList.data.map((ld) => {
                    let user = { label: ld.campaign_name, value: ld.id }
                    return user;
                })
                setcampaignData(campList ? campList : [{ label: 'None', value: 'None' }])
            }
            else if (campaignList.status == "failed") {
            }
            else if (campaignList.status == "fail") {
            }
        }
        else {
        }
    }, [campaignList])


    useEffect(() => {
        if (leadstatusList) {
            if (leadstatusList.status == "200") {
                setleadstatusData(leadstatusList.data.LeadStatus && leadstatusList.data.LeadStatus.map((item, index) =>
                    item ? { label: item.name, value: item.id } : { lable: 'None', value: '0' }))
            }
            else if (leadstatusList.status == "failed") {
            }
            else if (leadstatusList.status == "fail") {
            }
        }
        else {
        }
    }, [leadstatusList])

    const AddContactFuction = () => {
        if (title == "") {
            ToastAndroid.show('Enter Contact Title', ToastAndroid.SHORT);
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
        else {
            let formateDate = moment(date).format("YYYY-MM-DD")
            if (loginData || registerData) {
                if (loginData.status == "success") {
                    setIsLodding(true)
                    const data = {
                        profile_id: loginData.data.cProfile.toString(),
                        created_by: loginData.data.cProfile.toString(),       //profile id 
                        modified_by: loginData.data.cProfile.toString(),      //profile id 
                        org_uid: loginData.data.org_uid,
                        contact_id: route.params.Edata.id,
                        first_name: fname, last_name: lname, title: title, email: email, email2: Aemail, dob: formateDate, gender: gender,
                        phone2: Aphone, fax: fax, website: website, lead_source: LeadSource, lead_status: LeadStatus, industry: Industry,
                        phone: phone, number_of_employee: employee, annual_revenue: revenue, company: companyName, address: Address,
                        city: City, state: State, country: Country, zip: ZipCode,
                    }
                    dispatch(editContactAction.EditContact(data, loginData.data.token));
                }
                else if (registerData.status == "success") {
                    setIsLodding(true)
                    const data = {
                        profile_id: registerData.data.cProfile.toString(),
                        created_by: registerData.data.cProfile.toString(),       //profile id 
                        modified_by: registerData.data.cProfile.toString(),      //profile id 
                        org_uid: registerData.data.org_uid,
                        contact_id: route.params.Edata.id,
                        first_name: fname, last_name: lname, title: title, email: email, email2: Aemail, dob: formateDate, gender: gender,
                        phone2: Aphone, fax: fax, website: website, lead_source: LeadSource, lead_status: LeadStatus, industry: Industry,
                        phone: phone, number_of_employee: employee, annual_revenue: revenue, company: companyName, address: Address,
                        city: City, state: State, country: Country, zip: ZipCode,
                    }
                    dispatch(editContactAction.EditContact(data, registerData.data.token));
                }
            }
        }
    }

    useEffect(() => {
        if (Data) {
            if (Data.status == "success") {
                ToastAndroid.show(Data.message, ToastAndroid.SHORT);
                setIsLodding(false)
                dispatch(editContactAction.clearResponse());
                navigation.goBack()
            }
            else if (Data.status == "failed") {
                setIsLodding(false)
                ToastAndroid.show(Data.message, ToastAndroid.SHORT);
            }
            else if (Data.status == "fail") {
                setIsLodding(false)
                ToastAndroid.show(Data.message, ToastAndroid.SHORT);
            }
            else {
                setIsLodding(false)
            }
        }
        else {
        }
    }, [Data])

    return (
        <View style={{ flex: 1 }}>
            <Header
                onPressLeft={() => {
                    //   navigation.openDrawer()
                    navigation.goBack()
                }}
                title='Edit Contact'
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
                            data={leadOwnerData}
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder='Lead Owner'
                            value={LeadOwner}
                            onFocus={() => setIsFocus3(true)}
                            onBlur={() => setIsFocus3(false)}
                            onChange={item => {
                                setLeadOwner(item.value);
                                setIsFocus3(false);
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
                            value={title}
                            onChangeText={e1 => settitle(e1)}
                            placeholder="Contact Title" />
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
                            value={fname}
                            onChangeText={e2 => setfname(e2)}
                            placeholder="First Name" />
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
                                    style={{ paddingVertical: '5%', width: '50%' }}
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
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setgender(item.value);
                                setIsFocus(false);
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
                            style={[styles.icon, { height: 28, width: '5.2%', marginRight: '3.8%' }]}
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
                            style={[styles.icon, { height: 28, width: '5.2%', marginRight: '3.8%' }]}
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
                                height: 18, width: '7%',
                                marginRight: '1.5%', marginTop: '4%'
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
                                height: 18, width: '7%',
                                marginRight: '1.5%', marginTop: '4%'
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
                            style={[styles.icon, { height: 23, width: '6%', marginLeft: '2.5%' }]}
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
                            style={[styles.icon, { height: 23, width: '6%', marginLeft: '2.5%' }]}
                            source={require('../../images/building.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={website}
                            onChangeText={e10 => setwebsite(e10)}
                            placeholder="website" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 23, width: '6%', marginLeft: '2.5%' }]}
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
                            style={[styles.icon, { height: 26, width: '6%', marginRight: '3%' }]}
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
                            style={[styles.icon, { height: 23, width: 23, marginTop: '3%' }]}
                            source={require('../../images/info.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={ZipCode}
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
                                console.log("value of ............", item)
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
                            style={[styles.icon, { height: 23, width: 23, marginTop: '3%' }]}
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
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            iconStyle={styles.iconStyle3}
                            data={leadstatusData}
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder='Lead Status'
                            value={LeadStatus}
                            onFocus={() => setIsFocus2(true)}
                            onBlur={() => setIsFocus2(false)}
                            onChange={item => {
                                setLeadStatus(item.value);
                                setIsFocus2(false);
                            }}
                            renderLeftIcon={() => (

                                <View>
                                    <Image
                                        style={[styles.icon, { height: 19, width: 25, }]}
                                        source={require('../../images/leadDetail.png')}
                                    />
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 23, width: '6%', marginLeft: '2.5%' }]}
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
                            style={[styles.icon, { height: 23, width: 23, marginTop: '3%' }]}
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
                            style={[styles.icon, { height: 23, width: 23, marginTop: '3%' }]}
                            source={require('../../images/info.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={revenue}
                            keyboardType='decimal-pad'
                            onChangeText={e18 => setrevenue(e18)}
                            placeholder="Revenue" />
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
                            placeholder='Select a Campagin'
                            value={Campagin}
                            onFocus={() => setIsFocus1(true)}
                            onBlur={() => setIsFocus1(false)}
                            onChange={item => {
                                setCampagin(item.value);
                                setIsFocus1(false);
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

                    <TouchableOpacity style={[styles.button, { marginHorizontal: '2%' }]}
                        // onPress={() => setModalVisible2(!modalVisible2)}
                        onPress={() => AddContactFuction()}
                    >
                        <Text style={[styles.textButton, { fontWeight: 'bold', fontSize: 18 }]}>Update</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

