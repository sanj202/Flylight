import React, { useState, useEffect } from 'react';
import {
    View, Text, ToastAndroid, Image, TextInput, ActivityIndicator, StatusBar, TouchableOpacity,
    ScrollView, ToastAndroidAlert, Dimensions, Alert
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector, connect } from 'react-redux';
import { profileAction, authAction, varificationAction } from '../../redux/Actions';
import { useIsFocused } from "@react-navigation/core"
import ImagePicker from 'react-native-image-crop-picker';
import { Base_ImageUrl } from '../../../const'

export default function AddContact({ navigation }) {

    const [user, setUser] = useState('');
    const [userImage, setuserImage] = useState('');
    const [IsLodding, setIsLodding] = useState(false)
    const [IsLodding2, setIsLodding2] = useState(false)
    const { width, height } = Dimensions.get('window');

    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const profileData = useSelector(state => state.profile.userDetail)
    const profileImage = useSelector(state => state.profile.userImage)
    const loginData = useSelector(state => state.auth.data)

    useEffect(() => {
        getProfile()
    }, [isFocused])

    const getProfile = () => {
        setIsLodding(true)
        const data = {
            uid: loginData.data.uid,
            org_uid: loginData.data.org_uid,
            profile_id: loginData.data.cProfile,
        }
        dispatch(profileAction.profile(data, loginData.data.token));
    }
    useEffect(() => {
        if (profileData) {
            if (profileData.status == "200") {
                // console.log('................',profileData.data.user)
                setUser(profileData.data.user)
                setuserImage(profileData.data.user.avatar)
                setIsLodding(false)
                dispatch(profileAction.clearResponse())
            }
            else if (profileData.status == []) {
                setIsLodding(false)
            }
        }
        else {
        }
    }, [profileData])

    useEffect(() => {
        if (profileImage) {
            if (profileImage.status == "success") {
                // console.log('..........................',profileImage)
                setIsLodding2(false)
                setuserImage(profileImage.avatar)
                ToastAndroid.show(profileImage.message, ToastAndroid.SHORT);
                dispatch(profileAction.clearprofileImageResponse())
            }
            else if (profileImage == "error") {
                setIsLodding2(false)
                console.log('error ..............', profileImage)
            }
            else {
                setIsLodding2(false)
            }
        }
        else {
        }
    }, [profileImage])

    const UploadAvtar = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            let photo = {
                uri: image.path,
                type: image.mime,
                name: image.path + 'photo',
                size: image.size,
            };
            setIsLodding2(true)
            var formdata = new FormData();
            formdata.append('userAvatar', photo)
            formdata.append('uid', loginData.data.uid)
            dispatch(profileAction.updateAvatar(formdata, loginData.data.token));
        });
    };

    const LogoutSession = () => {
        dispatch(authAction.clearResponse())
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
                            navigation.openDrawer()
                            // navigation.goBack()
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
                        style={styles.headerBtn}
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
                        <Text style={styles.headerBtntext}>Edit Profile</Text>
                    </TouchableOpacity>
                </SafeAreaView>
                <TouchableOpacity
                    onPress={() => navigation.navigate('orderHistory')}
                    style={[styles.headerBtn, { marginRight: '3%' }]} >
                    <Text style={styles.headerBtntext}>Order history</Text>
                </TouchableOpacity>

                {IsLodding2 == true ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    <View style={styles.avtarStyle}>
                        {user.avatar ?
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={{ uri: `${Base_ImageUrl}` + userImage }}
                                    style={{
                                        height: 96, width: 96, borderRadius: 45,
                                        marginTop: '3%', marginLeft: '4%',
                                        alignSelf: 'center'
                                    }}
                                />
                            </View>
                            :
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../images/avtar.jpg')}
                                    style={{
                                        height: 96, width: 96, borderRadius: 45,
                                        marginTop: '3%', marginLeft: '4%',
                                        alignSelf: 'center'
                                    }}
                                />
                            </View>
                        }
                        <TouchableOpacity
                            onPress={() => UploadAvtar()}
                        >
                            <Image
                                style={{ height: 22, width: 22, backgroundColor: '#FFF', borderRadius: 10, marginRight: '2%', marginTop: '-25 %' }}
                                source={require('../../images/edit_Profile.png')}
                            />
                        </TouchableOpacity>

                        <Text style={{
                            marginTop: '5%',
                            marginBottom: '2%', textAlign: 'center',
                            fontFamily: 'Roboto', fontWeight: '500', color: '#000000'
                        }}>{user.name}</Text>
                    </View>}

            </LinearGradient>

            {IsLodding == true ?
                <ActivityIndicator size="large" color="#0000ff" />
                :
                <View style={{ marginHorizontal: '5%', marginVertical: '4%', marginTop: '15%' }}>

                    <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Roboto' }}>Your Name</Text>
                    <View style={styles.inputFields}>
                        <Image
                            style={{ height: 19, width: 18, marginRight: '2%' }}
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

