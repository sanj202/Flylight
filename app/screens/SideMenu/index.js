import React from "react";
import {
    Dimensions, View, Text, SafeAreaView, Image,
    useWindowDimensions, ImageBackground, StatusBar
} from 'react-native'
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import styles from './styles'
import { useDispatch, useSelector, connect } from 'react-redux';
import { profileAction, authAction, varificationAction } from '../../redux/Actions';
import { useIsFocused } from "@react-navigation/core"


export default function SideMenu({ navigation }) {

    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)
    const { width, height } = Dimensions.get('window');

    const LogoutSession = () => {
        if (loginData.status == "success") {
            dispatch(authAction.clearResponse())
        }
        else if (registerData.status == "success") {
            dispatch(varificationAction.clearResponse())
        }
        else {
        }
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
                    style={{
                        height: height / 4.5,
                        //  width: width / 1.48 ,
                        resizeMode: "contain",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.closeDrawer()}
                    >
                        <Image
                            style={{
                                margin: '5%',
                                marginTop: '5%',
                                alignSelf: 'flex-end',
                                height: 13, width: 13
                            }}
                            source={require('../../images/cross.png')}
                        />
                    </TouchableOpacity>

                    <View style={{
                        padding: "3%",
                        // marginTop: '2%'
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Avatar.Image
                                size={100}
                                source={require('../../images/avtar.jpg')} />

                            <Card.Content style={{ marginTop: '10%', marginLeft: '-2%' }}>
                                <Title style={{
                                    fontSize: 18, fontFamily: 'Roboto',
                                    fontWeight: 'bold', color: '#FFFFFF'
                                }}>Marcel Dalima</Title>
                                <Paragraph
                                    style={{ marginTop: '-5%', fontSize: 13, fontFamily: 'Roboto', fontWeight: 'normal', color: '#FFFFFF' }}>+91 1234567890</Paragraph>
                            </Card.Content>
                        </View>
                    </View>
                </ImageBackground>
            </View>


            <ScrollView style={{ marginLeft: '3%', marginRight: '3%' }}>

                <View style={styles.menusTop}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('lead_manager')}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image
                                style={[styles.image2, {
                                    marginRight: '4%',
                                    height: 18, width: 15.75
                                }]}
                                source={require('../../images/Lead.png')}
                            />
                            <View style={[styles.menus]}>
                                <Text style={styles.items}>
                                    Lead Manager
                                </Text>

                                <Image
                                    style={[styles.image3, { marginLeft: '33%' }]}
                                    source={require('../../images/next.png')}
                                />
                            </View>

                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.menusTop}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Task_Manager')}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image
                                style={[styles.image2, {
                                    marginTop: '1.5%',
                                    marginRight: '3%', height: 15.19, width: 18
                                }]}
                                source={require('../../images/TaskManager.png')}
                            />
                            <View style={styles.menus}>
                                <Text style={styles.items}>
                                    Task Manager
                                </Text>

                                <Image
                                    style={[styles.image3, { marginLeft: '34%' }]}
                                    source={require('../../images/next.png')}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.menusTop}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Action_Manager')}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image
                                style={[styles.image2, {
                                    marginTop: '1.5%',
                                    marginRight: '3%', height: 15.19, width: 18.56
                                }]}
                                source={require('../../images/action.png')}
                            />
                            <View style={styles.menus}>
                                <Text style={styles.items}>
                                    Action Manager
                                </Text>

                                <Image
                                    style={[styles.image3, { marginLeft: '28%' }]}
                                    source={require('../../images/next.png')}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.menusTop}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Staff_Members')}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image
                                style={[styles.image2, {
                                    marginRight: '4%',
                                    height: 18, width: 15.75
                                }]}
                                source={require('../../images/Lead.png')}
                            />
                            <View style={styles.menus}>
                                <Text style={styles.items}>
                                    Staff Members
                                </Text>

                                <Image
                                    style={[styles.image3, { marginLeft: '28%' }]}
                                    source={require('../../images/next.png')}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.menusTop}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('History')}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image
                                style={[styles.image2, { marginRight: '2%', height: 20.09, width: 23.44 }]}
                                source={require('../../images/history.png')}
                            />
                            <View style={styles.menus}>
                                <Text style={styles.items}>
                                    History
                                </Text>

                                <Image
                                    style={[styles.image3, { marginLeft: '53%' }]}
                                    source={require('../../images/next.png')}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.menusTop}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Report")}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image
                                style={[styles.image2, { marginTop: '1%', marginRight: '2%', height: 16.55, width: 22.06 }]}
                                source={require('../../images/report2.png')}
                            />
                            <View style={styles.menus}>
                                <Text style={styles.items}>
                                    Reports
                                </Text>

                                <Image
                                    style={[styles.image3, { marginLeft: '52%' }]}
                                    source={require('../../images/next.png')}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.menusTop}>

                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image
                                style={[styles.image2, { marginRight: '2%', width: 23.27, height: 23.27 }]}
                                source={require('../../images/language.png')}
                            />
                            <View style={styles.menus}>
                                <Text style={styles.items}>
                                    Language Setting
                                </Text>

                                <Image
                                    style={[styles.image3, { marginLeft: '23%' }]}
                                    source={require('../../images/next.png')}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>



                <View style={styles.menusTop}>

                    <TouchableOpacity
                        onPress={() => LogoutSession()}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image
                                style={[styles.image2, { marginRight: '2%', height: 19.27, width: 22.03 }]}
                                source={require('../../images/logout.png')}
                            />
                            <View style={styles.menus}>
                                <Text style={styles.items}>
                                    Logout
                                </Text>

                                <Image
                                    style={[styles.image3, { marginLeft: '54.5%' }]}
                                    source={require('../../images/next.png')}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}