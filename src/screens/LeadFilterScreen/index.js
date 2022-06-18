import React, { useState, useEffect } from 'react';
import {
  Text, View, ActivityIndicator, Image, Platform, FlatList, Linking, Dimensions, ToastAndroid
} from 'react-native';
import styles from './styles';
import Header from '../../component/header';
import { useDispatch, useSelector, connect } from 'react-redux';
import { leadmanagerAction, historyAction } from '../../redux/Actions/index'
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import navigationStrings from '../../constant/navigationStrings';
export default function LeadFilterScreen({ navigation, route }) {
  const [IsLodding, setIsLodding] = useState(true)
  const [leadList, setleadList] = useState([])
  const [isService, setisService] = useState(route.params.value);
  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const loginData = useSelector(state => state.auth.data)
  const Leads = useSelector(state => state.leadmanager.GetList)
  const [page, setPage] = useState(0);
  const [perPageItems, setperPageItems] = useState(10);
  const [totalItems, settotalItems] = useState(0);
  const [filterKeys, setfilterKeys] = useState(route.params ? route.params.filters : [])

  useEffect(() => {
    isFocused ? initialstate() : initialstate()
    isFocused ? FetchData(page) : null
  }, [isFocused])
  useEffect(() => {
    if (Leads) {
      if (Leads.status == "success") {
        settotalItems(Leads.total_rows)
        if (page == 0 && Leads.data.length != 0) {
          setleadList(Leads.data)
          setIsLodding(false)
        } else if (Leads.data.length != 0) {
          let dataLive = Leads.data;
          let listTemp = [...leadList, ...dataLive];
          setleadList(listTemp)
          setIsLodding(false)
        }
        dispatch(leadmanagerAction.clearResponse())
      }
      else if (Leads.status == "failed") {
        setIsLodding(false)
        ToastAndroid.show(Leads.message, ToastAndroid.SHORT);
        dispatch(leadmanagerAction.clearResponse())
      }
    }
  }, [Leads])
  const FetchData = (p) => {
    let data = { uid: loginData.data.uid,
      org_uid: loginData.data.org_uid,
      profile_id: loginData.data.cProfile.toString(),
      pageSize: perPageItems,
      pageNumber: p,
      filters: filterKeys}
    if (isService == 'Called') {
      data.filters.push({ eq: "called", key: "status" })
      dispatch(leadmanagerAction.lead_OpprtunityList(data, loginData.data.token));
    }
    else if (isService == 'Pending') {
      data.filters.push({ eq: "pending", key: "status" })
      dispatch(leadmanagerAction.lead_OpprtunityList(data, loginData.data.token));
    }
    else if (isService == 'All') {
      dispatch(leadmanagerAction.lead_OpprtunityList(data, loginData.data.token));
    }
  }
  const initialstate = () => {
    setIsLodding(true)
    setleadList([])
    setPage(0)
  }
  const fetchNextItems = () => {
    if (totalItems > leadList.length) {
      let p = page + 1;
      setPage(p);
      FetchData(p)
    }
  }
  const [refreshing, setrefreshing] = useState(false)
  const handleRefresh = () => {
    initialstate()
    FetchData(0)
  }
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.listData}  onPress={() => navigation.navigate(navigationStrings.Lead_ManagerDetail, { item: item })}>
        <View>
          <Image style={{ height: 48, width: 48, }} source={require('../../images/profileCall.png')} />
        </View>
        <View style={{ flex: 1, marginHorizontal: '2%' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto' }}>{item.first_name} {item.last_name}</Text>
          <Text style={{ color: 'black', fontSize: 10 }}>{item.phone}</Text>
          {item.description ? <Text style={{ color: 'black', fontSize: 10 }} numberOfLines={1}>{item.description}</Text> : null}
          {item.status == 'pending' ?
            <View style={{ backgroundColor: '#F69708', paddingHorizontal: '3%', width: '26%', borderRadius: 10, marginBottom: '2%' }}>
              <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center' }}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
            </View>
            :
            <View style={{ backgroundColor: '#05B829', paddingHorizontal: '3%', width: '25%', borderRadius: 10, marginBottom: '2%' }}>
              <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center' }}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
            </View>}
        </View>
        <View >
          <Image style={{ height: 35, width: 35, marginTop: '10%' }} source={require('../../images/GroupCall.png')} />
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <Header
        onPressLeft={() => { navigation.openDrawer() }}
        title='Leads'
        onPressRight={() => { navigation.navigate('Notification') }}
      />
      <View style={{ flex: 1, marginVertical: '2%', marginHorizontal: '3%' }}>
        {IsLodding == true ?
          <ActivityIndicator size="small" color="#0000ff" />
          :
          <FlatList
            data={leadList}
            renderItem={renderItem}
            ListEmptyComponent={() => (!leadList.length ?
              <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '3%' }}>Data Not Found</Text>
              : null)}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={() => fetchNextItems()}
            keyExtractor={item => item.id} />
        }
      </View>
    </View>
  );
}