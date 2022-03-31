import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, FlatList, Image, Platform, ToastAndroid, Modal, Pressable, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import PieChart from 'react-native-pie-chart';
import Header from "../../component/header/index";
import styles from './styles';
import { useDispatch, useSelector, connect } from 'react-redux';
import { dashboardAction } from '../../redux/Actions/index'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function Dashboard({ navigation, route, props }) {

  const [total, settotal] = useState({
    opportunitys: '',
    leads: '',
    accounts: '',
    contacts: '',
    leadList: []
  })
  // const [totalChart, settotalChart] = useState({
  //   opportunitys: '',
  //   leads: '',
  //   accounts: '',
  //   contacts: '',
  //   leadList: []
  // })

  const { width, height } = Dimensions.get('window');
  const [IsLodding, setIsLodding] = useState(true)
  const [Opportunity, setOpportunity] = useState('7-Days');
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const dispatch = useDispatch()
  const loginData = useSelector(state => state.auth.data)
  const dashboardData = useSelector(state => state.dashboard.data)
  const TokenData = useSelector(state => state.dashboard.tokenData)

  const widthAndHeight = 160
  const series = [10, 4]
  const sliceColor = ['#6191F3', '#FFBC04']
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
  useEffect(() => {
    if (loginData) {
      Get_Data()
    }
  }, [])
  useEffect(() => {
    if (loginData) {
      AsyncStorage.getItem('fcmToken', (err, token) => {
        if (token !== null) {
          dispatch(dashboardAction.UpdateToken(loginData.data.uid, JSON.parse(token), loginData.data.token))
        }
      })
    }
  }, [])

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




  // useEffect(() => {
  //   console.log("lengtegbsdbn/...............",Tcontacts.length)
  //   // if (Tcontacts.length )
  //   setModalVisible2(true)
  // }, []);

  const Get_Data = () => {
    setIsLodding(true)
    dispatch(dashboardAction.dashboard(
      loginData.data.uid,
      loginData.data.org_uid,
      loginData.data.cProfile,
      loginData.data.token
    ));
  }

  useEffect(() => {
    if (dashboardData) {
      setIsLodding(false)
      if (dashboardData.status == "200") {
        settotal({
          opportunitys: dashboardData.data.total_opportunities,
          leads: dashboardData.data.total_leads,
          accounts: dashboardData.data.total_accounts,
          contacts: dashboardData.data.total_contacts,
          leadList: dashboardData.data.leads,
        })
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

  const [refreshing, setrefreshing] = useState(false)
  const handleRefresh = () => {
    console.log(refreshing)
    Get_Data()
  }


  const renderItemLead = ({ item }) => {
    return (
      <Card style={{ marginTop: '1%' }}>
        <View style={{ flexDirection: 'row', padding: 3 }}>
          <View>
            <Image
              style={styles.notifyImage}
              source={require('../../images/call.png')}
            />
          </View>
          <View style={{ marginHorizontal: '2%', width: '75%' }}>
            <Text style={{ fontSize: 12, fontFamily: 'ROboto', fontWeight: 'bold', color: '#0F0F0F' }}>{item.first_name} {item.last_name}</Text>
            <Text style={{ fontSize: 10, fontFamily: 'ROboto', color: '#0F0F0F' }}>{moment(item.scheduled_time).format('lll')}</Text>
          </View>
          {/* <TouchableOpacity
             >
            <Image style={styles.notifyImage}
              source={require('../../images/arrow.png')} />
          </TouchableOpacity> */}
        </View>
      </Card>
    );
  }

  return (
    <View style={[styles.container, { width: width, height: height }]}
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
          <View style={styles.reView}>
            <Pressable style={{ width: '49%' }}
              onPress={() => navigation.navigate('lead_manager', { key: 'Opportunity' })}  >
              <Card style={[styles.cardBox, { borderColor: '#FE2EA4', }]} >
                <Text style={styles.cardTitle}>Total Opportunity</Text>
                <Text style={[styles.counter, { color: '#3072F2' }]}>{total.opportunitys}</Text>
              </Card>
            </Pressable >
            <Pressable style={{ width: '49%' }}
              onPress={() => navigation.navigate('lead_manager', { key: 'Lead' })}>
              <Card style={[styles.cardBox, { borderColor: '#3373F3' }]}>
                <Text style={styles.cardTitle}>Total Leads</Text>
                <Text style={[styles.counter, { color: '#FE2EA4', }]}>{total.leads}</Text>
              </Card>
            </Pressable >
          </View>
          <View style={[styles.reView, { marginTop: 0 }]}>
            <Pressable style={{ width: '49%' }} >
              <Card style={[styles.cardBox, { borderColor: '#FE2EA4', }]} >
                <Text style={styles.cardTitle}>Total User</Text>
                <Text style={[styles.counter, { color: '#3072F2' }]}>{total.accounts}</Text>
              </Card>
            </Pressable >
            <Pressable style={{ width: '49%' }}
              onPress={() => navigation.navigate('AddContact')}>
              <Card style={[styles.cardBox, { borderColor: '#3373F3' }]}>
                <Text style={styles.cardTitle}>Total Contacts</Text>
                <Text style={[styles.counter, { color: '#FE2EA4', }]}>{total.contacts}</Text>
              </Card>
            </Pressable >
          </View>
          <FlatList contentContainerStyle={{
            // display: "flex",
            flexGrow: 1,
          }}
            data={[{}]}
            keyExtractor={() => 'childrenkeyflatlist'}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            renderItem={() =>
              <View style={{ width: width }}>

                {/* {total.leads ? */}
                <View>
                  <Text style={{ fontFamily: 'Roboto', marginHorizontal: '3%', fontWeight: 'bold', fontSize: 16, color: '#000000' }}>Leads</Text>
                  <Card style={{ marginHorizontal: '3%', padding: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: '5%' }}>
                      <PieChart
                        widthAndHeight={widthAndHeight}
                        series={series}
                        sliceColor={sliceColor}
                      />
                      <Text style={[styles.parcentage, { marginTop: '15%', marginLeft: '8%' }]}>30%</Text>
                      <Text style={[styles.parcentage, { marginTop: '29%', marginLeft: '28%' }]}>70%</Text>
                      <View style={{ opacity: 10 }}>
                        <Text style={{ marginLeft: '5%', color: '#0F0F0F', fontSize: 14 }}>Leads</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          <View style={{ flexDirection: 'row', marginLeft: '5%', marginTop: '5%' }}>
                            <View style={{ backgroundColor: '#6191F3', height: 15, width: 15, borderRadius: 15 / 2, marginRight: '3%' }}>
                            </View>
                            <Text style={{ fontSize: 12, fontFamily: 'Roboto', color: '#111111' }}>Pending  </Text>
                            <View style={{ backgroundColor: '#FFBC04', height: 15, width: 15, borderRadius: 15 / 2, marginLeft: '2%', marginRight: '5%' }}>
                            </View>
                            <Text style={{ fontSize: 12, fontFamily: 'Roboto', color: '#111111', marginRight: '-6.5%' }}>Called</Text>
                          </View>
                        </View>
                        {
                          Opportunity == "Today" ?
                            <TouchableOpacity
                              style={[styles.opportunityBtn, { backgroundColor: '#2450FF', borderColor: '#2450FF' }]}
                              onPress={() => checkStatusValue("Today")}
                            >
                              <Text style={[styles.opportunityText, { color: 'white' }]}>
                                Today
                              </Text>
                            </TouchableOpacity>
                            : <TouchableOpacity
                              style={[styles.opportunityBtn, { backgroundColor: '#EBEBEB', borderColor: '#EBEBEB' }]}
                              onPress={() => checkStatusValue("Today")}
                            >
                              <Text style={[styles.opportunityText, { color: '#6094F9' }]}>
                                Today
                              </Text>
                            </TouchableOpacity>
                        }

                        {
                          Opportunity == "7-Days" ?
                            <TouchableOpacity
                              style={[styles.opportunityBtn, { backgroundColor: '#2450FF', borderColor: '#2450FF' }]}
                              onPress={() => checkStatusValue("7-Days")}
                            >
                              <Text style={[styles.opportunityText, { color: 'white' }]}>
                                7 Days
                              </Text>
                            </TouchableOpacity>
                            : <TouchableOpacity
                              style={[styles.opportunityBtn, { backgroundColor: '#EBEBEB', borderColor: '#EBEBEB' }]}
                              onPress={() => checkStatusValue("7-Days")}
                            >
                              <Text style={[styles.opportunityText, { color: '#6094F9' }]}>
                                7 Days
                              </Text>
                            </TouchableOpacity>
                        }
                        {
                          Opportunity == "30-Days" ?
                            <TouchableOpacity
                              style={[styles.opportunityBtn, { backgroundColor: '#2450FF', borderColor: '#2450FF' }]}
                              onPress={() => checkStatusValue("30-Days")}
                            >
                              <Text style={[styles.opportunityText, { color: 'white' }]}>
                                30 Days
                              </Text>
                            </TouchableOpacity>
                            : <TouchableOpacity
                              onPress={() => checkStatusValue("30-Days")}
                              style={[styles.opportunityBtn, { backgroundColor: '#EBEBEB', borderColor: '#EBEBEB' }]}
                            >
                              <Text style={[styles.opportunityText, { color: '#6094F9' }]}>
                                30 Days
                              </Text>
                            </TouchableOpacity>
                        }
                      </View>
                    </View>
                  </Card>
                </View>
                {/* : null} */}
                <View style={{ marginHorizontal: '3%', marginTop: '3%' }}>
                  <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 16, color: '#000000' }}>Latest Leads</Text>
                  <FlatList
                    // style={{ flexGrow: 0, maxHeight: '50%' }}
                    data={total.leadList}
                    scrollEnabled={true}
                    renderItem={renderItemLead}
                    ListEmptyComponent={() => (!total.leadList.length ?
                      <Text style={{ textAlign: 'center', marginTop: '5%', fontSize: 20 }}>Data Not Available</Text>
                      : null)}
                    keyExtractor={(item) => item.id}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('lead_manager', { key: 'Lead' })}
                    style={{ alignSelf: 'flex-end', margin: '5%', marginRight: '0%', width: '20%' }}>
                    <Text style={{ textAlign: 'center' }}>More...</Text>
                  </TouchableOpacity>
                </View>
                <View style={{height:50}}/>
              </View>
            } />
        </View>}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => { setModalVisible2(!modalVisible2); }}
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
            <View style={{ flexDirection: 'row'}} >
              <TouchableOpacity onPress={() => addContacts()}
                style={[styles.btnM, { backgroundColor: '#4581F8' }]}>
                <Text style={styles.btnTextM} > OK </Text>
              </TouchableOpacity>
              <View style={{ marginLeft: '2%' }} />
              <TouchableOpacity onPress={() => SkipContact()}
                style={[styles.btnM, { backgroundColor: '#B8B8B8' }]} >
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
        onRequestClose={() => { setModalVisible3(!modalVisible3); }}
      >
        <Card style={[styles.centeredViewM2, { paddingBottom: '-5%', }]}>
          <View style={{ paddingTop: '3%' }}>
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
              onPress={() => ContactUpload()}
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
      </Modal> */}
    </View>
  );
}


