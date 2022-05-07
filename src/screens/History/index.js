import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, FlatList, Image, Platform, ActivityIndicator, Pressable, Dimensions, ToastAndroid } from 'react-native';
import styles from "./styles";
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../component/header/index'
import { Card } from 'react-native-paper'
import { historyAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import navigationStrings from '../../constant/navigationStrings';
export default function History({ navigation }) {

  const [IsLodding, setIsLodding] = useState(true)
  const [page, setPage] = useState(0);
  const [perPageItems, setperPageItems] = useState(10);
  const [totalItems, settotalItems] = useState(0);
  const [History, setHistory] = useState([])
  const [campList, setcampList] = useState([])
  const [statusList, setstatusList] = useState([])
  const [campId, setcampId] = useState(null);
  const [statusId, setstatusId] = useState(null);
  const [status, setstatus] = useState(null);
  const [startDate, setstartDate] = useState(new Date());
  const [startmode, setstartMode] = useState('date');
  const [startshow, setstartshow] = useState(false);
  const [starttext, setstarttext] = useState(true)
  const [enddate, setendDate] = useState(new Date());
  const [endmode, setendMode] = useState('date');
  const [endshow, setendShow] = useState(false);
  const [endtext, setendtext] = useState(true)

  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const historyData = useSelector(state => state.history.getHistory)
  const CampData = useSelector(state => state.history.campData)
  const LeadData = useSelector(state => state.history.leadData)
  const loginData = useSelector(state => state.auth.data)

  useEffect(() => {
    isFocused ? FetchData(0) : null
    isFocused ? DropDownAPIs() : null
  }, [isFocused])
  useEffect(() => {
    if (historyData) {
      if (historyData.status == "success") {
        settotalItems(historyData.total_rows)
        if (page == 0 && historyData.data.length != 0) {
          setHistory(historyData.data)
        } else if (historyData.data.length != 0) {
          let dataLive = historyData.data;
          let listTemp = [...allTask, ...dataLive];
          setHistory(listTemp)
        }
        setIsLodding(false)
        dispatch(historyAction.clearResponse())
      }
      else if (historyData.status == "failed") {
        setIsLodding(false)
        ToastAndroid.show(historyData.message, ToastAndroid.SHORT);
        dispatch(historyAction.clearResponse())
      }
    }
  }, [historyData])
  useEffect(() => {
    if (CampData) {
      if (CampData.status == "success") {
        setcampList(CampData.data.rows)
      }
      else if (CampData.status == "failed") {
        setIsLodding(false)
        ToastAndroid.show(CampData.message, ToastAndroid.SHORT);
        dispatch(historyAction.clearResponse())
      }
    }
  }, [CampData])
  useEffect(() => {
    if (LeadData) {
      if (LeadData.status == "200") {
        setstatusList(LeadData.data)
        dispatch(historyAction.clearResponse())
      }
      else if (LeadData.status == "fail") {
        ToastAndroid.show(LeadData.message, ToastAndroid.SHORT);
        dispatch(historyAction.clearResponse())
      }
    }
  }, [LeadData])
  const FetchData = (p) => {
    let data = {
      uid: loginData.data.uid,
      org_uid: loginData.data.org_uid,
      profile_id: loginData.data.cProfile.toString(),
      pageSize: perPageItems,
      pageNumber: p,
      filters: []
    }
    dispatch(historyAction.HistoryList(data, loginData.data.token));
  }
  const DropDownAPIs = (p) => {
    let data = {
      uid: loginData.data.uid,
      org_uid: loginData.data.org_uid,
      profile_id: loginData.data.cProfile.toString(),
    }
    dispatch(historyAction.LeadStatusList(data, loginData.data.token))
    dispatch(historyAction.CampaignList(data, loginData.data.token))
  }
  const fetchNextItems = () => {
    if (totalItems > History.length) {
      let p = page + 1;
      setPage(p);
      FetchData(p)
    }
  }
  const [refreshing, setrefreshing] = useState(false)
  const handleRefresh = () => {
    setIsLodding(true)
    setPage(0)
    setHistory([])
    FetchData(0)
    DropDownAPIs()
  }
  const onChangeFrom = (event, selectedDate) => {
    if (event.type == 'dismissed') {
      setstartshow(!startshow);
    }
    else {
      const currentDate = selectedDate || startDate;
      setstartshow(Platform.OS === 'ios' ? true : false);
      setstartDate(currentDate)
      setstarttext(false)
    }
  };
  const showDatepicker = () => {
    Mode('date');
  };
  const Mode = (currentMode) => {
    setstartshow(!startshow);
    setstartMode(currentMode);
  };
  const onChangeendDate = (event, selectedDate) => {
    if (event.type == 'dismissed') {
      console.log('date not selected end ')
      setendShow(!endshow);
    }
    else {
      const currentDate = selectedDate || enddate;
      setendShow(Platform.OS === 'ios' ? true : false);
      setendDate(currentDate)
      setendtext(false)
    }
  };
  const showEDatepicker = () => {
    setEMode('date');
  };
  const setEMode = (currentMode) => {
    setendShow(!endshow);
    setendMode(currentMode);
  };
  const Search = () => {
    let StartDate = moment(startDate).format("YYYY-MM-DD")
    let EndDate = moment(enddate).format("YYYY-MM-DD")
    let data = {
      uid: loginData.data.uid,
      org_uid: loginData.data.org_uid,
      profile_id: loginData.data.cProfile.toString(),
      pageSize: perPageItems,
      pageNumber: '0',
      filters: []
    }
    if (starttext == false || endtext == false || statusId !== null || campId !== null) {
      if (StartDate !== EndDate) {
        if (starttext == true) {
          ToastAndroid.show('Please Select Start Date', ToastAndroid.SHORT);
        }
        else if (endtext == true) {
          ToastAndroid.show('Please Select end Date', ToastAndroid.SHORT);
        }
        else {
          if (StartDate <= EndDate) {
            setIsLodding(true)
            data.filters.push({ gte: StartDate, key: 'created_at' },
              { lte: EndDate, key: 'created_at' })
            dispatch(historyAction.HistoryList(data, loginData.data.token));
          }
          else {
            ToastAndroid.show('wrong format', ToastAndroid.SHORT);
          }
        }
      }
      else if (StartDate == EndDate && starttext == false && endtext == false) {
        setIsLodding(true)
        data.filters.push({ gte: StartDate, key: 'created_at' },
          { lte: EndDate, key: 'created_at' })
        dispatch(historyAction.HistoryList(data, loginData.data.token));
      }
      if (statusId !== null && campId !== null) {
        setIsLodding(true)
        data.filters.push({ eq: campId, key: 'campaign' },
          { eq: status, key: 'lead_status' })
        dispatch(historyAction.HistoryList(data, loginData.data.token));
      }
      else if (statusId !== null) {
        setIsLodding(true)
        data.filters.push({ eq: status, key: 'lead_status' })
        dispatch(historyAction.HistoryList(data, loginData.data.token));
      }
      else if (campId !== null) {
        setIsLodding(true)
        data.filters.push({ eq: campId, key: 'campaign' })
        dispatch(historyAction.HistoryList(data, loginData.data.token));
      }
      setHistory([])
      // console.log(data)
    }
    else { ToastAndroid.show('Please Select Search Criteria', ToastAndroid.SHORT); }
  }
  const statusSelect = (item) => {
    setstatus(item.name)
    setstatusId(item.id);
  }
  const Reset = () => {
    setIsLodding(true)
    setstarttext(true)
    setendtext(true)
    setcampId(null)
    setstatusId(null)
    setstatus(null)
    setstartDate(new Date())
    setendDate(new Date())
    setHistory([])
    setPage(0)
    FetchData(0)
  }
  const Detail = (value) => {
    navigation.navigate(navigationStrings.HistoryOne, { id: value })
  }
  const HistoryView = ({ item }) => {
    return (
      <Pressable onPress={() => Detail(item.lead_id)} >
        <Card style={{ marginVertical: '1%', padding: '1%' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center' }}>
              <Image style={{ height: 48, width: 48 }}
                source={require('../../images/profileCall.png')}
              />
            </View>
            <View style={{ justifyContent: 'center', flex: 1, marginLeft: '3%' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Roboto', color: '#0F0F0F' }}>
                {item.lead.first_name} {item.lead.last_name}</Text>
              <Text style={{ color: '#565656', fontSize: 12, fontFamily: 'Roboto' }}>
                {item.lead ? item.lead.company : ''}</Text>
              <Text style={{ fontWeight: '500', fontSize: 11, color: '#0F0F0F' }}>
                Last Call: {moment(item.created_at).utc().format('lll')}
              </Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'baseline', alignItems: 'flex-end' }}>
              <View >
                {item.feedbackStatus ? item.feedbackStatus.status == 'Success' ?
                  <Text style={{ backgroundColor: '#32CD32', paddingHorizontal: '3%', paddingVertical: '0.5%', borderRadius: 10, color: '#fff' }}>{item.feedbackStatus.status}</Text>
                  :
                  <Text style={{ backgroundColor: '#F69708', paddingHorizontal: '3%', paddingVertical: '0.5%', borderRadius: 10, color: '#fff' }}>{item.feedbackStatus.status}</Text>
                  : null}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ height: 10, width: 10 }}
                  source={require('../../images/material-call.png')}
                />
                <Text style={{ color: '#0F0F0F', fontSize: 10 }}>+91 {item.lead ? item.lead.phone : ''}</Text>
              </View>
            </View>
          </View>
        </Card>
      </Pressable>)
  }
  return (
    <View style={{ flex: 1 }}>
      <Header onPressLeft={() => { navigation.openDrawer() }}
        title='Feedback'
        onPressRight={() => { navigation.navigate('Notification') }}
      />
      <View style={{ flex: 1, marginBottom: '2%', marginHorizontal: '3%' }}>
        {IsLodding == true ?
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
          :
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '2%' }}>
              <Pressable style={styles.pickerStyle} onPress={showDatepicker} >
                <Image
                  style={Platform.OS == 'ios' ?
                    [styles.icon] :
                    [styles.icon]}
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
                    <Text style={styles.pickerText}>From Date</Text>
                    :
                    null
                  }
                </View>
                  :
                  <View>
                    {starttext == true ?
                      <Text style={[styles.pickerText, { marginLeft: '10%' }]}>From Date</Text>
                      :
                      <Text style={[styles.pickerText, { marginLeft: '10%' }]}>{moment(startDate).format('DD/MM/YYYY')}</Text>
                    }
                  </View>
                }
              </Pressable>
              <Pressable style={styles.pickerStyle} onPress={showEDatepicker} >
                <Image
                  style={Platform.OS == 'ios' ?
                    [styles.icon] :
                    [styles.icon]}
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
                    <Text style={styles.pickerText}>To Date</Text>
                    :
                    null
                  }
                </View>
                  :
                  <View>
                    {endtext == true ?
                      <Text style={[styles.pickerText, { marginLeft: '10%' }]}>To Date</Text>
                      :
                      <Text style={[styles.pickerText, { marginLeft: '10%' }]}>{moment(enddate).format('DD/MM/YYYY')}</Text>
                    }
                  </View>
                }
              </Pressable>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '2%' }}>
              <Dropdown
                style={[styles.dropdown, { width: '49%' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle3}
                iconStyle={styles.iconStyle}
                data={campList}
                search={true}
                searchPlaceholder='Search'
                maxHeight={160}
                labelField="campaign_name"
                valueField="id"
                placeholder='Select Campaign'
                value={campId}
                onChange={item => {
                  setcampId(item.id)
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
                style={[styles.dropdown, { width: '49%' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle3}
                iconStyle={styles.iconStyle}
                data={statusList}
                search={true}
                searchPlaceholder='Search'
                maxHeight={160}
                labelField="name"
                valueField="id"
                placeholder='Select Status'
                // searchPlaceholder="Search..."
                value={statusId}
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
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: '2%' }}>
              <TouchableOpacity style={[styles.button, { width: '60%' }]} onPress={() => Search()}>
                <Text style={styles.btnText}>SEARCH</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: '2%' }}
                onPress={() => Reset()}>
                <Image
                  source={require('../../images/refreshButton.png')}
                  style={{ height: 24, width: 24 }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <FlatList
                data={History}
                renderItem={HistoryView}
                ListEmptyComponent={() => (!History.length ?
                  <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>Data Not Found</Text>
                  : null)}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                onEndReached={() => fetchNextItems()}
                keyExtractor={item => item.id}
              />
            </View>
          </View>}
      </View>
    </View>
  );
}