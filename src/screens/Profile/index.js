import React, { useState, useEffect } from 'react';
import { View, Text, ToastAndroid, Image, TextInput, ActivityIndicator, FlatList, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector, connect } from 'react-redux';
import { profileAction, authAction, varificationAction } from '../../redux/Actions';
import { useIsFocused } from "@react-navigation/core"
import ImagePicker from 'react-native-image-crop-picker';
import { Base_ImageUrl } from '../../../const'
import { ScrollView } from 'react-native-gesture-handler';
import navigationStrings from '../../constant/navigationStrings';

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
                setUser(profileData.data.user)
                setuserImage(profileData.data.user.avatar)
                setIsLodding(false)
                dispatch(profileAction.clearResponse())
            }
            else if (profileData.status == []) {
                setIsLodding(false)
            }
        }
    }, [profileData])

    useEffect(() => {
        if (profileImage) {
            if (profileImage.status == "success") {
                setIsLodding2(false)
                setuserImage(profileImage.avatar)
                ToastAndroid.show(profileImage.message, ToastAndroid.SHORT);
                dispatch(profileAction.clearprofileImageResponse())
            }
            else if (profileImage == "error") {
                setIsLodding2(false)
            }
            else {
                setIsLodding2(false)
            }
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


    const [refreshing, setrefreshing] = useState(false)
    const handleRefresh = () => {
        console.log(refreshing)
        getProfile()
    }

    const LogoutSession = () => {
        dispatch(authAction.clearResponse())
    };

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['#2D6FF2', '#2D6FF2', '#2D6FF2', '#8DB3FF',]}
                style={styles.header}>
                <SafeAreaView style={styles.headerTouchable}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} >
                        <Image style={{ height: 28, width: 28 }} source={require('../../images/home.png')} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Account</Text>
                    <TouchableOpacity
                        style={styles.headerBtn}
                        onPress={() => navigation.navigate(navigationStrings.EditProfile, {
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
                    style={[styles.headerBtn, { width: '24%', alignSelf: 'flex-end', paddingHorizontal: '2%', marginRight: '2%' }]}
                    onPress={() => navigation.navigate(navigationStrings.orderHistory)}>
                    <Text style={styles.headerBtntext}>Order history</Text>
                </TouchableOpacity>
                {IsLodding2 == true ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    : <View style={styles.avtarStyle}>
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
                        <TouchableOpacity onPress={() => UploadAvtar()}>
                            <Image
                                style={{ height: 22, width: 22, backgroundColor: '#FFF', borderRadius: 10, marginRight: '2%', marginTop: '-25 %' }}
                                source={require('../../images/edit_Profile.png')}
                            />
                        </TouchableOpacity>

                    </View>}
                <Text style={styles.profileName}>{user.name}</Text>
            </LinearGradient>
            <View style={{ flex: 1, marginVertical: '2%', marginTop: '20%', }}>
                {IsLodding == true ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    <FlatList
                        contentContainerStyle={{
                            // display: "flex",
                            flexGrow: 1,
                        }}
                        data={[{}]}
                        keyExtractor={() => 'childrenkeyflatlist'}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        renderItem={() =>
                            <View style={{ marginHorizontal: '3%' }}>
                                <View>
                                    <Text style={styles.fieldsLable}>Your Name</Text>
                                    <View style={styles.inputFields}>
                                        <Image
                                            style={[styles.icon, { height: height * 3 / 100, width: width * 5.4 / 100, }]}
                                            source={require('../../images/user.png')}
                                        />
                                        <Text style={styles.textValues}>{user.name ? user.name : ''}</Text>
                                    </View>
                                </View>
                                <View style={{ marginVertical: '1%' }}>
                                    <Text style={styles.fieldsLable}>Mobile Number</Text>
                                    <View style={styles.inputFields}>
                                        <Image
                                            style={Platform.OS == 'ios' ? [styles.icon, { height: 24, width: '4.5%', margin: '2%' }]
                                                :
                                                [styles.icon, { height: height * 3.8 / 100, }]}
                                            source={require('../../images/mobile.png')}
                                        />
                                        <Text style={styles.textValues}>{user.phone ? user.phone : ''}</Text>
                                    </View>
                                </View>
                                <View style={{ marginVertical: '1%' }}>
                                    <Text style={styles.fieldsLable}>Email</Text>
                                    <View style={styles.inputFields}>
                                        <Image style={
                                            Platform.OS == 'ios' ? [styles.icon, { height: 17, width: '6%', margin: '2.5%' }]
                                                :
                                                [styles.icon, { width: width * 6.5 / 100, }]}
                                            source={require('../../images/mail.png')}
                                        />
                                        <Text style={styles.textValues}>{user.email ? user.email : ''}</Text>
                                    </View>
                                </View>
                                <View style={{ marginVertical: '1%' }}>
                                    <Text style={styles.fieldsLable}>Address</Text>
                                    <View style={styles.inputFields}>
                                        <Image
                                            style={Platform.OS == 'ios' ? [styles.icon, { height: 24, width: '5.5%', margin: '1.6%' }]
                                                :
                                                [styles.icon, { height: height * 3.2 / 100 }]}
                                            source={require('../../images/address.png')}
                                        />
                                        <Text style={styles.textValues}>{user.state ? user.street + ',' + user.city + ',' + user.state + ',' + user.country + ',' + user.zip : ''}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.button}
                                    onPress={() => LogoutSession()} >
                                    <Text style={styles.textButton}>Logout</Text>
                                    <Image
                                        source={require('../../images/White_logout.png')}
                                        style={{ height: height * 2.7 / 100, width: width * 6 / 100, marginHorizontal: '3%' }}
                                    />
                                </TouchableOpacity>
                            </View>
                        }
                    />
                }
            </View>
        </View>
    );
}

