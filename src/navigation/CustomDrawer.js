import React, { useState, useEffect } from "react";
import {TouchableOpacity, Pressable, StyleSheet, Dimensions, View, Text,
    ToastAndroid, Image, ImageBackground, StatusBar, Alert} from 'react-native'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector, connect } from 'react-redux';
import { profileAction, authAction, varificationAction } from '../redux/Actions';
import { useIsFocused } from '@react-navigation/native';
import {DrawerContentScrollView,
    // DrawerItemList,
    // DrawerItem,
} from '@react-navigation/drawer';
import navigationStrings from "../constant/navigationStrings";
import { Base_ImageUrl } from '../../const'

export default function SideMenu(props) {
    const [user, setUser] = useState('');
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const profileData = useSelector(state => state.profile.userDetail)
    const PermissionData = useSelector(state => state.profile.permission)
    const { width, height } = Dimensions.get('window');

    useEffect(() => {
        const data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
        }
        dispatch(profileAction.profile(data, loginData.data.token));
        dispatch(profileAction.GetPermission({ account_id: loginData.data.acId.toString() }, loginData.data.token));
    }, [props])

    useEffect(() => {
        if (profileData) {
            if (profileData.status == "200") {
                setUser(profileData.data.user)
                dispatch(profileAction.clearResponse())
            }
            else if (profileData.status == "fail")  {
                ToastAndroid.show(profileData.message, ToastAndroid.SHORT);
            }
        }
    }, [profileData])

    const [leadPermission, setleadPermission] = useState(false);
    const [userPermission, setuserPermission] = useState(false);
    const [campPermission, setcampPermission] = useState(false);
    const [reportPermission, setreportPermission] = useState(false);
    const [taskPermission, settaskPermission] = useState(false);
    const initialstate = () => {
        setleadPermission(false)
        setuserPermission(false)
        setcampPermission(false)
        setreportPermission(false)
        settaskPermission(false)
    }
    useEffect(() => {
        if (PermissionData) {
            if (PermissionData.status == "success") {
                initialstate()
                if (PermissionLead(JSON.parse(PermissionData.permissions)).includes('view')) { setleadPermission(true) }
                if (PermissionUser(JSON.parse(PermissionData.permissions)).includes('view')) { setuserPermission(true) }
                if (PermissionCampaigns(JSON.parse(PermissionData.permissions)).includes('view')) { setcampPermission(true) }
                if (PermissionReports(JSON.parse(PermissionData.permissions)).includes('view')) { setreportPermission(true) }
                if (PermissionTasks(JSON.parse(PermissionData.permissions)).includes('view')) { settaskPermission(true) }

                // if (PermissionLead(JSON.parse(PermissionData.permissions)).includes('edit')) {
                //     console.log('edit..', true)
                // }
                // if (PermissionLead(JSON.parse(PermissionData.permissions)).includes('create')) {
                //     console.log('create..', true)
                // }
                // if (PermissionLead(JSON.parse(PermissionData.permissions)).includes('delete')) {
                //     console.log('delete..', true)
                // }
            }
            else if (PermissionData.status == "failed") {
                ToastAndroid.show(PermissionData.message, ToastAndroid.SHORT);
            }
        }
    }, [PermissionData])

    const PermissionCampaigns = (permiss, account) => {
        return permiss.campaigns.map((el) => {
            return el.value;
        })
    }

    const PermissionLead = (permiss, account) => {
        return permiss.leads.map((el) => {
            return el.value;
        })
    }

    const PermissionUser = (permiss, account) => {
        return permiss.users.map((el) => {
            return el.value;
        })
    }
    const PermissionReports = (permiss, account) => {
        return permiss.reports.map((el) => {
            return el.value;
        })
    }
    const PermissionTasks = (permiss, account) => {
        return permiss.tasks.map((el) => {
            return el.value;
        })
    }
    const LogoutSession = () => {
        dispatch(authAction.clearResponse())
    };
    return (
        <View style={{ flex: 1, }}>
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="#2B6EF2"
                translucent={false}
                networkActivityIndicatorVisible={true}
            />
            <View >
                <ImageBackground
                    source={require('../images/drawerImage.png')}
                    style={{ height: height * 22 / 100, resizeMode: "contain" }}>
                    <TouchableOpacity
                        style={{ padding: 10, width: '20%', alignSelf: 'flex-end' }}
                        onPress={() => props.navigation.closeDrawer()}>
                        <Image style={{ alignSelf: 'center', height: 13, width: 13 }}
                            source={require('../images/cross.png')} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', padding: '3%' }}>
                        {user.avatar ?
                            <Avatar.Image
                                size={100}
                                style={{ backgroundColor: '#fff' }}
                                source={{ uri: `${Base_ImageUrl}` + user.avatar }}
                            />
                            :
                            null}
                        <Card.Content style={{ marginTop: '10%', marginLeft: '-2%' }}>
                            <Title style={{ fontSize: 18, fontFamily: 'Roboto', fontWeight: 'bold', color: '#FFFFFF' }}>{user.name ? user.name : ''}</Title>
                            <Paragraph
                                style={{ marginTop: '-5%', fontSize: 13, fontFamily: 'Roboto', color: '#FFFFFF' }}>+91 {user.phone ? user.phone : ''}</Paragraph>
                            <TouchableOpacity onPress={() => props.navigation.navigate(navigationStrings.Organization)} >
                                <Text style={{ fontSize: 12, fontFamily: 'Roboto', color: '#FFFFFF' }}>Switch Orginization</Text>
                            </TouchableOpacity>
                        </Card.Content>
                    </View>
                </ImageBackground>
            </View>
            {/* <DrawerContentScrollView {...props}> */}
            <DrawerContentScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: '3%' }}  {...props}>
                <View style={{ width: width, marginBottom: '2%', }}>
                    {campPermission ?
                        <View style={styles.menusTop}>
                            <Pressable onPress={() => props.navigation.navigate(navigationStrings.Campaign)}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ marginRight: '2%', width: 23.27, height: 23.27 }}
                                        source={require('../images/language.png')}
                                    />
                                    <View style={styles.menus}>
                                        <Text style={styles.items}>Campaigns</Text>
                                        {/* <Image style={[styles.image3]}
                                        source={require('../images/next.png')}
                                    /> */}
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                        : null}
                    <View style={styles.menusTop}>
                        <Pressable onPress={() => props.navigation.navigate(navigationStrings.Action_Manager)}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Image style={{ marginTop: '1.5%', marginRight: '3%', height: 15.19, width: 18.56 }}
                                    source={require('../images/action.png')}
                                />
                                <View style={styles.menus}>
                                    <Text style={styles.items}>Action Manager</Text>
                                    {/* <Image style={[styles.image3]} source={require('../images/next.png')}
                                    /> */}
                                </View>
                            </View>
                        </Pressable>
                    </View>
                    {userPermission ?
                        <View style={styles.menusTop}>
                            <Pressable onPress={() => props.navigation.navigate(navigationStrings.Staff_Members)}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Image style={{ marginRight: '4%', height: 18, width: 15.75 }}
                                        source={require('../images/Lead.png')}
                                    />
                                    <View style={styles.menus}>
                                        <Text style={styles.items}>Users</Text>
                                        {/* <Image style={[styles.image3]} source={require('../images/next.png')} /> */}
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                        :
                        null}
                    {leadPermission ?
                        <View style={styles.menusTop}>
                            <Pressable onPress={() => props.navigation.navigate(navigationStrings.lead_manager)}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Image style={{ marginRight: '4%', height: 18, width: 15.75 }}
                                        source={require('../images/Lead.png')}
                                    />
                                    <View style={[styles.menus]}>
                                        <Text style={styles.items}>Lead Manager</Text>
                                        {/* <Image style={[styles.image3]} source={require('../images/next.png')}
                                    /> */}
                                    </View>
                                </View>
                            </Pressable>
                        </View> : null}
                    {leadPermission ?
                        <View style={styles.menusTop}>
                            <Pressable onPress={() => props.navigation.navigate(navigationStrings.TransforLeads)}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Image style={{ marginRight: '4%', height: 18, width: 15.75 }}
                                        source={require('../images/Lead.png')}
                                    />
                                    <View style={[styles.menus]}>
                                        <Text style={styles.items}>Lead Transfer</Text>
                                        {/* <Image style={[styles.image3]} source={require('../images/next.png')}
                                    /> */}
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                        :
                        null}
                    {taskPermission ?
                        <View style={styles.menusTop}>
                            <Pressable onPress={() => props.navigation.navigate(navigationStrings.Task_Manager)} >
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Image style={{ marginTop: '1.5%', marginRight: '3%', height: 15.19, width: 18 }}
                                        source={require('../images/TaskManager.png')}
                                    />
                                    <View style={styles.menus}>
                                        <Text style={styles.items}>Task Manager</Text>
                                        {/* <Image style={[styles.image3]} source={require('../images/next.png')}
                                    /> */}
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                        : null}
                    {/* <View style={styles.menusTop}>
                    <Pressable onPress={() => props.navigation.navigate('Meetings')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image style={[styles.image2, { marginRight: '4%', height: 18, width: 15.75}]}
                                source={require('../images/Lead.png')}
                            />
                            <View style={styles.menus}>
                                <Text style={styles.items}>Meetings</Text>
                                <Image style={[styles.image3, { marginLeft: '48%' }]}
                                    source={require('../images/next.png')} />
                            </View>
                        </View>
                    </Pressable>
                </View> */}
                    <View style={styles.menusTop}>
                        <Pressable onPress={() => props.navigation.navigate(navigationStrings.History)}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Image style={{ marginRight: '2%', height: 20.09, width: 23.44 }}
                                    source={require('../images/history.png')} />
                                <View style={styles.menus}>
                                    <Text style={styles.items}>Feedback</Text>
                                    {/* <Image style={[styles.image3]} source={require('../images/next.png')}
                                    /> */}
                                </View>
                            </View>
                        </Pressable>
                    </View>
                    {reportPermission ?
                        <View style={styles.menusTop}>
                            <Pressable onPress={() => props.navigation.navigate(navigationStrings.Report)}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Image style={{ marginTop: '1%', marginRight: '2%', height: 16.55, width: 22.06 }}
                                        source={require('../images/report2.png')}
                                    />
                                    <View style={styles.menus}>
                                        <Text style={styles.items}>Reports</Text>
                                        {/* <Image style={[styles.image3]}
                                        source={require('../images/next.png')}
                                    /> */}
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                        :
                        null}
                    <View style={styles.menusTop}>
                        <Pressable onPress={() => LogoutSession()}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Image
                                    style={{ marginRight: '2%', height: 19.27, width: 22.03 }}
                                    source={require('../images/logout.png')}
                                />
                                <View style={styles.menus}>
                                    <Text style={styles.items}>Logout</Text>
                                    {/* <Image style={[styles.image3]} source={require('../images/next.png')}
                                    /> */}
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    items: {
        // marginLeft: '5%',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#444444',
        paddingBottom: '8%',
        fontFamily: 'Roboto'
    },
    image3: {
        width: 7.11,
        height: 15,
        marginTop: '3%',
    },
    menus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#444444',
        paddingHorizontal: '3%',
        width: '65%',
        // backgroundColor:'red'
    },
    menusTop: {
        marginTop: '3%',
        padding: 5,
    },
});