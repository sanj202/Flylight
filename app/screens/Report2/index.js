import React, { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, View, Text, TouchableOpacity, Image ,ToastAndroid} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Card } from 'react-native-paper'
import styles from "./styles";
import Header from '../../component/header'
import { reportAction, campaignAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/core"

export default function Report({ navigation }) {
    const data = [
        { label: 'My List  ', value: '+ My List' },
        { label: 'Sales List', value: 'Sales List' },
    ];


    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [IsLodding, setIsLodding] = useState(true)
    // const { width, height } = Dimensions.get('window');

    const [Report, setReport] = useState()
    const [campaignData, setcampaignData] = useState([])

    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const reportData = useSelector(state => state.report.getReportList)
    const campaignList = useSelector(state => state.leads.campaign)

    useEffect(() => {
        if (loginData  && isFocused) {
                const data = {
                    uid: loginData.data.uid,
                    org_uid: loginData.data.org_uid,
                    profile_id: loginData.data.cProfile,
                }
                dispatch(reportAction.reportList(data, loginData.data.token));
               dispatch(campaignAction.CampaignList(data, loginData.data.token));
        }
    }, [loginData, isFocused])

    useEffect(() => {
        if (reportData) {
            if (reportData.status == "200") {
                setIsLodding(false)
                setReport(reportData.data)
            }
            else if (reportData.status == "failed") {
                setIsLodding(false)
                ToastAndroid.show(reportData.message, ToastAndroid.SHORT);
            }
            else if (reportData.status == "fail") {
                setIsLodding(false)
                ToastAndroid.show(reportData.message, ToastAndroid.SHORT);
            }
            else {
                setIsLodding(false)
            }
        }
        else {

        }
    }, [reportData])

    useEffect(() => {
        if (campaignList) {
            if (campaignList.status == "200") {
              let campList = campaignList.data && campaignList.data.map((ld) => {
                    let user = { label: ld.campaign_name, value: ld.id }
                    return user;
                })
                setcampaignData(campList ? campList : [{ label: 'None', value: 'None' }])
            }
            else if (campaignList.status == "failed") {
            }
            else if (campaignList.status == "fail") {
            }
        }
        else {
        }
    }, [campaignList])


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header
                onPressLeft={() => {
                    navigation.goBack()
                }}
                title='Reports'
                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />
            <View style={styles.container3}>
                <Text style={{ color: '#000000', paddingBottom: '2%', fontSize: 20 }}>Select Campaign</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Dropdown
                        style={[styles.dropdown3, { width: '70%' }, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle3}
                        selectedTextStyle={styles.selectedTextStyle3}
                        // inputSearchStyle={styles.inputSearchStyle3}
                        iconStyle={styles.iconStyle3}
                        data={campaignData}
                        // search
                        maxHeight={100}
                        labelField="label"
                        valueField="value"
                        placeholder='Select Campaign'
                        // searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (

                            <View>
                                <Image
                                    source={require('../../images/list.png')}
                                    style={{ height: 23, width: 17, marginRight: '2%' }}
                                />
                            </View>
                        )}
                    />
                    <TouchableOpacity style={[styles.button,]}
                    // onPress={() => Search(value)}
                    >
                        <Text style={styles.textButton}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {IsLodding == true ?
                <ActivityIndicator size="small" color="#0000ff" />
                :
                <ScrollView>
                    <Card style={styles.card}>
                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'Roboto' }} >Total Opportunity</Text>
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }} >{Report ? Report.total_opportunities : '0'}</Text>
                                </View>
                                <View style={{
                                    height: 37, width: 42, borderWidth: 2, marginTop: '3%',
                                    padding: '2.5%', borderRadius: 10, borderColor: '#fff', backgroundColor: '#E90054'
                                }}>
                                    <Image
                                        source={require('../../images/arrow_white.png')}
                                        style={{ height: 13, width: 20, }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Card>

                    <Card style={[styles.card, { backgroundColor: '#6FD3F5' }]}>
                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'Roboto' }} >Total Leads</Text>
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }} >{Report ? Report.total_leads : '0'}</Text>
                                </View>
                                <View style={{
                                    height: 37, width: 42, borderWidth: 2, marginTop: '3%',
                                    padding: '2.5%', borderRadius: 10, borderColor: '#fff',
                                    backgroundColor: '#04AEE8'
                                }}>
                                    <Image
                                        source={require('../../images/arrow_white.png')}
                                        style={{ height: 13, width: 20, }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Card>

                    <Card style={[styles.card, { backgroundColor: '#EFEF2A' }]}>
                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'Roboto' }} >Opportunity Called</Text>
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }} >{Report ? Report.opportunities_called : '0'}</Text>
                                </View>
                                <View style={{
                                    height: 37, width: 42, borderWidth: 2, marginTop: '3%',
                                    padding: '2.5%', borderRadius: 10, borderColor: '#fff', backgroundColor: '#D1D100'
                                }}>
                                    <Image
                                        source={require('../../images/arrow_white.png')}
                                        style={{ height: 13, width: 20, }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Card>

                    <Card style={[styles.card, { backgroundColor: '#EF2AE2' }]}>
                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'Roboto' }} >Lead Called</Text>
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }} >{Report ? Report.lead_called : '0'}</Text>
                                </View>
                                <View style={{
                                    height: 37, width: 42, borderWidth: 2, marginTop: '3%',
                                    padding: '2.5%', borderRadius: 10, borderColor: '#fff', backgroundColor: '#EF2AE2'
                                }}>
                                    <Image
                                        source={require('../../images/arrow_white.png')}
                                        style={{ height: 13, width: 20, }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Card>


                    <Card style={[styles.card, { backgroundColor: '#F99A70' }]}>
                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'Roboto' }} >Opportunity Pending</Text>
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }} >{Report ? Report.opportunities_pending : '0'}</Text>
                                </View>
                                <View style={{
                                    height: 37, width: 42, borderWidth: 2, marginTop: '3%',
                                    padding: '2.5%', borderRadius: 10, borderColor: '#fff', backgroundColor: '#F94C00'
                                }}>
                                    <Image
                                        source={require('../../images/arrow_white.png')}
                                        style={{ height: 13, width: 20, }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Card>

                    <Card style={[styles.card, { backgroundColor: '#2AEF4B' }]}>
                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'Roboto' }} >Leads Pending</Text>
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }} >{Report ? Report.lead_pending : '0'}</Text>
                                </View>
                                <View style={{
                                    height: 37, width: 42, borderWidth: 2, marginTop: '3%',
                                    padding: '2.5%', borderRadius: 10, borderColor: '#fff', backgroundColor: '#00CF23'
                                }}>
                                    <Image
                                        source={require('../../images/arrow_white.png')}
                                        style={{ height: 13, width: 20, }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Card>
                </ScrollView>
            }
        </View>
    );
}