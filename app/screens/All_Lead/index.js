import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Picker,
    FlatList,
    StatusBar,
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
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import Header from '../../component/header/index'

export default function All_lead({ navigation }) {

    const [Opportunity, setOpportunity] = useState('7-Days');
    const [isService, setisService] = useState('All');
    const [modalVisible2, setModalVisible2] = useState(false);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState(true)

    const [dates, setDates] = useState(new Date());
    const [modes, setModes] = useState('date');
    const [shows, setShows] = useState(false);
    const [texts, setTexts] = useState(true)

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

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
        setText(false)
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
        setTexts(false)
        showModes('dates');
    };










    const DeleteFunction = () => {
        setModalVisible2(!modalVisible2)
    }

    const checkValue = (value) => {
        // console.log("data,......................", A)
        setisService(value)
    }
    const Search = (value) => {
        // console.log("data,......................", value)
        // setOpportunity(value)
        Alert.alert("search functinality")
    }


    const data = [
        { label: 'Select Status', value: 'Select Status' },
        { label: 'Select Status1', value: 'Select Status1' },
        { label: 'Select Status2', value: 'Select Status2' },
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

            {/* <LinearGradient
                colors={['#2B6EF2', '#8DB3FF',]}

                style={{
                    // flex: 1,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    height: "12%",
                    width: "100%",
                }}
            >
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
                            style={{ height: 28, width: 28 }}
                            source={require('../../images/home.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{
                        color: 'white', fontSize: 16,
                        fontFamily: 'Roboto'
                    }}>Leads</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Notification')}
                    >
                        <Image
                            style={{ height: 28, width: 28 }}
                            source={require('../../images/Notifications.png')}
                        />
                    </TouchableOpacity>
                </View>
            </LinearGradient> */}


<Header
      style={{  height: "14%"}}
        onPressLeft={() => {
        //   navigation.openDrawer()
        navigation.goBack()
        }}
        
        title='Leads'
        
        onPressRight={() => {
          navigation.navigate('Notification')
        }}
      />

            <View
                style={{
                    flexDirection: 'row',
                    marginLeft: '7%',
                    marginRight: '7%',
                    marginTop: '-5%',
                    backgroundColor: '#fff',
                    // padding: 5,
                    // paddingLeft: 15,
                    // paddingRight: 15,
                    borderRadius: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>

                {isService == 'All' ?
                    <TouchableOpacity style={{
                        width: '30%',
                        backgroundColor: '#4F46BA',
                        borderRadius: 20,
                    }}

                        onPress={() => checkValue("All")}
                    >

                        <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 15, padding: 5, }}>All</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity

                        style={{
                            width: '30%',
                            // backgroundColor: '#4F46BA',
                            borderRadius: 20,
                        }}
                        onPress={() => checkValue("All")}
                    >
                        <Text style={{ padding: 5, color: 'black', textAlign: 'center' }}>All</Text>
                    </TouchableOpacity>
                }

                {isService == 'Called' ?
                    <TouchableOpacity style={{
                        width: '30%',
                        backgroundColor: '#4F46BA',
                        borderRadius: 20,
                    }}
                        onPress={() => checkValue("Called")}
                    >
                        <Text style={{ color: '#fff', padding: 5, textAlign: 'center' }}>Called</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={{
                            width: '30%',
                            // backgroundColor: '#4F46BA',
                            borderRadius: 20,
                        }}

                        onPress={() => checkValue("Called")}
                    >
                        <Text style={{ padding: 5, color: 'black', textAlign: 'center' }}>Called</Text>
                    </TouchableOpacity>
                }




                {isService == 'Pending' ?

                    <TouchableOpacity style={{
                        width: '30%',
                        backgroundColor: '#4F46BA',
                        borderRadius: 20,
                    }}
                        onPress={() => checkValue("Pending")}
                    >
                        <Text style={{ color: '#fff', padding: 5, textAlign: 'center' }}>Pending</Text>
                    </TouchableOpacity>
                    :

                    <TouchableOpacity
                        style={{
                            width: '30%',
                            // backgroundColor: '#4F46BA',
                            borderRadius: 20,
                        }}
                        onPress={() => checkValue("Pending")}
                    >
                        <Text style={{ padding: 5, color: 'black', textAlign: 'center' }}>Pending</Text>
                    </TouchableOpacity>
                }

            </View>
            {/* ------------------------------------------------------------------ */}

            {/* <View> */}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    // is24Hour={true}
                    display="calendar"
                    onChange={onChangeFrom}
                />
            )}
            {/* </View> */}

            {/* <View> */}
            {shows && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dates}
                    mode={modes}
                    // is24Hour={true}
                    display="calendar"
                    onChange={onChangeTo}
                />
            )}
            {/* </View> */}

            {/* ------------------------------------------------------------------------- */}
            {
                isService == "All" ?
                    <View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            backgroundColor: '#fff', margin: '3%', marginBottom: '0%'
                        }}>

                            <TouchableOpacity
                                style={{ width: '48%' }}
                                onPress={showDatepicker}
                            >
                                <View style={styles.pickers}>
                                    <Image
                                        style={{ height: 22, width: 20, marginTop: '2%', marginRight: '5%' }}
                                        source={require('../../images/pikerCalander.png')}
                                    />
                                    {text == true ?
                                        <Text style={{ color: '#BCBCBC', marginTop: '5%' }}>From</Text>
                                        :
                                        <Text style={{ color: '#BCBCBC', marginTop: '5%' }}>{moment(date).format('MM/DD/YYYY')}</Text>
                                    }
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={{ width: '48%' }}
                                onPress={showDatepickers}
                            >
                                <View style={styles.pickers}>
                                    <Image
                                        style={{ height: 22, width: 20, marginTop: '2%', marginRight: '5%' }}
                                        source={require('../../images/pikerCalander.png')}
                                    />
                                    {texts == true ?
                                        <Text style={{ color: '#BCBCBC', marginTop: '5%' }}>To</Text>
                                        :
                                        <Text style={{ color: '#BCBCBC', marginTop: '5%' }}>{moment(dates).format('MM/DD/YYYY')}</Text>
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* --------------------------------------------------- */}

                        <View style={styles.container3}>
                            {/* {renderLabel()} */}
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
                                placeholder={!isFocus ? 'Select Status' : '...'}
                                // searchPlaceholder="Search..."
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                }}
                                renderLeftIcon={() => (
                                    // <AntDesign
                                    //     style={styles.icon}
                                    //     color={isFocus ? 'blue' : 'black'}
                                    //     name="Safety"
                                    //     size={20}
                                    // />
                                    <View>
                                        <Image
                                            style={[styles.icon, { height: 24, width: 26, marginTop: '5%', marginLeft: '2%' }]}
                                            source={require('../../images/statusnet.png')}
                                        />
                                    </View>
                                )}
                            />
                        </View>


                        <TouchableOpacity style={styles.button}
                            onPress={() => Search()}>
                            <Text style={[styles.textButton, { fontWeight: 'bold' }]}>SEARCH</Text>
                        </TouchableOpacity>


                        {/* ------------------------------------------------------------------- */}
                        <ScrollView>
                            <View style={{ marginTop: '2.5%' }}>
                                <View style={styles.listData}>
                                    <Image
                                        style={{ height: 60, width: 60, marginTop: '2%', marginRight: '2%' }}
                                        source={require('../../images/profileCall.png')}
                                    />
                                    <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>Johne Doe</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: 'black' }}>SMT Group</Text>
                                            <Text style={{
                                                color: '#fff', backgroundColor: '#F69708', paddingLeft: 10, paddingRight: 10,
                                                padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 12
                                            }}>Lead</Text>
                                        </View>
                                        <Text style={{ color: 'black' }}>Last Call: Sep 17, 15:24PM</Text>

                                    </View>

                                    <Image
                                        style={{ height: 18, width: 18, marginRight: '1%', marginTop: '1%', marginLeft: '-12%' }}
                                        source={require('../../images/material-call.png')}
                                    />
                                    <Text style={{ color: 'black' }}>+91 1234567890</Text>

                                </View>
                            </View>

                            <View style={{ marginTop: '2.5%' }}>
                                <View style={styles.listData}>
                                    <Image
                                        style={{ height: 60, width: 60, marginTop: '2%', marginRight: '2%' }}
                                        source={require('../../images/profileCall.png')}
                                    />
                                    <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>Johne Doe</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: 'black' }}>SMT Group</Text>
                                            {/* <Text style={{
                                                color: '#fff', backgroundColor: '#F69708', paddingLeft: 10, paddingRight: 10,
                                                padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 12
                                            }}>Lead</Text> */}
                                        </View>
                                        <Text style={{ color: 'black' }}>Last Call: Sep 17, 15:24PM</Text>

                                    </View>

                                    <Image
                                        style={{ height: 18, width: 18, marginRight: '1%', marginTop: '1%', marginLeft: '-12%' }}
                                        source={require('../../images/material-call.png')}
                                    />
                                    <Text style={{ color: 'black' }}>+91 1234567890</Text>

                                </View>
                            </View>

                            <View style={{ marginTop: '2.5%' }}>
                                <View style={styles.listData}>
                                    <Image
                                        style={{ height: 60, width: 60, marginTop: '2%', marginRight: '2%' }}
                                        source={require('../../images/profileCall.png')}
                                    />
                                    <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>Johne Doe</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: 'black' }}>SMT Group</Text>
                                            <Text style={{
                                                color: '#fff', backgroundColor: '#05B829', paddingLeft: 10, paddingRight: 10,
                                                padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 12
                                            }}>Closed</Text>
                                        </View>
                                        <Text style={{ color: 'black' }}>Last Call: Sep 17, 15:24PM</Text>

                                    </View>

                                    <Image
                                        style={{ height: 18, width: 18, marginRight: '1%', marginTop: '1%', marginLeft: '-12%' }}
                                        source={require('../../images/material-call.png')}
                                    />
                                    <Text style={{ color: 'black' }}>+91 1234567890</Text>

                                </View>
                            </View>




                        </ScrollView>
                    </View>
                    :
                    <View />
            }

            {
                isService == "Called" ?
                    <View>



                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            backgroundColor: '#fff', margin: '3%', marginBottom: '0%'
                        }}>

                            <TouchableOpacity
                                style={{ width: '48%' }}
                                onPress={showDatepicker}
                            >
                                <View style={styles.pickers}>
                                    <Image
                                        style={{ height: 22, width: 20, marginTop: '2%', marginRight: '5%' }}
                                        source={require('../../images/pikerCalander.png')}
                                    />
                                    {text == true ?
                                        <Text style={{ color: '#BCBCBC', marginTop: '5%' }}>From</Text>
                                        :
                                        <Text style={{ color: '#BCBCBC', marginTop: '5%' }}>{moment(date).format('MM/DD/YYYY')}</Text>
                                    }
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={{ width: '48%' }}
                                onPress={showDatepickers}
                            >
                                <View style={styles.pickers}>
                                    <Image
                                        style={{ height: 22, width: 20, marginTop: '2%', marginRight: '5%' }}
                                        source={require('../../images/pikerCalander.png')}
                                    />
                                    {texts == true ?
                                        <Text style={{ color: '#BCBCBC', marginTop: '5%' }}>To</Text>
                                        :
                                        <Text style={{ color: '#BCBCBC', marginTop: '5%' }}>{moment(dates).format('MM/DD/YYYY')}</Text>
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* --------------------------------------------------- */}

                        <View style={styles.container3}>
                            {/* {renderLabel()} */}
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
                                placeholder={!isFocus ? 'Select Status' : '...'}
                                // searchPlaceholder="Search..."
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                }}
                                renderLeftIcon={() => (
                                    // <AntDesign
                                    //     style={styles.icon}
                                    //     color={isFocus ? 'blue' : 'black'}
                                    //     name="Safety"
                                    //     size={20}
                                    // />

                                    <View>
                                        <Image
                                            style={[styles.icon, { height: 24, width: 26, marginTop: '5%', marginLeft: '2%' }]}
                                            source={require('../../images/statusnet.png')}
                                        />
                                    </View>

                                )}
                            />
                        </View>


                        <TouchableOpacity style={styles.button}
                            onPress={() => Search()}>
                            <Text style={[styles.textButton, { fontWeight: 'bold' }]}>SEARCH</Text>
                        </TouchableOpacity>


                        {/* ------------------------------------------------------------------- */}
                        <ScrollView>
                            <View style={{ marginTop: '2.5%' }}>
                                <View style={styles.listData}>
                                    <Image
                                        style={{ height: 60, width: 60, marginTop: '2%', marginRight: '2%' }}
                                        source={require('../../images/profileCall.png')}
                                    />
                                    <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>Johne Doe</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: 'black' }}>SMT Group</Text>
                                            <Text style={{
                                                color: '#fff', backgroundColor: '#F69708', paddingLeft: 10, paddingRight: 10,
                                                padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 12
                                            }}>Lead</Text>
                                        </View>
                                        <Text style={{ color: 'black' }}>Last Call: Sep 17, 15:24PM</Text>

                                    </View>

                                    <Image
                                        style={{ height: 18, width: 18, marginRight: '1%', marginTop: '1%', marginLeft: '-12%' }}
                                        source={require('../../images/material-call.png')}
                                    />
                                    <Text style={{ color: 'black' }}>+91 1234567890</Text>

                                </View>
                            </View>

                            <View style={{ marginTop: '2.5%' }}>
                                <View style={styles.listData}>
                                    <Image
                                        style={{ height: 60, width: 60, marginTop: '2%', marginRight: '2%' }}
                                        source={require('../../images/profileCall.png')}
                                    />
                                    <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>Johne Doe</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: 'black' }}>SMT Group</Text>
                                            <Text style={{
                                                color: '#fff', backgroundColor: '#608EE9', paddingLeft: 10, paddingRight: 10,
                                                padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 12
                                            }}>Hold</Text>
                                        </View>
                                        <Text style={{ color: 'black' }}>Last Call: Sep 17, 15:24PM</Text>

                                    </View>

                                    <Image
                                        style={{ height: 18, width: 18, marginRight: '1%', marginTop: '1%', marginLeft: '-12%' }}
                                        source={require('../../images/material-call.png')}
                                    />
                                    <Text style={{ color: 'black' }}>+91 1234567890</Text>

                                </View>
                            </View>

                            <View style={{ marginTop: '2.5%' }}>
                                <View style={styles.listData}>
                                    <Image
                                        style={{ height: 60, width: 60, marginTop: '2%', marginRight: '2%' }}
                                        source={require('../../images/profileCall.png')}
                                    />
                                    <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>Johne Doe</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: 'black' }}>SMT Group</Text>
                                            <Text style={{
                                                color: '#fff', backgroundColor: '#FF0000', paddingLeft: 10, paddingRight: 10,
                                                padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 12
                                            }}>DND</Text>
                                        </View>
                                        <Text style={{ color: 'black' }}>Last Call: Sep 17, 15:24PM</Text>

                                    </View>

                                    <Image
                                        style={{ height: 18, width: 18, marginRight: '1%', marginTop: '1%', marginLeft: '-12%' }}
                                        source={require('../../images/material-call.png')}
                                    />
                                    <Text style={{ color: 'black' }}>+91 1234567890</Text>

                                </View>
                            </View>



                        </ScrollView>
                    </View>

                    :
                    <View />
            }

            {
                isService == "Pending" ?
                    <View>



                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            backgroundColor: '#fff', margin: '3%', marginBottom: '0%'
                        }}>

                            <TouchableOpacity
                                style={{ width: '48%' }}
                                onPress={showDatepicker}
                            >
                                <View style={styles.pickers}>
                                    <Image
                                        style={{ height: 22, width: 20, marginTop: '2%', marginRight: '5%' }}
                                        source={require('../../images/pikerCalander.png')}
                                    />
                                    {text == true ?
                                        <Text style={{ color: '#BCBCBC', marginTop: '5%' }}>From</Text>
                                        :
                                        <Text style={{ color: '#BCBCBC', marginTop: '5%' }}>{moment(date).format('MM/DD/YYYY')}</Text>
                                    }
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={{ width: '48%' }}
                                onPress={showDatepickers}
                            >
                                <View style={styles.pickers}>
                                    <Image
                                        style={{ height: 22, width: 20, marginTop: '2%', marginRight: '5%' }}
                                        source={require('../../images/pikerCalander.png')}
                                    />
                                    {texts == true ?
                                        <Text style={{ color: '#BCBCBC', marginTop: '5%' }}>To</Text>
                                        :
                                        <Text style={{ color: '#BCBCBC', marginTop: '5%' }}>{moment(dates).format('MM/DD/YYYY')}</Text>
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* --------------------------------------------------- */}

                        <View style={styles.container3}>
                            {/* {renderLabel()} */}
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
                                placeholder={!isFocus ? 'Select Status' : '...'}
                                // searchPlaceholder="Search..."
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                }}
                                renderLeftIcon={() => (
                                    // <AntDesign
                                    //     style={styles.icon}
                                    //     color={isFocus ? 'blue' : 'black'}
                                    //     name="Safety"
                                    //     size={20}
                                    // />
                                    <View>
                                        <Image
                                            style={[styles.icon, { height: 24, width: 26, marginTop: '5%', marginLeft: '2%' }]}
                                            source={require('../../images/statusnet.png')}
                                        />
                                    </View>
                                )}
                            />
                        </View>


                        <TouchableOpacity style={styles.button}
                            onPress={() => Search()}>
                            <Text style={[styles.textButton, { fontWeight: 'bold' }]}>SEARCH</Text>
                        </TouchableOpacity>


                        {/* ------------------------------------------------------------------- */}
                        <ScrollView>
                            <View style={{ marginTop: '2.5%' }}>
                                <View style={styles.listData}>
                                    <Image
                                        style={{ height: 60, width: 60, marginTop: '2%', marginRight: '2%' }}
                                        source={require('../../images/profileCall.png')}
                                    />
                                    <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black', marginTop: '15%' }}>Johne Doe</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: 'black' }}>SMT Group</Text>
                                            {/* <Text style={{
                                        color: '#fff', backgroundColor: '#F69708', paddingLeft: 10, paddingRight: 10,
                                        padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 12
                                    }}>Lead</Text> */}
                                        </View>
                                        {/* <Text style={{ color: 'black' }}>Last Call: Sep 17, 15:24PM</Text> */}

                                    </View>

                                    <Image
                                        style={{ height: 18, width: 18, marginRight: '1%', marginTop: '2%', marginLeft: '12%' }}
                                        source={require('../../images/material-call.png')}
                                    />
                                    <Text style={{ color: 'black', marginTop: '2%' }}>+91 1234567890</Text>

                                </View>
                            </View>

                            <View style={{ marginTop: '-1%' }}>
                                <View style={styles.listData}>
                                    <Image
                                        style={{ height: 60, width: 60, marginTop: '2%', marginRight: '2%' }}
                                        source={require('../../images/profileCall.png')}
                                    />
                                    <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black', marginTop: '15%' }}>Johne Doe</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: 'black' }}>SMT Group</Text>
                                            {/* <Text style={{
                                        color: '#fff', backgroundColor: '#F69708', paddingLeft: 10, paddingRight: 10,
                                        padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 12
                                    }}>Lead</Text> */}
                                        </View>
                                        {/* <Text style={{ color: 'black' }}>Last Call: Sep 17, 15:24PM</Text> */}

                                    </View>

                                    <Image
                                        style={{ height: 18, width: 18, marginRight: '1%', marginTop: '2%', marginLeft: '12%' }}
                                        source={require('../../images/material-call.png')}
                                    />
                                    <Text style={{ color: 'black', marginTop: '2%' }}>+91 1234567890</Text>

                                </View>
                            </View>

                            <View style={{ marginTop: '-1%' }}>
                                <View style={styles.listData}>
                                    <Image
                                        style={{ height: 60, width: 60, marginTop: '2%', marginRight: '2%' }}
                                        source={require('../../images/profileCall.png')}
                                    />
                                    <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black', marginTop: '15%' }}>Johne Doe</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: 'black' }}>SMT Group</Text>
                                            {/* <Text style={{
                                        color: '#fff', backgroundColor: '#F69708', paddingLeft: 10, paddingRight: 10,
                                        padding: 1, borderRadius: 15, marginLeft: '2%', fontSize: 12
                                    }}>Lead</Text> */}
                                        </View>
                                        {/* <Text style={{ color: 'black' }}>Last Call: Sep 17, 15:24PM</Text> */}

                                    </View>

                                    <Image
                                        style={{ height: 18, width: 18, marginRight: '1%', marginTop: '2%', marginLeft: '12%' }}
                                        source={require('../../images/material-call.png')}
                                    />
                                    <Text style={{ color: 'black', marginTop: '2%' }}>+91 1234567890</Text>

                                </View>
                            </View>

                        </ScrollView>
                    </View>


                    :
                    <View />
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible2);
                }}
            >
                <View style={styles.centeredView3}>
                    <View style={styles.modalView3}>

                        <Image
                            source={require('../../images/checkmark-circle.png')}
                            style={{ width: 60, height: 60 }}
                        />
                        <Text style={styles.modalText3}>Successfully {'\n'} Deleted</Text>

                        <Pressable
                            style={[styles.button3, styles.buttonClose3]}


                            onPress={() => DeleteFunction()}
                        >
                            <Text style={styles.textStyle3}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View >
    );
}


