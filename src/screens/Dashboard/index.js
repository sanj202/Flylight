import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, FlatList, Image, Platform, ToastAndroid, Pressable, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import Header from "../../component/header/index";
import styles from './styles';
import { useDispatch, useSelector, connect } from 'react-redux';
import { dashboardAction, profileAction } from '../../redux/Actions/index'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useIsFocused } from "@react-navigation/core"

export default function Dashboard({ navigation, route, props }) {
  const [totalChart, settotalChart] = useState({
    calledLeads: 0,
    pendingLeads: 0,
    totalLeads: 0,
    opportunitys: 0,
    users: 0,
    contacts: 0,
    leadList: [],
    taskList: [],
    feedbacklist: [],
    IsLodding: true,
  })
  const [isService, setisService] = useState('Leads')
  const { width, height } = Dimensions.get('window');
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const loginData = useSelector(state => state.auth.data)
  const TokenData = useSelector(state => state.dashboard.tokenData)
  const dashboardDataCount = useSelector(state => state.dashboard.count)

  useEffect(() => {
    if (loginData && isFocused) {
      Get_DataCount(30)

    }
  }, [loginData, isFocused])

  useEffect(() => {
    if (loginData) {
      AsyncStorage.getItem('fcmToken', (err, token) => {
        if (token !== null) {
          dispatch(dashboardAction.UpdateToken(loginData.data.uid, JSON.parse(token), loginData.data.token))
        }
      })
    }
  }, [])

  const Get_DataCount = (p) => {
    dispatch(dashboardAction.dashboardCount(
      loginData.data.uid,
      loginData.data.org_uid,
      loginData.data.cProfile.toString(),
      loginData.data.token));
    // dispatch(profileAction.GetPermission({ account_id: loginData.data.acId.toString() }, loginData.data.token));
  }

  useEffect(() => {
    if (dashboardDataCount) {
      if (dashboardDataCount.status == "success") {
        let total = dashboardDataCount.data.calledLeads + dashboardDataCount.data.pendingLeads
        settotalChart({
          opportunitys: dashboardDataCount.data.totalOpportunities,
          users: dashboardDataCount.data.totalUsers,
          contacts: dashboardDataCount.data.totalContacts,
          totalLeads: total,
          calledLeads: dashboardDataCount.data.calledLeads,
          pendingLeads: dashboardDataCount.data.pendingLeads,
          leadList: dashboardDataCount.data.leads.rows,
          taskList: dashboardDataCount.data.tasks.rows,
          feedbacklist: dashboardDataCount.data.feedbacks.rows,
          IsLodding: false
        })
        dispatch(dashboardAction.clearResponse())
      }
    }
  }, [dashboardDataCount])

  const [refreshing, setrefreshing] = useState(false)
  const handleRefresh = () => {
    console.log(refreshing)
    settotalChart({ IsLodding: true })
    Get_DataCount()
  }

  const CheckisService = (value) => {
    setisService(value)
    Get_DataCount()
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('HistoryOne', { id: item.lead_id })}>
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
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  const renderItemTask = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Task_Manager')}>
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
              <Text style={{ fontSize: 10, fontFamily: 'ROboto', color: '#0F0F0F' }}>{moment(item.updated_at).format('lll')}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  const renderItemLead = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Lead_ManagerDetail', { item: item })}>
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
              <Text style={{ fontSize: 10, fontFamily: 'ROboto', color: '#0F0F0F' }}>{moment(item.updated_at).format('lll')}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }} >
      <Header style={Platform.OS == 'ios' ? { height: "18%" } : { height: height * 12 / 100 }}
        onPressLeft={() => { navigation.openDrawer() }}
        title='Dashboard'
        onPressRight={() => { navigation.navigate('Notification') }}
      />
      {totalChart.IsLodding == true ?
        <ActivityIndicator size="small" color="#0000ff" />
        :
        <View style={{ flex: 1, marginVertical: '2%' }}>
          <View style={styles.reView}>
            <Pressable style={{ width: '49%' }}
            // onPress={() => navigation.navigate('lead_manager', { key: 'Opportunity' })} 
            >
              <Card style={[styles.cardBox, { borderColor: '#FE2EA4', }]} >
                <Text style={styles.cardTitle}>Total Opportunity</Text>
                <Text style={[styles.counter, { color: '#3072F2' }]}>{totalChart.opportunitys}</Text>
              </Card>
            </Pressable >
            <Pressable style={{ width: '49%' }}
              onPress={() => navigation.navigate('lead_manager', { key: 'Lead' })}>
              <Card style={[styles.cardBox, { borderColor: '#3373F3' }]}>
                <Text style={styles.cardTitle}>Total Leads</Text>
                <Text style={[styles.counter, { color: '#FE2EA4', }]}>{totalChart.totalLeads}</Text>
              </Card>
            </Pressable >
          </View>
          <View style={[styles.reView, { marginTop: 0 }]}>
            <Pressable style={{ width: '49%' }}
              onPress={() => navigation.navigate('Staff_Members')} >
              <Card style={[styles.cardBox, { borderColor: '#FE2EA4', }]} >
                <Text style={styles.cardTitle}>Total User</Text>
                <Text style={[styles.counter, { color: '#3072F2' }]}>{totalChart.users}</Text>
              </Card>
            </Pressable >
            <Pressable style={{ width: '49%' }}
              onPress={() => navigation.navigate('ContactList')}>
              <Card style={[styles.cardBox, { borderColor: '#3373F3' }]}>
                <Text style={styles.cardTitle}>Total Contacts</Text>
                <Text style={[styles.counter, { color: '#FE2EA4', }]}>{totalChart.contacts}</Text>
              </Card>
            </Pressable >
          </View>
          <View style={styles.tabHeader}>
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
            {isService == 'Feedback' ?
              <TouchableOpacity style={[styles.tabStyle, { backgroundColor: '#4F46BA' }]}
                onPress={() => CheckisService('Feedback')}>
                <Text style={[styles.tabTextStyle, { color: '#fff' }]}>Upcoming</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.tabStyle}
                onPress={() => CheckisService('Feedback')}>
                <Text style={styles.tabTextStyle}>Upcoming</Text>
              </TouchableOpacity>
            }
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
          </View>
          <View style={{ flex: 1 }}>
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
                <View style={{ marginHorizontal: '3%' }}>

                  {isService == 'Task' ?
                    <View >
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
                        onPress={() => navigation.navigate('Task_Manager', { type: 'All' })}
                        style={{ alignSelf: 'flex-end', width: '20%', backgroundColor: '#3373F3', borderRadius: 20, marginVertical: '2%' }}>
                        <Text style={{ textAlign: 'center', color: '#fff', paddingVertical: '2%' }}>More...</Text>
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
                        style={{ alignSelf: 'flex-end', width: '20%', backgroundColor: '#3373F3', borderRadius: 20, marginVertical: '2%' }}>
                        <Text style={{ textAlign: 'center', color: '#fff', paddingVertical: '2%' }}>More...</Text>
                      </TouchableOpacity> : null}
                    </View> : null}
                  {isService == 'Leads' ?
                    <View style={{ flex: 1 }}>
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
                        style={{ alignSelf: 'flex-end', width: '20%', backgroundColor: '#3373F3', borderRadius: 20, marginVertical: '2%' }}>
                        <Text style={{ textAlign: 'center', color: '#fff', paddingVertical: '2%' }}>More...</Text>
                      </TouchableOpacity> : null}
                    </View> : null}
                </View>}
            />
          </View>
        </View>

      }

    </View>
  );
}


