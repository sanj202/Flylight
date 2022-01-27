import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Image, Button, ScrollView,
  Modal, Alert, Pressable, StatusBar, Dimensions, Platform, ColorPropType
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import styles from './styles'
import Header from '../../component/header/index'
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { leadAction, opportunityAction, leadmanagerAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/core"
import { lead_OpprtunityList } from '../../redux/Actions/leadmanagerAction';
import axios from 'axios';
export default function lead_manager({ navigation, route }) {

  const [isService, setisService] = useState(route.params ? route.params.key : 'All');
  const [modalVisible2, setModalVisible2] = useState(false);
  const [askDelete, setaskDelete] = useState(false);
  const [AllList, setAllList] = useState('')
  const [Lead, setLead] = useState('')
  const [Opportunity, setOpportunity] = useState('')
  const [IsLodding, setIsLodding] = useState(false)
  const { width, height } = Dimensions.get('window');
  // const axios = require('axios');
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
  const registerData = useSelector(state => state.varify.otp)
  const importLead = useSelector(state => state.leads.importLead)
  const importOpportunity = useSelector(state => state.opportunitys.ImportOpportunity)
  const Lead_OpportunityList = useSelector(state => state.leadmanager.GetList)
  const deletelead = useSelector(state => state.leads.deleteLead)
  const deleteopportunity = useSelector(state => state.opportunitys.deleteOpportunity)

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    settext(false)
    setDate(currentDate)
  };
  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };

  const onChangeTo = (event, selectedDates) => {
    const currentDates = selectedDates || dates;
    setShows(Platform.OS === 'ios');
    settexts(false)
    setDates(currentDates);
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
    if (loginData || registerData && isFocused) {
      Get_Data()
    }
  }, [loginData, registerData, isFocused])

  const Get_Data = () => {
    if (loginData.status == "success") {
      setIsLodding(true)
      const data = {
        uid: loginData.data.uid,
        profile_id: loginData.data.cProfile.toString(),
        org_uid: loginData.data.org_uid,
      }
      dispatch(leadmanagerAction.lead_OpprtunityList(data, loginData.data.token));
    }
    else if (registerData.status == "success") {
      setIsLodding(true)
      const data = {
        uid: registerData.data.uid,
        profile_id: registerData.data.cProfile.toString(),
        org_uid: registerData.data.org_uid,
      }
      dispatch(leadmanagerAction.lead_OpprtunityList(data, registerData.data.token));
    }
  }

  useEffect(() => {
    if (Lead_OpportunityList) {
      if (Lead_OpportunityList.status == "200") {
        setLead(Lead_OpportunityList.data.lead)
        setOpportunity(Lead_OpportunityList.data.opportunity)
        CombineArrayData()
        setIsLodding(false)
        dispatch(leadmanagerAction.clearResponse())
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
      if (loginData.status == "success") {
        setaskDelete(!askDelete)
        const data = {
          uid: loginData.data.uid,
          profile_id: loginData.data.cProfile.toString(),
          org_uid: loginData.data.org_uid,
          orgid: loginData.data.user.org_id.toString(),
          lead_id: tempId
        }
        dispatch(leadAction.deleteLead(data, loginData.data.token));
      }
      else if (registerData.status == "success") {
        setaskDelete(!askDelete)
        const data = {
          uid: registerData.data.uid,
          profile_id: registerData.data.cProfile.toString(),
          org_uid: registerData.data.org_uid,
          orgid: registerData.data.org_id.toString(),
          lead_id: tempId
        }
        dispatch(leadAction.deleteLead(data, registerData.data.token));
      }
      setIsLodding(true)
    }
    else if (tempType == "Opportunity") {
      if (loginData.status == "success") {
        setaskDelete(!askDelete)
        const data = {
          uid: loginData.data.uid,
          profile_id: loginData.data.cProfile.toString(),
          org_uid: loginData.data.org_uid,
          orgid: loginData.data.user.org_id.toString(),
          Opportinity_id: tempId
        }
        dispatch(opportunityAction.deleteOpportunity(data, loginData.data.token));
      }
      else if (registerData.status == "success") {
        setaskDelete(!askDelete)
        const data = {
          uid: registerData.data.uid,
          profile_id: registerData.data.cProfile.toString(),
          org_uid: registerData.data.org_uid,
          orgid: registerData.data.org_id.toString(),
          Opportinity_id: tempId
        }
        dispatch(opportunityAction.deleteOpportunity(data, registerData.data.token));
      }
      setIsLodding(true)
    }
    else {
    }
  }

  useEffect(() => {
    if (deletelead) {
      if (deletelead.status == "200") {
        setModalVisible2(!modalVisible2)
      }
      else if (deletelead.status == "failed") {
      }
      else if (deletelead.status == 'fail') {
      }
      setIsLodding(false)
    }
    else {
    }
  }, [deletelead])

  useEffect(() => {
    if (deleteopportunity) {
      if (deleteopportunity.status == "200") {
        setModalVisible2(!modalVisible2)
      }
      else if (deleteopportunity.status == "failed") {
      }
      else if (deleteopportunity.status == 'fail') {
      }
      setIsLodding(false)
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

  const selectLeadFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      console.log('res : ' + JSON.stringify(res));

      setSingleFile(res);
      var formData = new FormData();

      let data = {
        profile_id: loginData.data.cProfile.toString(),
        orgid: loginData.data.user.org_id.toString()
      }

      // {
      //   uri: res.map((item, index) => item.uri),
      //   type: res.map((item, index) => item.type),
      //   name: res.map((item, index) => item.name),
      //   // size: res.map((item, index) => item.size),
      // }

      formData.append('csvfile', res);
      formData.append('profile_id', loginData.data.cProfile);
      formData.append('orgid',loginData.data.user.org_id);

      axios({
        url: 'http://3.23.113.168/admin/public/api/mobile/v1/import-lead',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          // 'Content-Type': 'multipart/form-data',
          authorization: 'Bearer ' + loginData.data.token,
        },
        data:formData
      })
        .then(response => {
          var responseData = response
          console.log("responseData:::::::::::::::::::", responseData)
        })
        .catch(e => {
          console.log("errorrrrrr::::::::::::::::::::", e);
        });

    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };


  const [newLeadAray, setnewLeadAray] = useState([])

  // const selectLeadFile222 = async () => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  //     console.log('resLead : ' + JSON.stringify(res));
  //     // console.log('URI : ' + res.uri);
  //     // console.log('Type : ' + res.type);
  //     // console.log('File Name : ' + res.name);
  //     // console.log('File Size : ' + res.size);

  //     StoreLeadData(res)

  //     console.log("res.................", res)

  //     var file = {
  //       uri: res.map((item, index) => item.uri),
  //       type: res.map((item, index) => item.type),
  //       name: res.map((item, index) => item.name),
  //       // size: res.map((item, index) => item.size),
  //     };

  //     // console.log("datta..........................>>>>>>", file)
  //     if (loginData.status == "success") {
  //       // setIsLodding(true)
  //       // console.log("datta...........LoginDaat...............>>>>>>", res)
  //       var formdata = new FormData();
  //       formdata.append('CSVFILE', file,)
  //       formdata.append('profile_id', loginData.data.cProfile.toString())
  //       formdata.append('orgid', loginData.data.user.org_id.toString())

  //       dispatch(leadAction.importLead(formdata, loginData.data.token));
  //     }
  //     else if (registerData.status == "success") {
  //       // setIsLodding(true)

  //       formdata = new FormData();
  //       formdata.append('CSVFILE', file)
  //       formdata.append('profile_id', registerData.data.cProfile.toString())
  //       formdata.append('orgid', registerData.data.org_id.toString())

  //       dispatch(leadAction.importLead(formdata, registerData.data.token));
  //     }

  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //     } else {
  //       alert('Unknown Error: ' + JSON.stringify(err));
  //       throw err;
  //     }
  //   }
  // };

  const StoreLeadData = (value) => {
    let tem = value
    setnewLeadAray([
      // ...data
      tem])
  }


  const [newAray, setnewAray] = useState([])
  const selectOpportunityFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('resOpportunity : ' + JSON.stringify(res));
      // console.log('URI : ' + res.uri);
      // console.log('Type : ' + res.type);
      // console.log('File Name : ' + res.name);
      // console.log('File Size : ' + res.size);
      // setopportunityFile(res);
      StoreData(res)
      AsyncStorage.getItem('token', (err, token) => {
        if (token !== null) {
          AsyncStorage.getItem('cProfile', (err, cProfile) => {
            if (cProfile !== null) {
              AsyncStorage.getItem('org_id', (err, org_id) => {
                if (org_id !== null) {
                  dispatch(opportunityAction.importOpportunity(res, token, cProfile, org_id));
                }
              })
            }
          })
        }
      })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const StoreData = (value) => {
    let tem = value
    setnewAray([
      // ...data
      tem])
  }

  useEffect(() => {
    if (importLead) {
      if (importLead.status == "success") {
        Alert.alert(importLead.message)
        CombineArrayData()
        setIsLodding(false)
      }
      else if (importLead.status == "failed") {
      }
      else if (importLead.status == 'fail') {
        Alert.alert(importLead.message)
      }
    }
    else {
    }
  }, [importLead])

  useEffect(() => {
    if (importOpportunity) {
      if (importOpportunity.status == "success") {
        Alert.alert(importOpportunity.message)
        CombineArrayData()
        setIsLodding(false)
        // dispatch(opportunityAction.clearResponse())
      }
      else if (importOpportunity.status == "failed") {
      }
      else if (importOpportunity.status == 'fail') {
        Alert.alert(importOpportunity.message)
      }
    }
    else {

    }
  }, [importOpportunity])




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
            <Text
              style={{
                color: 'black', fontFamily: 'Roboto',
                fontSize: 12, color: '#0F0F0F', flexShrink: 1
              }}>
              {item.company ? item.company : "not available"}</Text>
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
                    paddingHorizontal: 5, paddingVertical: 1, marginLeft: '2%',
                    borderWidth: 1, borderColor: '#F69708',
                  }}>
                  <Text style={{ color: '#fff', fontSize: 14 }}>Lead</Text>
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
                  onPress={() => navigation.navigate('Edit_Lead', { title: 'Edit Lead', Edata: item })}
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

  const LeadView = ({ item }) => {
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
            <Text
              style={{
                color: 'black', fontFamily: 'Roboto',
                fontSize: 12, color: '#0F0F0F', flexShrink: 1
              }}>
              {item.company ? item.company : "not available"}</Text>
            <View
              style={{
                backgroundColor: '#F69708', borderRadius: 15,
                paddingHorizontal: 5, paddingVertical: 1, marginLeft: '2%',
                borderWidth: 1, borderColor: '#F69708',
              }}>
              <Text style={{ color: '#fff', fontSize: 14 }}>Lead</Text>
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
              onPress={() => navigation.navigate('Edit_Lead', { title: 'Edit Lead', Edata: item })}
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
            <Text style={{
              color: 'black', fontFamily: 'Roboto',
              fontSize: 12, color: '#0F0F0F', flexShrink: 1
            }}>{item.company ? item.company : "not available"}</Text>
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
      <View
        style={{
          marginHorizontal: '7%', marginTop: '-4%', backgroundColor: '#fff', borderRadius: 20,
          flexDirection: 'row', justifyContent: 'space-between'
        }}
      >
        {isService == 'All' ?
          <TouchableOpacity style={[styles.btn, { backgroundColor: '#4F46BA' }]}
            onPress={() => checkValue("All")}
          >
            <Text style={[styles.btnText, { color: '#FFF' }]}>All</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.btn}
            onPress={() => checkValue("All")}
          >
            <Text style={[styles.btnText, { color: 'black' }]}>All</Text>
          </TouchableOpacity>
        }

        {isService == 'Lead' ?
          <TouchableOpacity style={[styles.btn, { backgroundColor: '#4F46BA' }]}
            onPress={() => checkValue("Lead")}
          >
            <Text style={[styles.btnText, { color: '#FFF' }]}>Lead</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.btn}
            onPress={() => checkValue("Lead")}
          >
            <Text style={[styles.btnText, { color: 'black' }]}>Lead</Text>
          </TouchableOpacity>
        }

        {isService == 'Opportunity' ?
          <TouchableOpacity style={[styles.btn, { backgroundColor: '#4F46BA' }]}
            onPress={() => checkValue("Opportunity")}
          >
            <Text style={[styles.btnText, { color: '#FFF' }]}>Opportunity</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.btn}
            onPress={() => checkValue("Opportunity")}
          >
            <Text style={[styles.btnText, { color: 'black' }]}>Opportunity</Text>
          </TouchableOpacity>
        }
      </View>

      {
        isService == "All" ?

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
                        <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}>{moment(date).format('MM/DD/YYYY')}</Text>
                      }
                    </View>
                  }
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ width: '48%' }}
                onPress={showDatepickers}>

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
                        <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}>{moment(dates).format('MM/DD/YYYY')}</Text>
                      }
                    </View>
                  }
                </View>
              </TouchableOpacity>
            </View>


            <View style={{ marginTop: '-1%' }}></View>
            {IsLodding == true ?
              <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
              :
              <View>
                {AllList !== undefined && AllList.length > 0 ?
                  <FlatList
                    style={{ height: height / 1.55 }}
                    data={AllList}
                    renderItem={AllView}
                  />
                  :
                  <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>}
              </View>
            }
            <View style={{ marginTop: '2%' }}></View>
          </View>
          :
          <View />
      }

      {
        isService == "Lead" ?
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
                        <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}>{moment(date).format('MM/DD/YYYY')}</Text>
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
                        <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}>{moment(dates).format('MM/DD/YYYY')}</Text>
                      }
                    </View>
                  }
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: '5%', flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#00b300',
                  width: '47%',
                  borderRadius: 20,
                  padding: 5
                }}
                onPress={() => navigation.navigate('Edit_Lead', { title: 'Add Lead' })}
              >
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Add New Lead</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#00b300',
                  width: '47%',
                  borderRadius: 20,
                  padding: 5
                }}
                onPress={() => selectLeadFile()}
              >
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Import From Storage</Text>
              </TouchableOpacity>

            </View>

            {/* <TouchableOpacity
              style={{
                backgroundColor: '#00b300',
                width: '47%',
                marginTop: '5%',
                borderRadius: 20,
                padding: 5
              }}
              onPress={() => sendAPI()}
            >
              <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Import From Storage</Text>
            </TouchableOpacity> */}

            <View style={{ marginTop: '2%' }}></View>

            {IsLodding == true ?
              <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
              :
              <View>
                {Lead !== undefined && Lead.length > 0 ?
                  <FlatList
                    style={{ height: height / 1.7 }}

                    data={Lead}
                    renderItem={LeadView}
                  />

                  :
                  <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>
                }
              </View>}
            <View style={{ marginTop: '2%' }}></View>
          </View>
          :
          <View />
      }

      {
        isService == "Opportunity" ?

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
                        <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}>{moment(date).format('MM/DD/YYYY')}</Text>
                      }
                    </View>
                  }
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ width: '48%' }}
                onPress={showDatepickers}>

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
                        <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}>{moment(dates).format('MM/DD/YYYY')}</Text>
                      }
                    </View>
                  }
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: '5%', flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#00b300',
                  width: '47%',
                  borderRadius: 20,
                  padding: 5
                }}
                onPress={() => navigation.navigate('Edit_Opportunity', { title: 'Add Opportunity' })}
              >
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Add New Opportunity</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#00b300',
                  width: '47%',
                  borderRadius: 20,
                  padding: 5
                }}
              // onPress={() => selectOpportunityFile()}
              >
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Import From Storage</Text>
              </TouchableOpacity>

            </View>
            <View style={{ marginTop: '2%' }}></View>

            {IsLodding == true ?
              <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '40%' }} />
              :
              <View>
                {Opportunity !== undefined && Opportunity.length > 0 ?
                  <FlatList
                    style={{ height: height / 1.7 }}
                    data={Opportunity}
                    renderItem={OpportunityVIew}
                  />

                  :
                  <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>No data Found</Text>
                }
              </View>

            }
            <View style={{ marginTop: '2%' }}></View>
          </View>
          :
          <View />
      }

      <Modal animationType="slide" transparent={true} visible={askDelete}
        onRequestClose={() => { setaskDelete(!askDelete); }}>
        <View style={styles.askModel}>
          <Text style={styles.askTitle}> Are you sure ?</Text>
          <Text style={styles.askSubtitle}>
            you want to delete this{'\n'}{tempType} ?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Pressable
              style={[styles.askBtn, { paddingHorizontal: '5%' }]}
              onPress={() => DeleteFunction()}
            >
              <Text style={styles.askBtnText}>YES</Text>
            </Pressable>
            <View style={{ margin: '5%' }} />
            <Pressable
              style={[styles.askBtn, { paddingHorizontal: '6.5%' }]}
              onPress={() => CencelFunction()}
            >
              <Text style={styles.askBtnText}>NO</Text>
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

    </View >
  );
}


