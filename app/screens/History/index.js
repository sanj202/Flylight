import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Button,
  ScrollView,
  Modal,
  Alert,
  Pressable,
  StatusBar,
  Platform
} from 'react-native';
import { Card, useTheme } from 'react-native-paper'
import styles from "./styles";
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../component/header/index'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { historyAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';

export default function lead_manager({ navigation }) {


  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedValue1, setSelectedValue1] = useState('');
  const [selectedValue2, setSelectedValue2] = useState('');

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, settext] = useState(true)

  const [dates, setDates] = useState(new Date());
  const [modes, setModes] = useState('date');
  const [shows, setShows] = useState(false);
  const [texts, settexts] = useState(true)

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    settext(false)
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
    showModes('date');
  };


  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


  const data = [
    { label: 'Select Campaign', value: 'Select Campaign' },
    { label: 'Select Campaign1', value: 'Select Campaign1' },
    { label: 'Select Campaign2', value: 'Select Campaign2' },
  ];

  const [value1, setValue1] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);


  const data1 = [
    { label: 'Select Status', value: 'Select Status' },
    { label: 'Select Status1', value: 'Select Status1' },
    { label: 'Select Status2', value: 'Select Status2' },
  ];
  const Search = () => {
    Alert.alert('Search functionality')
  }

  const Detail = () => {
    navigation.navigate('HistoryOne')
  }
  // const { width, height } = Dimensions.get('window');
  const [History, setHistory] = useState()
  const dispatch = useDispatch()
  const loginData = useSelector(state => state.auth.data)
  const historyData = useSelector(state => state.history.getHistoryList)

  useEffect(() => {
    if (loginData) {
      if (loginData.status == "success") {
        dispatch(historyAction.historyList(
          loginData.data.token,
          loginData.data.uid,
          loginData.data.cProfile.toString(),
          loginData.data.user.org_id.toString(),
          loginData.data.org_uid,
          // loginData.data.user.id.toString(),  
        ));
      }
    }
  }, [loginData])

  useEffect(() => {
    if (historyData) {
      if (historyData.status == "200") {
        console.log("sucess..........", historyData.data)
        setHistory([historyData.data])
        // dispatch(leadAction.clearResponse())
        //   Alert.alert(historyData.message)
      }
      else if (historyData.status == "failed") {
        // Alert.alert(leadList.message)
        // console.log("sucess..failed........")
      }
      else if (historyData.status == "fail") {
        Alert.alert(historyData.message)
      }
      else {

      }
    }
    else {

    }
  }, [historyData])

// console.log("Hia...................",History)

  const HistoryView = ({ item }) => {
    // console.log("item.....HistoryView..............", item)
    return (
      <TouchableOpacity
        onPress={() => Detail('Closed')}
      >
        <View style={styles.listData}>
          <View style={{ justifyContent: 'center', }}>
            <Image
              style={{ height: 48, width: 48, }}
              source={require('../../images/profileCall.png')}
            />
          </View>
          <View style={{ marginLeft: '2%', flex: 1, }}>
            <Text style={{
              fontWeight: 'bold', fontSize: 14, color: '#0F0F0F',
              fontFamily: 'Roboto'
            }}>{item.first_name} {item.last_name}</Text>

            <View style={{ flexDirection: 'row', }}>
              <Text
                style={{
                  color: 'black', fontFamily: 'Roboto',
                  fontSize: 12, color: '#0F0F0F', flexShrink: 1
                }}>
                {item.company ? item.company : 'no name'}</Text>

            </View>
            <View style={{ flexDirection: 'row', marginTop: '1%' }}>
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#0F0F0F' }}>Last Call: {moment(item.updated_at).format('LLL')}</Text>
            </View>
          </View>

          <View style={{ marginLeft: '2%', backgroundColor: '', marginTop: '1%' }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={{ height: 10, width: 10, marginRight: '2%' }}
                source={require('../../images/material-call.png')}
              />
              <Text max style={{ color: 'black', fontSize: 10 }}>{item.phone ? item.phone : ' 8596547895'}</Text>
            </View>

          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
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

      {/* <LinearGradient
        colors={['#2B6EF2', '#8DB3FF',]}

        style={{
          // flex: 1,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: "10%",
          width: "100%",
        }}
      >
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
          <Text style={{
            color: 'white', fontSize: 16,
            fontFamily: 'Roboto'
          }}>History</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
          >
            <Image
              style={styles.image2}
              source={require('../../images/Notifications.png')}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient> */}

      <Header
        // style={{ height: "16%" }}
        onPressLeft={() => {
          // navigation.OpenDrawer()
          navigation.goBack()
        }}
        title='History'
        onPressRight={() => {
          navigation.navigate('Notification')
        }}
      />

      {/* ------------------------------------------------------------------ */}

      {/* <View> */}

      {/* </View> */}

      {/* <View> */}
      {shows && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dates}
          mode={modes}
          // is24Hour={true}
          display="default"
          onChange={onChangeTo}
        />
      )}
      {/* </View> */}

      {/* ------------------------------------------------------------------------- */}



      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around', padding: '2%'
      }}>

        <TouchableOpacity
          style={{ width: '48%' }}
          onPress={showDatepicker}
        >
          <View style={styles.pickers}>
            <Image
              style={{ height: 17.50, width: 15.91, marginTop: '2%', marginRight: '5%' }}
              source={require('../../images/pikerCalander.png')}
            />

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                style={{ backgroundColor: '', marginTop: '-5%',width:'100%' }}
                value={date}
                mode={mode}
                // is24Hour={true}
                display="default"
                onChange={onChangeFrom}
              />
            )
            }
            {Platform.OS == 'ios' ? <View>
                {text == true ?
                  <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}>From</Text>
                  :
                  <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}></Text>
                }
              </View>
              :
              <View>
                {text == true ?
                  <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}>From</Text>
                  :
                  <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}>{moment(date).format('MM/DD/YYYY')}</Text>
                }
              </View>
            }



          </View>
        </TouchableOpacity>


        <TouchableOpacity
          style={{ width: '48%' }}
          onPress={showDatepickers}
        >
          <View style={styles.pickers}>
            <Image
              style={{ height: 17.50, width: 15.91, marginTop: '2%', marginRight: '5%' }}
              source={require('../../images/pikerCalander.png')}
            />
            {texts == true ?
              <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}>To</Text>
              :
              <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}>{moment(dates).format('MM/DD/YYYY')}</Text>
            }
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: '2%', marginTop: '-2%' }}>
        <Dropdown
          style={[styles.dropdown3, { width: '48%' }, isFocus && { borderColor: '' }]}
          placeholderStyle={styles.placeholderStyle3}
          selectedTextStyle={styles.selectedTextStyle3}
          // inputSearchStyle={styles.inputSearchStyle3}
          iconStyle={styles.iconStyle3}
          data={data}
          // search
          maxHeight={160}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Campaign' : '...'}
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
                style={{ height: 21, width: 16, marginRight: '5%' }}
              />
            </View>
          )}
        />

        <Dropdown
          style={[styles.dropdown3, { width: '48%' }, isFocus && { borderColor: '' }]}
          placeholderStyle={styles.placeholderStyle3}
          selectedTextStyle={styles.selectedTextStyle3}
          // inputSearchStyle={styles.inputSearchStyle3}
          iconStyle={styles.iconStyle3}
          data={data1}
          // search
          maxHeight={160}
          labelField="label"
          valueField="value"
          placeholder={!isFocus1 ? 'Select Status' : '...'}
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
                source={require('../../images/statusnet.png')}
                style={{ height: 21.08, width: 22.71, marginRight: '5%' }}
              />
            </View>
          )}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => Search()}>
        <Text style={[styles.textButton, { fontWeight: 'bold', fontSize: 17 }]}>SEARCH</Text>
      </TouchableOpacity>

      {/* <View style={{ backgroundColor: 'red', height: 20 }}></View> */}
{
        History == [] || [null] ? 
        <View></View>
        :
        <FlatList
        // style={{ height: height / 1.55 }}
        data={History}
        renderItem={HistoryView}
      />
}
   
      {/* <View style={{ marginTop: '2.5%' }}>
        <TouchableOpacity
          onPress={() => Detail('New')}
        >
          <View style={styles.listData}>
            <Image
              style={{ height: 48, width: 48, marginTop: '2%', marginRight: '2%' }}
              source={require('../../images/profileCall.png')}
            />
            <View style={{ marginLeft: '-10%' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Roboto', color: '#0F0F0F' }}>Johne Doe</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#565656', fontSize: 12, fontFamily: 'Roboto' }}>SMT Group</Text>
                <Text style={{
                  color: '#fff', backgroundColor: '#F69708', paddingLeft: 10, paddingRight: 10,
                  padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 10
                }}>New</Text>
              </View>
              <Text style={{ fontWeight: '500', fontSize: 11, color: '#0F0F0F' }}>Last Call: Sep 17, 15:24PM</Text>

            </View>

            <View style={{ flexDirection: 'row', marginLeft: '-3%' }}>
              <Image
                style={{ height: 10, width: 10, marginRight: '3%', marginTop: '5%' }}
                source={require('../../images/material-call.png')}
              />
              <Text style={{ marginTop: '4%', color: '#0F0F0F', fontSize: 10 }}>+91 1234567890</Text>

            </View>
          </View>
        </TouchableOpacity>
      </View> */}

      {/* <ScrollView>

        <View style={{ marginTop: '2.5%' }}>
          <TouchableOpacity
            onPress={() => Detail('New')}
          >
            <View style={styles.listData}>
              <Image
                style={{ height: 48, width: 48, marginTop: '2%', marginRight: '2%' }}
                source={require('../../images/profileCall.png')}
              />
              <View style={{ marginLeft: '-10%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Roboto', color: '#0F0F0F' }}>Johne Doe</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#565656', fontSize: 12, fontFamily: 'Roboto' }}>SMT Group</Text>
                  <Text style={{
                    color: '#fff', backgroundColor: '#F69708', paddingLeft: 10, paddingRight: 10,
                    padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 10
                  }}>New</Text>
                </View>
                <Text style={{ fontWeight: '500', fontSize: 11, color: '#0F0F0F' }}>Last Call: Sep 17, 15:24PM</Text>

              </View>

              <View style={{ flexDirection: 'row', marginLeft: '-3%' }}>
                <Image
                  style={{ height: 10, width: 10, marginRight: '3%', marginTop: '5%' }}
                  source={require('../../images/material-call.png')}
                />
                <Text style={{ marginTop: '4%', color: '#0F0F0F', fontSize: 10 }}>+91 1234567890</Text>

              </View>
            </View>
          </TouchableOpacity>
        </View>


        <View style={{ marginTop: '-1%' }}>
          <TouchableOpacity
            onPress={() => Detail('Hold')}
          >

            <View style={styles.listData}>
              <Image
                style={{ height: 48, width: 48, marginTop: '2%', marginRight: '2%' }}
                source={require('../../images/profileCall.png')}
              />
              <View style={{ marginLeft: '-10%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Roboto', color: '#0F0F0F' }}>Johne Doe</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#565656', fontSize: 12, fontFamily: 'Roboto' }}>SMT Group</Text>
                  <Text style={{
                    color: '#fff', backgroundColor: '#608EE9', paddingLeft: 10, paddingRight: 10,
                    padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 10
                  }}>Hold</Text>
                </View>
                <Text style={{ fontWeight: '500', fontSize: 11, color: '#0F0F0F' }}>Last Call: Sep 17, 15:24PM</Text>

              </View>

              <View style={{ flexDirection: 'row', marginLeft: '-3%' }}>
                <Image
                  style={{ height: 10, width: 10, marginRight: '3%', marginTop: '5%' }}
                  source={require('../../images/material-call.png')}
                />
                <Text style={{ marginTop: '4%', color: '#0F0F0F', fontSize: 10 }}>+91 1234567890</Text>

              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: '-1%' }}>
          <TouchableOpacity
            onPress={() => Detail('DND')}
          >
            <View style={styles.listData}>
              <Image
                style={{ height: 48, width: 48, marginTop: '2%', marginRight: '2%' }}
                source={require('../../images/profileCall.png')}
              />
              <View style={{ marginLeft: '-10%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Roboto', color: '#0F0F0F' }}>Johne Doe</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#565656', fontSize: 12, fontFamily: 'Roboto' }}>SMT Group</Text>
                  <Text style={{
                    color: '#fff', backgroundColor: '#FF0000', paddingLeft: 10, paddingRight: 10,
                    padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 10
                  }}>DND</Text>
                </View>
                <Text style={{ fontWeight: '500', fontSize: 11, color: '#0F0F0F' }}>Last Call: Sep 17, 15:24PM</Text>

              </View>

              <View style={{ flexDirection: 'row', marginLeft: '-3%' }}>
                <Image
                  style={{ height: 10, width: 10, marginRight: '3%', marginTop: '5%' }}
                  source={require('../../images/material-call.png')}
                />
                <Text style={{ marginTop: '4%', color: '#0F0F0F', fontSize: 10 }}>+91 1234567890</Text>

              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: '-1%' }}>
          <TouchableOpacity
            onPress={() => Detail('Closed')}
          >
            <View style={styles.listData}>
              <Image
                style={{ height: 48, width: 48, marginTop: '2%', marginRight: '2%' }}
                source={require('../../images/profileCall.png')}
              />
              <View style={{ marginLeft: '-10%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Roboto', color: '#0F0F0F' }}>Johne Doe</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#565656', fontSize: 12, fontFamily: 'Roboto' }}>SMT Group</Text>
                  <Text style={{
                    color: '#fff', backgroundColor: '#05B829', paddingLeft: 10, paddingRight: 10,
                    padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 10
                  }}>Closed</Text>
                </View>
                <Text style={{ fontWeight: '500', fontSize: 11, color: '#0F0F0F' }}>Last Call: Sep 17, 15:24PM</Text>

              </View>

              <View style={{ flexDirection: 'row', marginLeft: '-3%' }}>
                <Image
                  style={{ height: 10, width: 10, marginRight: '3%', marginTop: '5%' }}
                  source={require('../../images/material-call.png')}
                />
                <Text style={{ marginTop: '4%', color: '#0F0F0F', fontSize: 10 }}>+91 1234567890</Text>

              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: '-1%' }}>
          <TouchableOpacity
            onPress={() => Detail('Closed')}
          >
            <View style={styles.listData}>
              <Image
                style={{ height: 48, width: 48, marginTop: '2%', marginRight: '2%' }}
                source={require('../../images/profileCall.png')}
              />
              <View style={{ marginLeft: '-10%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Roboto', color: '#0F0F0F' }}>Johne Doe</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#565656', fontSize: 12, fontFamily: 'Roboto' }}>SMT Group</Text>
                  <Text style={{
                    color: '#fff', backgroundColor: '#05B829', paddingLeft: 10, paddingRight: 10,
                    padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 10
                  }}>Closed</Text>
                </View>
                <Text style={{ fontWeight: '500', fontSize: 11, color: '#0F0F0F' }}>Last Call: Sep 17, 15:24PM</Text>

              </View>

              <View style={{ flexDirection: 'row', marginLeft: '-3%' }}>
                <Image
                  style={{ height: 10, width: 10, marginRight: '3%', marginTop: '5%' }}
                  source={require('../../images/material-call.png')}
                />
                <Text style={{ marginTop: '4%', color: '#0F0F0F', fontSize: 10 }}>+91 1234567890</Text>

              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: '-1%' }}>
          <TouchableOpacity
            onPress={() => Detail('Closed')}
          >
            <View style={styles.listData}>
              <Image
                style={{ height: 48, width: 48, marginTop: '2%', marginRight: '2%' }}
                source={require('../../images/profileCall.png')}
              />
              <View style={{ marginLeft: '-10%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Roboto', color: '#0F0F0F' }}>Johne Doe</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#565656', fontSize: 12, fontFamily: 'Roboto' }}>SMT Group</Text>
                  <Text style={{
                    color: '#fff', backgroundColor: '#05B829', paddingLeft: 10, paddingRight: 10,
                    padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 10
                  }}>Closed</Text>
                </View>
                <Text style={{ fontWeight: '500', fontSize: 11, color: '#0F0F0F' }}>Last Call: Sep 17, 15:24PM</Text>

              </View>

              <View style={{ flexDirection: 'row', marginLeft: '-3%' }}>
                <Image
                  style={{ height: 10, width: 10, marginRight: '3%', marginTop: '5%' }}
                  source={require('../../images/material-call.png')}
                />
                <Text style={{ marginTop: '4%', color: '#0F0F0F', fontSize: 10 }}>+91 1234567890</Text>

              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView> */}
    </View >
  );
}


