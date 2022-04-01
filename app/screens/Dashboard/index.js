import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, FlatList, Image, Platform, ToastAndroid, Pressable, Dimensions } from 'react-native';
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
  })
  const [totalChart, settotalChart] = useState({
    calledLeads: '',
    pendingLeads: '',
    leadList: [],
    taskList: [],
    feedbacklist: []
  })
  const [isService, setisService] = useState('Task')
  const { width, height } = Dimensions.get('window');
  const [IsLodding, setIsLodding] = useState(true)
  const [ChartLodding, setChartLodding] = useState(false)
  const [Opportunity, setOpportunity] = useState('7-Days');
  const dispatch = useDispatch()
  const loginData = useSelector(state => state.auth.data)
  const dashboardData = useSelector(state => state.dashboard.data)
  const TokenData = useSelector(state => state.dashboard.tokenData)
  const dashboardDataCount = useSelector(state => state.dashboard.count)
  const widthAndHeight = 160
  const series = [totalChart.calledLeads, totalChart.pendingLeads]
  const sliceColor = ['#6191F3', '#FFBC04']

  useEffect(() => {
    if (loginData) {
      Get_Data()
      Get_DataCount(1)
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
    if (value == '30-Days') {
      setChartLodding(true)
      Get_DataCount(30)
    }
    else if (value == '7-Days') {
      setChartLodding(true)
      Get_DataCount(7)
    }
    else if (value == 'Today') {
      setChartLodding(true)
      Get_DataCount(1)
    }
  }

  const CheckisService = (value) => {
    setisService(value)
  }

  const Get_Data = () => {
    setIsLodding(true)
    dispatch(dashboardAction.dashboard(
      loginData.data.uid,
      loginData.data.org_uid,
      loginData.data.cProfile,
      loginData.data.token,
    ));
  }

  const Get_DataCount = (p) => {
    dispatch(dashboardAction.dashboardCount(
      loginData.data.uid,
      loginData.data.org_uid,
      loginData.data.cProfile.toString(),
      loginData.data.token,
      p
    ));
  }

  useEffect(() => {
    if (dashboardDataCount) {
      setIsLodding(false)
      if (dashboardDataCount.status == "success") {
        settotalChart({
          calledLeads: dashboardDataCount.data.calledLeads,
          pendingLeads: dashboardDataCount.data.pendingLeads,
          leadList: dashboardDataCount.data.leads.rows,
          taskList: dashboardDataCount.data.tasks.rows,
          feedbacklist: dashboardDataCount.data.feedbacks.rows,
        })
        setChartLodding(false)
        dispatch(dashboardAction.clearResponse())
      }
      else {
        setChartLodding(false)
      }
    }
  }, [dashboardDataCount])
  useEffect(() => {
    if (dashboardData) {
      setIsLodding(false)
      if (dashboardData.status == "200") {
        settotal({
          opportunitys: dashboardData.data.total_opportunities,
          leads: dashboardData.data.total_leads,
          accounts: dashboardData.data.total_accounts,
          contacts: dashboardData.data.total_contacts,
        })
        dispatch(dashboardAction.clearResponse())
      }
      else if (dashboardData == '') {                                                                               //otherwise alert show 
      }
      else {
        ToastAndroid.show(dashboardData.message, ToastAndroid.SHORT);
      }
    }
  }, [dashboardData])

  const [refreshing, setrefreshing] = useState(false)
  const handleRefresh = () => {
    console.log(refreshing)
    Get_Data()
    Get_DataCount(1)
  }

  const renderItem = ({ item }) => {
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
            <Text style={{ fontSize: 12, fontFamily: 'ROboto', fontWeight: 'bold', color: '#0F0F0F' }}>{item ? item.first_name : ''} {item ? item.last_name : ''}</Text>
            <Text style={{ fontSize: 10, fontFamily: 'ROboto', color: '#0F0F0F' }}>{moment(item.scheduled_time).format('lll')}</Text>
          </View>
          {/* <TouchableOpacity
            onPress={() => call(item)} >
            <Image style={styles.notifyImage}
              source={require('../../images/GroupCall.png')} />
          </TouchableOpacity> */}
        </View>
      </Card>
    );
  }

  const renderItemTask = ({ item }) => {
    return (
      <Card style={{ marginTop: '1%' }}>
        <View style={{ flexDirection: 'row', padding: 3 }}>
          <View>
            <Image
              style={styles.notifyImage}
              source={require('../../images/call.png')}
            />
          </View>
          <View style={{ marginHorizontal: '2%', width: '78%' }}>
            <Text style={{ fontSize: 12, fontFamily: 'ROboto', fontWeight: 'bold', color: '#0F0F0F' }}>{item.title ? item.title : ''}</Text>
            <Text style={{ fontSize: 10, fontFamily: 'ROboto', color: '#0F0F0F' }}>{moment(item.scheduled_time).format('lll')}</Text>
          </View>
          {/* <View>
            <Image
              style={{ height: 21, width: 21, marginVertical: '30%' }}
              source={require('../../images/arrow.png')}
            />
          </View> */}
        </View>
      </Card>
    );
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
            onPress={() => call(item)}
          >
            <Image style={styles.notifyImage}
              source={require('../../images/GroupCall.png')} />
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
          <FlatList
            contentContainerStyle={{
              // display: "flex",
              flexGrow: 1,
            }}
            data={[{}]}
            keyExtractor={() => 'childrenkeyflatlist'}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            renderItem={() =>
              <View style={{ marginHorizontal: '3%', height: height }}>
                <View style={{
                  justifyContent: "center",
                  width: "100%",
                  // flex: 1
                }}>
                  {totalChart.calledLeads || totalChart.pendingLeads ?
                    <View>
                      <Card style={{ marginVertical: '3%', padding: '3%' }}>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 16, color: '#000000' }}>Leads</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                          {ChartLodding ?
                            <ActivityIndicator size="large" color="#0000ff" />
                            :
                            <PieChart
                              widthAndHeight={widthAndHeight}
                              series={series}
                              sliceColor={sliceColor}
                            />
                          }
                          <View>
                            <View style={{ flexDirection: 'row' }}>
                              <View style={[styles.charttextIndicator, { backgroundColor: '#FFBC04' }]}>
                              </View>
                              <Text style={styles.chartText}>  Pending</Text>
                              <Text style={styles.chartText}>  {totalChart.pendingLeads}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                              <View style={[styles.charttextIndicator, { backgroundColor: '#6191F3' }]}>
                              </View>
                              <Text style={styles.chartText}>  Called</Text>
                              <Text style={styles.chartText}>  {totalChart.calledLeads}</Text>
                            </View>
                            <View>
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
                                  :
                                  <TouchableOpacity
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
                                      7-Days
                                    </Text>
                                  </TouchableOpacity>
                                  :
                                  <TouchableOpacity
                                    style={[styles.opportunityBtn, { backgroundColor: '#EBEBEB', borderColor: '#EBEBEB' }]}
                                    onPress={() => checkStatusValue("7-Days")}
                                  >
                                    <Text style={[styles.opportunityText, { color: '#6094F9' }]}>
                                      7-Days
                                    </Text>
                                  </TouchableOpacity>}
                              {
                                Opportunity == "30-Days" ?
                                  <TouchableOpacity
                                    style={[styles.opportunityBtn, { backgroundColor: '#2450FF', borderColor: '#2450FF' }]}
                                    onPress={() => checkStatusValue("30-Days")}
                                  >
                                    <Text style={[styles.opportunityText, { color: 'white' }]}>
                                      30-Days
                                    </Text>
                                  </TouchableOpacity>
                                  :
                                  <TouchableOpacity
                                    style={[styles.opportunityBtn, { backgroundColor: '#EBEBEB', borderColor: '#EBEBEB' }]}
                                    onPress={() => checkStatusValue("30-Days")}
                                  >
                                    <Text style={[styles.opportunityText, { color: '#6094F9' }]}>
                                      30-Days
                                    </Text>
                                  </TouchableOpacity>}
                            </View>
                          </View>
                        </View>
                      </Card>
                    </View>
                    : null}
                  <View style={styles.tabHeader}>
                    {isService == 'Task' ?
                      <TouchableOpacity style={[styles.tabStyle, { backgroundColor: '#4F46BA' }]}
                        onPress={() => CheckisService('Task')}>
                        <Text style={[styles.tabTextStyle, { color: '#fff' }]}>Task</Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={styles.tabStyle}
                        onPress={() => CheckisService('Task')}>
                        <Text style={styles.tabTextStyle}>Task</Text>
                      </TouchableOpacity>
                    }
                    {isService == 'Feedback' ?

                      <TouchableOpacity style={[styles.tabStyle, { backgroundColor: '#4F46BA' }]}
                        onPress={() => CheckisService('Feedback')}>
                        <Text style={[styles.tabTextStyle, { color: '#fff' }]}>Feedback</Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={styles.tabStyle}
                        onPress={() => CheckisService('Feedback')}>
                        <Text style={styles.tabTextStyle}>Feedback</Text>
                      </TouchableOpacity>
                    }
                    {isService == 'Leads' ?
                      <TouchableOpacity style={[styles.tabStyle, { backgroundColor: '#4F46BA' }]}
                        onPress={() => CheckisService('Leads')}>
                        <Text style={[styles.tabTextStyle, { color: '#fff' }]}>Leads</Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={styles.tabStyle}
                        onPress={() => CheckisService('Leads')}>
                        <Text style={styles.tabTextStyle}>Leads</Text>
                      </TouchableOpacity>
                    }
                  </View>
                  {isService == 'Task' ?
                    <View>
                      <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Open Task</Text>
                      <FlatList
                        style={{ flexGrow: 0 }}
                        data={totalChart.taskList}
                        ListEmptyComponent={() => (!totalChart.taskList.length ?
                          <Text style={{ textAlign: 'center', marginTop: '5%', fontSize: 20 }}>Data Not Available</Text>
                          : null)}
                        renderItem={renderItemTask}
                        keyExtractor={item => item.id}
                      />
                      {totalChart.taskList.length ? <TouchableOpacity
                        onPress={() => navigation.navigate('Task_Manager',{type:'All'})}
                        style={{ alignSelf: 'flex-end', width: '20%' }}>
                        <Text style={{ textAlign: 'center' }}>more...</Text>
                      </TouchableOpacity> : null}
                    </View>
                    : null}
                  {isService == 'Feedback' ?
                    <View>
                      <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Feedback</Text>
                      <FlatList
                        style={{ flexGrow: 0 }}
                        data={totalChart.feedbacklist}
                        renderItem={renderItem}
                        ListEmptyComponent={() => (!totalChart.feedbacklist.length ?
                          <Text style={{ textAlign: 'center', marginTop: '5%', fontSize: 20 }}>Data Not Available</Text>
                          : null)}
                        keyExtractor={item => item.id}
                      />
                      {totalChart.feedbacklist.length ? <TouchableOpacity
                        onPress={() => navigation.navigate('History')}
                        style={{ alignSelf: 'flex-end', width: '20%' }}>
                        <Text style={{ textAlign: 'center' }}>more...</Text>
                      </TouchableOpacity> : null}
                    </View> : null}
                  {isService == 'Leads' ?
                    <View>
                      <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Leads</Text>
                      <FlatList
                        style={{ flexGrow: 0 }}
                        data={totalChart.leadList}
                        ListEmptyComponent={() => (!totalChart.leadList.length ?
                          <Text style={{ textAlign: 'center', marginTop: '5%', fontSize: 20 }}>Data Not Available</Text>
                          : null)}
                        renderItem={renderItemLead}
                        keyExtractor={item => item.id}
                      />
                      {totalChart.leadList.length ? <TouchableOpacity
                        onPress={() => navigation.navigate('lead_manager')}
                        style={{ alignSelf: 'flex-end', width: '20%' }}>
                        <Text style={{ textAlign: 'center' }}>more...</Text>
                      </TouchableOpacity> : null}
                    </View> : null}
                </View>
              </View>}
          />
        </View>}

    </View>
  );
}


