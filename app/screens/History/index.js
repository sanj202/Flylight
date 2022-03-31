import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image, Alert, Platform, ActivityIndicator, Pressable, Dimensions, ToastAndroid } from 'react-native';
import styles from "./styles";
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../component/header/index'
import { Card } from 'react-native-paper'
import { historyAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/core"

export default function History({ navigation }) {


  const [History, setHistory] = useState([])
  const [IsLodding, setIsLodding] = useState(false)
  const [campList, setcampList] = useState([])
  const [campId, setcampId] = useState(null);
  const [statusList, setstatusList] = useState([])
  const [statusId, setstatusId] = useState(null);
  const [status, setstatus] = useState(null);
  const { width, height } = Dimensions.get('window');
  const [page, setPage] = useState(0);
  const [perPageItems, setperPageItems] = useState(10);
  const [totalItems, settotalItems] = useState('');

  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const historyData = useSelector(state => state.history.getHistory)
  const CampData = useSelector(state => state.history.campData)
  const LeadData = useSelector(state => state.history.leadData)
  const loginData = useSelector(state => state.auth.data)

  useEffect(() => {
    setIsLodding(true)
    let data = {
      uid: loginData.data.uid,
      org_uid: loginData.data.org_uid,
      profile_id: loginData.data.cProfile.toString(),
    }
    FetchData(page)
    dispatch(historyAction.LeadStatusList(data, loginData.data.token));
    dispatch(historyAction.CampaignList(data, loginData.data.token));
  }, [isFocused])

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

  const [startDate, setstartDate] = useState(new Date());
  const [startmode, setstartMode] = useState('date');
  const [startshow, setstartshow] = useState(false);
  const [starttext, setstarttext] = useState(true)

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
  const setEMode = (currentMode) => {
    setendShow(!endshow);
    setendMode(currentMode);
  };
  const showEDatepicker = () => {
    setEMode('date');
  };

  const Search = () => {
    let StartDate = moment(startDate).format("YYYY-MM-DD")
    let EndDate = moment(enddate).format("YYYY-MM-DD")
    if (loginData.status == "success") {
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
      }
      // console.log(data)
    }
  }

  const Reset = () => {
    console.log('reser')
    setstarttext(true)
    setendtext(true)
    setcampId(null)
    setstatusId(null)
    setstatus(null)
    setstartDate(new Date())
    setendDate(new Date())
    setIsLodding(true)
    setPage(0)
    if (loginData) {
      let data = {
        uid: loginData.data.uid,
        org_uid: loginData.data.org_uid,
        profile_id: loginData.data.cProfile.toString(),
        pageSize: perPageItems,
        pageNumber: '0',
        filters: []
      }
      dispatch(historyAction.HistoryList(data, loginData.data.token));
    }
  }

  const Detail = (value) => {
    navigation.navigate('HistoryOne', { id: value })
  }



  useEffect(() => {
    if (historyData) {
      if (historyData.status == "success") {
        // setHistory(historyData.data)
        settotalItems(historyData.total_rows)
        if (historyData.data.length != 0) {
          let dataLive = historyData.data;
          let listTemp = [...History, ...dataLive];
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
      else if (historyData.status == "fail") {
        setIsLodding(false)
        ToastAndroid.show(historyData.message, ToastAndroid.SHORT);
        dispatch(historyAction.clearResponse())
      }
      else {
      }
    }
  }, [historyData])

  useEffect(() => {
    if (CampData) {
      if (CampData.status == "200") {
        setcampList(
          CampData.data !== undefined && CampData.data.map((item, index) =>
            item ? { label: item.campaign_name, value: item.id } : { label: 'None', value: 'None' })
        )
      }
      else if (CampData.status == "failed") {
        setIsLodding(false)
        ToastAndroid.show(CampData.message, ToastAndroid.SHORT);
        dispatch(historyAction.clearResponse())
      }
      else if (CampData.status == "fail") {
        setIsLodding(false)
        ToastAndroid.show(CampData.message, ToastAndroid.SHORT);
        dispatch(historyAction.clearResponse())
      }
      else {

      }
    }
  }, [CampData])

  useEffect(() => {
    if (LeadData) {
      if (LeadData.status == "200") {
        setstatusList(
          LeadData.data !== undefined && LeadData.data.map((item, index) =>
            item ? { label: item.name, value: item.id } : { label: 'None', value: 'None' })
        )
        dispatch(historyAction.clearResponse())
      }
      else if (LeadData.status == "failed") {
        ToastAndroid.show(LeadData.message, ToastAndroid.SHORT);
        dispatch(historyAction.clearResponse())
      }
      else if (LeadData.status == "fail") {
        ToastAndroid.show(LeadData.message, ToastAndroid.SHORT);
        dispatch(historyAction.clearResponse())
      }
    }
  }, [LeadData])


  const [fileterType, setfileterType] = useState([])

  const campaignSelect = (value) => {
    setcampId(value);
  }

  const statusSelect = (item) => {
    setstatus(item.label)
    setstatusId(item.value);
  }


  const [refreshing, setrefreshing] = useState(false)
  const handleRefresh = () => {
    console.log(refreshing)
    setIsLodding(true)
    setPage(0)
    setHistory([])
    FetchData(0)
  }

  const fetchNextItems = () => {
    if (totalItems > History.length) {
      let p = page + 1;
      setPage(p);
      FetchData(p)
    }
  }

  const HistoryView = ({ item }) => {
    return (
      <Pressable onPress={() => Detail(item.lead_id)} >
        <Card style={{ marginHorizontal: '3%', marginVertical: '1%', padding: 3 }}>
          <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
            <Image
              style={{ height: 48, width: 48, marginHorizontal: '1%', }}
              source={require('../../images/profileCall.png')}
            />
            <View style={{ marginHorizontal: '2%', width: '52%' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Roboto', color: '#0F0F0F' }}>{item.lead ? item.lead.first_name : ''} {item.lead ? item.lead.last_name : ''}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#565656', fontSize: 12, fontFamily: 'Roboto' }}>{item.lead ? item.lead.company : ''}</Text>
                {item.feedbackStatus ? item.feedbackStatus.status ?
                  <Text style={{
                    color: '#fff', backgroundColor: '#F69708', paddingLeft: 10, paddingRight: 10,
                    padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 10
                  }}>{item.feedbackStatus.status}</Text>
                  :
                  null : null}
              </View>
              <Text style={{ fontWeight: '500', fontSize: 11, color: '#0F0F0F' }}>
                {/* Last Call: Sep 17, 15:24PM */}
                Last Call: {moment(item.created_at).format('lll')}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={{ height: 10, width: 10, marginRight: '3%', marginTop: '5%' }}
                source={require('../../images/material-call.png')}
              />
              <Text style={{ marginTop: '4%', color: '#0F0F0F', fontSize: 10 }}>+91 {item.lead ? item.lead.phone : ''}</Text>
            </View>
          </View>
        </Card>

      </Pressable>
    )
  }

  return (
    <View style={[styles.container, { width: width, height: height }]}>
      <Header
        style={Platform.OS == 'ios' ?
          { height: "20%" } :
          // { height: "16%" }}
          {}}
        title='History'
        renderLeft={() => {
          return (
            <Image
              // style={styles.image2}
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
                    <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000' }}>From Date</Text>
                    :
                    null
                  }
                </View>
                  :
                  <View>
                    {starttext == true ?
                      <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>From Date</Text>
                      :
                      <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>{moment(startDate).format('DD/MM/YYYY')}</Text>
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
                    <Text style={{ marginTop: '10%', fontSize: 12, color: '#000000' }}>To Date</Text>
                    :
                    null
                  }
                </View>
                  :
                  <View>
                    {endtext == true ?
                      <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>To Date</Text>
                      :
                      <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000', marginLeft: '10%' }}>{moment(enddate).format('DD/MM/YYYY')}</Text>
                    }
                  </View>
                }
              </View>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: '2%', marginTop: '-2%' }}>
            <Dropdown
              style={[styles.dropdown, { width: '48%' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle3}
              iconStyle={styles.iconStyle}
              data={campList}
              search={true}
              searchPlaceholder='Search'
              maxHeight={160}
              labelField="label"
              valueField="value"
              placeholder='Select Campaign'
              // searchPlaceholder="Search..."
              value={campId}
              onChange={item => {
                campaignSelect(item.value)
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
              style={[styles.dropdown, { width: '48%' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle3}
              iconStyle={styles.iconStyle}
              data={statusList}
              search={true}
              searchPlaceholder='Search'
              maxHeight={160}
              labelField="label"
              valueField="value"
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
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity style={[styles.button, { width: '60%' }]} onPress={() => Search()}>
              <Text style={styles.btnText}>SEARCH</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // style={styles.button}
              style={{ marginTop: '2%' }}
              onPress={() => Reset()}>
              {/* <Text style={styles.btnText}>RESET</Text> */}
              <Image
                source={require('../../images/refreshButton.png')}
                style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              style={{ height: height / 2 }}
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
          <View style={{ height: 10 }}></View>
        </View>
      }
    </View >
  );
}


