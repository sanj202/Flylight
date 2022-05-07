import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TextInput, Alert, Modal, Pressable, TouchableOpacity, ScrollView, ToastAndroid,
    StatusBar, Dimensions, ActivityIndicator
} from 'react-native';
import styles from './styles';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../component/header/index'
import { leadAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import navigationStrings from '../../constant/navigationStrings';
export default function AddLead({ navigation, route }) {
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
    const [Country, setCountry] = useState("India")
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
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
    ];
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, settext] = useState(true)

    useEffect(() => {
        const data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString()
        }
        isFocused ? dispatch(leadAction.CampaignList(data, loginData.data.token)) : null
        isFocused ? dispatch(leadAction.LeadStatusList(data, loginData.data.token)) : null
        isFocused ? dispatch(leadAction.StateList(data, loginData.data.token)) : null
    }, [isFocused])
    useEffect(() => {
        if (ZipCode) {
            if (ZipCode.length == 6) {
                const data = { uid: loginData.data.uid, zipcode: ZipCode }
                dispatch(leadAction.Get_By_ZipCodeList(data, loginData.data.token));
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
        if (campaignList) {
            if (campaignList.status == "success") {
                setcampaignData(campaignList.data.rows)
            }
            else if (campaignList.status == "failed") {
                ToastAndroid.show(campaignList.message, ToastAndroid.SHORT);
            }
        }
    }, [campaignList])
    useEffect(() => {
        if (leadstatusList) {
            if (leadstatusList.status == "200") {
                setleadstatusData(leadstatusList.data.LeadStatus)
            }
            else if (leadstatusList.status == "fail") {
                ToastAndroid.show(leadstatusList.message, ToastAndroid.SHORT);
            }
        }
    }, [leadstatusList])
    useEffect(() => {
        if (stateList) {
            setstateData(stateList.states)
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
        }
    }, [ZipList])
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
                title='Add Lead'
                onPressRight={() => { navigation.navigate('Notification') }}
            />
            <ScrollView style={{ flex: 1, marginBottom: '2%', marginHorizontal: '3%' }}>
                <View style={styles.inputFields}>
                    <Image style={styles.icon}
                        source={require('../../images/user.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
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
                        style={{ flex: 1, marginRight: '3%' }}
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
                        style={{ flex: 1, marginRight: '3%' }}
                        value={lname}
                        onChangeText={e3 => setlname(e3)}
                        placeholder="Last Name" />
                    {!lname.length ?
                        <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                        : null}
                </View>
                <TouchableOpacity style={[styles.inputFields, { alignItems: 'center' }]} onPress={showDatepicker}>
                    <Image
                        style={Platform.OS == 'ios' ?
                            [styles.icon] : [styles.icon, { height: height * 3.1 / 100 }]}
                        source={require('../../images/DOB.png')}
                    />
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            style={{ paddingVertical: '5%', width: '50%', color: 'red' }}
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
                                    <Text style={{ fontSize: 12, width: '90%', color: '#000000', marginLeft: '2%' }}>Date of Birth</Text>
                                    <Text style={{ fontSize: 15, color: 'red', marginTop: '-3%' }}>*</Text>
                                </View>

                                :
                                <Text style={{ fontSize: 12, color: '#000000', marginLeft: '10%' }}>{moment(date).format('MM/DD/YYYY')}</Text>
                            }
                        </View>
                    }
                </TouchableOpacity>
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
                <View style={styles.inputFields}>
                    <Image style={[styles.icon, { height: height * 3.5 / 100, width: width * 4.3 / 100, }]}
                        source={require('../../images/mobile.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
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
                    <Image style={[styles.icon, { height: height * 3.5 / 100, width: width * 4.3 / 100, }]}
                        source={require('../../images/mobile.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
                        value={Aphone}
                        maxLength={14}
                        keyboardType='numeric'
                        onChangeText={e6 => setAphone(e6)}
                        placeholder="Alternate Mobile Number"
                    />
                </View>
                <View style={styles.inputFields}>
                    <Image
                        style={[styles.icon, { width: width * 6.2 / 100, height: height * 2.5 / 100, marginVertical: '4.5%' }]}
                        source={require('../../images/mail.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
                        value={email}
                        onChangeText={e7 => setemail(e7)}
                        placeholder="Enter Email" />
                    {!email.length ?
                        <Text style={{ fontSize: 15, marginRight: '2%', color: 'red' }}>*</Text>
                        : null}
                </View>
                <View style={styles.inputFields}>
                    <Image
                        style={[styles.icon, { width: width * 6.2 / 100, height: height * 2.5 / 100, marginVertical: '4.5%' }]}
                        source={require('../../images/mail.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
                        value={Aemail}
                        onChangeText={e8 => setAemail(e8)}
                        placeholder="Enter Alternate Email" />
                </View>
                <View style={styles.inputFields}>
                    <Image
                        style={styles.icon}
                        source={require('../../images/building.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
                        value={companyName}
                        onChangeText={e9 => setcompanyName(e9)}
                        placeholder="Company Name" />
                </View>
                <View style={styles.inputFields}>
                    <Image
                        style={[styles.icon, { marginVertical: '3.5%', width: width * 6 / 100 }]}
                        source={require('../../images/globe.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
                        value={website}
                        onChangeText={e10 => setwebsite(e10)}
                        placeholder="website" />
                </View>
                <View style={styles.inputFields}>
                    <Image
                        style={styles.icon}
                        source={require('../../images/building.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
                        value={fax}
                        onChangeText={e11 => setfax(e11)}
                        placeholder="fax" />
                </View>
                <View style={styles.inputFields}>
                    <Image
                        style={[styles.icon, { marginVertical: '3.8%', width: width * 6.2 / 100 }]}
                        source={require('../../images/info.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
                        value={ZipCode}
                        maxLength={6}
                        keyboardType='numeric'
                        onChangeText={e16 => setZipCode(e16)}
                        placeholder="Zip Code " />
                </View>
                <View style={styles.inputFields}>
                    <Image
                        style={[styles.icon, { height: height * 4 / 100, width: width * 4.5 / 100, marginRight: '3%' }]}
                        source={require('../../images/city.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
                        value={City}
                        onChangeText={e13 => setCity(e13)}
                        placeholder="City" />
                </View>
                <Dropdown
                    style={styles.dropdown3}
                    placeholderStyle={styles.placeholderStyle3}
                    selectedTextStyle={styles.selectedTextStyle3}
                    iconStyle={styles.iconStyle3}
                    data={stateData}
                    search={true}
                    searchPlaceholder='Search'
                    maxHeight={160}
                    labelField="name"
                    valueField="name"
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
                <View style={styles.inputFields}>
                    <Image
                        style={[styles.icon, { width: width * 6 / 100, marginVertical: '3.5%' }]}
                        source={require('../../images/globe.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
                        value={Country}
                        onChangeText={e15 => setCountry(e15)}
                        placeholder="Country" />
                </View>
                <View style={styles.inputFields}>
                    <Image
                        style={[styles.icon, { height: height * 2.5 / 100, width: width * 7.2 / 100, marginTop: '4%' }]}
                        source={require('../../images/leadDetail.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
                        value={LeadSource}
                        onChangeText={e17 => setLeadSource(e17)}
                        placeholder="Lead Source" />
                </View>
                <Dropdown
                    style={styles.dropdown3}
                    placeholderStyle={styles.placeholderStyle3}
                    selectedTextStyle={styles.selectedTextStyle3}
                    iconStyle={styles.iconStyle3}
                    data={leadstatusData}
                    search={true}
                    searchPlaceholder='Search'
                    maxHeight={160}
                    labelField="name"
                    valueField="id"
                    placeholder='Lead Status'
                    value={LeadStatus}
                    onChange={item => {
                        setLeadStatus(item.id);
                    }}
                    renderLeftIcon={() => (
                        <View>
                            <Image
                                style={[styles.icon, { height: height * 2.5 / 100, width: width * 7.2 / 100, marginRight: '-0.5%', }]}
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
                <View style={styles.inputFields}>
                    <Image
                        style={styles.icon}
                        source={require('../../images/building.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
                        value={Industry}
                        onChangeText={e17 => setIndustry(e17)}
                        placeholder="Industry" />
                </View>
                <View style={styles.inputFields}>
                    <Image
                        style={[styles.icon, { marginVertical: '3.8%', width: width * 6 / 100 }]}
                        source={require('../../images/info.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
                        value={employee}
                        onChangeText={e18 => setemployee(e18)}
                        keyboardType='numeric'
                        placeholder="No. of Employee" />
                </View>
                <View style={styles.inputFields}>
                    <Image
                        style={[styles.icon, { marginVertical: '3.8%', width: width * 6 / 100 }]}
                        source={require('../../images/info.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
                        value={revenue}
                        keyboardType='decimal-pad'
                        onChangeText={e18 => setrevenue(e18)}
                        placeholder="Revenue" />
                </View>
                <View style={styles.inputFields}>
                    <Image
                        style={[styles.icon, { width: width * 4.6 / 100, marginTop: '3.5%' }]}
                        source={require('../../images/list.png')}
                    />
                    <TextInput
                        style={{ flex: 1, marginRight: '3%' }}
                        value={description}
                        onChangeText={e19 => setdescription(e19)}
                        placeholder="Description" />
                </View>
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
                                style={[styles.icon, { width: width * 4.6 / 100, marginTop: '3.5%' }]}
                                source={require('../../images/list.png')}
                            />
                        </View>
                    )}
                />
                {IsLodding == true ?
                    <ActivityIndicator size="small" color="#0000ff" />
                    :
                    null}
                <TouchableOpacity style={[styles.button, { marginHorizontal: '5%', marginBottom: '5%' }]}
                    onPress={() => AddLeadFuction()}>
                    <Text style={[styles.textButton, { fontWeight: 'bold' }]}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }}
                            onPress={() => addLeadSuccesfully()} >
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
        </View >
    );
}