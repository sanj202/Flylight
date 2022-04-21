import React, { useState, useEffect } from 'react';
import {
  Text, View, ActivityIndicator, Image, Platform, FlatList, Linking, Dimensions, ToastAndroid
} from 'react-native';
import styles from './styles';
import Header from '../../component/header';
import { useDispatch, useSelector, connect } from 'react-redux';
import { leadmanagerAction, historyAction } from '../../redux/Actions/index'

export default function LeadFilterScreen({ navigation, route }) {
  console.log(route.params)
  const [IsLodding, setIsLodding] = useState({
    leadLodding: true,
    statusLodding: true,
  })
  const [leadList, setleadList] = useState('')
  const [isService, setisService] = useState(route.params.value);
  const dispatch = useDispatch()
  const loginData = useSelector(state => state.auth.data)
  const Leads = useSelector(state => state.leadmanager.GetList)
  const { width, height } = Dimensions.get('window');
  const [page, setPage] = useState(0);
  const [perPageItems, setperPageItems] = useState(10);
  const [totalItems, settotalItems] = useState(0);
  const [filterKeys, setfilterKeys] = useState(route.params ? route.params.filters : [])

  useEffect(() => {
    setleadList([])
    FetchData(page)
    setfilterKeys([])
  }, [])

  const FetchData = (p) => {
    let data = {
      uid: loginData.data.uid,
      org_uid: loginData.data.org_uid,
      profile_id: loginData.data.cProfile.toString(),
      pageSize: perPageItems,
      pageNumber: p,
      filters: filterKeys
    }
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

  useEffect(() => {
    if (Leads) {
      console.log('......................', Leads)
      if (Leads.status == "success") {
        settotalItems(Leads.total_rows)
        setleadList([...leadList, ...Leads.data])
        setIsLodding({
          ...IsLodding,
          leadLodding: false
        })
        dispatch(leadmanagerAction.clearResponse())
      }
      else if (Leads.status == "failed") {
        setIsLodding({
          ...IsLodding,
          leadLodding: false
        })
        ToastAndroid.show(Leads.message, ToastAndroid.SHORT);
        dispatch(leadmanagerAction.clearResponse())
      }
    }
  }, [Leads])
  const fetchNextItems = () => {
    if (totalItems > leadList.length) {
      let p = page + 1;
      setPage(p);
      FetchData(p)
    }
  }
  const [refreshing, setrefreshing] = useState(false)
  const handleRefresh = () => {
    console.log(refreshing)
    setIsLodding({
      statusLodding: true,
      leadLodding: true
    })
    setleadList([])
    setPage(0)
    FetchData(0)
  }
  const renderItem = ({ item }) => {
    return (
      // <TouchableOpacity onPress={() => navigation.navigate('LeadDetail', { item: item })} >
      <View style={styles.listData} >
        <View style={{ backgroundColor: '', justifyContent: 'center', }}>
          <Image style={{ height: 48, width: 48, }} source={require('../../images/profileCall.png')} />
        </View>
        <View style={{ marginLeft: '2%', flex: 1, backgroundColor: '', }}>
          <Text style={{
            fontWeight: 'bold', fontSize: 14, color: '#0F0F0F', fontFamily: 'Roboto'
          }}>{item.first_name} {item.last_name}</Text>
          <View style={{ flexDirection: 'row', }}>
            <View style={{ width: '35%', backgroundColor: '' }}>
              <Text numberOfLines={1} style={{ color: 'black', fontFamily: 'Roboto', fontSize: 12, color: '#0F0F0F', flexShrink: 1 }}>
                {item.company}</Text>
            </View>
            {item.status == 'pending' ?
              <View style={{ backgroundColor: '#F69708', paddingHorizontal: '3%', paddingVertical: '1%', borderRadius: 10 }}>
                <Text style={{ color: '#fff' }}>{item.status}</Text>
              </View>
              :
              <View style={{ backgroundColor: '#05B829', paddingHorizontal: '3%', paddingVertical: '1%', borderRadius: 10 }}>
                <Text style={{ color: '#fff' }}>{item.status}</Text>
              </View>}
          </View>
          <View style={{ flexDirection: 'row', }}>
            <Text max style={{ color: 'black', fontSize: 10 }}>{item.phone}</Text>
          </View>
        </View>
        {/* <View style={{ marginLeft: '2%', backgroundColor: '', marginTop: '1%' }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ marginLeft: '2%' }} onPress={() => call(item)} >
                <Image style={{ height: 40, width: 40, }} source={require('../../images/GroupCall.png')} />
              </TouchableOpacity>
            </View>
          </View> */}
      </View>
      // </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        onPressLeft={() => { navigation.openDrawer() }}
        title='Leads'
        onPressRight={() => { navigation.navigate('Notification') }}
      />
      <View style={{ flex: 1, marginVertical: '2%',marginHorizontal:'3%' }}>
        {IsLodding.leadLodding == true ?
          <ActivityIndicator size="small" color="#0000ff" />
          :
          <FlatList
            // style={{ height: '65%' }}
            data={leadList}
            renderItem={renderItem}
            initialNumToRender={10}
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


