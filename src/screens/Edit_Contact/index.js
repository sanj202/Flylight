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

    const [LeadOwner, setLeadOwner] = useState(null)
    const [title, settitle] = useState("")
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [gender, setgender] = useState(null);
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
    const [Country, setCountry] = useState("")
    const [ZipCode, setZipCode] = useState("")
    const [LeadSource, setLeadSource] = useState("")
    const [LeadStatus, setLeadStatus] = useState(null);
    const [Industry, setIndustry] = useState("")
    const [employee, setemployee] = useState("")
    const [revenue, setrevenue] = useState("")
    const [Campagin, setCampagin] = useState(null);
    const [IsLodding, setIsLodding] = useState(false)
    const { width, height } = Dimensions.get('window');
    const [leadOwnerData, setleadOwnerData] = useState([])
    const [leadstatusData, setleadstatusData] = useState([])
    const [campaignData, setcampaignData] = useState([])
    const [stateData, setstateData] = useState([])
    const dispatch = useDispatch()
    const loginData = useSelector(state => state.auth.data)
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
        if (event.type == 'dismissed') {
            setShow(!show);
        }
        else {
            const currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            setDate(currentDate)
            settext(false)
        }
    };
    const showMode = (currentMode) => {
        setShow(!show);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const data = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
    ];
    useEffect(() => {
        const data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
        }
        dispatch(leadAction.LeadOwnerList(data, loginData.data.token));
        dispatch(campaignAction.CampaignList(data, loginData.data.token));
        dispatch(leadAction.LeadStatusList(data, loginData.data.token));
        dispatch(leadAction.StateList(data, loginData.data.token));
    }, [])
    useEffect(() => {
        setLeadOwner(route.params.Edata ? route.params.Edata.title : null)
        settitle(route.params.Edata ? route.params.Edata.title : "")
        setfname(route.params.Edata ? route.params.Edata.first_name : "")
        setlname(route.params.Edata ? route.params.Edata.last_name : "")
        setgender(route.params.Edata ? route.params.Edata.gender : null);
        setphone(route.params.Edata ? route.params.Edata.phone : "")
        setAphone(route.params.Edata ? route.params.Edata.phone2 : "")
        setemail(route.params.Edata ? route.params.Edata.email : "")
        setAemail(route.params.Edata ? route.params.Edata.email2 : "")
        setcompanyName(route.params.Edata ? route.params.Edata.company : "")
        setwebsite(route.params.Edata ? route.params.Edata.website : "")
        setfax(route.params.Edata ? route.params.Edata.fax : "")
        setAddress(route.params.Edata ? route.params.Edata.address : "")
        setCity(route.params.Edata ? route.params.Edata.city : "")
        setState(route.params.Edata ? route.params.Edata.state : null)
        setCountry(route.params.Edata ? route.params.Edata.country : "")
        setZipCode(route.params.Edata ? route.params.Edata.zip : "")
        setLeadSource(route.params.Edata ? route.params.Edata.lead_source : "")
        setLeadStatus(route.params.Edata ? route.params.Edata.lead_status : null);
        setIndustry(route.params.Edata ? route.params.Edata.industry : "")
        setemployee(route.params.Edata ? route.params.Edata.number_of_employee : "")
        setrevenue(route.params.Edata ? route.params.Edata.annual_revenue : "")
        setCampagin(route.params.Edata ? route.params.Edata.campaign : null);
        setDate(route.params.Edata ? new Date(route.params.Edata.dob) : new Date());
        settext(route.params.Edata ? route.params.Edata.dob ? false : true : true)
    }, [route.params])
    useEffect(() => {
        if (ZipCode) {
            if (ZipCode.length == 6) {
                const data = {
                    uid: loginData.data.uid,
                    zipcode: ZipCode
                }
                dispatch(leadAction.Get_By_ZipCodeList(data, loginData.data.token));
            }
            else {
                setState(null)
                setCity('')
            }
        }
    }, [ZipCode])
    useEffect(() => {
        if (stateList) {
            setstateData(stateList.states && stateList.states.map((item, index) =>
                item ? { label: item.name, value: item.name } : { label: 'None', value: 'None' }))
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
        // else if (Aphone == "") {
        //     ToastAndroid.show('Enter Alternative phone Number', ToastAndroid.SHORT);
        // }
        else if (email == "") {
            ToastAndroid.show('Enter Email Id', ToastAndroid.SHORT);
        }
        else {
            let formateDate = moment(date).format("YYYY-MM-DD")
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
                city: City, state: State, country: Country, zip: ZipCode, campaign: Campagin
            }
            dispatch(editContactAction.EditContact(data, loginData.data.token));
        }
    }
    useEffect(() => {
        if (Data) {
            if (Data.status == "success") {
                ToastAndroid.show(Data.message, ToastAndroid.SHORT);
                setIsLodding(false)
                dispatch(editContactAction.clearResponse());
                navigation.navigate('ContactStack')
                // setfname(''),setlname(''), settitle(''),setemail(''), setAemail(''),setgender(null),
                // setAphone(''),setfax(''),setwebsite(''),setLeadSource(''),setLeadStatus(null),setIndustry(''),
                // setphone(''),setemployee(''),setrevenue(''),setcompanyName(''),setAddress(''),
                // setCity(''),setState(null),setCountry(''),setZipCode(''),setDate(new Date()) ,settext(true),setCampagin(null)
            }
            else if (Data.status == "failed") {
                setIsLodding(false)
                ToastAndroid.show(Data.message, ToastAndroid.SHORT);
            }
        }
    }, [Data])
    return (
        <View style={{ flex: 1 }}>
            <Header onPressLeft={() => { navigation.openDrawer() }}
                title='Edit Contact'
                onPressRight={() => { navigation.navigate('Notification') }}
            />
            <ScrollView style={{ flex: 1, marginVertical: '2%', marginHorizontal: '3%' }}>
                <View style={{ marginTop: '2%' }}>
                    <Dropdown
                        style={styles.dropdown3}
                        placeholderStyle={styles.placeholderStyle3}
                        selectedTextStyle={styles.selectedTextStyle3}
                        iconStyle={styles.iconStyle3}
                        data={leadOwnerData}
                        search={true}
                        searchPlaceholder='Search'
                        maxHeight={160}
                        labelField="label"
                        valueField="value"
                        placeholder='Lead Owner'
                        value={LeadOwner}
                        onChange={item => { setLeadOwner(item.value); }}
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
                    {!title.length ?
                        <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                        : null}
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
                    {!fname.length ?
                        <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                        : null}
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
                    {!lname.length ?
                        <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                        : null}
                </View>
                <TouchableOpacity style={styles.pickerStyle} onPress={showDatepicker} >
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={Platform.OS == 'ios' ?
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
                                maximumDate={new Date(moment().subtract(20, "years"))}
                                display="default"
                                onChange={onChangeFrom}
                            />
                        )}
                        {Platform.OS == 'ios' ? <View>
                            {text == true ?
                                <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000' }}>Date of Birth</Text>
                                :
                                null
                            }
                        </View>
                            :
                            <View>
                                {text == true ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>Date of Birth</Text>
                                        <Text style={{ fontSize: 15, color: 'red' }}>*</Text>
                                    </View>
                                    :
                                    <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>{moment(date).format('MM/DD/YYYY')}</Text>
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
                        search={true}
                        searchPlaceholder='Search'
                        maxHeight={160}
                        labelField="label"
                        valueField="value"
                        placeholder='Select Gender'
                        value={gender}
                        onChange={item => {
                            setgender(item.value);
                        }}
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
                                {gender == null ?
                                    <Text style={{ fontSize: 15, marginTop: '-350%', color: 'red' }}>*</Text>
                                    : null}
                            </View>
                        )}
                    />
                </View>
                <View style={styles.inputFields}>
                    <Image style={[styles.icon, { height: 28, width: '5.2%', marginRight: '3.8%' }]}
                        source={require('../../images/mobile.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={phone}
                        maxLength={14}
                        keyboardType='numeric'
                        onChangeText={e5 => setphone(e5)}
                        placeholder="Enter Mobile Number" />
                    {!phone.length ?
                        <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                        : null}
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
                    {!email.length ?
                        <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                        : null}
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
                        search={true}
                        searchPlaceholder='Search'
                        value={State}
                        onChange={item => {
                            // console.log("value of ............", item)
                            setState(item.value);
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
                        maxHeight={160}
                        search={true}
                        searchPlaceholder='Search'
                        labelField="label"
                        valueField="value"
                        placeholder='Lead Status'
                        value={LeadStatus}
                        onChange={item => {
                            setLeadStatus(item.value);
                        }}
                        renderLeftIcon={() => (

                            <View>
                                <Image
                                    style={[styles.icon, { height: 19, width: 25, }]}
                                    source={require('../../images/leadDetail.png')}
                                />
                            </View>
                        )}
                        renderRightIcon={() => (
                            <View>
                                {LeadStatus == null ?
                                    <Text style={{ fontSize: 15, marginTop: '-350%', color: 'red' }}>*</Text>
                                    : null}
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
                        maxHeight={160}
                        search={true}
                        searchPlaceholder='Search'
                        labelField="label"
                        valueField="value"
                        placeholder='Select a Campagin'
                        value={Campagin}
                        onChange={item => {
                            setCampagin(item.value);
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
                {IsLodding == true ? <ActivityIndicator size="small" color="#0000ff" /> : null}
                <TouchableOpacity style={[styles.button, { marginHorizontal: '2%' }]}
                    onPress={() => AddContactFuction()}>
                    <Text style={[styles.textButton, { fontWeight: 'bold', fontSize: 18 }]}>Update</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

