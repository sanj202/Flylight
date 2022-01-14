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
import { editContactAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';

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
    const [State, setState] = useState(route.params.Edata ? route.params.Edata.state : "")
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

    const dispatch = useDispatch()
    const loginData = useSelector(state => state.auth.data)
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
    const data1 = [
        { label: '  Select a Campagin', value: '  Select a Campagin' },
        { label: '  Select a Campagin 2', value: '  Select a Campagin 2' },
    ];
    const data2 = [
        { label: 'Lead Status ', value: 'Lead Status' },
        { label: 'Lead status2', value: 'Lead Status2' },
    ];
    const data3 = [
        { label: 'Lead Owner ', value: 'Lead Owner' },
        { label: 'Lead Owner 2', value: 'Lead Owner 2' },
    ];

    const AddFunction = () => {
        setModalVisible2(!modalVisible2)
        // ToastAndroid.show("Add Succesfully !", ToastAndroid.SHORT);
        navigation.navigate("Contacts")
    };

    const AddContactFuction = () => {
        if (title == "") {
            Alert.alert(" Enter Contact Title ")
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
            if (loginData) {
                if (loginData.status == "success") {
                    const data = {
                        profile_id: loginData.data.cProfile.toString(),
                        created_by: loginData.data.cProfile.toString(),       //profile id 
                        modified_by: loginData.data.cProfile.toString(),      //profile id 
                        org_uid: loginData.data.org_uid,
                        contact_id: route.params.Edata.id,
                        first_name: fname,
                        last_name: lname,
                        title: title,
                        email: email,
                        email2: Aemail,
                        dob: formateDate,
                        gender: gender,
                        phone: phone,
                        phone2: Aphone,
                        fax: fax,
                        website: website,
                        lead_source: LeadSource,
                        lead_status: LeadStatus,
                        industry: Industry,
                        number_of_employee: employee,
                        annual_revenue: revenue,
                        company: companyName,
                        address: Address,
                        city: City,
                        state: State,
                        country: Country,
                        zip: ZipCode,
                    }
                    //   console.log("data....................",data)
                    dispatch(editContactAction.EditContact(data, loginData.data.token));
                    setIsLodding(true)
                }
            }
        }
    }

    useEffect(() => {
        if (Data) {
            if (Data.status == "success") {
                Alert.alert(Data.message)
                setIsLodding(false)
                dispatch(editContactAction.clearResponse());
                navigation.goBack()
            }
            else if (Data.status == "failed") {
                setIsLodding(false)
                Alert.alert(Data.message)
            }
            else if (Data.status == "fail") {
                setIsLodding(false)
                Alert.alert(Data.message)
            }
            else{
                setIsLodding(false)  
            }

        }
        else {

        }
    }, [Data])

    // console.log('default...........................................',navigation)
    return (
        <View style={{ flex: 1 }}>
          
            <Header
                // style={{ height: "1%" }}
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

                    {/* {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            // is24Hour={true}
            display="compact"
            onChange={onChangeFrom}
          />
        )}

        <TouchableOpacity
            onPress={showDatepicker}
          >
            <View style={styles.pickers}>
              <Image
                style={{ height: 22, width: 20, marginTop: '2%', marginRight: '5%' }}
                source={require('../../images/pikerCalander.png')}
              />
              <Text style={{ marginTop: '5%' }}>{moment(date).format('MM/DD/YYYY')}</Text>
            </View>
          </TouchableOpacity> */}


                    <View style={{ marginTop: '2%' }}>
                        {/* {renderLabel()} */}
                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            // inputSearchStyle={styles.inputSearchStyle3}
                            iconStyle={styles.iconStyle3}
                            data={data3}
                            // search
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus3 ? ' Lead Owner' : '...'}
                            // searchPlaceholder="Search..."
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
                                        style={[styles.icon, {

                                            height: 22, width: 17.50,
                                        }]}
                                        // source={require('../../images/list.png')}
                                        source={require('../../images/user.png')}
                                    />
                                </View>
                            )}
                        />
                    </View>
                    <View style={styles.inputFields}>
                        <Image
                            style={styles.icon}
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

                    {/* <View style={styles.inputFields}>
                        <Image
                            style={styles.icon}
                            source={require('../../images/DOB.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={dateB}
                            onChangeText={e4 => setdateB(e4)}
                            placeholder="Date of Birth" />
                    </View> */}


                    {/* <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: '#C3C7E5',
                            borderRadius: 10,
                            // marginHorizontal: '3%',
                            paddingVertical: 2,
                            marginTop: '2%'
                        }}
                        onPress={showDatepicker} >
                        <Image style={[styles.icon, {
                            height: 25, width: '6%', marginLeft: '4%', marginTop: '2%'
                        }]}
                            source={require('../../images/DOB.png')}
                        />
                        <DateTimePicker
                            testID="dateTimePicker"
                            style={{ width: '50%', marginTop: '-11%' }}
                            value={date}
                            // moment(date).format("YYYY-MM-DD")
                            mode={mode}
                            // dateFormat=''
                            // is24Hour={true}
                            display="default"
                            onChange={onChangeFrom}
                        />
                    </TouchableOpacity> */}

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
                            onChangeText={e6 => setAphone(e6)}
                            placeholder="Alternate Mobile Number"
                        />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, {
                                height: 20, width: '7%',
                                marginTop: '2%', marginRight: '1.5%'
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
                                marginTop: '2%', marginRight: '1.5%'
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
                            style={[styles.icon, { height: 22, width: '5%', marginTop: '1.5%', marginLeft: '2.5%' }]}
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
                            style={[styles.icon, { height: 22, width: '5%', marginTop: '1.5%', marginLeft: '2.5%' }]}
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
                            style={[styles.icon, { height: 22, width: '5%', marginTop: '1.5%', marginLeft: '2.5%' }]}
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
                            style={[styles.icon, { height: 25, width: '5.5%', marginTop: '1%', marginRight: '3%' }]}
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
                                    height: 28, width: '10%',
                                    marginRight: '4%', marginTop: '3%', marginLeft: '8%'
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
                                    marginTop: '2.5%', marginRight: '4%'
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
                            style={[styles.icon, { height: 23, width: 23, marginTop: '2%' }]}
                            source={require('../../images/info.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={Country}
                            onChangeText={e15 => setCountry(e15)}
                            placeholder="Country" />
                    </View>


                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 23, width: 23, marginTop: '2%' }]}
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
                            style={[styles.icon, { height: 23, width: 23, marginTop: '2%' }]}
                            source={require('../../images/info.png')}
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
                            style={[styles.icon, { height: 23, width: 23, marginTop: '2%' }]}
                            source={require('../../images/info.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={Industry}
                            onChangeText={e17 => setIndustry(e17)}
                            placeholder="Industry" />
                    </View>

                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 23, width: 23, marginTop: '2%' }]}
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
                            style={[styles.icon, { height: 23, width: 23, marginTop: '2%' }]}
                            source={require('../../images/info.png')}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            value={revenue}
                            keyboardType='decimal-pad'
                            onChangeText={e18 => setrevenue(e18)}
                            placeholder="Revenue" />
                    </View>

                    {/* <View style={styles.inputFields}>
            <Image
              style={[styles.icon, { height: 23, width: 23, marginTop: '2%' }]}
              source={require('../../images/info.png')}
            />
            <TextInput style={{ flex: 1 }} placeholder="More Info" />
          </View> */}

                    <View style={{ marginTop: '2%' }}>
                        {/* {renderLabel()} */}

                        <Dropdown
                            style={styles.dropdown3}
                            placeholderStyle={styles.placeholderStyle3}
                            selectedTextStyle={styles.selectedTextStyle3}
                            // inputSearchStyle={styles.inputSearchStyle3}
                            iconStyle={styles.iconStyle3}

                            data={data1}
                            // search
                            maxHeight={100}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus1 ? '  Select a Campagin' : '...'}
                            // searchPlaceholder="Search..."
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
                                        style={[styles.icon, {
                                            marginRight: '-0.05%',
                                            height: 28, width: 20, marginTop: '2%'
                                        }]}
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

