import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, Image, TextInput, ActivityIndicator,
    StatusBar, TouchableOpacity, ScrollView, ToastAndroidAlert, Dimensions
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector, connect } from 'react-redux';
import { profileAction, authAction, varificationAction } from '../../redux/Actions';
import { useIsFocused } from "@react-navigation/core"

export default function AddContact({ navigation }) {

    const [user, setUser] = useState('');
    const [IsLodding, setIsLodding] = useState(false)
    const { width, height } = Dimensions.get('window');
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const profileData = useSelector(state => state.profile.userDetail)
    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)

    useEffect(() => {
        if (loginData || registerData && isFocused) {
            if (loginData.status == "success") {
                setIsLodding(true)
                dispatch(profileAction.profile(
                    loginData.data.uid,
                    loginData.data.org_uid,
                    loginData.data.cProfile.toString(),
                    loginData.data.token
                ));
            }
            else if (registerData.status == "success") {
                setIsLodding(true)
                dispatch(profileAction.profile(
                    registerData.data.uid,
                    registerData.data.org_uid,
                    registerData.data.cProfile.toString(),
                    registerData.data.token
                ));
            }
        }
    }, [loginData, registerData, isFocused])

    useEffect(() => {
        if (profileData) {
            if (profileData.status == "200") {
                setIsLodding(false)
                setUser(profileData.data.user)
                dispatch(profileAction.clearResponse())
            }
            else if (profileData == '') {
                setIsLodding(false)
            }
            else {
                setIsLodding(false)
                Alert.alert(profileData.message)
            }
        }
        else {
        }
    }, [profileData])

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
        <View style={{ flex: 1, width: width, height: height }}>
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

            <LinearGradient
                colors={['#2D6FF2', '#2D6FF2', '#2D6FF2', '#8DB3FF',]}
                style={{
                    // flex: 1,
                    borderBottomLeftRadius: 35,
                    borderBottomRightRadius: 35,
                    height: "25%",
                    width: "100%",
                }}
            >
                <SafeAreaView
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: '5%', marginTop: 0
                    }}
                >
                    <TouchableOpacity
                        onPress={() =>
                            // navigation.openDrawer()
                            navigation.goBack()
                        }
                    >
                        <Image
                            style={{ height: 28, width: 28 }}
                            source={require('../../images/home.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{
                        color: 'white',
                        fontSize: 16,
                        fontFamily: 'Roboto',
                        textAlign: 'center',
                        marginLeft: '10%'
                    }}>My Account</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfile', {
                            phone: user.phone,
                            email: user.email,
                            fname: user.first_name,
                            lname: user.last_name,
                            city: user.city,
                            country: user.country,
                            organization: user.organization,
                            state: user.state,
                            street: user.street,
                            zip: user.zip
                        })}>
                        <Text style={{
                            borderColor: '#fff',
                            borderWidth: 1,
                            borderRadius: 15,
                            fontSize: 10,
                            color: '#fff',
                            padding: 5,

                        }}>Edit Profile</Text>
                    </TouchableOpacity>
                </SafeAreaView>

            </LinearGradient>

            <View style={{
                backgroundColor: '#FFF', marginTop: '-18%',
                width: 128, height: 128, borderRadius: 80, alignSelf: 'center'
            }}>
                {user.avatar ?
                    <Image
                        // source={require('../../images/avtar.jpg')}
                        // source={{ uri: user.avatar }}
                        source={require('../../images/avtar.jpg')}
                        style={{ height: 121, width: 121, borderRadius: 80, marginTop: '2.5%', alignSelf: 'center' }}
                    />
                    :
                    <Image
                        source={require('../../images/avtar.jpg')}
                        // source={{ uri: user.avatar }}
                        style={{ height: 121, width: 121, borderRadius: 80, marginTop: '2.5%', alignSelf: 'center' }}
                    />
                }
                <Text style={{
                    marginTop: '5%',
                    marginBottom: '2%', textAlign: 'center',
                    fontFamily: 'Roboto', fontWeight: '500', color: '#000000'
                }}>{user.name}</Text>
            </View>

            {IsLodding == true ?
                <ActivityIndicator size="small" color="#0000ff" />
                :


                <View style={{ margin: '5%', }}>
                    <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Roboto' }}>Your Name</Text>
                    <View style={styles.inputFields}>
                        <Image
                            style={{ height: 18, width: 17, marginRight: '2%' }}
                            source={require('../../images/user.png')}
                        />
                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#000000', fontFamily: 'Roboto' }}>{user.name ? user.name : ''}</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Roboto' }}>Mobile Number</Text>
                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 19, width: 19 }]}
                            source={require('../../images/VVVV.png')}
                        />
                        <Text style={{ fontSize: 13, color: '#000000', fontWeight: 'bold', fontFamily: 'Roboto' }}>{user.phone ? user.phone : ''}</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Roboto' }}>Email</Text>
                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 17, width: 21, }]}
                            source={require('../../images/mail.png')}
                        />
                        <Text style={{ marginTop: '1%', fontWeight: 'bold', fontSize: 13, color: '#000000', fontFamily: 'Roboto' }}>{user.email ? user.email : ''}</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Roboto' }}>Address</Text>
                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 24, width: 18, marginTop: '-0.5%' }]}
                            source={require('../../images/address.png')}
                        />
                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#000000', fontFamily: 'Roboto' }}>{user.state ? user.street + ',' + user.city + ',' + user.state + ',' + user.country + ',' + user.zip : ''}</Text>
                    </View>
                    <TouchableOpacity style={styles.button}
                        onPress={() => LogoutSession()}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.textButton}>Logout</Text>
                            <Image
                                source={require('../../images/White_logout.png')}
                                style={{ height: 17, width: 20, marginTop: '1.5%' }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}

