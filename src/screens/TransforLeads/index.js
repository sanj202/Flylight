import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, FlatList, Image, Modal, ToastAndroid, Pressable, Dimensions, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import styles from './styles'
import Header from '../../component/header/index'
import { leadAction, opportunityAction, leadmanagerAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import navigationStrings from '../../constant/navigationStrings';
export default function TransforLeads({ navigation, route }) {

  const [AssignOwner, setAssignOwner] = useState(false)
  const [leadOwnerData, setleadOwnerData] = useState('')
  const [temarray, settemarray] = useState([])
  const [Lead, setLead] = useState([])
  const [IsLodding, setIsLodding] = useState(true)
  const [IsALodding, setIsALodding] = useState(false)
  const { width, height } = Dimensions.get('window');
  const [page, setPage] = useState(0);
  const [perPageItems, setperPageItems] = useState(10);
  const [totalItems, settotalItems] = useState(0);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, settext] = useState(true)
  const [dates, setDates] = useState(new Date());
  const [modes, setModes] = useState('date');
  const [shows, setShows] = useState(false);
  const [texts, settexts] = useState(true)
  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const loginData = useSelector(state => state.auth.data)
  const Lead_OpportunityList = useSelector(state => state.leadmanager.GetListT)
  const TransferLead = useSelector(state => state.leadmanager.transfer)
  const leadOwner = useSelector(state => state.leads.leadOwnerTranfor)
  useEffect(() => {
    isFocused ? initialstate() : null
    isFocused ? Get_Data(page) : null
  }, [isFocused])
  useEffect(() => {
    if (Lead_OpportunityList) {
      if (Lead_OpportunityList.status == "success") {
        settotalItems(Lead_OpportunityList.total_rows)
        if (page == 0 && Lead_OpportunityList.data.length != 0) {
          setLead(Lead_OpportunityList.data)
        } else if (Lead_OpportunityList.data.length != 0) {
          let dataLive = Lead_OpportunityList.data;
          let listTemp = [...Lead, ...dataLive];
          setLead(listTemp)
        }
        dispatch(leadmanagerAction.clearResponse())
        setIsLodding(false)
      }
      else if (Lead_OpportunityList.status == "failed") {
        setIsLodding(false)
      }
    }
  }, [Lead_OpportunityList])
  const fetchNextItems = () => {
    if (totalItems > Lead.length) {
      let p = page + 1;
      setPage(p);
      Get_Data(p)
    }
  }
  const [refreshing, setrefreshing] = useState(false)
  const handleRefresh = () => {
    initialstate()
    Get_Data(0)
  }
  const Get_Data = (p) => {
    const data = {
      uid: loginData.data.uid,
      profile_id: loginData.data.cProfile.toString(),
      org_uid: loginData.data.org_uid,
      filters: [{ eq: 1, key: 'is_assign' }],
      pageSize: perPageItems,
      pageNumber: p,
    }
    dispatch(leadmanagerAction.lead_OpprtunityTransferList(data, loginData.data.token));
  }
  const onChangeFrom = (event, selectedDate) => {
    if (event.type == 'dismissed') {
      setShow(!show);
    }
    else {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate)
      settext(false)
    }
  };
  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const onChangeTo = (event, selectedDates) => {
    if (event.type == 'dismissed') {
      setShows(!shows);
    }
    else {
      const currentDates = selectedDates || dates;
      setShows(Platform.OS === 'ios');
      settexts(false)
      setDates(currentDates);
    }
  };
  const showModes = (currentModes) => {
    setShows(!shows);
    setModes(currentModes);
  };
  const showDatepickers = () => {
    showModes('date');
  };
  const Search = () => {
    let StartDate = moment(date).format("YYYY-MM-DD")
    let EndDate = moment(dates).format("YYYY-MM-DD")
    let data = {
      uid: loginData.data.uid,
      profile_id: loginData.data.cProfile.toString(),
      org_uid: loginData.data.org_uid,
      filters: [{ eq: 1, key: 'is_assign' }],
      pageSize: perPageItems,
      pageNumber: '0',
    }
    if (text == false || texts == false) {
      setLead([])
      if (StartDate !== EndDate) {
        if (text == true) {
          ToastAndroid.show('Please Select Start Date', ToastAndroid.SHORT);
        }
        else if (texts == true) {
          ToastAndroid.show('Please Select End Date', ToastAndroid.SHORT);
        }
        else {
          if (StartDate <= EndDate) {
            setIsLodding(true)
            data.filters.push({ gte: StartDate, key: 'created_at' },
              { lte: EndDate, key: 'created_at' })
            dispatch(leadmanagerAction.lead_OpprtunityTransferList(data, loginData.data.token));
          }
          else {
            ToastAndroid.show('wrong format', ToastAndroid.SHORT);
          }
        }
      }
      else if (StartDate == EndDate && text == false && texts == false) {
        setIsLodding(true)
        data.filters.push({ gte: StartDate, key: 'created_at' },
          { lte: EndDate, key: 'created_at' })
        dispatch(leadmanagerAction.lead_OpprtunityTransferList(data, loginData.data.token));
      }
      console.log(data)
    }
    else {
      ToastAndroid.show('Please Select Search Criteria', ToastAndroid.SHORT);
    }
  }
  const initialstate = () => {
    setIsLodding(true)
    settext(true)
    settexts(true)
    setDate(new Date())
    setDates(new Date())
    setLead([])
    settemarray([])
    setPage(0)
  }
  const Reset = () => {
    initialstate()
    Get_Data(0)
  }
  useEffect(() => {
    if (leadOwner) {
      if (leadOwner.status == "200") {
        setleadOwnerData(leadOwner.data)
        setAssignOwner(true)
        dispatch(leadAction.clearResponse())
      }
    }
  }, [leadOwner])
  useEffect(() => {
    if (TransferLead) {
      if (TransferLead.status == "success") {
        setAssignOwner(false)
        setLead([])
        Get_Data()
        ToastAndroid.show(TransferLead.message, ToastAndroid.SHORT);
        settemarray([])
        dispatch(leadmanagerAction.clearResponse())
        setIsALodding(false)
      }
      else if (TransferLead.status == "failed") {
        setAssignOwner(false)
        ToastAndroid.show(TransferLead.message, ToastAndroid.SHORT);
        settemarray([])
        dispatch(leadmanagerAction.clearResponse())
        setIsALodding(false)
      }
    }
  }, [TransferLead])
  const onPressRadioBtn = (value, type) => {
    if (type == true) {
      temarray.push(value)
    } else {
      let newArray;
      newArray = temarray.filter(item => item !== value)
      settemarray(newArray)
    }
    let filterArray = Lead.map((item, index) => {
      if (item.id === value) {
        return { ...item, selected: type }
      }
      else {
        return item
      }
    })
    setLead(filterArray)
  }
  const onPressSendItem = (value, type) => {
    if (temarray.length == 0) { ToastAndroid.show('Please Select atlest Lead', ToastAndroid.SHORT); } else {
      const data = {
        uid: loginData.data.uid,
        org_uid: loginData.data.org_uid,
        profile_id: loginData.data.cProfile,
      }
      dispatch(leadAction.LeadTranferOwneList(data, loginData.data.token));
    }
  }
  const UserTranferLead = (value) => {
    setIsALodding(true)
    const data = {
      uid: loginData.data.uid,
      profile_id: loginData.data.cProfile.toString(),
      org_uid: loginData.data.org_uid,
      lead_ids: temarray,
      assignee: value
    }
    dispatch(leadmanagerAction.TranferLead(data, loginData.data.token));
  }
  const LeadView = ({ item, index }) => {
    return (<View style={styles.listData}>
      <Pressable style={styles.radio} onPress={() => onPressRadioBtn(item.id, !item.selected)}>
        {item.selected == true ? <Image style={[styles.radio, { marginTop: '-5%', marginLeft: '-5%' }]}
          source={require('../../images/okCall.png')} /> : null}
      </Pressable>
      <View style={{ justifyContent: 'center', }}>
        <Image style={{ height: 48, width: 48, }}
          source={require('../../images/profileCall.png')} />
      </View>
      <View style={{ flex: 1, marginLeft: '2%', paddingHorizontal: '2%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.first_name} {item.last_name}</Text>
        <Text numberOfLines={1} style={{ color: '#000000', fontFamily: 'Roboto', fontSize: 12, flexShrink: 1 }}>{item.company ? item.company : null}</Text>
        <Text style={{ borderRadius: 15, backgroundColor: '#F69708', color: '#fff', fontSize: 12, width: '60%', textAlign: 'center' }}>{item.profile.user.name}</Text>
      </View>
      <View style={{ marginLeft: '2%',flexDirection:'column',justifyContent:'space-between'}}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={{ height: 10, width: 10, marginRight: '2%' }} source={require('../../images/material-call.png')} />
          <Text max style={{ color: 'black', fontSize: 10 }}>{item.phone}</Text>
        </View>
        <TouchableOpacity style={{ borderColor: '#3373F3', borderRadius: 20,borderWidth:1, }}
          onPress={() => navigation.navigate(navigationStrings.Lead_ManagerDetail, { item: item })}>
          <Text style={{ textAlign: 'center', color: '#3373F3', fontSize: 12, marginVertical: '5%' }}>More ></Text>
        </TouchableOpacity>
      </View>
    </View>);
  }
  const AssignVIew = ({ item }) => {
    return (
      <Pressable onPress={() => UserTranferLead(item.id)}>
        <View style={[styles.listData, { flexDirection: 'column' }]} >
          <Text style={styles.AssignTitle}>{item.user.name}</Text>
          <Text style={styles.AssignTitle}>{item.user.phone}</Text>
          <Text style={styles.AssignTitle}>{item.user.email}</Text>
        </View>
      </Pressable>)
  }
  return (
    <View style={{ flex: 1 }}>
      <Header style={Platform.OS == 'ios' ? { height: "16%" } : {}}
        onPressLeft={() => { navigation.openDrawer() }}
        title='Lead Transfer'
        onPressRight={() => { navigation.navigate('Notification') }} />
      <View style={{ flex: 0.7 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: '2%' }}>
          <TouchableOpacity style={{ width: '48%' }} onPress={showDatepicker}>
            <View style={styles.pickers}>
              <Image style={{ height: 17.50, width: 15.91, marginTop: '2%', marginRight: '5%' }}
                source={require('../../images/DOB.png')} />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  style={{ backgroundColor: '', marginTop: '-5%', width: '100%' }}
                  value={date}
                  mode={mode}
                  // is24Hour={true}
                  display="default"
                  onChange={onChangeFrom}
                />)}
              {Platform.OS == 'ios' ? <View>
                {text == true ? <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000' }}>From</Text> : null}
              </View> : <View>
                {text == true ? <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000' }}>From</Text>
                  :
                  <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000' }}>{moment(date).format('DD/MM/YYYY')}</Text>}
              </View>}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '48%' }} onPress={showDatepickers}>
            <View style={styles.pickers}>
              <Image style={{ height: 17.50, width: 15.91, marginTop: '2%', marginRight: '5%' }}
                source={require('../../images/DOB.png')} />
              {shows && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dates}
                  style={{ backgroundColor: '', marginTop: '-5%', width: '100%' }}
                  mode={modes}
                  format="YYYY-MM-DD"
                  // is24Hour={true}
                  display="default"
                  onChange={onChangeTo}
                />)}
              {Platform.OS == 'ios' ? <View>
                {texts == true ? <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000' }}>From</Text> : null}
              </View> : <View>
                {texts == true ? <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000' }}>To</Text>
                  :
                  <Text style={{ marginTop: '5%', fontSize: 12, color: '#000000' }}>{moment(dates).format('DD/MM/YYYY')}</Text>}
              </View>}
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={[styles.button, { width: '60%' }]} onPress={() => Search()}>
            <Text style={styles.btnText}>SEARCH</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: '2%' }} onPress={() => Reset()}>
            <Image source={require('../../images/refreshButton.png')} style={{ height: 24, width: 24 }} />
          </TouchableOpacity>
          {temarray.length > 0 ?
            <TouchableOpacity onPress={() => onPressSendItem()} style={styles.addNewBtn}>
              <Text style={{ color: "#fff", fontSize: 13, padding: 10 }}> Transfer </Text>
            </TouchableOpacity> : null}
        </View>
      </View>
      <View style={{ flex: 3, marginBottom: '2%' }}>
        {IsLodding == true ?
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
          :
          <FlatList
            data={Lead}
            renderItem={LeadView}
            ListEmptyComponent={() => (!Lead.length ?
              <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>Data Not Found</Text>
              : null)}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={() => fetchNextItems()}
            keyExtractor={item => item.id}
          />}
      </View>
      <Modal animationType="slide" transparent={true} visible={AssignOwner}
        onRequestClose={() => { setAssignOwner(!AssignOwner); }}>
        <View style={[styles.askModel, { marginTop: '40%', }]}>
          <Text style={styles.askTitle}>Transfer To </Text>
          <TouchableOpacity style={[styles.askTitleR]} onPress={() => setAssignOwner(false)}>
            <Image style={{ height: 14, width: 14 }} source={require('../../images/cross.png')} />
          </TouchableOpacity>
          {IsALodding == true ? <ActivityIndicator size="large" color="#0000ff" /> : null}
          <FlatList
            style={{ height: '70%', marginVertical: '1%' }}
            data={leadOwnerData}
            renderItem={AssignVIew}
            ListEmptyComponent={() => (!Lead.leadOwnerData ?
              <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>Data Not Found</Text>
              : null)}
          />
          <View style={{ margin: '2%' }} />
        </View>
      </Modal>
    </View>
  );
}