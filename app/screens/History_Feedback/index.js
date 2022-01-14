import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, TextInput, Dimensions, ActivityIndicator,
  TouchableOpacity, ScrollView, ToastAndroid, Alert, StatusBar
} from 'react-native';
import styles from './styles';
import Header from '../../component/header/index'
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { historyAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';

export default function AddContact({ navigation, route }) {

  const { width, height } = Dimensions.get('window');
  const [fname, setfname] = useState(route.params ? route.params.Edata.first_name : "")
  const [lname, setlname] = useState(route.params ? route.params.Edata.last_name : "")
  const [phone, setphone] = useState(route.params ? route.params.Edata.phone : "")
  const [City, setCity] = useState(route.params ? route.params.Edata.city : "")
  const [State, setState] = useState(route.params ? route.params.Edata.state : "")
  const [description, setdescription] = useState(route.params ? route.params.Edata.campaign : null);


  const [time, settime] = useState(new Date());
  const [modes, setModes] = useState('time');
  const [shows, setShows] = useState(false);
  const [texts, settexts] = useState(true)

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


  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShows(Platform.OS === 'ios');
    settime(currentTime);
  };

  const showModes = (currentModes1) => {
    setShows(true);
    setModes(currentModes1);
  };

  const showDatepickers1 = () => {
    settexts(false)
    showModes('time');
  };

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


  const data = [
    { label: 'In-Progress', value: 'In-Progress' },
    { label: 'In-Progress1', value: 'In-Progress1' },
    { label: 'In-Progress2', value: 'In-Progress2' },
  ];

  const [value1, setValue1] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);


  const data1 = [
    { label: 'Task', value: 'Task' },
    { label: 'Task1', value: 'Task1' },
    { label: 'Task2', value: 'Task2' },
  ];

  const [value2, setValue2] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);


  const data2 = [
    { label: 'Note', value: 'Note' },
    { label: 'Note1', value: 'Note1' },
    { label: 'Note2', value: 'Note2' },
  ];

  const [value3, setValue3] = useState(null);
  const [isFocus3, setIsFocus3] = useState(false);


  const data3 = [
    { label: 'Message1', value: 'Message1' },
    { label: 'Message2', value: 'Message2' },
    { label: 'Message3', value: 'Message3' },
  ];

  const [feedback, setfeedback] = useState()
  const [IsLodding, setIsLodding] = useState(false)
  const dispatch = useDispatch()
  const loginData = useSelector(state => state.auth.data)
  const FeedbackData = useSelector(state => state.history.feedback)

  const AddFunction = () => {
    if (fname == "") {
      Alert.alert(" Enter First Name ")
    }
    else if (lname == "") {
      Alert.alert("Enter Last Name")
    }
    else if (phone == "") {
      Alert.alert(" Enter phone Number ")
    }
    else {
      let formateDate = moment(date).format("YYYY-MM-DD")
      let formateTime = moment(time).format("hh:mm")
      if (loginData) {
        if (loginData.status == "success") {
          const data = {
            uid: loginData.data.uid,
            profile_id: loginData.data.cProfile.toString(),
            org_id: loginData.data.user.org_id.toString(),
            first_name: fname,
            last_name: lname,
            date: formateDate,
            // time: formateTime,
            phone: phone,
            state: State,
            city: City,
            description: description,
            // feedback_id: "16"
          }
          dispatch(historyAction.AddEdit_feedback_History(loginData.data.token, data));
          setIsLodding(true)
        }
      }
    }
  }

  useEffect(() => {

    if (FeedbackData) {
      if (FeedbackData.status == 'success') {
        Alert.alert(FeedbackData.message)
        setIsLodding(false)
        setfname(''), setlname(''), setphone(''), setCity(''),
          setState(), setdescription(), setDate(new Date()), settime(new Date())
        navigation.navigate('History');
        dispatch(historyAction.clearHistoryFeedbackResponse())
      }
      else if (FeedbackData.status == 'fail') {
        Alert.alert(FeedbackData.message)
        setIsLodding(false)
      }
      else {
        setIsLodding(false)
      }

    }
    else {

    }

  }, [FeedbackData])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#2B6EF2"
        //Background color of statusBar only works for Android
        translucent={false}
        //allowing light, but not detailed shapes
        networkActivityIndicatorVisible={true}
      />
      <Header
        // style={{ height: "16%" }}
        onPressLeft={() => {
          // navigation.OpenDrawer()
          navigation.goBack()
        }}
        title='History Feedback'
        onPressRight={() => {
          navigation.navigate('Notification')
        }}
      />

      <ScrollView style={{ marginHorizontal: '3%', marginTop: '1%' }}>
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

        {/* <TouchableOpacity onPress={showDatepicker}
          style={{
            borderWidth: 1,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            // marginHorizontal: '3%',
            paddingVertical: 2,
            marginVertical: '2%'
          }} >
          <Image style={styles.icon}
            source={require('../../images/DOB.png')}
          />
          <DateTimePicker
            testID="dateTimePicker"
            style={{ width: '40%', marginTop: '-7%' }}
            value={date}
            mode={mode}
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




        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            // marginHorizontal: '3%',
            paddingVertical: 5,
            marginTop: '2%'
          }}
          onPress={showDatepickers1} >
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={styles.icon}
              source={require('../../images/DOB.png')}
            />
            {shows && (
              <DateTimePicker
                testID="dateTimePicker"
                style={{ paddingVertical: '5%', width: '50%' }}
                // is24Hour={true}
                value={time}
                mode={modes}
                // is24Hour={true}
                display="default"
                onChange={onChangeTime}
              />
            )}
            {Platform.OS == 'ios' ? <View>
              {text == true ?
                <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}>Set Date</Text>
                :
                <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}></Text>
              }
            </View>
              :
              <View>
                {text == true ?
                  <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>Set Time</Text>
                  :
                  <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>{moment(time).format("hh:mm")}</Text>
                }
              </View>
            }
          </View>
        </TouchableOpacity>




        {/* <TouchableOpacity onPress={showDatepickers1}
          style={{
            borderWidth: 1,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            // marginHorizontal: '3%',
            paddingVertical: 2,
            marginVertical: '2%'
          }}>
          <Image
            style={[styles.icon, { width: 20.88, height: 20.88 }]}
            source={require('../../images/clockIcon.png')}
          />
          <DateTimePicker
            testID="dateTimePicker"
            style={{ width: '40%', marginTop: '-8%' }}
            value={time}
            mode={modes}
            // is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        </TouchableOpacity> */}



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
            style={[styles.icon, { height: 26, width: '5%', marginLeft: '2.5%' }]}
            source={require('../../images/list.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            value={description}
            onChangeText={e19 => setdescription(e19)}
            placeholder="Description" />
        </View>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: '2%', marginTop: '-2%' }}> */}
        <Dropdown
          style={[styles.dropdown3, { marginTop: '2%' }, isFocus && { borderColor: '' }]}
          placeholderStyle={styles.placeholderStyle3}
          selectedTextStyle={styles.selectedTextStyle3}
          // inputSearchStyle={styles.inputSearchStyle3}
          iconStyle={styles.iconStyle3}
          data={data}
          // search
          maxHeight={160}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'In-Progress' : '...'}
          // searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <View>
              <Image
                source={require('../../images/mobile.png')}
                style={{ height: 25, width: 16, marginRight: '5%' }}
              />
            </View>
          )}
        />

        <Dropdown
          style={[styles.dropdown3, { marginTop: '2%' }, isFocus && { borderColor: '' }]}
          placeholderStyle={[styles.placeholderStyle3, { marginLeft: '-2%' }]}
          selectedTextStyle={[styles.selectedTextStyle3, { marginLeft: '-2%' }]}
          // inputSearchStyle={styles.inputSearchStyle3}
          iconStyle={styles.iconStyle3}
          data={data1}
          // search
          maxHeight={160}
          labelField="label"
          valueField="value"
          placeholder={!isFocus1 ? 'Task' : '...'}
          // searchPlaceholder="Search..."
          value={value1}
          onFocus={() => setIsFocus1(true)}
          onBlur={() => setIsFocus1(false)}
          onChange={item => {
            setValue1(item.value);
            setIsFocus1(false);
          }}
          renderLeftIcon={() => (
            <View>
              <Image
                style={[styles.icon, { height: 25, width: 25, marginTop: '5%' }]}
                source={require('../../images/info.png')}
              />
            </View>
          )}
        />
        <Dropdown
          style={[styles.dropdown3, { marginTop: '2%' }, isFocus && { borderColor: '' }]}
          placeholderStyle={styles.placeholderStyle3}
          selectedTextStyle={styles.selectedTextStyle3}
          // inputSearchStyle={styles.inputSearchStyle3}
          iconStyle={styles.iconStyle3}
          data={data2}
          // search
          maxHeight={160}
          labelField="label"
          valueField="value"
          placeholder={!isFocus2 ? 'Note' : '...'}
          // searchPlaceholder="Search..."
          value={value2}
          onFocus={() => setIsFocus2(true)}
          onBlur={() => setIsFocus2(false)}
          onChange={item => {
            setValue2(item.value);
            setIsFocus2(false);
          }}
          renderLeftIcon={() => (
            <View>
              <Image
                source={require('../../images/list.png')}
                style={{ height: 21, width: 16, marginRight: '5%' }}
              />
            </View>
          )}
        />
        <Dropdown
          style={[styles.dropdown3, { marginTop: '2%' }, isFocus && { borderColor: '' }]}
          placeholderStyle={styles.placeholderStyle3}
          selectedTextStyle={styles.selectedTextStyle3}
          // inputSearchStyle={styles.inputSearchStyle3}
          iconStyle={styles.iconStyle3}
          data={data3}
          // search
          maxHeight={160}
          labelField="label"
          valueField="value"
          placeholder={!isFocus3 ? 'Message' : '...'}
          // searchPlaceholder="Search..."
          value={value3}
          onFocus={() => setIsFocus3(true)}
          onBlur={() => setIsFocus3(false)}
          onChange={item => {
            setValue3(item.value);
            setIsFocus3(false);
          }}
          renderLeftIcon={() => (
            <View>
              <Image
                source={require('../../images/list.png')}
                style={{ height: 21, width: 16, marginRight: '5%' }}
              />
            </View>
          )}
        />

        {IsLodding == true ?
          <ActivityIndicator size="small" color="#0000ff" />
          :
          <View />}
        <TouchableOpacity style={[styles.button, {
          marginLeft: '2%', borderRadius: 20,
          marginRight: '2%'
        }]} onPress={() => AddFunction()}>
          <Text style={[styles.textButton, { fontWeight: 'bold' }]}>Call Again</Text>
        </TouchableOpacity>
        <View style={{ marginTop: '10%', height: 20 }} />
      </ScrollView>
    </View>
  );
}