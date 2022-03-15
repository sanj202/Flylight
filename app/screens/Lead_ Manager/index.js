import React, { useState, useEffect } from 'react';
import {
  Text, View, TouchableOpacity, ActivityIndicator, FlatList, Image, Modal, ToastAndroid, Pressable, Dimensions, Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import styles from './styles'
import Header from '../../component/header/index'
import DocumentPicker from 'react-native-document-picker';
import { leadAction, opportunityAction, leadmanagerAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/core"

export default function lead_manager({ navigation, route }) {

  const [isService, setisService] = useState(route.params ? route.params.key : 'All');
  const [modalVisible2, setModalVisible2] = useState(false);
  const [askDelete, setaskDelete] = useState(false);
  const [ImportFiles, setImportFiles] = useState(false)
  const [AssignOwner, setAssignOwner] = useState(false)
  const [leadOwnerData, setleadOwnerData] = useState('')
  const [SelectedFile, setSelectedFile] = useState('')
  const [temarray, settemarray] = useState([])
  const [AllList, setAllList] = useState('')
  const [Lead, setLead] = useState([])
  const [Opportunity, setOpportunity] = useState('')
  const [IsLodding, setIsLodding] = useState(false)
  const [IsULodding, setIsULodding] = useState(false)
  const [IsALodding, setIsALodding] = useState(false)
  const { width, height } = Dimensions.get('window');
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
  const importLead = useSelector(state => state.leads.importLead)
  const importOpportunity = useSelector(state => state.opportunitys.ImportOpportunity)
  const Lead_OpportunityList = useSelector(state => state.leadmanager.GetList)
  const AssignLead = useSelector(state => state.leadmanager.assign)
  const deletelead = useSelector(state => state.leads.deleteLead)
  const deleteopportunity = useSelector(state => state.opportunitys.deleteOpportunity)
  const leadOwner = useSelector(state => state.leads.leadOwnerNew)

  const onChangeFrom = (event, selectedDate) => {
    if (event.type == 'dismissed') {
      setShow(!show);
    }
    else {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      settext(false)
      setDate(currentDate)
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

  const checkValue = (value) => {
    setisService(value)
  }

  useEffect(() => {
    if (loginData && isFocused) {
      setIsLodding(true)
      Get_Data()
    }
  }, [loginData, isFocused])

  const Get_Data = () => {
    setIsLodding(true)
    const data = {
      uid: loginData.data.uid,
      profile_id: loginData.data.cProfile.toString(),
      org_uid: loginData.data.org_uid,
      filters: [],
      pageSize: '30',
      pageNumber: '0',
    }
    dispatch(leadmanagerAction.lead_OpprtunityList(data, loginData.data.token));
  }

  const Search = () => {
    let StartDate = moment(date).format("YYYY-MM-DD")
    let EndDate = moment(dates).format("YYYY-MM-DD")
    // setIsLodding(true)
    if (loginData.status == "success") {
      let data = {
        uid: loginData.data.uid,
        profile_id: loginData.data.cProfile.toString(),
        org_uid: loginData.data.org_uid,
        filters: [],
        pageSize: '30',
        pageNumber: '0',
      }
      if (text == false || texts == false) {
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
              dispatch(leadmanagerAction.lead_OpprtunityList(data, loginData.data.token));
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
          dispatch(leadmanagerAction.lead_OpprtunityList(data, loginData.data.token));
        }

        console.log(data)
      }
    }
  }

  const Reset = () => {
    settext(true)
    settexts(true)
    setDate(new Date())
    setDates(new Date())
    setIsLodding(true)
    Get_Data()
    settemarray([])
  }

  useEffect(() => {
    if (leadOwner) {
      if (leadOwner.status == "200") {
        setleadOwnerData(leadOwner.data)
        setAssignOwner(true)
        dispatch(leadAction.clearResponse())
      }
      else if (leadOwner.status == "failed") {
      }
      else if (leadOwner.status == "fail") {
      }
    }
    else {
    }
  }, [leadOwner])

  useEffect(() => {
    if (Lead_OpportunityList) {
      if (Lead_OpportunityList.status == "success") {
        setLead(Lead_OpportunityList.data)
        dispatch(leadmanagerAction.clearResponse())
        setIsLodding(false)
      }
      else if (Lead_OpportunityList.status == "failed") {
        setIsLodding(false)
      }
      else {
        setIsLodding(false)
      }
      CombineArrayData()
    }
    else {
    }
  }, [Lead_OpportunityList])

  const CombineArrayData = () => {
    setAllList([...Lead, ...Opportunity]);
  }

  const [tempId, settempId] = useState('')
  const [tempType, settempType] = useState('')

  const CencelFunction = () => {
    settempType('')
    settempId('')
    setaskDelete(!askDelete)
  }

  const CheckDeleteFunction = (value) => {
    settempId(value.id)
    settempType(value.type)
    setaskDelete(!askDelete)
  }

  const DeleteFunction = () => {
    if (tempType == "Lead") {
      setIsLodding(true)
      if (loginData.status == "success") {
        setaskDelete(!askDelete)
        const data = {
          uid: loginData.data.uid,
          profile_id: loginData.data.cProfile.toString(),
          org_uid: loginData.data.org_uid,
          lead_id: tempId
        }
        dispatch(leadAction.deleteLead(data, loginData.data.token));
      }
    }
    else if (tempType == "Opportunity") {
      if (loginData.status == "success") {
        setaskDelete(!askDelete)
        const data = {
          uid: loginData.data.uid,
          profile_id: loginData.data.cProfile.toString(),
          org_uid: loginData.data.org_uid,
          Opportinity_id: tempId
        }
        dispatch(opportunityAction.deleteOpportunity(data, loginData.data.token));
      }

    }
    else {
    }
  }

  useEffect(() => {
    if (deletelead) {
      if (deletelead.status == "200") {
        setModalVisible2(!modalVisible2)
        setIsLodding(false)
      }
      else if (deletelead.status == "failed") {
        setIsLodding(false)
      }
      else if (deletelead.status == 'fail') {
        setIsLodding(false)
      }
    }
    else {
    }
  }, [deletelead])

  useEffect(() => {
    if (deleteopportunity) {
      if (deleteopportunity.status == "200") {
        setModalVisible2(!modalVisible2)
        setIsLodding(false)
      }
      else if (deleteopportunity.status == "failed") {
        setIsLodding(false)
      }
      else if (deleteopportunity.status == 'fail') {
        setIsLodding(false)
      }

    }
    else {
    }
  }, [deleteopportunity])

  const DeleteSuccessFully = () => {
    dispatch(leadAction.clearResponse());
    dispatch(opportunityAction.clearResponse());
    Get_Data()
    setModalVisible2(!modalVisible2)
  }


  const [singleFile, setSingleFile] = useState(null);
  const [tempUploadingType, settempUploadingType] = useState()

  const OpenFilePicker = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      setSingleFile(results)
      setSelectedFile(results.map((item, index) => item.name))
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled');
      } else {
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  const CheckImportType = (value) => {
    setSelectedFile('choose-file')
    setSingleFile(null)
    setImportFiles(!ImportFiles)
    settempUploadingType(value)
  }

  const UploadFile = (value) => {
    if (singleFile == null) {
      ToastAndroid.show('Please Select File', ToastAndroid.SHORT);
    }
    else {

      let file = {
        name: singleFile[0].name,
        type: singleFile[0].type,
        uri: singleFile[0].uri,
        size: singleFile[0].size
      }
      setIsULodding(true)
      if (tempUploadingType == 'Opportunity') {
        const formdata = new FormData;
        formdata.append('CSVFILE', file);
        formdata.append('uid', loginData.data.uid);
        formdata.append('profile_id', loginData.data.cProfile);
        formdata.append('org_uid', loginData.data.org_uid);
        dispatch(opportunityAction.importOpportunity(formdata, loginData.data.token));
      }
      else {
        const formdata = new FormData;
        formdata.append('CSVFILE', file);
        formdata.append('uid', loginData.data.uid);
        formdata.append('profile_id', loginData.data.cProfile);
        formdata.append('org_uid', loginData.data.org_uid);
        dispatch(leadAction.importLead(formdata, loginData.data.token));
      }
    }
  }

  const UploadFileCancel = (value) => {
    setImportFiles(!ImportFiles)
    setSelectedFile('')
    settempUploadingType('')
    setIsULodding(false)
  }

  useEffect(() => {
    if (importLead) {
      if (importLead.status == "success") {
        // CombineArrayData()
        Get_Data()
        setImportFiles(false)
        ToastAndroid.show(importLead.message, ToastAndroid.SHORT);
        setSingleFile(null)
        setIsULodding(false)
        // dispatch(leadAction.clearImportLeadResponse())
      }
      else if (importLead.status == "fail") {
        ToastAndroid.show(importLead.message, ToastAndroid.SHORT);
        dispatch(leadAction.clearImportLeadResponse())
        setIsULodding(false)
      }
      else if (importLead == "error") {
        UploadFile()
      }
      else { }
    }
    else {
    }
  }, [importLead])

  useEffect(() => {
    if (importOpportunity) {

      if (importOpportunity.status == "success") {
        // CombineArrayData()
        Get_Data()
        setImportFiles(false)
        ToastAndroid.show(importOpportunity.message, ToastAndroid.SHORT);
        setSingleFile(null)
        setIsULodding(false)
        // dispatch(opportunityAction.clearResponse())
      }
      else if (importOpportunity.status == "fail") {
        ToastAndroid.show(importOpportunity.message, ToastAndroid.SHORT);
        dispatch(opportunityAction.clearResponse())
        setIsULodding(false)
      }
      else if (importOpportunity == "error") {
        UploadFile()
      }
      else { }
    }
    else {

    }
  }, [importOpportunity])

  useEffect(() => {
    if (AssignLead) {
      if (AssignLead.status == "success") {
        setAssignOwner(false)
        Get_Data()
        ToastAndroid.show(AssignLead.message, ToastAndroid.SHORT);
        settemarray([])
        dispatch(leadmanagerAction.clearResponse())
        setIsALodding(false)
      }
      else if (AssignLead.status == "failed") {
        setAssignOwner(false)
        ToastAndroid.show(AssignLead.message, ToastAndroid.SHORT);
        settemarray([])
        dispatch(leadmanagerAction.clearResponse())
        setIsALodding(false)
      }
      else {

      }
    }
    else {
    }
  }, [AssignLead])


  const AllView = ({ item }) => {
    return (
      <View style={styles.listData}>
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
                {item.company ? item.company : "not available"}</Text>
            </View>
            {
              item.role == 'opportunity' ?
                <View style={{
                  backgroundColor: '#07DE00', borderRadius: 15,
                  paddingHorizontal: 5, paddingVertical: 1, marginLeft: '2%',
                  borderWidth: 1, borderColor: '#07DE00',
                }}>
                  <Text style={{ color: '#fff', fontSize: 14 }}>Opportunity</Text>
                </View>
                :
                <View
                  style={{
                    backgroundColor: '#F69708', borderRadius: 15,
                    paddingHorizontal: 8, marginLeft: '2%',
                    borderWidth: 1, borderColor: '#F69708',
                  }}>
                  <Text style={{ color: '#fff', fontSize: 12 }}>Lead</Text>
                </View>
            }

          </View>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity>
              <Image
                style={{ height: 22, width: 22, marginRight: '2%' }}
                source={require('../../images/okCall.png')}
              />
            </TouchableOpacity>

            {
              item.role == 'opportunity' ?
                <TouchableOpacity
                  onPress={() => navigation.navigate('Edit_Opportunity', { title: 'Edit Opportunity', Edata: item })}
                >
                  <Image
                    style={{ height: 22, width: 22, marginRight: '2%' }}
                    source={require('../../images/editCall.png')}
                  />
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() => navigation.navigate('editLead', { Edata: item })}
                >
                  <Image
                    style={{ height: 22, width: 22, marginRight: '2%' }}
                    source={require('../../images/editCall.png')}
                  />
                </TouchableOpacity>
            }

            {
              item.role == 'opportunity' ?
                <TouchableOpacity
                  onPress={() => CheckDeleteFunction({ type: "Opportunity", id: item.id })}
                >
                  <Image
                    style={{ height: 22, width: 22, }}
                    source={require('../../images/deleteCall.png')}
                  />
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() => CheckDeleteFunction({ type: "Lead", id: item.id })}
                >
                  <Image
                    style={{ height: 22, width: 22, }}
                    source={require('../../images/deleteCall.png')}
                  />
                </TouchableOpacity>
            }
          </View>
        </View>

        <View style={{ marginLeft: '2%', backgroundColor: '', marginTop: '1%' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ height: 10, width: 10, marginRight: '2%' }}
              source={require('../../images/material-call.png')}
            />
            <Text max style={{ color: 'black', fontSize: 10 }}>{item.phone}</Text>
          </View>
          <Text style={{
            marginTop: '40%', textAlign: 'right',
            color: 'black', fontSize: 11
          }}>Call Pending</Text>
        </View>
      </View>
    );
  }



  const onPressRadioBtn = (value, type) => {
    // console.log(type, value)
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
    if (temarray.length == 0) {
      ToastAndroid.show('Please Select atlest Lead', ToastAndroid.SHORT);
    }
    else {
      const data = {
        uid: loginData.data.uid,
        org_uid: loginData.data.org_uid,
        profile_id: loginData.data.cProfile,
      }
      dispatch(leadAction.LeadOwneList(data, loginData.data.token));
      // console.log('press..................')
    }
  }

  const UserAssignLead = (value) => {
    setIsALodding(true)
    const data = {
      uid: loginData.data.uid,
      profile_id: loginData.data.cProfile.toString(),
      org_uid: loginData.data.org_uid,
      lead_ids: temarray,
      assignee: value
    }
    dispatch(leadmanagerAction.AssignLead(data, loginData.data.token));
  }

  const LeadView = ({ item, index }) => {
    return (
      <View style={styles.listData}>
        {item.is_assign == '1' ?
          <Image
            style={[styles.radio,]}
            source={require('../../images/disableCall.png')}
          />
          :
          <Pressable
            style={styles.radio}
            onPress={() =>
              onPressRadioBtn(item.id, !item.selected)}
          >
            {item.selected == true ?
              <Image
                style={[styles.radio, { marginTop: '-5%', marginLeft: '-5%' }]}
                source={require('../../images/okCall.png')}
              />
              :
              <View
              //  style={styles.radio}
              >
              </View>}
          </Pressable>
        }
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
                {item.company ? item.company : "not available"}</Text>
            </View>
            {item.is_assign == '1' ?
              <View
                style={{
                  backgroundColor: '#F69708', borderRadius: 15,
                  paddingHorizontal: 8, marginLeft: '2%',
                  borderWidth: 1, borderColor: '#F69708',
                }}>
                <Text style={{ color: '#fff', fontSize: 12 }}>{item.profile.user.name}</Text>
              </View>
              :
              <View />}
          </View>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity>
              <Image
                style={{ height: 22, width: 22, marginRight: '2%' }}
                source={require('../../images/okCall.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('editLead', { Edata: item })}
            >
              <Image
                style={{ height: 22, width: 22, marginRight: '2%' }}
                source={require('../../images/editCall.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => CheckDeleteFunction({ type: "Lead", id: item.id })}
            >
              <Image
                style={{ height: 22, width: 22, }}
                source={require('../../images/deleteCall.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginLeft: '2%', backgroundColor: '', marginTop: '1%' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ height: 10, width: 10, marginRight: '2%' }}
              source={require('../../images/material-call.png')}
            />
            <Text max style={{ color: 'black', fontSize: 10 }}>{item.phone}</Text>
          </View>
          <Text style={{
            marginTop: '40%', textAlign: 'right',
            color: 'black', fontSize: 11
          }}>Call Pending</Text>
        </View>
      </View>
    );
  }

  const AssignVIew = ({ item }) => {
    return (
      <Pressable
        onPress={() => UserAssignLead(item.id)}
      >
        <View style={[styles.listData, { flexDirection: 'column' }]} >
          <Text style={styles.AssignTitle}>{item.user.name}</Text>
          <Text style={styles.AssignTitle}>{item.user.phone}</Text>
          <Text style={styles.AssignTitle}>{item.user.email}</Text>
        </View>
      </Pressable>)
  }

  const OpportunityVIew = ({ item }) => {
    return (
      <View style={styles.listData}>
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
                {item.company ? item.company : "not available"}</Text>
            </View>
            <View style={{
              backgroundColor: '#07DE00', borderRadius: 15,
              paddingHorizontal: 5, paddingVertical: 1, marginLeft: '2%',
              borderWidth: 1, borderColor: '#07DE00',
            }}>
              <Text style={{ color: '#fff', fontSize: 14 }}>Opportunity</Text>
            </View>

          </View>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity>
              <Image
                style={{ height: 22, width: 22, marginRight: '2%' }}
                source={require('../../images/okCall.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Edit_Opportunity', { title: 'Edit Opportunity', Edata: item })}
            >
              <Image
                style={{ height: 22, width: 22, marginRight: '2%' }}
                source={require('../../images/editCall.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => CheckDeleteFunction({ type: "Opportunity", id: item.id })}
            >
              <Image
                style={{ height: 22, width: 22, }}
                source={require('../../images/deleteCall.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginLeft: '2%', backgroundColor: '', marginTop: '1%' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ height: 10, width: 10, marginRight: '2%' }}
              source={require('../../images/material-call.png')}
            />
            <Text max style={{ color: 'black', fontSize: 10 }}>{item.phone}</Text>
          </View>
          <Text style={{
            marginTop: '40%', textAlign: 'right',
            color: 'black', fontSize: 11
          }}>Call Pending</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: '#FAFAFC', width: width, height: height, }}
    >
      <Header
        style={{ height: "16%" }}
        onPressLeft={() => {
          // navigation.OpenDrawer()
          navigation.goBack()
        }}
        title='Lead Manager'
        onPressRight={() => {
          navigation.navigate('Notification')
        }}
      />
      <View style={{ marginTop: '3%' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: '2%' }}>
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
                  style={{ backgroundColor: '', marginTop: '-5%', width: '100%' }}
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
                    <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}>{moment(date).format('DD/MM/YYYY')}</Text>
                  }
                </View>
              }
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '48%' }} onPress={showDatepickers}>
            <View style={styles.pickers}>
              <Image
                style={{ height: 17.50, width: 15.91, marginTop: '2%', marginRight: '5%' }}
                source={require('../../images/pikerCalander.png')}
              />
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
                />
              )
              }
              {Platform.OS == 'ios' ? <View>
                {texts == true ?
                  <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}>From</Text>
                  :
                  <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}></Text>
                }
              </View>
                :
                <View>
                  {texts == true ?
                    <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}>To</Text>
                    :
                    <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}>{moment(dates).format('DD/MM/YYYY')}</Text>
                  }
                </View>
              }
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: '5%', flexDirection: 'row', justifyContent: 'space-between' }}>

          <TouchableOpacity
            onPress={() => navigation.navigate('addLead')}
            style={styles.addNewBtn}
          >
            <Text style={{ color: "#fff", fontSize: 13 }}>
              Add New Lead
            </Text>
          </TouchableOpacity>
          {temarray.length > 0 ?
            <TouchableOpacity
              onPress={() => onPressSendItem()}
              style={styles.addNewBtn}
            >
              <Text style={{ color: "#fff", fontSize: 13 }}>
                Assign
              </Text>
            </TouchableOpacity>
            :
            <View />}

          <TouchableOpacity
            onPress={() => CheckImportType("lead")}
            style={styles.addNewBtn}
          >
            <Text style={{ color: "#fff", fontSize: 13 }}>
              Import From Storage
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={[styles.button, { width: '60%' }]}
            onPress={() => Search()}
          >
            <Text style={styles.btnText}>SEARCH</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // style={styles.button}
            style={{ marginTop: '2%' }}
            onPress={() => Reset()}
          >
            {/* <Text style={styles.btnText}>RESET</Text> */}
            <Image
              source={require('../../images/refreshButton.png')}
              style={{ height: 24, width: 24 }} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: '2%' }}></View>

        {IsLodding == true ?
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
          :
          <View>
            {Lead !== undefined && Lead.length > 0 ?
              <FlatList
                style={{ height: "65%" }}
                data={Lead}
                renderItem={LeadView}
              // keyExtractor={item => item.id.toString()}
              />
              :
              <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>
            }
          </View>}
        <View style={{ marginTop: '2%' }}></View>
      </View>

      <Modal animationType="slide" transparent={true} visible={askDelete}
        onRequestClose={() => { setaskDelete(!askDelete); }}>
        <View style={styles.askModel}>
          <Text style={styles.askTitle}> Are you sure ?</Text>
          <Text style={styles.askSubtitle}>
            you want to delete this{'\n'}{tempType} ?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Pressable
              style={[styles.askBtn, { paddingHorizontal: '6.5%' }]}
              onPress={() => CencelFunction()}
            >
              <Text style={styles.askBtnText}>NO</Text>
            </Pressable>
            <View style={{ margin: '5%' }} />
            <Pressable
              style={[styles.askBtn, { paddingHorizontal: '5%' }]}
              onPress={() => DeleteFunction()}
            >
              <Text style={styles.askBtnText}>YES</Text>
            </Pressable>
          </View>
          <View style={{ margin: '2%' }} />
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => { DeleteSuccessFully() }}
      >
        <View style={styles.centeredView3}>
          <View style={styles.modalView3}>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end' }}
              onPress={() => DeleteSuccessFully()}
            >
              <Image
                style={{ margin: '5%', marginRight: '1%', marginTop: '3%', alignSelf: 'flex-end', height: 14, width: 14 }}
                source={require('../../images/crossImgR.png')}
              />
            </TouchableOpacity>
            <Image
              source={require('../../images/checkmark-circle.png')}
              style={{ width: 38, height: 38 }}
            />
            <Text style={styles.modalText3}>Successfully {'\n'} Deleted</Text>

            <Pressable
              style={[styles.button3, styles.buttonClose3]}


              onPress={() => DeleteSuccessFully()}
            >
              <Text style={styles.textStyle3}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>


      <Modal animationType="slide" transparent={true} visible={ImportFiles}
        onRequestClose={() => { setImportFiles(!ImportFiles); }}>
        <View style={styles.askModel}>
          <Text style={styles.askTitle}>Import File </Text>
          {/* <Text style={styles.askSubtitle}>
            Please Select Only .CSV files </Text> */}
          <TouchableOpacity
            onPress={() => OpenFilePicker()}
            style={{ borderWidth: 1, borderRadius: 10, padding: 8, marginVertical: '10%', marginHorizontal: '15%' }}>
            <Text>{SelectedFile}</Text>
          </TouchableOpacity>

          {IsULodding == true ?
            <ActivityIndicator size="large" color="#0000ff" />
            :
            <View />}
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Pressable
              style={[styles.askBtn, { paddingHorizontal: '6.5%' }]}
              onPress={() => UploadFileCancel()}
            >
              <Text style={styles.askBtnText}>NO</Text>
            </Pressable>
            <View style={{ margin: '5%' }} />

            <Pressable
              style={[styles.askBtn, { paddingHorizontal: '5%' }]}
              onPress={() => UploadFile()}
            >
              <Text style={styles.askBtnText}>YES</Text>
            </Pressable>
          </View>
          <View style={{ margin: '2%' }} />
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={AssignOwner}
        onRequestClose={() => { setAssignOwner(!AssignOwner); }}>
        <View style={[styles.askModel, { marginTop: '40%', }]}>
          <Text style={styles.askTitle}>Assign To </Text>

          <TouchableOpacity
            style={[styles.askTitleR]}
            onPress={() => setAssignOwner(false)}
          >
            <Image
              style={{ height: 14, width: 14 }}
              source={require('../../images/cross.png')}
            />
          </TouchableOpacity>
          {IsALodding == true ?
            <ActivityIndicator size="large" color="#0000ff" />
            :
            <View />}
          <FlatList
            style={{ height: '70%', marginVertical: '1%' }}
            data={leadOwnerData}
            renderItem={AssignVIew}
          />
          <View style={{ margin: '2%' }} />
        </View>
      </Modal>

    </View >
  );
}


