import React, { useState, useEffect } from 'react';
import {
    Text, View, ActivityIndicator, TouchableOpacity, TextInput, Image, Alert, Dimensions, Platform
} from 'react-native';
import styles from './styles';
import { useDispatch, useSelector, connect } from 'react-redux';
import Header from '../../component/header/index';
import { editProfileAction } from '../../redux/Actions/index'
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function EditProfile({ navigation, route }) {
    const { width, height } = Dimensions.get('window');
    const [IsLodding, setIsLodding] = useState(false)
    const [zip, setzip] = useState(route.params ? route.params.zip : "")
    const [city, setcity] = useState(route.params ? route.params.city : "")
    const [state, setstate] = useState(route.params ? route.params.state : "")
    const [fname, setfname] = useState(route.params ? route.params.fname : "")
    const [lname, setlname] = useState(route.params ? route.params.lname : "")
    const [email, setemail] = useState(route.params ? route.params.email : "")
    const [phone, setphone] = useState(route.params ? route.params.phone : "")
    const [street, setstreet] = useState(route.params ? route.params.street : "")
    const [country, setcountry] = useState(route.params ? route.params.country : "")

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, settext] = useState(true)


    const onChangeFrom = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');

        setDate(currentDate)
        // let formattedDate = moment(currentDate).format('YYYY-MM-DD');
    };
    const showMode = (currentMode) => {
        setShow(!show);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        // setFollowDate(false)
        settext(false)
        showMode('date');
    };


    const dispatch = useDispatch()
    const loginData = useSelector(state => state.auth.data)
    const UpdatedData = useSelector(state => state.Eprofile.userUpdatedDetail)


    const Update = () => {
        if (fname == "") {
            Alert.alert(" Enter first name ")
        }
        else if (lname == "") {
            Alert.alert("Enter last name")
        }
        else if (date > new Date()) {
            Alert.alert(" Enter Valid Dob ")
        }
        else if (street == "") {
            Alert.alert("Enter street")
        }
        else if (city == "") {
            Alert.alert(" Enter city name ")
        }
        else if (state == "") {
            Alert.alert(" Enter state name ")
        }
        else if (country == "") {
            Alert.alert(" Enter country name ")
        }
        else if (zip == "") {
            Alert.alert(" Enter zip code ")
        }
        else {
            let formateDate = moment(date).format("YYYY-MM-DD")
            if (loginData) {
                if (loginData.status == "success") {
                    const data = {
                        first_name: fname,
                        last_name: lname,
                        phone: phone,
                        dob: formateDate,
                        street: street,
                        city: city,
                        state: state,
                        zip: zip,
                        country: country,
                        uid: loginData.data.uid,
                        org_uid: loginData.data.org_uid,
                        profile_id: loginData.data.cProfile.toString(),
                    }
                    dispatch(editProfileAction.Eprofile(data, loginData.data.token));
                    setIsLodding(true)
                }
            }
        }
    }

    useEffect(() => {
        if (UpdatedData) {
            if (UpdatedData.status == "success") {
                setIsLodding(false)
                Alert.alert(UpdatedData.message)
                navigation.navigate("Profile", {
                })
                dispatch(editProfileAction.clearResponse())
            }
            else if (UpdatedData.status == "failed") {
                setIsLodding(false)
                Alert.alert(UpdatedData.message)
            }
            else if (UpdatedData.status == "fail") {
                setIsLodding(false)
                Alert.alert(UpdatedData.message)
            }
        }
        else {
            setIsLodding(false)
        }

    }, [UpdatedData])

    return (
        <View style={styles.container}>
            <Header
                // style={{ height: "16%" }}
                onPressLeft={() => {
                    // navigation.openDrawer()
                    navigation.goBack()
                }}
                title='Edit Profile'

                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />


            <ScrollView
                style={{ width: width, height: height }}>

                {/* <Text style={styles.title}>Welcome!</Text> */}
                <Text style={styles.fieldsLable}>First Name</Text>

                <View style={styles.inputFields2}>
                    <Image
                        style={
                            Platform.OS == 'ios' ? [styles.icon, {
                                height: 22, width: '5.5%',
                                margin: '2%'
                            }]
                                :
                                [styles.icon, {
                                    height: 22, width: '6%',
                                    margin: '2%', marginTop: '3%'
                                }]}
                        source={require('../../images/user.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={fname}
                        onChangeText={e => setfname(e)}
                        placeholder="  Name"
                    />
                </View>

                <Text style={styles.fieldsLable}>Last Name</Text>

                <View style={styles.inputFields2}>
                    <Image
                        style={
                            Platform.OS == 'ios' ? [styles.icon, {
                                height: 22, width: '5.5%',
                                margin: '2%'
                            }]
                                :
                                [styles.icon, {
                                    height: 22, width: '6%',
                                    margin: '2%', marginTop: '3%'
                                }]}
                        source={require('../../images/user.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={lname}
                        onChangeText={e1 => setlname(e1)}
                        placeholder="  Name"
                    />
                </View>

                <Text style={styles.fieldsLable}>Email </Text>

                <View style={styles.inputFields2}>
                    <Image
                        style={
                            Platform.OS == 'ios' ? [styles.icon, { height: 17, width: '6%', margin: '2.5%' }]
                                :
                                [styles.icon, { height: 18, width: '6.5%', margin: '2.5%',marginTop:'5%' }]}
                        source={require('../../images/mail.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={email}
                        editable={false}
                        onChangeText={e2 => setemail(e2)}
                        placeholder="example@gmail.com"
                    />
                </View>

                <Text style={styles.fieldsLable}>Phone</Text>

                <View style={styles.inputFields2}>
                    <Image
                       style={
                        Platform.OS == 'ios' ?  [styles.icon,
                        {
                            height: 24, width: '4.5%',
                            margin: '2%'
                        }] :
                        [styles.icon,
                            {
                                height: 24, width: '4.6%',
                                margin: '2%',marginTop:'3.5%'
                            }]}
                        source={require('../../images/mobile.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={phone}
                        keyboardType='numeric'
                        editable={false}
                        onChangeText={e3 => setphone(e3)}
                        placeholder="   Phone"
                    />
                </View>

                <Text style={styles.fieldsLable}>Dob</Text>


                <TouchableOpacity
                    onPress={showDatepicker} >
                    <View style={Platform.OS == 'ios' ?
                        styles.inputFields2 : [styles.inputFields2, { paddingVertical: '2%' }]}>
                        <Image 
                        style={Platform.OS == 'ios' ? [styles.icon, {
                            height: 25, width: '6%', marginLeft: '2%', marginTop: '2%'
                        }] :
                        [styles.icon, {
                            height: 25, width: '6.7%', marginLeft: '2%', marginTop: '2%'
                        }]}

                            source={require('../../images/DOB.png')}
                        />
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                style={{ paddingVertical: '5%', width: '50%' }}
                                // is24Hour={true}
                                value={date}
                                mode={mode}
                                display="default"
                                onChange={onChangeFrom}
                            />
                        )
                        }
                        {Platform.OS == 'ios' ? <View>
                            {text == true ?
                                <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC' }}>Date of Birth</Text>
                                :
                                <Text style={{ marginTop: '5%', fontSize: 12, color: '#BCBCBC' }}></Text>
                            }
                        </View>
                            :
                            <View>
                                {text == true ?
                                    <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>Date of birth</Text>
                                    :
                                    <Text style={{ marginTop: '10%', fontSize: 12, color: '#BCBCBC', marginLeft: '10%' }}>{moment(date).format('MM/DD/YYYY')}</Text>
                                }
                            </View>
                        }
                    </View>
                </TouchableOpacity>

                <Text style={styles.fieldsLable}>Street</Text>

                <View style={styles.inputFields2}>
                    <Image
                        style={
                            Platform.OS == 'ios' ? [styles.icon, {
                            height: 24, width: '5.5%',
                            margin: '1.6%'
                        }]
                    :
                    [styles.icon, {
                        height: 24, width: '5.5%',
                        margin: '1.6%',marginTop:'3%'
                    }]}
                        source={require('../../images/address.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={street}
                        onChangeText={e5 => setstreet(e5)}
                        placeholder="   Street"
                    />
                </View>
                <Text style={styles.fieldsLable}>City</Text>

                <View style={styles.inputFields2}>
                    <Image
                      style={
                        Platform.OS == 'ios' ? [styles.icon, {
                        height: 24, width: '5.5%',
                        margin: '1.6%'
                    }]
                :
                [styles.icon, {
                    height: 24, width: '5.5%',
                    margin: '1.6%',marginTop:'3%'
                }]}
                        source={require('../../images/address.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={city}
                        onChangeText={e6 => setcity(e6)}
                        placeholder="   City"
                    />
                </View>
                <Text style={styles.fieldsLable}>State</Text>
                <View style={styles.inputFields2}>
                    <Image
                      style={
                        Platform.OS == 'ios' ? [styles.icon, {
                        height: 24, width: '5.5%',
                        margin: '1.6%'
                    }]
                :
                [styles.icon, {
                    height: 24, width: '5.5%',
                    margin: '1.6%',marginTop:'3%'
                }]}
                        source={require('../../images/address.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={state}
                        onChangeText={e7 => setstate(e7)}
                        placeholder="   State"
                    />
                </View>
                <Text style={styles.fieldsLable}>Country</Text>
                <View style={styles.inputFields2}>
                    <Image
                      style={
                        Platform.OS == 'ios' ? [styles.icon, {
                        height: 24, width: '5.5%',
                        margin: '1.6%'
                    }]
                :
                [styles.icon, {
                    height: 24, width: '5.5%',
                    margin: '1.6%',marginTop:'3%'
                }]}
                        source={require('../../images/address.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={country}
                        onChangeText={e8 => setcountry(e8)}
                        placeholder="   Country"
                    />
                </View>

                <Text style={styles.fieldsLable}>Zip Code</Text>

                <View style={styles.inputFields2}>
                    <Image
                      style={
                        Platform.OS == 'ios' ? [styles.icon, {
                        height: 24, width: '5.5%',
                        margin: '1.6%'
                    }]
                :
                [styles.icon, {
                    height: 24, width: '5.5%',
                    margin: '1.6%',marginTop:'3%'
                }]}
                        source={require('../../images/address.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={zip}
                        onChangeText={e9 => setzip(e9)}
                        placeholder="   Zip Code"
                    />
                </View>

                {IsLodding == true ?
                    <ActivityIndicator size="small" color="#0000ff" />
                    :
                    <View />}

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Update()}
                >
                    <Text style={styles.textButton}>Submit</Text>
                </TouchableOpacity>
                <View style={{ marginTop: '5%' }} />
            </ScrollView>
        </View>
    );
}


