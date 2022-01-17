import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList,
  Image, Button, ScrollView, Modal, Alert, Pressable, StatusBar, Dimensions, Platform
} from 'react-native';
import styles from './styles';
import { Dropdown } from 'react-native-element-dropdown';
import { Card } from 'react-native-paper';
import Header from '../../component/header';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { addcontactManuallyAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';

export default function AddContact({ navigation }) {

  const [LeadOwner, setLeadOwner] = useState(null)
  const [isFocus3, setIsFocus3] = useState(false);
  const [title, settitle] = useState("")
  const [fname, setfname] = useState("")
  const [lname, setlname] = useState("")
  const [gender, setgender] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [phone, setphone] = useState("")
  const [Aphone, setAphone] = useState("")
  const [email, setemail] = useState("")
  const [Aemail, setAemail] = useState("")
  const [companyName, setcompanyName] = useState("")
  const [website, setwebsite] = useState("")
  const [fax, setfax] = useState("")
  const [Address, setAddress] = useState("")
  const [City, setCity] = useState("")
  const [State, setState] = useState("")
  const [Country, setCountry] = useState("")
  const [ZipCode, setZipCode] = useState("")
  const [LeadSource, setLeadSource] = useState("")
  const [LeadStatus, setLeadStatus] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);
  const [Industry, setIndustry] = useState("")
  const [employee, setemployee] = useState("")
  const [revenue, setrevenue] = useState("")
  const [Campagin, setCampagin] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [IsLodding, setIsLodding] = useState(false)
  const { width, height } = Dimensions.get('window');

  const dispatch = useDispatch()
  const loginData = useSelector(state => state.auth.data)
  const Data = useSelector(state => state.ManuallyAddContact.data)
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
    dispatch(addcontactManuallyAction.clearResponse());
    navigation.navigate("AddContact")
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
          dispatch(addcontactManuallyAction.M_addContact(data, loginData.data.token));
          setIsLodding(true)
        }
      }
    }
  }

  useEffect(() => {
    if (Data) {
      if (Data.status == "success") {
        // console.log("sucess..........", Data.message)
        setIsLodding(false)
        setfname(''), setlname(''), setAddress(''), settitle(''), setemail(''), setAemail(''), setgender(''),
          setphone(''), setAphone(''), setfax(''), setwebsite(''), setLeadSource(''), setLeadStatus(''),
          setIndustry(''), setemployee(''), setrevenue(''), setcompanyName(''), setAddress(''), setCity(''),
          setState(''), setCountry(''), setZipCode(''),
          setModalVisible2(!modalVisible2)
        dispatch(addcontactManuallyAction.clearResponse())
      }
      else if (Data.status == "failed") {
        setIsLodding(false)
        Alert.alert(Data.message)
        dispatch(addcontactManuallyAction.clearResponse())
      }
      else if (Data.status == "fail") {
        setIsLodding(false)
        Alert.alert(Data.message)
        dispatch(addcontactManuallyAction.clearResponse())
      }
    }
    else {
      setIsLodding(false)
    }
  }, [Data])

  return (
    <View style={{ flex: 1 }}>
      <Header
        // style={{ height: "12%" }}
        onPressLeft={() => {
          // navigation.openDrawer()
          navigation.goBack()
        }}
        title='Add Contact'
        onPressRight={() => {
          navigation.navigate('Notification')
        }}
      />

      <ScrollView style={{ width: width, height: height }}>
        <View style={{ margin: '5%' }}>
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

          <TouchableOpacity style={styles.button}
            // onPress={() => setModalVisible2(!modalVisible2)}
            onPress={() => AddContactFuction()}
          >
            <Text style={[styles.textButton, { fontWeight: 'bold' }]}>ADD</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible2(!modalVisible2);
        }}
      >
        <Card style={styles.headerView2}>
          <View style={styles.headerView3}>
            <TouchableOpacity
              onPress={() => setModalVisible2(!modalVisible2)}
            >
              <Image
                style={{ margin: '5%', marginTop: '3%', alignSelf: 'flex-end', height: 14, width: 14 }}
                source={require('../../images/crossImgR.png')}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../images/checkmark-circle.png')}
            style={{ width: 38, height: 38, alignSelf: 'center' }}
          />
          <Text style={styles.title3}>
            Contacts Imported {'\n'} Successfully
          </Text>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-around',
            marginBottom: '2%'
          }}
          >
            <TouchableOpacity
              onPress={() => AddFunction()}
              style={styles.btn3}
            >
              <Text
                style={styles.btnText3}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: '3%' }}></View>
        </Card>
      </Modal>
    </View>
  );
}

