import React, { useState, useEffect } from 'react';
import {
    Text, View, ActivityIndicator, TouchableOpacity, TextInput, Image, Alert, Dimensions, Platform, ToastAndroid
} from 'react-native';
import styles from './styles';
import { useDispatch, useSelector, connect } from 'react-redux';
import Header from '../../component/header/index';
import { editProfileAction } from '../../redux/Actions/index'
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import navigationStrings from '../../constant/navigationStrings';
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
        if (event.type == 'dismissed') {
            setShow(!show);
        }
        else {
            const currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            setDate(currentDate)
            settext(false)
        }
    }
    const showMode = (currentMode) => {
        setShow(!show);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };

    const dispatch = useDispatch()
    const loginData = useSelector(state => state.auth.data)
    const UpdatedData = useSelector(state => state.Eprofile.userUpdatedDetail)


    const Update = () => {
        if (fname == "") {
            ToastAndroid.show('Enter first name', ToastAndroid.SHORT);
        }
        else if (lname == "") {
            ToastAndroid.show('Enter last name', ToastAndroid.SHORT);
        }
        else if (date > new Date()) {
            ToastAndroid.show('Enter Valid Dob', ToastAndroid.SHORT);
        }
        else if (street == "") {
            ToastAndroid.show('Enter street', ToastAndroid.SHORT);
        }
        else if (city == "") {
            ToastAndroid.show('Enter city name', ToastAndroid.SHORT);
        }
        else if (state == "") {
            ToastAndroid.show('Enter state name', ToastAndroid.SHORT);
        }
        else if (country == "") {
            ToastAndroid.show('Enter country name', ToastAndroid.SHORT);
        }
        else if (zip == "") {
            ToastAndroid.show('Enter zip code', ToastAndroid.SHORT);
        }
        else {
            let formateDate = moment(date).format("YYYY-MM-DD")
            setIsLodding(true)
            const data = {
                first_name: fname, last_name: lname,
                phone: phone, dob: formateDate, street: street,
                city: city, state: state, zip: zip, country: country,
                uid: loginData.data.uid,
                org_uid: loginData.data.org_uid,
                profile_id: loginData.data.cProfile.toString(),
            }
            dispatch(editProfileAction.Eprofile(data, loginData.data.token));
        }
    }

    useEffect(() => {
        if (UpdatedData) {
            if (UpdatedData.status == "success") {
                setIsLodding(false)
                ToastAndroid.show(UpdatedData.message, ToastAndroid.SHORT);
                navigation.navigate(navigationStrings.Profile)
                dispatch(editProfileAction.clearResponse())
            }
            else if (UpdatedData.status == "failed") {
                setIsLodding(false)
                ToastAndroid.show(UpdatedData.message, ToastAndroid.SHORT);
            }
        }
    }, [UpdatedData])

    return (
        <View style={{ flex: 1 }}>
            <Header onPressLeft={() => { navigation.openDrawer() }}
                title='Edit Profile'
                onPressRight={() => { navigation.navigate('Notification') }}
            />
            <ScrollView style={{ flex: 1, marginVertical: '2%', marginHorizontal: '3%' }}>
                <Text style={styles.fieldsLable}>First Name</Text>
                <View style={styles.inputFields2}>
                    <Image style={Platform.OS == 'ios' ? [styles.icon, { height: 22, width: '5.5%', margin: '2%' }]
                        : [styles.icon]}
                        source={require('../../images/user.png')}
                    />
                    <TextInput
                        style={{ flex: 1,  marginHorizontal: '2%' }}
                        value={fname}
                        onChangeText={e => setfname(e)}
                        placeholder="  Name"
                    />
                </View>
                <View style={{ marginVertical: '1%' }}>
                    <Text style={styles.fieldsLable}>Last Name</Text>
                    <View style={styles.inputFields2}>
                        <Image style={Platform.OS == 'ios' ? [styles.icon, { height: 22, width: '5.5%', margin: '2%' }]
                            : [styles.icon]}
                            source={require('../../images/user.png')}
                        />
                        <TextInput
                            style={{ flex: 1, marginHorizontal: '2%' }}
                            value={lname}
                            onChangeText={e1 => setlname(e1)}
                            placeholder="  Name"
                        />
                    </View>
                </View>
                <View style={{ marginVertical: '1%' }}>
                    <Text style={styles.fieldsLable}>Email </Text>
                    <View style={styles.inputFields2}>
                        <Image style={
                            Platform.OS == 'ios' ? [styles.icon, { height: 17, width: '6%', margin: '2.5%' }]
                                :
                                [styles.icon, { width: width * 6.4 / 100, }]}
                            source={require('../../images/mail.png')}
                        />
                        <TextInput
                            style={{ flex: 1, marginRight: '3%' }}
                            value={email}
                            editable={false}
                            color='#000000'
                            onChangeText={e2 => setemail(e2)}
                            placeholder="example@gmail.com"
                            placeholderTextColor='#000000'
                        />
                    </View>
                </View>
                <View style={{ marginVertical: '1%' }}>
                    <Text style={styles.fieldsLable}>Phone</Text>
                    <View style={styles.inputFields2}>
                        <Image
                            style={Platform.OS == 'ios' ? [styles.icon, { height: 24, width: '4.5%', margin: '2%' }]
                                :
                                [styles.icon, { height: height * 3.8 / 100, }]}
                            source={require('../../images/mobile.png')}
                        />
                        <TextInput
                            style={{ flex: 1,  marginHorizontal: '2%' }}
                            value={phone}
                            keyboardType='numeric'
                            editable={false}
                            color='#000000'
                            onChangeText={e3 => setphone(e3)}
                            placeholder="   Phone"
                        />
                    </View>
                </View>
                <View style={{ marginVertical: '1%' }}>
                    <Text style={styles.fieldsLable}>Date of Birth</Text>
                    <TouchableOpacity style={[styles.inputFields2, { paddingVertical: '3.5%' }]} onPress={showDatepicker}>
                        <Image style={Platform.OS == 'ios' ? [styles.icon, { height: 25, width: '6%', marginLeft: '2%', marginTop: '2%' }]
                            :
                            [styles.icon, { height: height * 3.3 / 100, width: width * 6 / 100, }]}
                            source={require('../../images/DOB.png')}
                        />
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                style={{ paddingVertical: '5%', width: '50%' }}
                                // is24Hour={true}
                                value={date}
                                mode={mode}
                                maximumDate={new Date(moment().subtract(20, "years"))}
                                display="default"
                                onChange={onChangeFrom}
                            />
                        )
                        }
                        {Platform.OS == 'ios' ? <View>
                            {text == true ?
                                <Text style={{ fontSize: 15, color: '#000000' }}>Date of Birth</Text>
                                :
                                null
                            }
                        </View>
                            :
                            <View>
                                {text == true ?
                                    <Text style={{ fontSize: 15, color: '#000000', marginLeft: '7%' }}>Date of birth</Text>
                                    :
                                    <Text style={{ fontSize: 15, color: '#000000', marginLeft: '10%' }}>{moment(date).format('MM/DD/YYYY')}</Text>
                                }
                            </View>
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: '1%' }}>
                    <Text style={styles.fieldsLable}>Street</Text>
                    <View style={styles.inputFields2}>
                        <Image
                            style={Platform.OS == 'ios' ? [styles.icon, { height: 24, width: '5.5%', margin: '1.6%' }]
                                :
                                [styles.icon, { height: height * 3.3 / 100 }]}
                            source={require('../../images/address.png')}
                        />
                        <TextInput
                            style={{ flex: 1,  marginHorizontal: '3%' }}
                            value={street}
                            onChangeText={e5 => setstreet(e5)}
                            placeholder="   Street"
                        />
                    </View>
                </View>
                <View style={{ marginVertical: '1%' }}>
                    <Text style={styles.fieldsLable}>City</Text>
                    <View style={styles.inputFields2}>
                        <Image
                            style={Platform.OS == 'ios' ? [styles.icon, { height: 24, width: '5.5%', margin: '1.6%' }]
                                :
                                [styles.icon, { height: height * 3.3 / 100 }]}
                            source={require('../../images/address.png')}
                        />
                        <TextInput
                            style={{ flex: 1, marginHorizontal: '2%'}}
                            value={city}
                            onChangeText={e6 => setcity(e6)}
                            placeholder="   City"
                        />
                    </View>
                </View>
                <View style={{ marginVertical: '1%' }}>
                    <Text style={styles.fieldsLable}>State</Text>
                    <View style={styles.inputFields2}>
                        <Image
                            style={Platform.OS == 'ios' ? [styles.icon, { height: 24, width: '5.5%', margin: '1.6%' }]
                                :
                                [styles.icon, { height: height * 3.3 / 100 }]}
                            source={require('../../images/address.png')}
                        />
                        <TextInput
                            style={{ flex: 1, marginHorizontal: '2%' }}
                            value={state}
                            onChangeText={e7 => setstate(e7)}
                            placeholder="   State"
                        />
                    </View>
                </View>
                <View style={{ marginVertical: '1%' }}>
                    <Text style={styles.fieldsLable}>Country</Text>
                    <View style={styles.inputFields2}>
                        <Image
                            style={Platform.OS == 'ios' ? [styles.icon, { height: 24, width: '5.5%', margin: '1.6%' }]
                                :
                                [styles.icon, { height: height * 3.3 / 100 }]}
                            source={require('../../images/address.png')}
                        />
                        <TextInput
                            style={{ flex: 1,  marginHorizontal: '2%' }}
                            value={country}
                            onChangeText={e8 => setcountry(e8)}
                            placeholder="   Country"
                        />
                    </View>
                </View>
                <View style={{ marginVertical: '1%' }}>
                    <Text style={styles.fieldsLable}>Zip Code</Text>
                    <View style={styles.inputFields2}>
                        <Image
                            style={Platform.OS == 'ios' ? [styles.icon, { height: 24, width: '5.5%', margin: '1.6%' }]
                                :
                                [styles.icon, { height: height * 3.3 / 100 }]}
                            source={require('../../images/address.png')}
                        />
                        <TextInput
                            style={{ flex: 1,  marginHorizontal: '2%' }}
                            value={zip}
                            onChangeText={e9 => setzip(e9)}
                            placeholder="   Zip Code"
                        />
                    </View>
                </View>
                {IsLodding == true ? <ActivityIndicator size="small" color="#0000ff" /> : null}
                <TouchableOpacity style={styles.button}
                    onPress={() => Update()}>
                    <Text style={styles.textButton}>Submit</Text>
                </TouchableOpacity>

            </ScrollView >
        </View >
    );
}


