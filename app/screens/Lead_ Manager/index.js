import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
  TextInput, Picker, FlatList, Image, Button, ScrollView,
  Modal, Alert, Pressable, StatusBar, Dimensions, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import styles from './styles'
import Header from '../../component/header/index'
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { leadAction, opportunityAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';

export default function lead_manager({ navigation, route }) {
  const [isService, setisService] = useState(route.params ? route.params.key : 'All');
  const [modalVisible2, setModalVisible2] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, settext] = useState(true)

  const [followDate, setFollowDate] = useState(true)
  const [followDates, setFollowDates] = useState(true)

  const [dates, setDates] = useState(new Date());
  const [modes, setModes] = useState('date');
  const [shows, setShows] = useState(false);
  const [texts, settexts] = useState(true)

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    settext(false)
    setDate(currentDate)
    let formattedDate = moment(currentDate).format('YYYY-MM-DD');
  };
  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    setFollowDate(false)
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
    setFollowDates(false)
    showModes('date');
  };





  const DeleteFunction = () => {
    setModalVisible2(!modalVisible2)
  }
  const checkValue = (value) => {
    setisService(value)
  }










  // const [LeadFile, setLeadFile] = useState('');
  const [newLeadAray, setnewLeadAray] = useState([])

  const selectLeadFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('resLead : ' + JSON.stringify(res));
      // console.log('URI : ' + res.uri);
      // console.log('Type : ' + res.type);
      // console.log('File Name : ' + res.name);
      // console.log('File Size : ' + res.size);
      // setLeadFile(res);
      StoreLeadData(res)

      AsyncStorage.getItem('token', (err, token) => {
        if (token !== null) {
          AsyncStorage.getItem('cProfile', (err, cProfile) => {
            if (cProfile !== null) {
              AsyncStorage.getItem('org_id', (err, org_id) => {
                if (org_id !== null) {
                  dispatch(leadAction.importLead(res, token, cProfile, org_id));
                }
              })
            }
          })
        }
      })
      // console.log("importLeadimportLeadimportLeadimportLead")

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const StoreLeadData = (value) => {
    let tem = value
    setnewLeadAray([
      // ...data
      tem])
  }

  // const [opportunityFile, setopportunityFile] = useState('');
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

  const [AllList, setAllList] = useState('')
  const [Lead, setLead] = useState('')
  const [Opportunity, setOpportunity] = useState('')
  const { width, height } = Dimensions.get('window');

  const dispatch = useDispatch()
  const loginData = useSelector(state => state.auth.data)
  const leadList = useSelector(state => state.leads.getLead)
  const importLead = useSelector(state => state.leads.importLead)
  const opportunityList = useSelector(state => state.opportunitys.getOpportunity)
  const importOpportunity = useSelector(state => state.opportunitys.ImportOpportunity)

  useEffect(() => {
    if (loginData) {
      if (loginData.status == "success") {
        dispatch(leadAction.leadList(
          loginData.data.token,
          loginData.data.uid,
          loginData.data.cProfile.toString(),
          loginData.data.org_uid,
        ));
        dispatch(opportunityAction.OpportunityList(
          loginData.data.token,
          loginData.data.uid,
          loginData.data.cProfile.toString(),
          loginData.data.org_uid,
        ));
      }
    }
  }, [loginData])


  useEffect(() => {
    if (leadList) {
      if (leadList.status == "200") {
        // console.log("sucess..........", leadList.data)
        setLead(leadList.data)
        CombineArrayData()
        dispatch(leadAction.clearResponse())
      }
      else if (leadList.status == "failed") {
        // Alert.alert(leadList.message)
        // console.log("sucess..failed........")
      }
      else {

      }
    }
    else {

    }
  }, [leadList])

  useEffect(() => {
    if (opportunityList) {
      if (opportunityList.status == "200") {
        // console.log("sucess..........", opportunityList.data)
        setOpportunity(opportunityList.data)
        CombineArrayData()
        dispatch(opportunityAction.clearResponse())
      }
      else if (opportunityList.status == "failed") {
        // Alert.alert(leadList.message)
        // console.log("sucess..failed........")
      }
      else {

      }
    }
    else {

    }
  }, [opportunityList])

  useEffect(() => {
    if (importLead) {
      if (importLead.status == "success") {
        Alert.alert(importLead.message)
        CombineArrayData()
        // dispatch(opportunityAction.clearResponse())
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

  const CombineArrayData = () => {

    setAllList([...Lead, ...Opportunity]);
  }

  // console.log("setAllListsetAllListsetAllList..........", AllList.length)

  const AllView = ({ item }) => {
    return (
      // <TouchableOpacity
      // // onPress={() => navigation.navigate('ContactsTwo')}
      // >
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
            <TouchableOpacity
              onPress={() => navigation.navigate('Edit_Lead', { title: 'Edit Lead', Edata: item })}
            >
              <Image
                style={{ height: 22, width: 22, marginRight: '2%' }}
                source={require('../../images/editCall.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => DeleteFunction("All")}
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
      // </TouchableOpacity>
    );
  }

  const LeadView = ({ item }) => {
    return (
      // <TouchableOpacity
      // // onPress={() => navigation.navigate('ContactsTwo')}
      // >
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
              onPress={() => DeleteFunction("All")}
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
      // </TouchableOpacity>
    );
  }

  const OpportunityVIew = ({ item }) => {
    return (
      // <TouchableOpacity
      // // onPress={() => navigation.navigate('ContactsTwo')}
      // >
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
              onPress={() => DeleteFunction("All")}
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
      // </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        flex: 1, backgroundColor: '#FAFAFC',
        width: width, height: height,
      }}
    >
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
          marginHorizontal: '7%',
          marginTop: '-4%',
          backgroundColor: '#fff',
          // height: '4.5%',
          borderRadius: 20,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>

        {isService == 'All' ?
          <TouchableOpacity style={{
            backgroundColor: '#4F46BA',
            borderRadius: 20,
            width: '30%',
            paddingVertical: 1.5,
          }}
            onPress={() => checkValue("All")}
          >
            <Text style={{ color: '#FFF', padding: 5, textAlign: 'center' }}>All</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={{
            borderRadius: 20,
            width: '30%',
            paddingVertical: 1.5,
          }}
            onPress={() => checkValue("All")}
          >
            <Text style={{ padding: 5, color: 'black', textAlign: 'center' }}>All</Text>
          </TouchableOpacity>
        }

        {isService == 'Lead' ?
          <TouchableOpacity style={{
            backgroundColor: '#4F46BA',
            borderRadius: 20, width: '30%', paddingVertical: 1.5,
          }}
            onPress={() => checkValue("Lead")}
          >
            <Text style={{ color: '#FFF', padding: 5, textAlign: 'center' }}>Lead</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={{
            borderRadius: 20,
            width: '30%',
            paddingVertical: 1.5,
          }}
            onPress={() => checkValue("Lead")}
          >
            <Text style={{ padding: 5, color: 'black', textAlign: 'center' }}>Lead</Text>
          </TouchableOpacity>
        }

        {isService == 'Opportunity' ?

          <TouchableOpacity style={{
            backgroundColor: '#4F46BA',
            borderRadius: 20, width: '30%', paddingVertical: 1.5,
          }}
            onPress={() => checkValue("Opportunity")}
          >
            <Text style={{ color: '#FFF', padding: 5, textAlign: 'center' }}>Opportunity</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={{
            borderRadius: 20,
            width: '30%',
            paddingVertical: 1.5,
          }}
            onPress={() => checkValue("Opportunity")}
          >
            <Text style={{ padding: 5, color: 'black', textAlign: 'center' }}>Opportunity</Text>
          </TouchableOpacity>
        }
      </View>

      {/* ------------------------------------------------------------------ */}

      {/* <View> */}
      {/* </View> */}
      {
        isService == "All" ?

          <View style={{ marginTop: '3%' }}>
            <View style={{  flexDirection: 'row',justifyContent: 'space-around', padding: '2%'}}>
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

            <FlatList
              style={{ height: height / 1.55 }}
              data={AllList}
              renderItem={AllView}
            />

            <View style={{ marginTop: '2%' }}></View>
          </View>

          :
          <View />
      }

      {
        isService == "Lead" ?
          <View style={{ marginTop: '3%' }}>
            <View style={{  flexDirection: 'row',justifyContent: 'space-around', padding: '2%'}}>
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
            <View style={{ marginTop: '2%' }}></View>
            <FlatList
              style={{ height: height / 1.7 }}
              data={Lead}
              renderItem={LeadView}
            />
            <View style={{ marginTop: '2%' }}></View>
          </View>
          :
          <View />
      }

      {
        isService == "Opportunity" ?

          <View style={{ marginTop: '3%' }}>
            <View style={{  flexDirection: 'row',justifyContent: 'space-around', padding: '2%'}}>
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
                onPress={() => selectOpportunityFile()}
              >
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Import From Storage</Text>
              </TouchableOpacity>

            </View>
            <View style={{ marginTop: '2%' }}></View>
            <FlatList
              style={{ height: height / 1.7 }}
              data={Opportunity}
              renderItem={OpportunityVIew}
            />
            <View style={{ marginTop: '2%' }}></View>
          </View>
          :
          <View />
      }

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.centeredView3}>
          <View style={styles.modalView3}>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end' }}
              onPress={() => DeleteFunction()}
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


              onPress={() => DeleteFunction()}
            >
              <Text style={styles.textStyle3}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View >
  );
}


