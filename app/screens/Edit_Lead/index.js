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
import { useIsFocused } from "@react-navigation/core"

export default function AddContact({ navigation, route }) {
    console.log("beack screen ..................",route.params.Edata)
    
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
    const [State, setState] = useState(route.params.Edata ? route.params.Edata.state : "")
    const [Country, setCountry] = useState(route.params.Edata ? route.params.Edata.country : "")
    const [ZipCode, setZipCode] = useState(route.params.Edata ? route.params.Edata.zip : "")
    const [LeadSource, setLeadSource] = useState(route.params.Edata ? route.params.Edata.lead_source : "")
    const [LeadStatus, setLeadStatus] = useState(route.params.Edata ? route.params.Edata.lead_status : null);
    const [isFocus2, setIsFocus2] = useState(false);
    const [Industry, setIndustry] = useState(route.params.Edata ? route.params.Edata.industry : "")
    const [employee, setemployee] = useState(route.params.Edata ? route.params.Edata.number_of_employee : "")
    const [revenue, setrevenue] = useState(route.params.Edata ? route.params.Edata.annual_revenue : "")
    const [campaign, setcampaign] = useState(route.params.Edata ? route.params.Edata.campaign : null);
    const [description, setdescription] = useState(route.params.Edata ? route.params.Edata.campaign : null);
    const [IsLodding, setIsLodding] = useState(false)
    const [isFocus1, setIsFocus1] = useState(false);

    const { width, height } = Dimensions.get('window');

    const dispatch = useDispatch()
    const isFocused = useIsFocused();

    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)
    const leadData = useSelector(state => state.leads.newLead)
    const leadOwner = useSelector(state => state.leads.leadOwner)

    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValue1, setSelectedValue1] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');



    const [modalVisible, setModalVisible] = useState(false);

    const [value, setValue] = useState(null);
    // const [isFocus, setIsFocus] = useState(false);

    const [value1, setValue1] = useState(null);
    // const [isFocus1, setIsFocus1] = useState(false);

    const [value2, setValue2] = useState(null);
    // const [isFocus2, setIsFocus2] = useState(false);

    const [value3, setValue3] = useState(null);
    // const [isFocus3, setIsFocus3] = useState(false);

    const [value4, setValue4] = useState(null);
    const [isFocus4, setIsFocus4] = useState(false);



    const data = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];

    const data1 = [
        { label: 'Lead', value: 'Lead' },
        { label: 'Lead2', value: 'Lead2' },
        { label: 'Lead3', value: 'Lead3' },
    ];


    const data2 = [
        { label: 'Select list ', value: 'Select list' },
        { label: 'Select list2', value: 'Select list2' },
        { label: 'Select list3', value: 'Select list3' },
    ];

    const data3 = [
        { label: 'Holi ', value: 'Holi' },
        { label: 'Holi2', value: 'Holi2' },
        { label: 'Holi3', value: 'Holi3' },
    ];


    const data4 = [
        { label: 'Transfer Lead  ', value: 'Transfer Lead' },
        { label: 'Transfer Lead list2', value: 'Transfer Lead list2' },
        { label: 'Transfer Lead list3', value: 'Transfer Lead list3' },
    ];

    const [dates, setDates] = useState(new Date());
    const [modes, setModes] = useState('date');
    const [shows, setShows] = useState(false);

    const [date1, setDate1] = useState(new Date());
    const [mode1, setMode1] = useState('date');
    const [show1, setShow1] = useState(false);

    const [dates1, setDates1] = useState(new Date());
    const [modes1, setModes1] = useState('date');
    const [shows1, setShows1] = useState(false);





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


    const onChangeTo = (event, selectedDates) => {
        const currentDates = selectedDates || dates;
        setShows(Platform.OS === 'ios');
        setDates(currentDates);
    };

    const showModes = (currentModes) => {
        setShows(true);
        setModes(currentModes);
    };

    const showDatepickers = () => {
        showModes('time');
    };


    const onChangeFrom1 = (event, selectedDate1) => {
        const currentDate1 = selectedDate1 || date1;
        setShow1(Platform.OS === 'ios');
        setDate1(currentDate1);
    };

    const showMode1 = (currentMode1) => {
        setShow1(true);
        setMode1(currentMode1);
    };

    const showDatepicker1 = () => {
        showMode1('date');
    };


    const onChangeTo1 = (event, selectedDates1) => {
        const currentDates1 = selectedDates1 || dates1;
        setShows1(Platform.OS === 'ios');
        setDates1(currentDates1);
    };

    const showModes1 = (currentModes1) => {
        setShows1(true);
        setModes1(currentModes1);
    };

    const showDatepickers1 = () => {
        showModes1('time');
    };



    const [leadOwnerData, setleadOwnerData] = useState([])
    const [F23, setF23] = useState([])
    // console.log('leadOwnerData...........',leadOwnerData.map((item,index)=>
    //         [{lable : item.user.avatar ,value : item.user.avatar }))
    useEffect(() => {
        if (loginData || isFocused) {
            if (loginData.status == "success") {
                dispatch(leadAction.LeadOwnerList(
                    loginData.data.uid,
                    loginData.data.org_uid,
                    loginData.data.cProfile.toString(),
                    loginData.data.token
                ));
            }
        }
    }, [loginData, isFocused])

    console.log('leadOwner..................', leadOwnerData)

    // useEffect(() => {
    //     if (leadOwnerData !== []) {
    //         Object.keys(leadOwnerData).map(el => {
    //             console.log('key', el);
    //             leadOwnerData[el].map(sub_el =>
    //                 setF23([sub_el]),
    //                 console.log([sub_el]),

    //             );
    //         })
    //     }
    //     else {
    //         console.log('lease condition ')
    //     }
    // }, [leadOwnerData])

    useEffect(() => {
        if (leadOwner) {
            if (leadOwner.status == "200") {
                let userData = leadOwner.data && leadOwner.data.map((ld) => {
                    let user = { label: ld.user.name, value: ld.user.id }
                    if (userData !== undefined) {
                        setleadOwnerData(userData)
                    }
                    return user;
                })
                console.log('setLeadOwner....................', userData)
                // console.log('setLeadOwner....................',leadOwner.data.map((item,index)=>
                // [{lable : item.user.name  ,value: item.user.id}]))
                // setleadOwnerData(leadOwner.data ? leadOwner.data.map((item, index) =>
                //     [{ label: item.user.name, value: item.user.id }]) : [{ label: 'no service', value: "no service " }])
            }
            else if (leadOwner.status == "failed") {
                // Alert.alert(leadData.message)
                // dispatch(leadAction.clearResponse());
            }
            else if (leadOwner.status == "fail") {
                // Alert.alert(leadData.message)
                // dispatch(leadAction.clearResponse());
            }
        }
        else {

        }
    }, [leadOwner])

    const AddLeadFuction = () => {
        if (title == "") {
            Alert.alert(" Enter Lead Title ")
        }
        else if (fname == "") {
            Alert.alert(" Enter First Name ")
        }
        else if (lname == "") {
            Alert.alert("Enter Last Name")
        }
        else if (gender == null) {
            Alert.alert("select gender ")
        }
        else if (phone == "") {
            Alert.alert(" Enter phone Number ")
        }
        else if (email == "") {
            Alert.alert(" Enter Email Id")
        }
        else {
            let formateDate = moment(date).format("YYYY-MM-DD")
            if (loginData || registerData ) {
                if (loginData.status == "success") {
                    if (route.params.title == 'Edit Lead') {
                        const data = {
                            profile_id: loginData.data.cProfile.toString(),
                            created_by: loginData.data.cProfile.toString(),      //profile id 
                            modified_by: loginData.data.cProfile.toString(),     //profile id 
                            org_uid: loginData.data.org_uid,
                            uid: loginData.data.uid,
                            lead_id: route.params.Edata.id,first_name: fname,last_name: lname,title: title,email: email,
                            email2: Aemail,dob: formateDate,gender: gender,phone: phone,phone2: Aphone,fax: fax,website: website,
                            lead_source: LeadSource,lead_status: LeadStatus,industry: Industry,number_of_employee: employee,
                            annual_revenue: revenue,company: companyName,address: Address,city: City,state: State,country: Country,
                            zip: ZipCode,description: description,campaign: campaign,}
                        dispatch(leadAction.addLaed(data, loginData.data.token,));
                    }
                    else {
                        const data = {
                            profile_id: loginData.data.cProfile.toString(),
                            created_by: loginData.data.cProfile.toString(),      //profile id 
                            modified_by: loginData.data.cProfile.toString(),     //profile id 
                            org_uid: loginData.data.org_uid,
                            uid: loginData.data.uid,first_name: fname,last_name: lname,title: title,email: email,email2: Aemail,
                            dob: formateDate,gender: gender,phone: phone,phone2: Aphone,fax: fax,website: website,lead_source: LeadSource,
                            lead_status: LeadStatus,industry: Industry,number_of_employee: employee,annual_revenue: revenue,company: companyName,address: Address,city: City,
                            state: State,country: Country,zip: ZipCode,description: description,campaign: campaign,}
                        dispatch(leadAction.addLaed(data, loginData.data.token,));
                        // setfname(''), setlname(''), settitle(''), setemail(''), setAemail(''), setgender(''), setphone(''),
                        //     setAphone(''), setfax(''), setwebsite(''), setLeadSource(''), setLeadStatus(''), setIndustry(''),
                        //     setemployee(''), setrevenue(''), setcompanyName(''), setAddress(''), setCity(''), setState(''), setCountry(''),
                        //     setZipCode(''), setdescription(''), setcampaign('')
                    }
                    setIsLodding(true)
                }

                else if (registerData.status == "success") {
                    if (route.params.title == 'Edit Lead') {
                        const data = {
                            profile_id: registerData.data.cProfile.toString(),
                            created_by: registerData.data.cProfile.toString(),      //profile id 
                            modified_by: registerData.data.cProfile.toString(),     //profile id 
                            org_uid: registerData.data.org_uid,
                            uid: registerData.data.uid,
                            lead_id: route.params.Edata.id,first_name: fname,last_name: lname,title: title,email: email,
                            email2: Aemail,dob: formateDate,gender: gender,phone: phone,phone2: Aphone,fax: fax,website: website,
                            lead_source: LeadSource,lead_status: LeadStatus,industry: Industry,number_of_employee: employee,
                            annual_revenue: revenue,company: companyName,address: Address,city: City,state: State,country: Country,
                            zip: ZipCode,description: description,campaign: campaign,}
                        dispatch(leadAction.addLaed(data, registerData.data.token,));
                    }
                    else {
                        const data = {
                            profile_id: registerData.data.cProfile.toString(),
                            created_by: registerData.data.cProfile.toString(),      //profile id 
                            modified_by: registerData.data.cProfile.toString(),     //profile id 
                            org_uid: registerData.data.org_uid,
                            uid: registerData.data.uid,first_name: fname,last_name: lname,title: title,email: email,email2: Aemail,
                            dob: formateDate,gender: gender,phone: phone,phone2: Aphone,fax: fax,website: website,lead_source: LeadSource,
                            lead_status: LeadStatus,industry: Industry,number_of_employee: employee,annual_revenue: revenue,company: companyName,address: Address,city: City,
                            state: State,country: Country,zip: ZipCode,description: description,campaign: campaign,}
                        dispatch(leadAction.addLaed(data, registerData.data.token,));
                        // setfname(''), setlname(''), settitle(''), setemail(''), setAemail(''), setgender(''), setphone(''),
                        //     setAphone(''), setfax(''), setwebsite(''), setLeadSource(''), setLeadStatus(''), setIndustry(''),
                        //     setemployee(''), setrevenue(''), setcompanyName(''), setAddress(''), setCity(''), setState(''), setCountry(''),
                        //     setZipCode(''), setdescription(''), setcampaign('')
                    }
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
                dispatch(leadAction.clearResponse());
            }
            else if (leadData.status == "failed") {
                setIsLodding(false)
                Alert.alert(leadData.message)
                dispatch(leadAction.clearResponse());
            }
            else if (leadData.status == "fail") {
                setIsLodding(false)
                Alert.alert(leadData.message)
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
                title={route.params.title}
                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />

            <ScrollView style={{ width: width, height: height }}>
                <View style={{ margin: '3%', marginTop: '2%' }}>

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
                            // clearButtonMode="always"
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
                            borderWidth: 1,
                            borderColor: '#C3C7E5',
                            borderRadius: 10,
                            // marginHorizontal: '3%',
                            paddingVertical: 5,
                            marginTop: '2%'
                        }}
                        onPress={showDatepicker} >
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={styles.icon}
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
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>Date of Birth</Text>
                                        :
                                        <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>{moment(date).format('MM/DD/YYYY')}</Text>
                                    }
                                </View>
                            }
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: '2%' }}>
                        {/* {renderLabel()} */}

                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            // inputSearchStyle={styles.inputSearchStyle3}
                            iconStyle={styles.iconStyle3}
                            // containerStyle={{ 
                            //   backgroundColor: 'red', 
                            //   }}
                            // activeColor='yellow'
                            data={data}
                            // search
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select Gender' : '...'}
                            // searchPlaceholder="Search..."
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
                                        style={[styles.icon, {

                                            height: 22,
                                            width: 22
                                        }]}
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

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={[styles.inputFields, { width: '49%' }]}>
                            <Image
                                style={[styles.icon, {
                                    height: 29, width: '9%',
                                    marginRight: '4%', marginLeft: '8%'
                                }]}
                                source={require('../../images/city.png')}
                            />
                            <TextInput
                                style={{ width: '80%' }}
                                value={City}
                                onChangeText={e13 => setCity(e13)}
                                placeholder="City" />
                        </View>

                        <View
                            style={[styles.inputFields, { marginLeft: '2%', marginRight: '5%', width: '49%' }]}>
                            <Image
                                style={[styles.icon, {
                                    height: 25, width: '15%',
                                    marginRight: '4%'
                                }]}
                                source={require('../../images/state.png')}
                            />
                            <TextInput
                                style={{ width: '80%' }}
                                value={State}
                                onChangeText={e14 => setState(e14)}
                                placeholder="State" />
                        </View>
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
                            style={[styles.icon, { height: 23, width: 23, }]}
                            source={require('../../images/info.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={ZipCode}
                            onChangeText={e16 => setZipCode(e16)}
                            placeholder="Zip Code " />
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
                            // inputSearchStyle={styles.inputSearchStyle3}
                            iconStyle={styles.iconStyle3}
                            data={data2}
                            // search
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus2 ? '  Lead Status' : '...'}
                            // searchPlaceholder="Search..."
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
                            style={[styles.icon, { height: 26, width: '5%', marginLeft: '2.5%' }]}
                            source={require('../../images/list.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={description}
                            onChangeText={e19 => setdescription(e19)}
                            placeholder="Description" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 26, width: '5%', marginLeft: '2.5%' }]}
                            source={require('../../images/list.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={campaign}
                            onChangeText={e20 => setcampaign(e20)}
                            placeholder="Campaign" />
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
                            // Alert.alert("Modal has been closed.");
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
                    {/* <Pressable
                    style={[styles.button2, styles.buttonOpen]}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </Pressable> */}
                </View>

            </ScrollView>
        </View>
    );
}

