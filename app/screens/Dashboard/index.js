import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator, Text, View, ScrollView, TouchableOpacity, TextInput, Picker,
  FlatList, Image, Platform, ToastAndroid, Modal, Pressable, Alert, RefreshControl
} from 'react-native';
import { Card } from 'react-native-paper';
import PieChart from 'react-native-pie-chart';
import Header from "../../component/header/index";
import styles from './styles';
import { useDispatch, useSelector, connect } from 'react-redux';
import { dashboardAction } from '../../redux/Actions/index'
import { useIsFocused } from "@react-navigation/core"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Dashboard({ navigation, route, props }) {

  const [Opportunity, setOpportunity] = useState('7-Days');
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [Topportunitys, setTopportunitys] = useState('')
  const [Tleads, setTleads] = useState('')
  const [Taccounts, setTaccounts] = useState('')
  const [Tcontacts, setTcontacts] = useState('')
  const [IsLodding, setIsLodding] = useState(true)

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() =>
      Get_Data(),
      setRefreshing(false)
    );
  }, []);

  const isFocused = useIsFocused();
  const dispatch = useDispatch()
  const loginData = useSelector(state => state.auth.data)
  const registerData = useSelector(state => state.varify.otp)
  const dashboardData = useSelector(state => state.dashboard.data)
  const TokenData = useSelector(state => state.dashboard.tokenData)
  // console.log('tokenData..........', TokenData)
  const widthAndHeight = 160
  const series = [90, 30,]
  const sliceColor = ['#6191F3', '#FFBC04']
  const DATA = [
    // {
    //   title: 'Meeting With Mr. Grorge',
    //   subtitle: 'Wed, 08 Sep, 14:00PM',
    //   image: '3'
    // },
    {
      title: 'Call XYZ lead',
      subtitle: 'Wed, 08 Sep, 14:00PM',
      image: '2'
    },
    // {
    //   title: 'Send Remainder to ABC lead',
    //   subtitle: 'Wed, 02 Sep, 14:00PM',
    //   image: '1'
    // },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };


  const checkStatusValue = (value) => {
    setOpportunity(value)
  }

  const addContacts = () => {
    setModalVisible2(!modalVisible2),
      setModalVisible3(!modalVisible3)
  }

  const SkipContact = () => {
    setModalVisible2(!modalVisible2)
  }

  const ContactUpload = () => {
    setModalVisible3(!modalVisible3),
      navigation.navigate('AddContactUpload')
  }
  const ManuallyAdd = () => {
    setModalVisible3(!modalVisible3),
      navigation.navigate("addTab")
  }

  useEffect(() => {
    if (loginData || registerData) {
      AsyncStorage.getItem('fcmToken', (err, token) => {
        // console.log("fcm..........tostring................",JSON.parse(token))
        if (token !== null) {
          if (loginData.status == "success") {
            dispatch(dashboardAction.UpdateToken(loginData.data.uid, JSON.parse(token), loginData.data.token))
          }
          else if (registerData.status == "success") {
            dispatch(dashboardAction.UpdateToken(registerData.data.uid, JSON.parse(token), registerData.data.token))
          }
        }
      })
    }
  }, [])

  useEffect(() => {
    if (loginData || registerData && isFocused) {
      Get_Data()
    }
  }, [loginData, registerData, isFocused])

  // useEffect(() => {
  //   console.log("lengtegbsdbn/...............",Tcontacts.length)
  //   // if (Tcontacts.length )
  //   setModalVisible2(true)
  // }, []);

  const Get_Data = () => {
    setIsLodding(true)
    if (loginData || registerData) {
      if (loginData.status == "success") {
        console.log("login..............")
        dispatch(dashboardAction.dashboard(
          loginData.data.uid,
          loginData.data.org_uid,
          loginData.data.cProfile,
          loginData.data.token
        ));
      }
      else if (registerData.status == "success") {
        console.log("register..............")
        dispatch(dashboardAction.dashboard(
          registerData.data.uid,
          registerData.data.org_uid,
          registerData.data.cProfile,
          registerData.data.token
        ));
      }
    }
  }

  useEffect(() => {
    if (dashboardData) {
      setIsLodding(false)
      if (dashboardData.status == "200") {
        setTopportunitys(dashboardData.data.total_opportunities)
        setTaccounts(dashboardData.data.total_accounts)
        setTcontacts(dashboardData.data.total_contacts)
        setTleads(dashboardData.data.total_leads)
        // if (dashboardData.data.total_contacts == []) {
        //   setModalVisible2(true)
        // }
        dispatch(dashboardAction.clearResponse())
      }
      else if (dashboardData == '') {                                                                               //otherwise alert show 
      }
      else {
        ToastAndroid.show(dashboardData.message, ToastAndroid.SHORT);
      }
    }
    else {
    }
  }, [dashboardData])

  return (
    <View style={styles.container}
    >
      <Header
        style={Platform.OS == 'ios' ?
          { height: "18%" } : { height: "16%" }}
        onPressLeft={() => {
          navigation.openDrawer()
        }}
        title='Dashboard'
        onPressRight={() => {
          navigation.navigate('Notification')
        }}
      />
      {IsLodding == true ?
        <ActivityIndicator size="small" color="#0000ff" />
        :
        <View>
           <View
            style={styles.reView}>
            <Pressable
              style={{ width: '49%' }}
              onPress={() => navigation.navigate('lead_manager', {
                key: 'Opportunity'
              })}
            >
              <Card
                style={[styles.cardBox,{borderColor: '#FE2EA4',}]} >
                <Text style={styles.cardTitle}>Total Opportunity</Text>
                <Text style={[styles.counter,{color: '#3072F2'}]}>{Topportunitys}</Text>
              </Card>
            </Pressable >
            <Pressable
              style={{ width: '49%' }}
              onPress={() => navigation.navigate('lead_manager', {
                key: 'Lead'
              })}>
              <Card
                style={[styles.cardBox,{ borderColor: '#3373F3'}]}>
                 <Text style={styles.cardTitle}>Total Leads</Text>
                <Text style={[styles.counter,{ color: '#FE2EA4',}]}>{Tleads}</Text>
              </Card>
            </Pressable >
          </View>
          <ScrollView refreshControl={
            <RefreshControl
              refreshing={refreshing}
              color='#0000ff'
              onRefresh={onRefresh}
            />
          }>
          <View
            style={[styles.reView,{ marginTop: 0 }]}>
            <Pressable
              style={{ width: '49%' }}
                  // onPress={() => navigation.navigate('lead_manager')}
            >
              <Card
                style={[styles.cardBox,{borderColor: '#FE2EA4',}]} >
                <Text style={styles.cardTitle}>Total Accounts</Text>
                <Text style={[styles.counter,{color: '#3072F2'}]}>{Taccounts}</Text>
              </Card>
            </Pressable >
            <Pressable
              style={{ width: '49%' }}
              onPress={() => navigation.navigate('AddContact')}>
              <Card
                style={[styles.cardBox,{ borderColor: '#3373F3'}]}>
                 <Text style={styles.cardTitle}>Total Contacts</Text>
                <Text style={[styles.counter,{ color: '#FE2EA4',}]}>{Tcontacts}</Text>
              </Card>
            </Pressable >
          </View>

          <View
              style={{ flexDirection: 'row', marginLeft: '5%', marginTop: '0%', marginBottom: '1%' }}>
              <TouchableOpacity style={{ marginRight: '5%' }}
                // onPress={() => checkValue("Opportunity")}
              >
                <View style={{ borderBottomWidth: 3, borderColor: '#6998F8', }} >
                  <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 16 }}>Opportunity</Text></View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("All_Lead")}
              >
                <Text style={{
                  fontFamily: 'Roboto'
                  , fontWeight: 'bold', fontSize: 16
                }}>Leads</Text>
              </TouchableOpacity>
            </View>

            <Card style={{ margin: '3%', padding: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around',paddingVertical:'3%' }}>

                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={series}
                  sliceColor={sliceColor}
                />
                <Text style={[styles.parcentage, { marginTop: '15%', marginLeft: '8%' }]}>30%</Text>
                <Text style={[styles.parcentage, { marginTop: '29%', marginLeft: '28%' }]}>70%</Text>
                <View style={{ opacity: 10 }}>

                  <Text style={{ marginLeft: '5%', color: '#0F0F0F', fontSize: 14 }}>OPPORTUNITY</Text>

                  <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={{ flexDirection: 'row', marginLeft: '5%', marginTop: '5%' }}>
                      <View style={{
                        backgroundColor: '#6191F3',
                        height: 15, width: 15, borderRadius: 15 / 2, marginRight: '3%'
                      }}>
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: 'Roboto', color: '#111111' }}>Pending  </Text>
                      <View style={{
                        backgroundColor: '#FFBC04', height: 15, width: 15, borderRadius: 15 / 2,
                        marginLeft: '2%', marginRight: '5%'
                      }}>
                      </View>
                      <Text style={{ fontSize: 12, fontFamily: 'Roboto', color: '#111111', marginRight: '-6.5%' }}>Called</Text>
                    </View>
                  </View>
                  {
                    Opportunity == "Today" ?
                      <TouchableOpacity
                      style={[styles.opportunityBtn,{ backgroundColor: '#2450FF',borderColor: '#2450FF'}]}
                        onPress={() => checkStatusValue("Today")}
                      >
                        <Text style={[styles.opportunityText,{color: 'white'}]}>
                          Today
                        </Text>
                      </TouchableOpacity>
                      : <TouchableOpacity
                      style={[styles.opportunityBtn,{ backgroundColor: '#EBEBEB',borderColor: '#EBEBEB'}]}
                        onPress={() => checkStatusValue("Today")}
                      >
                        <Text style={[styles.opportunityText,{ color: '#6094F9'} ]}>
                          Today
                        </Text>
                      </TouchableOpacity>
                  }

                  {
                    Opportunity == "7-Days" ?
                      <TouchableOpacity
                      style={[styles.opportunityBtn,{ backgroundColor: '#2450FF',borderColor: '#2450FF'}]}
                        onPress={() => checkStatusValue("7-Days")}
                      >
                        <Text style={[styles.opportunityText,{color: 'white'}]}>
                          7 Days
                        </Text>
                      </TouchableOpacity>
                      : <TouchableOpacity
                      style={[styles.opportunityBtn,{ backgroundColor: '#EBEBEB',borderColor: '#EBEBEB'}]}
                        onPress={() => checkStatusValue("7-Days")}
                      >
                         <Text style={[styles.opportunityText,{ color: '#6094F9'} ]}>
                          7 Days
                        </Text>
                      </TouchableOpacity>
                  }
                  {
                    Opportunity == "30-Days" ?
                      <TouchableOpacity
                      style={[styles.opportunityBtn,{ backgroundColor: '#2450FF',borderColor: '#2450FF'}]}
                        onPress={() => checkStatusValue("30-Days")}
                      >
                         <Text style={[styles.opportunityText,{color: 'white'}]}>
                          30 Days
                        </Text>
                      </TouchableOpacity>
                      : <TouchableOpacity
                        onPress={() => checkStatusValue("30-Days")}
                        style={[styles.opportunityBtn,{ backgroundColor: '#EBEBEB',borderColor: '#EBEBEB'}]}
                      >
                       <Text style={[styles.opportunityText,{ color: '#6094F9'} ]}>
                          30 Days
                        </Text>
                      </TouchableOpacity>
                  }
                </View>
              </View>
            </Card>
            </ScrollView>
            <FlatList
            data={DATA}
            renderItem={({ item, index }) => (
              <View >
                <TouchableOpacity
                  // onPress={() => navigation.navigate('Task_Manager')}
                >
                  <View style={styles.listData}>
                    <View style={{ flexDirection: 'row', }}>
                      {
                        item.image == '1' ?
                          <Image
                            style={{ height: 48, width: 48, marginTop: '2%' }}
                            // source={require('../../images/message.png')}
                            // source={require('../../images/call.png')}
                            source={require('../../images/blue_bell.png')}
                          /> : <View />}
                      {item.image == '2' ?
                        <Image
                          style={{ height: 48, width: 48, marginTop: '2%' }}
                          // source={require('../../images/message.png')}
                          source={require('../../images/call.png')}
                        // source={require('../../images/blue_bell.png')}
                        /> : <View />}
                      {item.image == '3' ?
                        <Image
                          style={{ height: 48, width: 48, marginTop: '2%' }}
                          source={require('../../images/message.png')}
                        // source={require('../../images/call.png')}
                        // source={require('../../images/blue_bell.png')}
                        /> : <View />
                      }

                      {/* <View style={{ marginLeft: '-10%', marginTop: '3%' }}> */}
                      <View style={{ marginTop: '4%', marginLeft: '6%' }}>
                        <Text style={{ fontSize: 14, fontFamily: 'ROboto', fontWeight: 'bold', color: '#0F0F0F' }}>{item.title}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'ROboto', color: '#0F0F0F' }}>{item.subtitle}</Text>
                      </View>
                    </View>
                    <View style={{ marginTop: '5%' }}>
                      <Image
                        style={{ height: 21, width: 21, marginRight: '2%' }}
                        source={require('../../images/arrow.png')}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.title}
          />
        </View>}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => { setModalVisible2(!modalVisible2);}}
      >
        <View style={styles.centeredViewM}>
          <View style={styles.modalViewM}>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', }}
              onPress={() => setModalVisible2(!modalVisible2)}
            >
              <Image
                style={{ margin: '5%', marginTop: '3%', height: 14, width: 14 }}
                source={require('../../images/crossImgR.png')}
              />
            </TouchableOpacity>

            <Text style={styles.titleM}>
              Do You Want To{'\n'}Add Contacts?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-around',
              }}
            >
              <TouchableOpacity
                // onPress={() => navigation.navigate("AddContactPopUp")}
                onPress={() => addContacts()

                }

                style={[styles.btnM, { backgroundColor: '#4581F8' }]}
              >
                <Text
                  style={styles.btnTextM}
                >
                  OK
                </Text>
              </TouchableOpacity>
              <View style={{ marginLeft: '2%' }} />
              <TouchableOpacity
                onPress={() => SkipContact()
                }
                style={[styles.btnM, { backgroundColor: '#B8B8B8' }]}
              >
                <Text
                  style={styles.btnTextM}
                >
                  SKIP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {setModalVisible3(!modalVisible3);}}
      >
        <Card style={[styles.centeredViewM2, { paddingBottom: '-5%', }]}>
          <View style={{  paddingTop: '3%'}}>
            <TouchableOpacity
              onPress={() => setModalVisible3(!modalVisible3)}
            >
              <Image
                style={{ margin: '5%', marginTop: '3%', alignSelf: 'flex-end', height: 14, width: 14 }}
                source={require('../../images/crossImgR.png')}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.titleA, { marginTop: '-5%' }]}>
            Add Contacts
          </Text>
          <View style={{ marginTop: '3%' }}>
            <TouchableOpacity>
              <View style={styles.listDataA}>
                <Image
                  style={styles.titleImgA}
                  source={require('../../images/book.png')}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.btnTextA}>Import from contact book</Text>

                  <Image
                    style={styles.navigateImgA}
                    source={require('../../images/navR.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: '3%' }}>
            <TouchableOpacity
              onPress={() =>ContactUpload() }
            >
              <View style={styles.listDataA}>
                <Image
                  style={styles.titleImgA}
                  source={require('../../images/upload.png')}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.btnTextA}>Upload contact file</Text>
                  <Image
                    style={[styles.navigateImgA, { marginLeft: '25%' }]}
                    source={require('../../images/navR.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: '3%' }}>
            <TouchableOpacity
              onPress={() => ManuallyAdd()}
            >
              <View style={[styles.listDataA, { borderBottomWidth: 0, }]}>
                <Image
                  style={styles.titleImgA}
                  source={require('../../images/addR.png')}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.btnTextA}>Add manually</Text>
                  <Image
                    style={[styles.navigateImgA, { marginLeft: '37%' }]}
                    source={require('../../images/navR.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      </Modal>
    </View>
  );
}


