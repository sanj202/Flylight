import React, { useState, useEffect } from 'react';
import {
  Text, View, Pressable, TouchableOpacity, ActivityIndicator, Image, Alert, StatusBar, SafeAreaView,
  Platform, FlatList, Linking, Dimensions ,ToastAndroid
} from 'react-native';
import styles from './styles';
import Header from '../../component/header';
import { useDispatch, useSelector, connect } from 'react-redux';
import { leadmanagerAction, historyAction } from '../../redux/Actions/index'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';

export default function LeadAll({ navigation, route }) {
  const [IsLodding, setIsLodding] = useState(true)
  const [leadList, setleadList] = useState('')
  const [isService, setisService] = useState(route.params ? route.params.value : 'All');
  const [isFocus, setIsFocus] = useState(false);
  const [statusList, setstatusList] = useState([])
  const [statusId, setstatusId] = useState(null);
  const [status, setstatus] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  const dispatch = useDispatch()
  const UserData = useSelector(state => state.auth.data)
  const Leads = useSelector(state => state.leadmanager.GetList)
  const LeadData = useSelector(state => state.history.leadData)
  const { width, height } = Dimensions.get('window');
  const [page, setPage] = useState(0);
  const [results, setResults] = useState(40);

  const [startDate, setstartDate] = useState(new Date());
  const [startmode, setstartMode] = useState('date');
  const [startshow, setstartshow] = useState(false);
  const [starttext, setstarttext] = useState(true)

  const onChangeFrom = (event, selectedDate) => {
    // console.log(event)
    if (event.type == 'dismissed') {
      setstartshow(!startshow);
    }
    else {
      console.log('date selected ')
      const currentDate = selectedDate || startDate;
      setstartshow(Platform.OS === 'ios' ? true : false);
      setstartDate(currentDate)
      setstarttext(false)
    }
  };
  const Mode = (currentMode) => {
    setstartshow(!startshow);
    setstartMode(currentMode);
  };
  const showDatepicker = () => {
    Mode('date');
  };

  const [enddate, setendDate] = useState(new Date());
  const [endmode, setendMode] = useState('date');
  const [endshow, setendShow] = useState(false);
  const [endtext, setendtext] = useState(true)

  const onChangeendDate = (event, selectedDate) => {
    if (event.type == 'dismissed') {
      setendShow(!endshow);
    }
    else {
      console.log('date selected ')
      const currentDate = selectedDate || enddate;
      setendShow(Platform.OS === 'ios' ? true : false);
      setendDate(currentDate)
      setendtext(false)
    }
  };
  const setEMode = (currentMode) => {
    setendShow(!endshow);
    setendMode(currentMode);
  };
  const showEDatepicker = () => {
    setEMode('date');
  };

  useEffect(() => {
    setIsLodding(true)
    if (UserData.status == "success") {
      FetchData()
    }
  }, [UserData])

  const FetchData = () => {
    let data = {
      uid: UserData.data.uid,
      org_uid: UserData.data.org_uid,
      profile_id: UserData.data.cProfile.toString(),
      pageSize: results,
      pageNumber: page,
      filters: []
    }
    setIsLodding(true)
    dispatch(historyAction.LeadStatusList(data, UserData.data.token));
    if (isService == 'Called') {
      setIsLodding(true)
      data.filters.push({ eq: "called", key: "status" })
      dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
    }
    else if (isService == 'Pending') {
      setIsLodding(true)
      data.filters.push({ eq: "pending", key: "status" })
      dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
    }
    else {
      setIsLodding(true)
      dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
    }
  }

  useEffect(() => {
    if (Leads) {
      if (Leads.status == "success") {
          setleadList(Leads.data)
          setIsLodding(false)
        // setleadList(Leads.data)
        dispatch(leadmanagerAction.clearResponse())
        // setIsLodding(false)
      }
      else if (Leads.status == "failed") {
        ToastAndroid.show(Leads.message, ToastAndroid.SHORT);
        setIsLodding(false)
        dispatch(leadmanagerAction.clearResponse())
      }
      else {

      }
    }
    else {
    }
  }, [Leads])

  useEffect(() => {
    if (LeadData) {
      if (LeadData.status == "200") {
        setstatusList(
          LeadData.data !== undefined && LeadData.data.map((item, index) =>
            item ? { label: item.name, value: item.id } : { label: 'None', value: 'None' })
        )
        setIsLodding(false)
      }
      else if (LeadData.status == "failed") {
        setIsLodding(false)
        // Alert.alert(LeadData.message)
        ToastAndroid.show(LeadData.message, ToastAndroid.SHORT);
      }
      else if (LeadData.status == "fail") {
        setIsLodding(false)
        // Alert.alert(LeadData.message)
        ToastAndroid.show(LeadData.message, ToastAndroid.SHORT);
      }
      else {
      }
    }
  }, [LeadData])

  const call = (value) => {
    let phoneNumber = value.phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${value.phone}`;
    } else {
      phoneNumber = `tel:${value.phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          // Alert.alert("Number is not available");
          ToastAndroid.show("Number is not available", ToastAndroid.SHORT);
        } else {
          let data = {
            uid: UserData.data.uid,
            org_uid: UserData.data.org_uid,
            profile_id: UserData.data.cProfile.toString(),
            lead_id: value.id,
            call_status: 'called',
            lead_status: value.lead_status,
            message: value.description,
          }
          dispatch(leadmanagerAction.Editlead(data, UserData.data.token));
          navigation.navigate('RecordFeedback', { data: value })
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };

  const checkValue = (value) => {
    setisService(value)
    let data = {
      uid: UserData.data.uid,
      org_uid: UserData.data.org_uid,
      profile_id: UserData.data.cProfile.toString(),
      pageSize: results,
      pageNumber: page,
      filters: []
    }
    if (value == 'Called') {
      setIsLodding(true)
      data.filters.push({ eq: "called", key: "status" })
      dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
    }
    else if (value == 'Pending') {
      setIsLodding(true)
      data.filters.push({ eq: "pending", key: "status" })
      dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
    }
    else {
      setIsLodding(true)
      dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
    }
  }

  const statusSelect = (item) => {
    setstatus(item.label)
    setstatusId(item.value);
    setIsFocus1(false);
  }

  const Search = () => {
    let StartDate = moment(startDate).format("YYYY-MM-DD")
    let EndDate = moment(enddate).format("YYYY-MM-DD")
    let data = {
      uid: UserData.data.uid,
      org_uid: UserData.data.org_uid,
      profile_id: UserData.data.cProfile.toString(),
      pageSize: results,
      pageNumber: page,
      filters: []
    }
    if (starttext == false || endtext == false || statusId !== null) {
      if (StartDate !== EndDate) {
        if (starttext == true) {
          ToastAndroid.show("Please Select Start Date", ToastAndroid.SHORT);
        }
        else if (endtext == true) {
          ToastAndroid.show("Please Select End Date", ToastAndroid.SHORT);
        }
        else {
          if (StartDate <= EndDate) {
            setIsLodding(true)
            data.filters.push({ gte: StartDate, key: 'created_at' },
              { lte: EndDate, key: 'created_at' })
              dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
          }
          else {
            ToastAndroid.show("Wrong Format", ToastAndroid.SHORT);
          }
        }
      }
      else if (StartDate == EndDate && starttext == false && endtext == false){
        setIsLodding(true)
        data.filters.push({ gte: StartDate, key: 'created_at' },
          { lte: EndDate, key: 'created_at' })
          dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
      }
      if (statusId !== null) {
        setIsLodding(true)
        data.filters.push({ eq: status, key: 'lead_status' })
        dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
      }
      if (isService == 'Called') {
        setIsLodding(true)
        data.filters.push({ eq: "called", key: "status" })
        dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
      }
      else if (isService == 'Pending') {
        setIsLodding(true)
        data.filters.push({ eq: "pending", key: "status" })
        dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
      }
      else {
        // setIsLodding(true)
        // dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
      }
      // dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
    }
    else {
      // Alert.alert('Please Select Any One Filter Key')
    }
    console.log(data)
  }

  const Reset = () => {
    setstarttext(true)
    setendtext(true)
    setstatusId(null)
    setstatus(null)
    setstartDate(new Date())
    setendDate(new Date())
    setIsLodding(true)
    setPage(0)
    let data = {
      uid: UserData.data.uid,
      org_uid: UserData.data.org_uid,
      profile_id: UserData.data.cProfile.toString(),
      pageSize: results,
      pageNumber: page,
      filters: []
    }
    if (isService == 'Called') {
      setIsLodding(true)
      data.filters.push({ eq: "called", key: "status" })
      dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
    }
    else if (isService == 'Pending') {
      setIsLodding(true)
      data.filters.push({ eq: "pending", key: "status" })
      dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
    }
    else {
      setIsLodding(true)
      dispatch(leadmanagerAction.lead_OpprtunityList(data, UserData.data.token));
    }
  }


  // let stopFetchMore = true;

  // const handleOnEndReached = async () => {
  //   setIsLodding(true);
  //   console.log('call ...handleOnEndReached ',stopFetchMore)
  //   if (!stopFetchMore) {
  //     setPage(page + 1);
  //     FetchData()
  //     stopFetchMore = true;
  //   }
  //   setIsLodding(false);
  // };

  const fetchNextItems = () => {
    console.log(results)
    if (results > 10) {
      setPage(page + 1);
      FetchData()
    } else {
      console.log('no data ')
      return
    }
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        // onPress={() => navigation.navigate('LeadDetail', { item: item })}
      >
        <View
          style={styles.listData}
        >
          <View style={{ backgroundColor: '', justifyContent: 'center', }}>
            <Image
              style={{ height: 48, width: 48, }}
              source={require('../../images/profileCall.png')}
            />
          </View>
          <View style={{ marginLeft: '2%', flex: 1, backgroundColor: '', }}>
            <Text style={{
              fontWeight: 'bold', fontSize: 14, color: '#0F0F0F',
              fontFamily: 'Roboto'
            }}>{item.first_name} {item.last_name}</Text>
            <View style={{ flexDirection: 'row', }}>
              <View style={{ width: '35%', backgroundColor: '' }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: 'black', fontFamily: 'Roboto',
                    fontSize: 12, color: '#0F0F0F', flexShrink: 1
                  }}>
                  {item.company}</Text>
              </View>
              {item.status == 'pending' ?
                <View style={{ backgroundColor: '#F69708', paddingHorizontal: '3%', paddingVertical: '1%', borderRadius: 10 }}>
                  <Text style={{ color: '#fff' }}>{item.status}</Text>
                </View>
                :
                <View style={{ backgroundColor: '#05B829', paddingHorizontal: '3%', paddingVertical: '1%', borderRadius: 10 }}>
                  <Text style={{ color: '#fff' }}>{item.status}</Text>
                </View>}
            </View>
            <View style={{ flexDirection: 'row', }}>
              <Text max style={{ color: 'black', fontSize: 10 }}>{item.phone}</Text>
            </View>
          </View>
          {/* <View style={{ marginLeft: '2%', backgroundColor: '', marginTop: '1%' }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ marginLeft: '2%' }}
                onPress={() => call(item)}
              >
                <Image style={{ height: 40, width: 40, }}
                  source={require('../../images/GroupCall.png')} />
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  }



  return (
    <View style={[styles.container, { width: width, height: height }]}>
      <Header
        style={Platform.OS == 'ios' ?
          { height: "18%" } :
          {}}
        title='Leads'
        renderLeft={() => {
          return (
            <Image
              source={require('../../images/home.png')}
              style={{ width: 28, height: 28 }} />
          );
        }}
        onPressLeft={() => {
          // navigation.goBack()
          navigation.openDrawer()
        }}

        renderRight={() => {
          return (
            <Image
              source={require('../../images/Notifications.png')}
              style={{ width: 28, height: 28 }} />
          );
        }}
        onPressRight={() => {
          navigation.navigate('Notification')
        }}
      />
      <View style={styles.tabStyle}>
        {isService == 'All' ?
          <Pressable
            style={[styles.tabButton, { backgroundColor: '#4F46BA' }]}
            onPress={() => checkValue("All")}
          >
            <Text style={[styles.tabButtonText, { color: '#fff' }]}>All</Text>
          </Pressable>
          :
          <Pressable
            style={styles.tabButton}
            onPress={() => checkValue("All")}
          >
            <Text style={[styles.tabButtonText, { color: '#141516' }]}>All</Text>
          </Pressable>
        }
        {isService == 'Called' ?
          <Pressable
            style={[styles.tabButton, { backgroundColor: '#4F46BA' }]}
            onPress={() => checkValue("Called")}
          >
            <Text style={[styles.tabButtonText, { color: '#fff' }]}>Called</Text>
          </Pressable>
          :
          <Pressable
            style={styles.tabButton}
            onPress={() => checkValue("Called")}
          >
            <Text style={[styles.tabButtonText, { color: '#141516' }]}>Called</Text>
          </Pressable>
        }
        {isService == 'Pending' ?
          <Pressable
            style={[styles.tabButton, { backgroundColor: '#4F46BA' }]}
            onPress={() => checkValue("Pending")}
          >
            <Text style={[styles.tabButtonText, { color: '#fff' }]}>Pending</Text>
          </Pressable>
          :
          <Pressable
            style={styles.tabButton}
            onPress={() => checkValue("Pending")}
          >
            <Text style={[styles.tabButtonText, { color: '#141516' }]}>Pending</Text>
          </Pressable>
        }
      </View>

      {IsLodding == true ?
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
        :
        <View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around', padding: '2%'
          }}>

            <Pressable
              style={styles.pickerStyle}
              onPress={showDatepicker} >
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={Platform.OS == 'ios' ?
                    [styles.icon] :
                    [styles.icon, { marginTop: '2%' }]}
                  source={require('../../images/DOB.png')}
                />
                {startshow && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    style={{ paddingVertical: '5%', width: '50%' }}
                    // is24Hour={true}
                    value={startDate}
                    mode={startmode}
                    display="default"
                    onChange={onChangeFrom}
                  />
                )}
                {Platform.OS == 'ios' ? <View>
                  {starttext == true ?
                    <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}>From Date</Text>
                    :
                    <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}></Text>
                  }
                </View>
                  :
                  <View>
                    {starttext == true ?
                      <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>From Date</Text>
                      :
                      <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>{moment(startDate).format('DD/MM/YYYY')}</Text>
                    }
                  </View>
                }
              </View>
            </Pressable>

            <Pressable
              style={styles.pickerStyle}
              onPress={showEDatepicker} >
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={Platform.OS == 'ios' ?
                    [styles.icon] :
                    [styles.icon, { marginTop: '2%' }]}
                  source={require('../../images/DOB.png')}
                />
                {endshow && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    style={{ paddingVertical: '5%', width: '50%' }}
                    // is24Hour={true}
                    value={enddate}
                    mode={endmode}
                    display="default"
                    onChange={onChangeendDate}
                  />
                )}
                {Platform.OS == 'ios' ? <View>
                  {endtext == true ?
                    <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}>To Date</Text>
                    :
                    <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}></Text>
                  }
                </View>
                  :
                  <View>
                    {endtext == true ?
                      <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>To Date</Text>
                      :
                      <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>{moment(enddate).format('DD/MM/YYYY')}</Text>
                    }
                  </View>
                }
              </View>
            </Pressable>
          </View>
          <View style={{ marginVertical: '1%', marginHorizontal: '3%' }}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: '' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={statusList}
              maxHeight={160}
              labelField="label"
              valueField="value"
              placeholder={!isFocus1 ? 'Select Status' : 'Select Status'}
              value={statusId}
              onFocus={() => setIsFocus1(true)}
              onBlur={() => setIsFocus1(false)}
              onChange={item => {
                statusSelect(item)
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
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity style={[styles.button, { width: '60%' }]} onPress={() => Search()}>
              <Text style={styles.btnText}>SEARCH</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: '2%' }}
              onPress={() => Reset()}>
              <Image
                source={require('../../images/refreshButton.png')}
                style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
          </View>
          {leadList.length > 0 ?
            <View >
              <FlatList
                style={{ height: height / 2.1}}
                data={leadList}
                renderItem={renderItem}
                keyExtractor={item => item.id} />

              <View style={{ backgroundColor: 'yellow', height: 50, marginTop: '50%' }}></View>
            </View>
            :
            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>
          }
          <View style={{ height: 10 }}></View>
        </View>

      }

    </View>
  );
}


