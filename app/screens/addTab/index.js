import React, { useState, useEffect } from 'react';
import {

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
  Touchable
} from 'react-native';
import styles from './styles';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheet, Button, ListItem } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function AddContact({ navigation }) {


  const [isVisible, setIsVisible] = useState(false);
  const [actiontype, setActiontype] = useState('Select Call Action')

  const [isVisible1, setIsVisible1] = useState(false);
  // record

  const [isVisible2, setIsVisible2] = useState(false);
  const [statustype, setStatustype] = useState('Select State')

  const [isVisible3, setIsVisible3] = useState(false);
  const [msgtype, setMsgtype] = useState('Message')

  const [isVisible4, setIsVisible4] = useState(false);


  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [dates, setDates] = useState(new Date());
  const [modes, setModes] = useState('date');
  const [shows, setShows] = useState(false);

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
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


  return (
    <View style={{ flex: 1 }}>
      <View
        style={styles.headerView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '5%',
          }}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
          >
            <Image
              style={styles.image2}
              source={require('../../images/home.png')}
            />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 20 }}>Record Feedback</Text>
          <TouchableOpacity>
            <Image
              style={styles.image2}
              source={require('../../images/Notifications.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={{ margin: '5%' }}>
          <View style={styles.inputFields}>
            <Image
              style={styles.icon}
              source={require('../../images/user.png')}
            />
            <TextInput style={{ flex: 1 }} placeholder="First name" />
          </View>

          <View style={styles.inputFields}>
            <Image
              style={styles.icon}
              source={require('../../images/user.png')}
            />
            <TextInput style={{ flex: 1 }} placeholder="Last name" />
          </View>

          <View style={styles.inputFields}>
            <Image
              style={styles.icon}
              source={require('../../images/DOB.png')}
            />
            <TextInput style={{ flex: 1 }} placeholder="Follow Up Date" />
          </View>

          <View style={styles.inputFields}>
            <Image
              style={[styles.icon, { width: 24 }]}
              source={require('../../images/clockIcon.png')}
            />
            <TextInput style={{ flex: 1 }} placeholder="Follow Up Time" />
          </View>

          <View style={styles.inputFields}>
            <Image
              style={[styles.icon, { height: 28, width: 17 }]}
              source={require('../../images/mobile.png')}
            />
            <TextInput style={{ flex: 1 }} placeholder="Enter mobile number" />
          </View>


          <View style={{
            // flexDirection: 'row',
            borderWidth: 1,
            padding: 5,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            marginTop: '2%',
          }}>
            <TouchableOpacity
              style={{ paddingTop: '2%', paddingBottom: '2%' }}
              onPress={() => setIsVisible(true)}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={[styles.icon, { height: 28, width: 17 }]}
                    source={require('../../images/mobile.png')}
                  />
                  <Text style={{ marginTop: '5%', fontSize: 16, marginLeft: '2%' }}>{actiontype}</Text>
                </View>

                <View style={{ marginTop: '5%', }}>
                  <Image
                    style={{ height: 7, width: 12, marginRight: '5%' }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{
            // flexDirection: 'row',
            borderWidth: 1,
            padding: 5,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            marginTop: '2%',
          }}>
            <TouchableOpacity
              style={{ paddingTop: '2%', paddingBottom: '2%' }}
              onPress={() => setIsVisible2(true)}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={[styles.icon, { height: 28, width: 23, marginTop: '1%' }]}
                    source={require('../../images/state.png')}
                  />
                  <Text style={{ marginTop: '5%', fontSize: 16, marginLeft: '2%' }}> {statustype} </Text>
                </View>

                <View style={{ marginTop: '5%', }}>
                  <Image
                    style={{ height: 7, width: 12, marginRight: '5%' }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{
            // flexDirection: 'row',
            borderWidth: 1,
            padding: 5,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            marginTop: '2%',
          }}>
            <TouchableOpacity
              style={{ paddingTop: '2%', paddingBottom: '2%' }}
              onPress={() => setIsVisible4(true)}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={[styles.icon, { height: 23, width: 23, marginTop: '4%' }]}
                    source={require('../../images/info.png')}
                  />
                  <Text style={{ marginTop: '5%', fontSize: 16, marginLeft: '2%' }}> Task </Text>
                </View>

                <View style={{ marginTop: '5%', }}>
                  <Image
                    style={{ height: 7, width: 12, marginRight: '5%' }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{
            // flexDirection: 'row',
            borderWidth: 1,
            padding: 5,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            marginTop: '2%',
          }}>
            <TouchableOpacity
              style={{ paddingTop: '2%', paddingBottom: '2%' }}
              onPress={() => setIsVisible1(true)}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../../images/list.png')}
                    style={{ height: 28, width: 20, marginRight: '2%' }}
                  />
                  <Text style={{ marginTop: '5%', fontSize: 16, marginLeft: '2%' }}> Note </Text>
                </View>

                <View style={{ marginTop: '5%', }}>
                  <Image
                    style={{ height: 7, width: 12, marginRight: '5%' }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>


          <View style={{
            // flexDirection: 'row',
            borderWidth: 1,
            padding: 5,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            marginTop: '2%',
          }}>
            <TouchableOpacity
              style={{ paddingTop: '2%', paddingBottom: '2%' }}
              onPress={() => setIsVisible3(true)}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={[styles.icon, { height: 20, width: 25, marginTop: '4%' }]}
                    source={require('../../images/mail.png')}
                  />
                  <Text style={{ marginTop: '5%', fontSize: 16, marginLeft: '2%' }}>Message</Text>
                </View>

                <View style={{ marginTop: '5%', }}>
                  <Image
                    style={{ height: 7, width: 12, marginRight: '5%' }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>




          {/* <View style={{
            // flexDirection: 'row',
            borderWidth: 1,
            padding: 5,
            borderColor: '#C3C7E5',
            borderRadius: 10,
            marginTop: '2%',
           }}>
            <TouchableOpacity
              style={{ paddingTop: '2%', paddingBottom: '2%' }}
              onPress={() => setIsVisible2(true)}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                <Image
                  style={[styles.icon, { height: 28, width: 23, marginTop: '1%' }]}
                  source={require('../../images/state.png')}
                />
                  <Text style={{ marginTop: '5%', fontSize: 16, marginLeft: '2%' }}> {statustype} </Text>
                </View>

                <View style={{ marginTop: '5%', }}>
                  <Image
                    style={{ height: 7, width: 12, marginRight: '5%' }}
                    source={require('../../images/arrow_down.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>


          <Dropdown
            style={[styles.dropdown3, { marginTop: '2%' }, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle3}
            selectedTextStyle={styles.selectedTextStyle3}
            // inputSearchStyle={styles.inputSearchStyle3}
            iconStyle={styles.iconStyle3}
            data={data}
            // search
            maxHeight={160}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Task' : '...'}
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
                  style={[styles.icon, { height: 23, width: 23, marginTop: '4%' }]}
                  source={require('../../images/info.png')}
                />
              </View>
            )}
          />


          <Dropdown
            style={[styles.dropdown3, { marginTop: '2%' }, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle3}
            selectedTextStyle={styles.selectedTextStyle3}
            // inputSearchStyle={styles.inputSearchStyle3}
            iconStyle={styles.iconStyle3}
            data={data}
            // search
            maxHeight={160}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Note' : '...'}
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
                  source={require('../../images/list.png')}
                  style={{ height: 28, width: 20, marginRight: '2%' }}
                />
              </View>
            )}
          />

          <Dropdown
            style={[styles.dropdown3, { marginTop: '2%' }, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle3}
            selectedTextStyle={styles.selectedTextStyle3}
            // inputSearchStyle={styles.inputSearchStyle3}
            iconStyle={styles.iconStyle3}
            data={data}
            // search
            maxHeight={160}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Message' : '...'}
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
                  style={[styles.icon, { height: 20, width: 25, marginTop: '4%' }]}
                  source={require('../../images/mail.png')}
                />
              </View>
            )}
          /> */}


          <TouchableOpacity style={styles.button}
          // onPress={() => setModalVisible2(true)}
          >
            <Text style={styles.textButton}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>


      <BottomSheet
        modalProps={{
          animationType: 'fade',
          hardwareAccelerated: true,
          onRequestClose: () => {
            setIsVisible(false);
          },
        }} isVisible={isVisible}>
        <View style={{ backgroundColor: '#fff', padding: '5%' }}>

          <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', marginBottom: '3%' }}>Select your call action</Text>
          {
            actiontype == "Interested" ?
              <TouchableOpacity
                onPress={() => setActiontype("Interested")}
              >
                <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>

                  <Text style={{ fontSize: 16, padding: '4%' }}>Interested</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setActiontype("Interested")}
              >
                <View style={[styles.actionSheet,]}>

                  <Text style={{ fontSize: 16, padding: '4%' }}>Interested</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
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

                  <Text style={{ fontSize: 16, padding: '4%' }}>Not Interested</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :

              <TouchableOpacity
                onPress={() => setActiontype("NotInterested")}
              >
                <View style={[styles.actionSheet]}>
                  <Text style={{ fontSize: 16, padding: '4%' }}>Not Interested</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
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

                  <Text style={{ fontSize: 16, padding: '4%' }}>Busy</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setActiontype("Busy")}
              >
                <View style={[styles.actionSheet]}>
                  <Text style={{ fontSize: 16, padding: '4%' }}>Busy</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
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

                  <Text style={{ fontSize: 16, padding: '4%' }}>Callback</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setActiontype("Callback")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 16, padding: '4%' }}>Callback</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
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

                  <Text style={{ fontSize: 16, padding: '4%' }}>Opportunity</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setActiontype("Opportunity")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 16, padding: '4%' }}>Opportunity</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
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

                  <Text style={{ fontSize: 16, padding: '4%' }}>Wrong Number</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setActiontype("WrongNumber")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 16, padding: '4%' }}>Wrong Number</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
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

                  <Text style={{ fontSize: 16, padding: '4%' }}>No Answer</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setActiontype("NoAnswer")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 16, padding: '4%' }}>No Answer</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
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
          <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', marginBottom: '3%' }}>Note Your Record</Text>
          <Image
            source={require('../../images/mic.png')}
            style={{ alignSelf: 'center', width: 70, height: 70 }}
          />
          <TouchableOpacity style={{ backgroundColor: '#2FC204', marginLeft: '35%', marginRight: '35%', marginTop: '3%', borderRadius: 10 }}>
            <Text style={{ fontSize: 20, color: '#fff', padding: 5, textAlign: 'center' }}>Save</Text>
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
          <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', marginBottom: '3%' }}>Select date your task</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: '2%' , }}>

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
          </TouchableOpacity>


          <TouchableOpacity
            onPress={showDatepickers}
          >
            <View style={styles.pickers}>
              <Image
                style={{ height: 22, width: 22, marginTop: '2%', marginRight: '2%' }}
                source={require('../../images/clockIcon.png')}
              />
              <Text style={{ marginTop: '5%' }}>{moment(dates).format("HH:MM")}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ backgroundColor: '#114DC4', marginLeft: '35%', marginRight: '35%', marginTop: '3%', borderRadius: 10 }}>
            <Text style={{ fontSize: 20, color: '#fff', padding: 5, textAlign: 'center' }}>Set Task</Text>
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
        <View style={{ backgroundColor: '#fff', padding: '5%' }}>
          <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', marginBottom: '3%' }}>Select Status</Text>
          {
            statustype == "New" ?
              <TouchableOpacity
                onPress={() => setStatustype("New")}
              >
                <View style={[styles.actionSheet, { backgroundColor: '#24BCFF' }]}>

                  <Text style={{ fontSize: 16, padding: '4%' }}>New</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setStatustype("New")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 16, padding: '4%' }}>New</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
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

                  <Text style={{ fontSize: 16, padding: '4%' }}>In-Progress</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setStatustype("In-Progress")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 16, padding: '4%' }}>In-Progress</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
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

                  <Text style={{ fontSize: 16, padding: '4%' }}>Success</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setStatustype("Success")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 16, padding: '4%' }}>Success</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
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

                  <Text style={{ fontSize: 16, padding: '4%' }}>Fail</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
                  />

                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setStatustype("Fail")}
              >
                <View style={[styles.actionSheet]}>

                  <Text style={{ fontSize: 16, padding: '4%' }}>Fail</Text>
                  <Image
                    source={require('../../images/white_check.png')}
                    style={{ height: 15, width: 22, marginTop: '6%', marginRight: '5%' }}
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
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: '3%' }}>
            Add Message or Business Card</Text>

          <View
            style={{
              marginLeft: '10%',
              marginRight: '10%',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>

            {msgtype == 'Message' ?
              <TouchableOpacity style={{
                backgroundColor: '#4F46BA',
                borderRadius: 10, paddingLeft: 20, paddingRight: 20, padding: 5
              }}
                onPress={() => setMsgtype("Message")}
              >
                <Text style={{ color: '#fff', fontSize: 15 }}>Message</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setMsgtype("Message")}
              >
                <Text style={{ paddingLeft: 20, paddingRight: 20, padding: 5, fontSize: 15 }}>Message</Text>
              </TouchableOpacity>
            }

            {msgtype == 'Business-Card' ?
              <TouchableOpacity style={{
                backgroundColor: '#4F46BA',
                borderRadius: 10, paddingLeft: 20, paddingRight: 20, padding: 5
              }}

                onPress={() => setMsgtype("Business-Card")}
              >

                <Text style={{ color: '#FFF', fontSize: 15 }}>Business Card</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => setMsgtype("Business-Card")}
              >
                <Text style={{ paddingLeft: 20, paddingRight: 20, padding: 5, fontSize: 15 }}>Business Card</Text>
              </TouchableOpacity>
            }




          </View>

          {
            msgtype == "Message" ?
              <View>

                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 28, width: 17 }]}
                    source={require('../../images/mobile.png')}
                  />
                  <TextInput style={{ flex: 1 }} placeholder="Enter mobile number" />
                </View>

                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 20, width: 25, marginTop: '4%' }]}
                    source={require('../../images/mail.png')}
                  />
                  <TextInput style={{ flex: 1 }} placeholder="Email" />
                </View>

                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 20, width: 25, marginTop: '4%' }]}
                    source={require('../../images/mail.png')}
                  />
                  <TextInput style={{ flex: 1 }} placeholder="Message" />
                </View>
              </View>
              :
              <View />
          }

          {
            msgtype == "Business-Card" ?
              <View>

                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 20, width: 28, marginTop: '4%' }]}
                    source={require('../../images/leadDetail.png')}
                  />
                  <TextInput style={{ flex: 1 }} placeholder="Your Organisation Name" />
                </View>


                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 24, width: 21, marginTop: '4%' }]}
                    source={require('../../images/user.png')}
                  />
                  <TextInput style={{ flex: 1 }} placeholder="Your Name" />
                </View>

                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 28, width: 17 }]}
                    source={require('../../images/mobile.png')}
                  />
                  <TextInput style={{ flex: 1 }} placeholder="Mobile Number" />
                </View>

                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 25, width: 19, marginTop: '4%' }]}
                    source={require('../../images/address.png')}
                  />
                  <TextInput style={{ flex: 1 }} placeholder="Company Address" />
                </View>

                <View style={styles.inputFields}>
                  <Image
                    style={[styles.icon, { height: 22, width: 22, marginTop: '4%' }]}
                    source={require('../../images/globe.png')}
                  />
                  <TextInput style={{ flex: 1 }} placeholder="Company URL" />
                </View>

                <TouchableOpacity
                  style={{ marginTop: '5%', backgroundColor: 'black', padding: 10, marginLeft: '32%', marginRight: '32%', borderRadius: 10 }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Image
                      source={require('../../images/share.png')}
                      style={{ height: 18, width: 18 }}
                    />
                    <Text style={{ color: '#fff', fontSize: 15 }}>Send Via</Text>
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

