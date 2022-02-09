import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, Image, TextInput, ActivityIndicator, StatusBar, TouchableOpacity,
    ScrollView, ToastAndroidAlert, Dimensions, Alert
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector, connect } from 'react-redux';
import { profileAction, authAction, varificationAction } from '../../redux/Actions';
import { useIsFocused } from "@react-navigation/core"
import DocumentPicker from 'react-native-document-picker';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
export default function AddContact({ navigation }) {

    const [orgName, setorgName] = useState("ORG");
    const [IsFocus, setIsFocus] = useState(false);
    const [user, setUser] = useState('');
    const [IsLodding, setIsLodding] = useState(false)
    const { width, height } = Dimensions.get('window');
    const dispatch = useDispatch()

    const isFocused = useIsFocused();
    const profileData = useSelector(state => state.profile.userDetail)
    const profileImage = useSelector(state => state.profile.userImage)
    const loginData = useSelector(state => state.auth.data)
    const registerData = useSelector(state => state.varify.otp)

    const data = [
        { label: 'ORG', value: 'ORG' },
        { label: 'ORG2', value: 'ORG2' },
    ];

    useEffect(() => {
        if (loginData || registerData && isFocused) {
            getProfile()
        }
    }, [loginData, registerData, isFocused])

    const getProfile = () => {
        if (loginData.status == "success") {
            setIsLodding(true)
            const data = {
                uid: loginData.data.uid,
                org_uid: loginData.data.org_uid,
                profile_id: loginData.data.cProfile.toString(),
            }
            dispatch(profileAction.profile(data, loginData.data.token));
        }
        else if (registerData.status == "success") {
            setIsLodding(true)
            const data = {
                uid: registerData.data.uid,
                org_uid: registerData.data.org_uid,
                profile_id: registerData.data.cProfile.toString(),
            }
            dispatch(profileAction.profile(data, registerData.data.token));
        }
    }
    useEffect(() => {
        if (profileData) {
            if (profileData.status == "200") {
                setUser(profileData.data.user)
                setIsLodding(false)
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

    useEffect(() => {
        if (profileImage) {
            if (profileImage.status == "success") {
                Alert.alert(profileImage.message)
                setIsLodding(false)
                getProfile()
                dispatch(profileAction.clearprofileImageResponse())
            }
            else if (profileImage == "error") {
                setIsLodding(false)
                Alert.alert('something Wrong try again')
            }
            else { }
        }
        else {
        }
    }, [profileImage])

    const [newAvtar, setnewAvtar] = useState('')
    const UploadAvtar = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images]
            });
            setnewAvtar(res)
            let photo = {
                uri: res[0].uri,
                type: res[0].type,
                name: res[0].name,
                size: res[0].size,
            };

            if (loginData.status == "success") {
                setIsLodding(true)
                var formdata = new FormData();
                formdata.append('userAvatar', photo)
                formdata.append('uid', loginData.data.uid)
                // console.log("fromdata............................", formdata)
                // axios({
                //     url: 'http://3.23.113.168/admin/public/api/mobile/v1/updateAvatar',
                //     method: 'POST',
                //     data: data,
                //     headers: {
                //         // 'Accept': 'application/json',
                //         'Content-Type': 'multipart/form-data',
                //         'Authorization': 'Bearer ' + loginData.data.token
                //     }
                // })
                //     .then((response) => JSON.stringify(response))
                //         .then((responseData) => {
                //             setIsLodding(false)
                //             console.log("RESULTS HERE for CREATE TOUR api :", responseData)
                //         })
                //         .catch((error) => {
                //             setIsLodding(false)
                //             console.error(error);
                //         })
                dispatch(profileAction.updateAvatar(formdata, loginData.data.token));
            }


            else if (registerData.status == "success") {
                setIsLodding(true)
                var formdata = new FormData();
                formdata.append('userAvatar', photo)
                formdata.append('uid', registerData.data.uid)
                dispatch(profileAction.updateAvatar(formdata, registerData.data.token));
            }

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    const LogoutSession = () => {
        if (loginData.status == "success") {
            dispatch(authAction.clearResponse())
        }
        else if (registerData.status == "success") {
            dispatch(varificationAction.clearResponse())
        }
        else {
        }
    };

    return (
        <View style={{ flex: 1, width: width, height: height }}>
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="#2B6EF2"
                translucent={false}
                networkActivityIndicatorVisible={true}
            />

            <LinearGradient
                colors={['#2D6FF2', '#2D6FF2', '#2D6FF2', '#8DB3FF',]}
                style={{ borderBottomLeftRadius: 35, borderBottomRightRadius: 35, height: "20%" }}
            >
                <SafeAreaView
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '5%', marginTop: '5%' }}
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
                <View style={{
                    backgroundColor: '#FFF',
                    width: 104, height: 104,
                    borderRadius: 52,
                    alignSelf: 'center',
                    marginTop: '5%'
                }}>
                    {user.avatar ?
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                // source={require('../../images/avtar.jpg')}
                                source={{ uri: 'http://3.23.113.168/admin/public/uploads/avatar/' + user.avatar }}
                                style={{
                                    height: 96, width: 96, borderRadius: 45,
                                    marginTop: '3%', marginLeft: '4%',
                                    alignSelf: 'center'
                                }}
                            />

                        </View>
                        :
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={require('../../images/avtar.jpg')}
                                style={{
                                    height: 96, width: 96, borderRadius: 45,
                                    marginTop: '3%', marginLeft: '4%',
                                    alignSelf: 'center'
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => UploadAvtar()}
                            >
                                <Text style={{ color: '#fff' }}>edit</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <TouchableOpacity
                        onPress={() => UploadAvtar()}
                    >
                        <Image
                            style={{ height: 22, width: 22,backgroundColor:'#FFF',borderRadius:10, marginRight: '2%' ,marginTop:'-25 %'}}
                            source={require('../../images/edit_Profile.png')}
                        />
                    </TouchableOpacity>

                    <Text style={{
                        marginTop: '5%',
                        marginBottom: '2%', textAlign: 'center',
                        fontFamily: 'Roboto', fontWeight: '500', color: '#000000'
                    }}>{user.name}</Text>
                </View>

            </LinearGradient>

            {IsLodding == true ?
                <ActivityIndicator size="large" color="#0000ff" />
                :
                <View style={{ marginHorizontal: '5%', marginVertical: '4%' ,marginTop:'15%'}}>
                    {/* <Text style={{
                        fontSize: 12, color: '#000000',
                        fontFamily: 'Roboto', marginTop: '15%'
                    }}>Organization Name</Text>

                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.selectedTextStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={data}
                        maxHeight={100}
                        labelField="label"
                        valueField="value"
                        placeholder={!IsFocus ? 'Select Orgnization' : '...'}
                        value={orgName}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setorgName(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <View>
                                <Image
                                    style={{ height: 22, width: 22, marginRight: '1.5%' }}
                                    source={require('../../images/globe.png')}
                                />
                            </View>
                        )}
                    /> */}

                    <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Roboto' }}>Your Name</Text>
                    <View style={styles.inputFields}>
                        <Image
                            style={{ height: 18, width: 17, marginRight: '2%' }}
                            source={require('../../images/user.png')}
                        />
                        <Text style={styles.textValues}>{user.name ? user.name : ''}</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Roboto' }}>Mobile Number</Text>
                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 19, width: 19 }]}
                            source={require('../../images/VVVV.png')}
                        />
                        <Text style={styles.textValues}>{user.phone ? user.phone : ''}</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Roboto' }}>Email</Text>
                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 17, width: 21, }]}
                            source={require('../../images/mail.png')}
                        />
                        <Text style={styles.textValues}>{user.email ? user.email : ''}</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Roboto' }}>Address</Text>
                    <View style={styles.inputFields}>
                        <Image
                            style={[styles.icon, { height: 24, width: 18, marginTop: '-0.5%' }]}
                            source={require('../../images/address.png')}
                        />
                        <Text style={styles.textValues}>{user.state ? user.street + ',' + user.city + ',' + user.state + ',' + user.country + ',' + user.zip : ''}</Text>
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

