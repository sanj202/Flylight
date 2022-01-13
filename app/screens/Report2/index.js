import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, StatusBar, View, Text, TouchableOpacity, Image, Touchable } from 'react-native';
import PieChart from 'react-native-pie-chart';
import {
    LineChart,
    BarChart,
    // PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit'
import { Dropdown } from 'react-native-element-dropdown';
import { Card } from 'react-native-paper'
import styles from "./styles";
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../component/header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { reportAction } from '../../redux/Actions/index'
import { useDispatch, useSelector, connect } from 'react-redux';

import moment from 'moment';


// import PieChart from 'react-native-chart-kit';

export default function Report({ navigation }) {

    const data = [
        { label: 'My List  ', value: '+ My List' },
        { label: 'Sales List', value: 'Sales List' },
        // { label: '+ Add List', value: '+ Add List' },
    ];


    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    
    // const { width, height } = Dimensions.get('window');
    const [Report, setReport] = useState()
    const dispatch = useDispatch()
    const reportData = useSelector(state => state.report.getReportList)

    console.log("reportData............",reportData)

    // useEffect(() => {
    //     if (loginData) {
    //         if (loginData.status == "success") {
    //             dispatch(reportAction.reportList(
    //                 loginData.data.token,
    //                 loginData.data.uid,
    //                 loginData.data.org_uid,
    //                 loginData.data.cProfile.toString(),
    //                 loginData.data.user.org_id.toString(),
    //             ));
    //         }
    //     }
    // }, [loginData])

    useEffect(() => {
        AsyncStorage.getItem('token', (err, token) => {
            console.log("Async.........")
            if (token !== null) {
                AsyncStorage.getItem('org_id', (err, org_id) => {
                    if (org_id !== null) {
                        AsyncStorage.getItem('org_uid', (err, org_uid) => {
                            if (org_uid !== null) {
                        AsyncStorage.getItem('uid', (err, uid) => {
                            if (uid !== null) {
                                AsyncStorage.getItem('cProfile', (err, cProfile) => {
                                    if (cProfile !== null) {
                                        AsyncStorage.getItem('user_id', (err, user_id) => {
                                            if (user_id !== null) {
                                                console.log("Async.........")
                                                dispatch(reportAction.reportList(token, uid, cProfile, org_id ,org_uid));
                                                // dispatch(opportunityAction.OpportunityList(token, uid, cProfile, org_uid));
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                        })
                    }
                })
            }
        })
    }, []);

    useEffect(() => {
        if (reportData) {
            if (reportData.status == "200") {
                // console.log("sucess..........", reportData.data)
                setReport(reportData.data)
                // dispatch(leadAction.clearResponse())
                //   Alert.alert(reportData.message)
            }
            else if (reportData.status == "failed") {
                // Alert.alert(leadList.message)
                // console.log("sucess..failed........")
            }
            else if (reportData.status == "fail") {
                Alert.alert(reportData.message)
            }
            else {

            }
        }
        else {

        }
    }, [reportData])


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            
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
                // style={{ height: "10%" }}
                onPressLeft={() => {
                    // navigation.openDrawer()
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
                        data={data}
                        // search
                        maxHeight={120}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Campaign' : '...'}
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
        </View>

    );
}