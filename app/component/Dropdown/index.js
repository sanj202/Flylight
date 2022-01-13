
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Picker,
    FlatList,
    Image,
    Button,
    ScrollView,
    Modal,
    Alert,
    Pressable
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import styles from './styles'
import { Dropdown } from 'react-native-element-dropdown';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

export default function UploadContact({ navigation }) {

    const [Opportunity, setOpportunity] = useState('7-Days');
    const [isService, setisService] = useState('All');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [dates, setDates] = useState(new Date());
    const [modes, setModes] = useState('date');
    const [shows, setShows] = useState(false);

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    // console.log("value of ,...............................", value)

    const onChangeFrom = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    const onChangeTo = (event, selectedDates) => {
        const currentDates = selectedDates || dates;
        setShows(Platform.OS === 'ios');
        setDates(currentDates);
    };

    const showModes = (currentModes) => {
        setShows(true);
        setModes(currentModes);
    };

    const showDatepickers = () => {
        showModes('dates');
    };










    const AddFunction = () => {
        setModalVisible2(!modalVisible2)
        setModalVisible(true)
    }

    const ShareFunction = () => {
        setModalVisible(!modalVisible)

        navigation.navigate('ContactsTwo')
    }

    const checkValue = (value) => {
        // console.log("data,......................", A)
        setisService(value)
    }
    const Search = (value) => {
        // console.log("data,......................", value)
        // setOpportunity(value)

        if (value == "+ Add List") {
            // Alert.alert("navigation screen ")
            setModalVisible2(true);
        }
        else {
            Alert.alert("search functinality")
        }

    }


    const data = [
        { label: 'My List  ', value: '+ My List' },
        { label: 'Sales List', value: 'Sales List' },
        { label: '+ Add List', value: '+ Add List' },
    ];

    const DropdownComponent = () => {


        const renderLabel = () => {
            if (value || isFocus) {
                return (
                    <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                        Dropdown label
                    </Text>
                );
            }
            return null;
        };
    }

    return (
        <View style={styles.container}>

            <View
                style={styles.headerView}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: '5%',
                    }}>
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image
                            style={styles.image2}
                            source={require('../../images/home.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 20 }}>DropDown</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Notification')}
                    >
                        <Image
                            style={styles.image2}
                            source={require('../../images/Notifications.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>





            <View style={styles.container3}>
                {/* {renderLabel()} */}
                <Text style={{ color: 'black', paddingBottom: '2%', fontSize: 15 }}>Import to list</Text>
                <Dropdown
                    style={[styles.dropdown3, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle3}
                    selectedTextStyle={styles.selectedTextStyle3}
                    // inputSearchStyle={styles.inputSearchStyle3}
                    iconStyle={styles.iconStyle3}
                    data={data}
                    // search
                    maxHeight={160}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select list' : '...'}
                    // searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (

                        <View>
                            <Image
                                source={require('../../images/list.png')}
                                style={{ height: 28, width: 20, marginRight: '2%' }}
                            />
                        </View>
                    )}
                />

                <TouchableOpacity style={styles.button}
                    onPress={() => Search(value)}>
                    <Text style={styles.textButton}>Search</Text>
                </TouchableOpacity>
            </View>




        </View >
    );
}





