import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  ToastAndroid,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ScrollView,
  Modal,
  Alert,
  Pressable,
  Touchable,
  StatusBar
} from 'react-native';
import styles from './styles';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheet, Button, ListItem } from 'react-native-elements';
import { contactListAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';

import Header from '../../component/header/index'
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

  const [isVisible, setIsVisible] = useState(false);
  const [actiontype, setActiontype] = useState('Select Call Action')

  const [isVisible1, setIsVisible1] = useState(false);
  // record

  const [isVisible2, setIsVisible2] = useState(false);
  const [statustype, setStatustype] = useState('Select State')

  const [isVisible3, setIsVisible3] = useState(false);
  const [msgtype, setMsgtype] = useState('Message')

  const [isVisible4, setIsVisible4] = useState(false);


  const [date22, setDate22] = useState(new Date());
  const [mode22, setMode22] = useState('date');
  const [show22, setShow22] = useState(false);

  const [dates, setDates] = useState(new Date());
  const [modes22, setModes22] = useState('date');
  const [shows22, setShows22] = useState(false);



  const [FollowDate, setFollowDate] = useState(true)
  const [FollowDates, setFollowDates] = useState(true)
  const [FollowDate1, setFollowDate1] = useState(true)
  const [FollowDates1, setFollowDates1] = useState(true)

  const onChangeFrom22 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow22(Platform.OS === 'ios');
    setDate22(currentDate);
  };

  const showMode22 = (currentMode) => {
    setShow22(true);
    setMode22(currentMode);
  };

  const showDatepicker22 = () => {
    setFollowDate(false)
    showMode('date');
  };


  const onChangeTo = (event, selectedDates) => {
    const currentDates = selectedDates || dates;
    setShows(Platform.OS === 'ios');
    setDates(currentDates);
  };

  const showModes22 = (currentModes) => {
    setShows22(true);
    setModes22(currentModes);
  };

  const showDatepickers = () => {
    setFollowDates(false)
    showModes22('time');
  };






  const dispatch = useDispatch()
  const loginData = useSelector(state => state.auth.data)
  const FeedbackData = useSelector(state => state.contactList.feedbacks)

  // console.log("FeedbackDataFeedbackData....",FeedbackData)

  const AddFunction = () => {
    if (fname == "") {
      ToastAndroid.show('Enter First Name', ToastAndroid.SHORT);
    }
    else if (lname == "") {
      ToastAndroid.show('Enter Last Name', ToastAndroid.SHORT);
    }
    else if (phone == "") {
      ToastAndroid.show('Enter phone Number', ToastAndroid.SHORT);
    }
    else {
      let formateDate = moment(date).format("YYYY-MM-DD")
      let formateTime = moment(time).format("hh:mm")

      if (loginData) {
        if (loginData.status == "success") {
          const data = {
            uid: loginData.data.uid,
            profile_id: loginData.data.cProfile.toString(),
            org_uid: loginData.data.org_uid,
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
          dispatch(contactListAction.AddEdit_feedback(loginData.data.token, data));
        }
      }
    }
  }

  useEffect(() => {

    if (FeedbackData) {
      if (FeedbackData.status == 'success') {
        ToastAndroid.show(FeedbackData.message, ToastAndroid.SHORT);
        setfname(''), setlname(''), setphone(''), setCity(''),
          setState(), setdescription(), setDate(new Date()), settime(new Date())
        navigation.navigate('History');
        dispatch(contactListAction.clearResponse())
      }
      else if (FeedbackData.status == 'fail') {
        ToastAndroid.show(FeedbackData.message, ToastAndroid.SHORT);
      }
      else {

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

        onPressLeft={() => {
          navigation.openDrawer()
          // navigation.goBack()
        }}
        title='Record Feedback'

        onPressRight={() => {
          navigation.navigate('Notification')
        }}
      />


      <ScrollView>

        <View style={{ margin: '3%', marginTop: '2%' }}>
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
              style={{ width: '40%', marginLeft: '9%', marginTop: '-8%' }}
              value={dates1}
              mode={modes1}
              // is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          </TouchableOpacity> */}

          {/* <TouchableOpacity onPress={showDatepicker1}
            style={{
              borderWidth: 1,
              borderColor: '#C3C7E5',
              borderRadius: 10,
              // marginHorizontal: '3%',
              paddingVertical: 2,
              marginVertical: '2%'
            }}>
            <Image style={styles.icon}
              source={require('../../images/DOB.png')}
            />
            <DateTimePicker
              testID="dateTimePicker"
              style={{ width: '40%', marginLeft: '9%', marginTop: '-8%' }}
              value={Time}
              mode={Timemode}
              // is24Hour={true}
              display="default"
              onChange={onChangeTime}
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

          <View style={{
            // flexDirection: 'row',
            borderWidth: 1,
            padding: 2,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            marginTop: '2%',
          }}>
            <TouchableOpacity
              style={{ paddingTop: '2%', paddingBottom: '2%' }}
              // onPress={() => setIsVisible(true)}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={[styles.icon, { height: 25, width: 16 }]}
                    source={require('../../images/mobile.png')}
                  />
                  <Text style={{ marginTop: '5%', fontSize: 13, marginLeft: '7%' }}>{actiontype}</Text>
                </View>

                <View style={{ marginTop: '4%', }}>
                  <Image
                    style={{ height: 7.6, width: 12.35, marginRight: '6%' }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{
            // flexDirection: 'row',
            borderWidth: 1,
            padding: 2,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            marginTop: '2%',
          }}>
            <TouchableOpacity
              style={{ paddingTop: '2%', paddingBottom: '2%' }}
              // onPress={() => setIsVisible2(true)}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={[styles.icon, { height: 22.49, width: 20.45, marginTop: '1%' }]}
                    source={require('../../images/state.png')}
                  />
                  <Text style={{ marginTop: '5%', fontSize: 13, marginLeft: '5%' }}> {statustype} </Text>
                </View>

                <View style={{ marginTop: '4%', }}>
                  <Image
                    style={{ height: 7.6, width: 12.35, marginRight: '6%' }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{
            // flexDirection: 'row',
            borderWidth: 1,
            padding: 2,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            marginTop: '2%',
          }}>
            <TouchableOpacity
              style={{ paddingTop: '2%', paddingBottom: '2%' }}
              // onPress={() => setIsVisible4(true)}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={[styles.icon, { height: 20.59, width: 20.59, marginTop: '4%' }]}
                    source={require('../../images/info.png')}
                  />
                  <Text style={{ marginTop: '5%', fontSize: 13, marginLeft: '9.5%' }}> Task </Text>
                </View>

                <View style={{ marginTop: '4%', }}>
                  <Image
                    style={{ height: 7.6, width: 12.35, marginRight: '6%' }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{
            // flexDirection: 'row',
            borderWidth: 1,
            padding: 4,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            marginTop: '2%',
          }}>
            <TouchableOpacity
              style={{ paddingTop: '2%', paddingBottom: '2%' }}
              // onPress={() => setIsVisible1(true)}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../../images/list.png')}
                    style={{ height: 21.20, width: 16, marginRight: '2%', marginLeft: '3%' }}
                  />
                  <Text style={{ marginTop: '5%', fontSize: 13, marginLeft: '10%' }}> Note </Text>
                </View>

                <View style={{ marginTop: '4%', }}>
                  <Image
                    style={{ height: 7.6, width: 12.35, marginRight: '6%' }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>


          <View style={{
            // flexDirection: 'row',
            borderWidth: 1,
            padding: 4,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            marginTop: '2%',
          }}>
            <TouchableOpacity
              style={{ paddingTop: '2%', paddingBottom: '2%' }}
              // onPress={() => setIsVisible3(true)}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={[styles.icon, { height: 15, width: 19, marginTop: '4%' }]}
                    source={require('../../images/mail.png')}
                  />
                  <Text style={{ marginTop: '4%', fontSize: 13, marginLeft: '9.5%' }}>Message</Text>
                </View>

                <View style={{ marginTop: '3%', }}>
                  <Image
                    style={{ height: 7.6, width: 12.35, marginRight: '6%' }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button}
            // onPress={() => AddFunction()}
          >
            <Text style={[styles.textButton, { fontWeight: 'bold' }]}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: '3%' }}></View>
      </ScrollView>


      <BottomSheet
        modalProps={{
          animationType: 'fade',
          hardwareAccelerated: true,
          onRequestClose: () => {
            setIsVisible(false);
          },
        }} isVisible={isVisible}>
        <View style={{ backgroundColor: '#fff', padding: '4%', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>

          <Text style={{ textAlign: 'center', color: '#000000', fontSize: 16, fontWeight: '500', marginBottom: '3%' }}>Select your call action</Text>
          {
            actiontype == "Interested" ?
              <TouchableOpacity
                onPress={() => setActiontype("Interested")}
              >
                <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>

                  <Text style={{ fontSize: 13, padding: '3.5%', color: '#FFFFFF' }}>Interested</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setActiontype("Interested")}
              >
                <View style={[styles.actionSheet,]}>

                  <Text style={{ fontSize: 13, padding: '3.5%' }}>Interested</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
                  />
                </View>
              </TouchableOpacity>
          }

          {
            actiontype == "NotInterested" ?
              <TouchableOpacity
                onPress={() => setActiontype("NotInterested")}
              >
                <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>

                  <Text style={{ fontSize: 13, padding: '3.5%', color: '#FFFFFF' }}>Not Interested</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :

              <TouchableOpacity
                onPress={() => setActiontype("NotInterested")}
              >
                <View style={[styles.actionSheet]}>
                  <Text style={{ fontSize: 13, padding: '3.5%' }}>Not Interested</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
                  />
                </View>
              </TouchableOpacity>
          }

          {
            actiontype == "Busy" ?
              <TouchableOpacity
                onPress={() => setActiontype("Busy")}
              >
                <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>

                  <Text style={{ fontSize: 13, padding: '3.5%', color: '#FFFFFF' }}>Busy</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setActiontype("Busy")}
              >
                <View style={[styles.actionSheet]}>
                  <Text style={{ fontSize: 13, padding: '3.5%' }}>Busy</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
                  />
                </View>
              </TouchableOpacity>

          }

          {
            actiontype == "Callback" ?
              <TouchableOpacity
                onPress={() => setActiontype("Callback")}
              >
                <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>

                  <Text style={{ fontSize: 13, padding: '3.5%', color: '#FFFFFF' }}>Callback</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setActiontype("Callback")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 13, padding: '3.5%', }}>Callback</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
          }

          {
            actiontype == "Opportunity" ?
              <TouchableOpacity
                onPress={() => setActiontype("Opportunity")}
              >
                <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>

                  <Text style={{ fontSize: 13, padding: '3.5%', color: '#FFFFFF' }}>Opportunity</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setActiontype("Opportunity")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 13, padding: '3.5%', }}>Opportunity</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
          }

          {
            actiontype == "WrongNumber" ?
              <TouchableOpacity
                onPress={() => setActiontype("WrongNumber")}
              >
                <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>

                  <Text style={{ fontSize: 13, padding: '3.5%', color: '#FFFFFF' }}>Wrong Number</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setActiontype("WrongNumber")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 13, padding: '3.5%', }}>Wrong Number</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
                  />
                </View>
              </TouchableOpacity>

          }

          {
            actiontype == "NoAnswer" ?
              <TouchableOpacity
                onPress={() => setActiontype("NoAnswer")}
              >
                <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>

                  <Text style={{ fontSize: 13, padding: '3.5%', color: '#FFFFFF' }}>No Answer</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setActiontype("NoAnswer")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 13, padding: '3.5%', }}>No Answer</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '4%', marginRight: '5%' }}
                  />
                </View>
              </TouchableOpacity>

          }


        </View>
      </BottomSheet >

      <BottomSheet
        modalProps={{
          animationType: 'fade',
          hardwareAccelerated: true,
          onRequestClose: () => {
            setIsVisible1(false);
          },
        }} isVisible={isVisible1}>
        <View style={{ backgroundColor: '#fff', padding: '5%' }}>
          <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginBottom: '3%' }}>Note Your Record</Text>
          <Image
            source={require('../../images/mic.png')}
            style={{ alignSelf: 'center', width: 50, height: 50 }}
          />
          <TouchableOpacity style={{ backgroundColor: '#2FC204', marginLeft: '35%', marginRight: '35%', marginTop: '3%', borderRadius: 10 }}>
            <Text style={{ fontSize: 13, color: '#fff', padding: 10, paddingLeft: 20, paddingRight: 20, textAlign: 'center' }}>Save</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet >

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          // is24Hour={true}
          display="calendar"
          onChange={onChangeFrom}
        />
      )}
      {/* </View> */}

      {/* <View> */}
      {shows && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dates}
          mode={modes}
          // is24Hour={true}
          display="clock"
          onChange={onChangeTo}
        />
      )}

      <BottomSheet
        modalProps={{
          animationType: 'fade',
          hardwareAccelerated: true,
          onRequestClose: () => {
            setIsVisible4(false);
          },
        }} isVisible={isVisible4}>


        {/* ------------------------------------------------------------------------- */}

        <View style={{ backgroundColor: '#fff', padding: '5%' }}>
          <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginBottom: '3%' }}>Select date your task</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: '2%', }}>

            <TouchableOpacity
              style={{ marginLeft: '-3%', width: "48%" }}
              onPress={showDatepicker}
            >
              <View style={styles.pickers}>
                <Image
                  style={{
                    height: 22, width: 20, marginTop: '2%',
                    marginRight: '10%', marginLeft: '-10%'
                  }}
                  source={require('../../images/pikerCalander.png')}
                />

                {FollowDate == true ?
                  <Text style={{ marginTop: '2%', color: '#4A4A4A' }}>Set Date
                  </Text>
                  :
                  <Text style={{ marginTop: '5%' }}>
                    {moment(date).format('MM/DD/YYYY')}
                  </Text>
                }
              </View>
            </TouchableOpacity>


            <TouchableOpacity
              style={{ width: "48%" }}
              onPress={showDatepickers}
            >
              <View style={styles.pickers}>
                <Image
                  style={{
                    height: 22, width: 22, marginTop: '2%',
                    marginRight: '8%', marginLeft: '-10%'
                  }}
                  source={require('../../images/clockIcon.png')}
                />
                {FollowDates == true ?
                  <Text style={{ marginTop: '2%', color: '#4A4A4A' }}>Set Time
                  </Text>
                  :
                  <Text style={{ marginTop: '5%' }}>{moment(dates).format("HH:MM")}</Text>
                }

              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ backgroundColor: '#114DC4', marginLeft: '30%', marginRight: '30%', marginTop: '3%', borderRadius: 10 }}>
            <Text style={{ fontSize: 13, color: '#fff', padding: 10, textAlign: 'center' }}>Set Task</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet >



      <BottomSheet
        modalProps={{
          animationType: 'fade',
          hardwareAccelerated: true,
          onRequestClose: () => {
            setIsVisible2(false);
          },
        }} isVisible={isVisible2}>
        <View style={{ backgroundColor: '#fff', padding: '5%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
          <Text style={{ textAlign: 'center', fontSize: 16, color: '#000000', fontWeight: '500', marginBottom: '3%' }}>Select Status</Text>
          {
            statustype == "New" ?
              <TouchableOpacity
                onPress={() => setStatustype("New")}
              >
                <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>

                  <Text style={{ fontSize: 13, padding: '4%', color: '#fff' }}>New</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setStatustype("New")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 13, padding: '4%' }}>New</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
          }

          {
            statustype == "In-Progress" ?
              <TouchableOpacity
                onPress={() => setStatustype("In-Progress")}
              >
                <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>

                  <Text style={{ fontSize: 13, padding: '4%', color: '#fff' }}>In-Progress</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setStatustype("In-Progress")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 13, padding: '4%' }}>In-Progress</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
          }

          {
            statustype == "Success" ?
              <TouchableOpacity
                onPress={() => setStatustype("Success")}
              >
                <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>

                  <Text style={{ fontSize: 13, padding: '4%', color: '#fff' }}>Success</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setStatustype("Success")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 13, padding: '4%' }}>Success</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '6%', marginRight: '5%' }}
                  />
                </View>
              </TouchableOpacity>

          }

          {
            statustype == "Fail" ?
              <TouchableOpacity
                onPress={() => setStatustype("Fail")}
              >
                <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>

                  <Text style={{ fontSize: 13, padding: '4%', color: '#fff' }}>Fail</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setStatustype("Fail")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 13, padding: '4%' }}>Fail</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 13, width: 18, marginTop: '6%', marginRight: '5%' }}
                  />
                </View>
              </TouchableOpacity>

          }
        </View>
      </BottomSheet >

      <BottomSheet
        modalProps={{
          animationType: 'fade',
          hardwareAccelerated: true,
          onRequestClose: () => {
            setIsVisible3(false);
          },
        }} isVisible={isVisible3}>
        <View style={{ backgroundColor: '#fff', padding: '5%' }}>
          <Text style={{ textAlign: 'center', color: '#000000', fontSize: 16, fontWeight: '500', marginBottom: '3%' }}>
            Add Message or Business Card</Text>

          <View
            style={{
              marginLeft: '10%',
              marginRight: '10%',
              flexDirection: 'row',
              // justifyContent: 'space-between'
            }}>

            {msgtype == 'Message' ?
              <TouchableOpacity style={{
                backgroundColor: '#4F46BA',
                borderRadius: 10, paddingLeft: 32, paddingRight: 32, padding: 5
              }}
                onPress={() => setMsgtype("Message")}
              >
                <Text style={{ color: '#fff', fontSize: 13 }}>Message</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={{
                  backgroundColor: '#B4B4B4',
                  borderRadius: 10, paddingLeft: 32, paddingRight: 32, padding: 5, opacity: 80
                }}
                onPress={() => setMsgtype("Message")}
              >
                <Text style={{ fontSize: 13, color: '#FFFFFF' }}>Message</Text>
              </TouchableOpacity>
            }

            <View style={{ marginLeft: '2%' }} />

            {msgtype == 'Business-Card' ?
              <TouchableOpacity style={{
                backgroundColor: '#4F46BA',
                borderRadius: 10, paddingLeft: 20, paddingRight: 20, padding: 5
              }}

                onPress={() => setMsgtype("Business-Card")}
              >

                <Text style={{ color: '#fff', fontSize: 13 }}>Business Card</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={{
                backgroundColor: '#B4B4B4',
                borderRadius: 10, paddingLeft: 20, paddingRight: 20, padding: 5, opacity: 80
              }}

                onPress={() => setMsgtype("Business-Card")}
              >
                <Text style={{ fontSize: 13, color: '#FFFFFF' }}>Business Card</Text>
              </TouchableOpacity>
            }




          </View>

          {
            msgtype == "Message" ?
              <View style={{ height: 280 }}>

                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 24, width: 15 }]}
                    source={require('../../images/mobile.png')}
                  />
                  <TextInput style={{ flex: 1 }} placeholder="Enter mobile number" />
                </View>

                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 16, width: 20, marginTop: '5%' }]}
                    source={require('../../images/mail.png')}
                  />
                  <TextInput style={{ flex: 1 }} placeholder="Email" />
                </View>

                <View style={[styles.inputFields, { paddingTop: '5%', paddingBottom: '10%' }]}>
                  <Image
                    style={[styles.icon, { height: 16, width: 20, marginTop: '5.2%' }]}
                    source={require('../../images/mail.png')}
                  />
                  <TextInput multiline={true} style={{ flex: 1 }} placeholder="Message" />
                </View>

                <TouchableOpacity
                  style={{
                    marginTop: '5%', backgroundColor: 'black',
                    padding: 10, marginLeft: '32%', marginRight: '32%', borderRadius: 10
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={require('../../images/share.png')}
                      style={{ height: 15, width: 13, marginLeft: '13%' }}
                    />
                    <Text style={{ color: '#fff', fontSize: 13, marginLeft: '10%', marginTop: '-2%' }}>Send Via</Text>
                  </View>
                </TouchableOpacity>

              </View>
              :
              <View />
          }

          {
            msgtype == "Business-Card" ?
              <View>

                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 15.41, width: 22.44, marginTop: '4%' }]}
                    source={require('../../images/leadDetail.png')}
                  />
                  <TextInput style={{ flex: 1 }} placeholder="Your Organisation Name" />
                </View>


                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 18, width: 17, marginTop: '4%' }]}
                    source={require('../../images/user.png')}
                  />
                  <TextInput style={{ flex: 1 }} placeholder="Your Name" />
                </View>

                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 24, width: 15 }]}
                    source={require('../../images/mobile.png')}
                  />
                  <TextInput style={{ flex: 1 }} placeholder="Mobile Number" />
                </View>

                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 18, width: 14, marginTop: '4%' }]}
                    source={require('../../images/address.png')}
                  />
                  <TextInput style={{ flex: 1 }} placeholder="Company Address" />
                </View>

                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 17.60, width: 17.60, marginTop: '4%' }]}
                    source={require('../../images/globe.png')}
                  />
                  <TextInput style={{ flex: 1 }} placeholder="Company URL" />
                </View>

                <TouchableOpacity
                  style={{
                    marginTop: '5%', backgroundColor: 'black',
                    padding: 10, marginLeft: '32%', marginRight: '32%', borderRadius: 10
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={require('../../images/share.png')}
                      style={{ height: 15, width: 13, marginLeft: '13%' }}
                    />
                    <Text style={{ color: '#fff', fontSize: 13, marginLeft: '10%', marginTop: '-2%' }}>Send Via</Text>
                  </View>
                </TouchableOpacity>

              </View>
              :
              <View />
          }
        </View>
      </BottomSheet >


    </View >
  );
}

