import React, { useState, useEffect } from "react";
import {
    ScrollView, TouchableOpacity, Pressable,
    Alert, Dimensions, View, Text, ToastAndroid, Image, useWindowDimensions, ImageBackground, StatusBar
} from 'react-native'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import styles from './styles'
import { useDispatch, useSelector, connect } from 'react-redux';
import { profileAction, authAction, varificationAction } from '../../redux/Actions';
import { useIsFocused } from "@react-navigation/core"
import {
    DrawerContentScrollView,
    // DrawerItemList,
    // DrawerItem,
} from '@react-navigation/drawer';

export default function SideMenu({ navigation }) {

    const [user, setUser] = useState('');
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const profileData = useSelector(state => state.profile.userDetail)
    const { width, height } = Dimensions.get('window');

    useEffect(() => {
        const data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile.toString(),
        }
        dispatch(profileAction.profile(data, loginData.data.token));
    }, [isFocused])

    useEffect(() => {
        if (profileData) {
            if (profileData.status == "200") {
                setUser(profileData.data.user)
                dispatch(profileAction.clearResponse())
            }
            else if (profileData == '') {
            }
            else {
                ToastAndroid.show(profileData.message, ToastAndroid.SHORT);
            }
        }
    }, [profileData])

    const LogoutSession = () => {
        dispatch(authAction.clearResponse())
        // navigation.navigate('Logout')
    };

    return (
        <View style={{ flex: 1, }}>
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

            <View >
                <ImageBackground
                    source={require('../../images/drawerImage.png')}
                    style={{ height: height / 4.5, resizeMode: "contain" }}>
                    <TouchableOpacity onPress={() => navigation.closeDrawer()}>
                        <Image style={{ margin: '5%', alignSelf: 'flex-end', height: 13, width: 13 }}
                            source={require('../../images/cross.png')} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', padding: '3%' }}>
                        {user.avatar ?
                            <Avatar.Image
                                size={100}
                                style={{ backgroundColor: '#fff' }}
                                source={{ uri: 'http://3.23.113.168/admin/public/uploads/avatar/' + user.avatar }}
                            />
                            :
                            null}
                        <Card.Content style={{ marginTop: '10%', marginLeft: '-2%' }}>
                            <Title style={{
                                fontSize: 18, fontFamily: 'Roboto',
                                fontWeight: 'bold', color: '#FFFFFF'
                            }}>{user.name ? user.name : ''}</Title>
                            <Paragraph
                                style={{ marginTop: '-5%', fontSize: 13, fontFamily: 'Roboto', color: '#FFFFFF' }}>+91 {user.phone ? user.phone : ''}</Paragraph>
                            <TouchableOpacity onPress={() => navigation.navigate('Organization')} >
                                <Text style={{ fontSize: 12, fontFamily: 'Roboto', color: '#FFFFFF' }}>Switch Orginization</Text>
                            </TouchableOpacity>
                        </Card.Content>
                    </View>
                </ImageBackground>
            </View>
            {/* <DrawerContentScrollView {...props}> */}
            <DrawerContentScrollView >
                <ScrollView style={{ width: width, marginHorizontal: '3%', marginBottom: '10%' }}>
                    <View style={styles.menusTop}>
                        <Pressable onPress={() => navigation.navigate('Campaign')}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={[styles.image2, { marginRight: '2%', width: 23.27, height: 23.27 }]}
                                    source={require('../../images/language.png')}
                                />
                                <View style={styles.menus}>
                                    <Text style={styles.items}>Campaigns</Text>
                                    <Image
                                        style={[styles.image3]}
                                        source={require('../../images/next.png')}
                                    />
                                </View>
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.menusTop}>
                        <Pressable onPress={() => navigation.navigate('Action_Manager')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Image
                                    style={[styles.image2, { marginTop: '1.5%', marginRight: '3%', height: 15.19, width: 18.56 }]}
                                    source={require('../../images/action.png')}
                                />
                                <View style={styles.menus}>
                                    <Text style={styles.items}>Action Manager</Text>
                                    <Image style={[styles.image3]}
                                        source={require('../../images/next.png')}
                                    />
                                </View>
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.menusTop}>
                        <Pressable onPress={() => navigation.navigate('Staff_Members')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Image style={[styles.image2, { marginRight: '4%', height: 18, width: 15.75 }]}
                                    source={require('../../images/Lead.png')}
                                />
                                <View style={styles.menus}>
                                    <Text style={styles.items}>Users</Text>
                                    <Image style={[styles.image3]} source={require('../../images/next.png')} />
                                </View>
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.menusTop}>
                        <Pressable onPress={() => navigation.navigate('lead_manager')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Image style={[styles.image2, { marginRight: '4%', height: 18, width: 15.75 }]}
                                    source={require('../../images/Lead.png')}
                                />
                                <View style={[styles.menus]}>
                                    <Text style={styles.items}>Lead Manager</Text>
                                    <Image style={[styles.image3]} source={require('../../images/next.png')}
                                    />
                                </View>
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.menusTop}>
                        <Pressable onPress={() => navigation.navigate('Task_Manager')} >
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Image style={[styles.image2, { marginTop: '1.5%', marginRight: '3%', height: 15.19, width: 18 }]}
                                    source={require('../../images/TaskManager.png')}
                                />
                                <View style={styles.menus}>
                                    <Text style={styles.items}>Task Manager</Text>
                                    <Image style={[styles.image3]}
                                        source={require('../../images/next.png')}
                                    />
                                </View>
                            </View>
                        </Pressable>
                    </View>
                    {/* <View style={styles.menusTop}>
                    <Pressable onPress={() => navigation.navigate('Meetings')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image style={[styles.image2, { marginRight: '4%', height: 18, width: 15.75}]}
                                source={require('../../images/Lead.png')}
                            />
                            <View style={styles.menus}>
                                <Text style={styles.items}>Meetings</Text>
                                <Image style={[styles.image3, { marginLeft: '48%' }]}
                                    source={require('../../images/next.png')} />
                            </View>
                        </View>
                    </Pressable>
                </View> */}
                    <View style={styles.menusTop}>
                        <Pressable onPress={() => navigation.navigate('History')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Image style={[styles.image2, { marginRight: '2%', height: 20.09, width: 23.44 }]}
                                    source={require('../../images/history.png')} />
                                <View style={styles.menus}>
                                    <Text style={styles.items}>History</Text>
                                    <Image style={[styles.image3]}
                                        source={require('../../images/next.png')}
                                    />
                                </View>
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.menusTop}>
                        <Pressable onPress={() => navigation.navigate("Report")}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Image style={[styles.image2, { marginTop: '1%', marginRight: '2%', height: 16.55, width: 22.06 }]}
                                    source={require('../../images/report2.png')}
                                />
                                <View style={styles.menus}>
                                    <Text style={styles.items}>Reports</Text>
                                    <Image
                                        style={[styles.image3]}
                                        source={require('../../images/next.png')}
                                    />
                                </View>
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.menusTop}>
                        <Pressable onPress={() => LogoutSession()}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Image
                                    style={[styles.image2, { marginRight: '2%', height: 19.27, width: 22.03 }]}
                                    source={require('../../images/logout.png')}
                                />
                                <View style={styles.menus}>
                                    <Text style={styles.items}>Logout</Text>
                                    <Image style={[styles.image3]}
                                        source={require('../../images/next.png')}
                                    />
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </ScrollView>
            </DrawerContentScrollView>
        </View>
    );
}