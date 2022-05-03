import React, { useState, useEffect } from 'react';
import {View, Text, Image, TextInput, Alert, Modal, Pressable, TouchableOpacity, ScrollView, ToastAndroid,
    StatusBar, Dimensions, ActivityIndicator,} from 'react-native';
import styles from './styles';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../component/header/index'
import { leadAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import navigationStrings from '../../constant/navigationStrings';
export default function EditLead({ navigation, route }) {
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
    const [campaign, setcampaign] = useState(null);
    const [description, setdescription] = useState('');
    const [IsLodding, setIsLodding] = useState(false)
    const [leadstatusData, setleadstatusData] = useState([])
    const [campaignData, setcampaignData] = useState([])
    const [stateData, setstateData] = useState([])
    const { width, height } = Dimensions.get('window');
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const leadData = useSelector(state => state.leads.newLead)
    const campaignList = useSelector(state => state.leads.campaign)
    const leadstatusList = useSelector(state => state.leads.leadstatus)
    const stateList = useSelector(state => state.leads.states)
    const ZipList = useSelector(state => state.leads.ByZip)
    const [modalVisible, setModalVisible] = useState(false);
    const data = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];
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
        setIsLodding(true)
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
        setcampaign(route.params.Edata ? route.params.Edata.campaign : null);
        setdescription(route.params.Edata ? route.params.Edata.description : '');
        setDate(route.params.Edata ? new Date(route.params.Edata.dob) : new Date())
        settext(route.params.Edata.dob ? false : true)
        setIsLodding(false)
    }, [route.params])

    useEffect(() => {
        const data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
        }
        // dispatch(leadAction.LeadOwnerList(data, loginData.data.token));
        dispatch(leadAction.CampaignList(data, loginData.data.token));
        dispatch(leadAction.LeadStatusList(data, loginData.data.token));
        dispatch(leadAction.StateList(data, loginData.data.token));
    }, [isFocused])

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
            if (campaignList.status == "success") {
                setcampaignData(campaignList.data.rows)
            }
            else {

            }
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
    }, [leadstatusList])

    useEffect(() => {
        if (stateList) {
            // console.log("state........................",stateList)
            setstateData(stateList.states && stateList.states.map((item, index) =>
                item ? { label: item.name, value: item.name } : { label: 'None', value: 'None' }))
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
        // else if (Aphone == "") {
        //     ToastAndroid.show('Enter Alternative phone Number', ToastAndroid.SHORT);
        // }
        else if (email == "") {
            ToastAndroid.show('Enter Email Id', ToastAndroid.SHORT);
        }
        else if (Country == "") {
            ToastAndroid.show('Enter Country Name', ToastAndroid.SHORT);
        }
        else {
            let formateDate = moment(date).format("YYYY-MM-DD")
            const data = {
                profile_id: loginData.data.cProfile,
                created_by: loginData.data.cProfile,
                modified_by: loginData.data.cProfile,
                org_uid: loginData.data.org_uid,
                uid: loginData.data.uid,
                lead_id: route.params.Edata.id, first_name: fname, last_name: lname, title: title, email: email,
                email2: Aemail, dob: formateDate, gender: gender, phone: phone, phone2: Aphone, fax: fax, website: website,
                lead_source: LeadSource, lead_status: LeadStatus, industry: Industry, number_of_employee: employee,
                annual_revenue: revenue, company: companyName, address: Address, city: City, state: State, country: Country,
                zip: ZipCode, description: description, campaign: campaign,
            }
            dispatch(leadAction.addLaed(data, loginData.data.token,));
            // }
            // else {
            //     const data = {
            //         profile_id: loginData.data.cProfile,
            //         created_by: loginData.data.cProfile,
            //         modified_by: loginData.data.cProfile,
            //         org_uid: loginData.data.org_uid,
            //         uid: loginData.data.uid, first_name: fname, last_name: lname, title: title, email: email, email2: Aemail,
            //         dob: formateDate, gender: gender, phone: phone, phone2: Aphone, fax: fax, website: website, lead_source: LeadSource,
            //         lead_status: LeadStatus, industry: Industry, number_of_employee: employee, annual_revenue: revenue, company: companyName, address: Address, city: City,
            //         state: State, country: Country, zip: ZipCode, description: description, campaign: campaign,
            //     }
            //     dispatch(leadAction.addLaed(data, loginData.data.token,));
            //     // setfname(''), setlname(''), settitle(''), setemail(''), setAemail(''), setgender(''), setphone(''),
            //     //     setAphone(''), setfax(''), setwebsite(''), setLeadSource(''), setLeadStatus(null), setIndustry(''),
            //     //     setemployee(''), setrevenue(''), setcompanyName(''), setAddress(''), setCity(''), setState(null), setCountry(''),
            //     //     setZipCode(''), setdescription(''), setcampaign(null)
            // }
            setIsLodding(true)
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
                    setZipCode(''), setdescription(''), setcampaign(null), settext(true), setDate(new Date())
                navigation.navigate(navigationStrings.lead_manager)
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
    }, [leadData])

    const addLeadSuccesfully = () => {
        setIsLodding(false)
        setModalVisible(!modalVisible);
        navigation.navigate(navigationStrings.lead_manager)
    }

    return (
        <View style={{ flex: 1 }}>
            <Header onPressLeft={() => { navigation.openDrawer() }}
                title='Edit Lead'
                onPressRight={() => { navigation.navigate('Notification') }}
            />
            <ScrollView style={{ flex: 1, marginBottom: '2%', marginHorizontal: '3%' }}>
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
                    {!title.length ?
                        <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                        : null}
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
                    {!fname.length ?
                        <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                        : null}
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
                    {!lname.length ?
                        <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                        : null}
                </View>

                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: '#000000',
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
                    {!phone.length ?
                        <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                        : null}
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
                    {!email.length ?
                        <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                        : null}
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
                        search={true}
                        searchPlaceholder='Search'
                        maxHeight={160}
                        labelField="label"
                        valueField="value"
                        placeholder='State'
                        value={State}
                        onChange={item => {
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
                        search={true}
                        searchPlaceholder='Search'
                        maxHeight={160}
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
                                    style={[styles.icon, { height: 18, width: 25, marginRight: '-0.5%', marginTop: '5%' }]}
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
                        style={[styles.icon, { height: 26, width: '5%', marginLeft: '2.5%' }]}
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
                        search={true}
                        searchPlaceholder='Search'
                        maxHeight={160}
                        labelField="campaign_name"
                        valueField="id"
                        placeholder='Campaign'
                        value={campaign}
                        onChange={item => {
                            setcampaign(item.id);
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


                <TouchableOpacity style={[styles.button, { marginHorizontal: '5%', marginBottom: '5%' }]}
                    onPress={() => AddLeadFuction()}
                >
                    <Text style={[styles.textButton, { fontWeight: 'bold' }]}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
            {/* <View style={styles.centeredView}> */}
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
            {/* </View> */}
        </View>
    );
}

