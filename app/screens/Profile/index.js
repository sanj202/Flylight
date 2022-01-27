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
import DocumentPicker from 'react-native-document-picker';

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
    }, [loginData, registerData, isFocused])

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


    const [newLeadAray, setnewLeadAray] = useState('')
    const selectLeadFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images]
            });
            // console.log('resPic : ' + JSON.stringify(res));
            // console.log('URI : ' + res.uri);
            // console.log('Type : ' + res.type);
            // console.log('File Name : ' + res.name);
            // console.log('File Size : ' + res.size);

            var photo = {
                uri: res.map((item, index) => item.uri),
                type: res.map((item, index) => item.type),
                name: res.map((item, index) => item.name),
            };

            StoreLeadData(res)
            // console.log("res................Profile pick ", res)
            if (loginData.status == "success") {
                // setIsLodding(true)
                var formdata = new FormData();
                formdata.append('userAvatar', JSON.stringify(photo))
                formdata.append('uid', loginData.data.uid)
                dispatch(profileAction.updateAvatar(formdata, loginData.data.token));
            }
            else if (registerData.status == "success") {
                // setIsLodding(true)
                const data = {
                    CSVFILE: res,
                    profile_id: registerData.data.cProfile.toString(),
                    orgid: registerData.data.org_id.toString(),
                }
                dispatch(profileAction.updateAvatar(data, registerData.data.token));
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    // console.log("image/................................", newLeadAray)

    const StoreLeadData = (value) => {
        let tem = value
        setnewLeadAray([
            // ...data
            tem])
    }

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
                    // <View style={{ flexDirection: 'row' }}>
                        <Image
                            // source={{ uri: user.avatar }}
                            // source={{ uri: ` 'http://3.23.113.168/admin/public/uploads/';/avatar/${user.avatar}` }}
                            source={require('../../images/avtar.jpg')}
                            style={{
                                height: 121, width: 121, borderRadius: 80,
                                marginTop: '2.5%',
                                alignSelf: 'center'
                            }}
                        />
                    //     <TouchableOpacity
                    //         onPress={() => selectLeadFile()} >
                    //         <Text>Edit-Picture</Text>
                    //     </TouchableOpacity>
                    // </View>
                    :
                    // <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={require('../../images/avtar.jpg')}
                        // source={{ uri: user.avatar }}
                        style={{ height: 121, width: 121, borderRadius: 80, marginTop: '2.5%', alignSelf: 'center' }}
                    />
                    // {/* <TouchableOpacity>
                    //     <Text>Edit-Picture</Text>
                    // </TouchableOpacity> */}
                    // </View>
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

