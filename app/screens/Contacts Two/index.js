// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
    ToastAndroid,
    ScrollView,
    Modal,
    Alert,
    Pressable,
    StatusBar

} from 'react-native';
import styles from './styles';
import { Card } from 'react-native-paper';
import { BottomSheet, Button, ListItem } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Picker, } from '@react-native-picker/picker'
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../../component/header/index'


export default function Contacts({ navigation }) {

    const [modalVisible2, setModalVisible2] = useState(false);
    const [selectedValue1, setSelectedValue1] = useState('');

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    const [isVisible, setIsVisible] = useState(false);


    const [value1, setValue1] = useState('All_List');
    const [isFocus1, setIsFocus1] = useState(false);

    const data1 = [
        { label: 'All List', value: 'All_List' },
        { label: 'My List', value: 'My_List' },
        { label: 'Fashion List', value: 'Fashion_List' },
    ];





    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((responseJson) => {
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);



    const Contact = [
        {
            title: 'Name',
            subtitle: 'Conneckt',
            mobile: '+91 258564859',
            date: 'Mar 03, 18:00Hrs'
        },
        {
            title: 'Name2',
            subtitle: 'Conneckt2',
            mobile: '+91 25856489',
            date: 'Mar 04, 18:20Hrs'
        },
        {
            title: 'Name3',
            subtitle: 'Conneckt3',
            mobile: '+91 25856459',
            date: 'Mar 05, 18:09Hrs'
        },
        {
            title: 'Name4',
            subtitle: 'Conneckt4',
            mobile: '+91 258564592',
            date: 'Mar 05, 18:19Hrs'
        }
    ];


    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.title
                        ? item.title.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const ItemView = ({ item }) => {
        return (
            // Flat List Item
            <Text
                style={styles.itemStyle}
                onPress={() => getItem(item)}>
                {item.id}
                {'.'}
                {item.title.toUpperCase()}
            </Text>
        );
    };

    const ContactView = ({ item }) => {
        return (
            <TouchableOpacity

            >
                <View container style={styles.listData}>

                    <View style={{ paddingTop: 5, marginBottom: '-1%' }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000000', fontFamily: 'Roboto' }}>{item.title}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Roboto' }}>{item.subtitle}</Text>

                            {value1 == "My_List" ?
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: '#FFFFFF',
                                        fontFamily: 'Roboto',
                                        marginLeft: '2%',
                                        backgroundColor: '#FFBC04',
                                        borderRadius: 10,
                                        paddingLeft: 5, paddingRight: 5, padding: 1
                                    }}>My List</Text>
                                :
                                <Text style={{
                                    fontSize: 14,
                                    color: '#FFFFFF',
                                    fontFamily: 'Roboto',
                                    marginLeft: '2%',
                                    backgroundColor: '#D704FF',
                                    borderRadius: 10,
                                    paddingLeft: 5, paddingRight: 5, padding: 1
                                }}>Fashion List</Text>
                            }

                            {/* {value1 == "Fashion_List" ?

                                <Text style={{
                                    fontSize: 14,
                                    color: '#FFFFFF',
                                    fontFamily: 'Roboto',
                                    marginLeft: '2%',
                                    backgroundColor: '#D704FF',
                                    borderRadius: 10,
                                    paddingLeft: 5, paddingRight: 5, padding: 1
                                }}>Fashion LIst</Text> :
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: '#FFFFFF',
                                        fontFamily: 'Roboto',
                                        marginLeft: '2%',
                                        backgroundColor: '#FFBC04',
                                        borderRadius: 10,
                                        paddingLeft: 5, paddingRight: 5, padding: 1
                                    }}>My List</Text>

                            } */}

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image
                                style={{ height: 20.70, width: 20.70, marginTop: '8%' }}
                                source={require('../../images/detailcall.png')}
                            />
                            <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Roboto', marginTop: '9%', marginLeft: '2%' }}>{item.mobile}</Text>
                        </View>
                    </View>

                    <View style={{ marginBottom: '-5%' }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 5 }}>
                            <TouchableOpacity
                                // onPress={() => setModalVisible2(true)}
                                onPress={() => setIsVisible(true)}
                            >
                                <Image
                                    style={{ height: 40, width: 40, marginTop: '2%', marginLeft: '6%' }}
                                    source={require('../../images/Group.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ReportFeedback')}
                            >
                                <Image
                                    style={{ height: 40, width: 40, marginTop: '2%', marginLeft: '2%' }}
                                    source={require('../../images/GroupCall.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: '7%', flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: 5 }}>
                            <Image
                                style={{ height: 19, width: 18.47, marginTop: '10%' }}
                                source={require('../../images/calendar.png')}
                            />
                            <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Roboto', marginTop: '12%', marginLeft: '2%' }} >{item.date}</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    const getItem = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.title);
    };


    const AddFunction = () => {
        setModalVisible2(!modalVisible2)
        setIsVisible(!isVisible)
        // ToastAndroid.show("Add Succesfully !", ToastAndroid.SHORT);
        navigation.navigate("Edit_Contact")

    };


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
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

            <Header
                style={{ height: "16%" }}
                onPressLeft={() => {
                    // navigation.openDrawer()
                    navigation.navigate('AddContact')
                }}
                title='Contacts'

                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />

            <View style={{ flexDirection: 'row', marginBottom: '2%' }}>
                <View style={styles.inputFields2}>
                    <Image
                        style={[styles.icon, { height: 26, width: 25, marginTop: '5%', marginLeft: '5%' }]}
                        source={require('../../images/search.png')}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        value={search}
                        onChangeText={(text) => searchFilterFunction(text)}
                        placeholder="Search for contacts"
                        underlineColorAndroid="transparent"
                    // secureTextEntry={isSelection}
                    // keyboardShouldPersistTaps='handled'
                    />

                    {/* <FlatList
                    data={filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                /> */}
                </View>

                <View style={{ marginTop: '-8%', borderRadius: 10, width: '30%', backgroundColor: '#fff' }}>
                    {/* {renderLabel()} */}

                    <Dropdown
                        style={styles.dropdown3}
                        placeholderStyle={styles.placeholderStyle3}
                        selectedTextStyle={styles.selectedTextStyle3}
                        // inputSearchStyle={styles.inputSearchStyle3}
                        iconStyle={styles.iconStyle3}
                        data={data1}
                        // search
                        maxHeight={160}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus1 ? 'All List' : '...'}
                        // searchPlaceholder="Search..."
                        value={value1}
                        onFocus={() => setIsFocus1(true)}
                        onBlur={() => setIsFocus1(false)}
                        onChange={item => {
                            setValue1(item.value);
                            setIsFocus1(false);
                        }}
                        renderLeftIcon={() => (

                            <View>
                                {/* <Image
                                    style={[styles.icon, { height: 30, width: 23, marginTop: '4%' }]}
                                    source={require('../../images/list.png')}
                                /> */}
                            </View>
                        )}
                    />
                </View>

            </View>

            {value1 == "All_List" ?

                <View>

                    <TouchableOpacity

                    >
                        <View container style={styles.listData}>

                            <View style={{ paddingTop: 5, marginBottom: '-1%' }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000000', fontFamily: 'Roboto' }}>Name</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Roboto' }}>Conneckt</Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: '#FFFFFF',
                                            fontFamily: 'Roboto',
                                            marginLeft: '2%',
                                            backgroundColor: '#FFBC04',
                                            borderRadius: 10,
                                            paddingLeft: 5, paddingRight: 5, padding: 1
                                        }}>My List</Text>


                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Image
                                        style={{ height: 20.70, width: 20.70, marginTop: '8%' }}
                                        source={require('../../images/detailcall.png')}
                                    />
                                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Roboto', marginTop: '9%', marginLeft: '2%' }}>+91 258564859</Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: '-5%' }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 5 }}>
                                    <TouchableOpacity
                                        // onPress={() => setModalVisible2(true)}
                                        onPress={() => setIsVisible(true)}
                                    >
                                        <Image
                                            style={{ height: 40, width: 40, marginTop: '2%', marginLeft: '6%' }}
                                            source={require('../../images/Group.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ReportFeedback')}
                                    >
                                        <Image
                                            style={{ height: 40, width: 40, marginTop: '2%', marginLeft: '2%' }}
                                            source={require('../../images/GroupCall.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: '7%', flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: 5 }}>
                                    <Image
                                        style={{ height: 19, width: 18.47, marginTop: '10%' }}
                                        source={require('../../images/calendar.png')}
                                    />
                                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Roboto', marginTop: '12%', marginLeft: '2%' }} >Mar 03, 18:00Hrs</Text>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity

                    >
                        <View container style={styles.listData}>

                            <View style={{ paddingTop: 5, marginBottom: '-1%' }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000000', fontFamily: 'Roboto' }}>Name</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Roboto' }}>Conneckt</Text>

                                    <Text style={{
                                        fontSize: 14,
                                        color: '#FFFFFF',
                                        fontFamily: 'Roboto',
                                        marginLeft: '2%',
                                        backgroundColor: '#D704FF',
                                        borderRadius: 10,
                                        paddingLeft: 5, paddingRight: 5, padding: 1
                                    }}>Fashion List</Text>

                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Image
                                        style={{ height: 20.70, width: 20.70, marginTop: '8%' }}
                                        source={require('../../images/detailcall.png')}
                                    />
                                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Roboto', marginTop: '9%', marginLeft: '2%' }}>+91 258564859</Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: '-5%' }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 5 }}>
                                    <TouchableOpacity
                                        // onPress={() => setModalVisible2(true)}
                                        onPress={() => setIsVisible(true)}
                                    >
                                        <Image
                                            style={{ height: 40, width: 40, marginTop: '2%', marginLeft: '6%' }}
                                            source={require('../../images/Group.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ReportFeedback')}
                                    >
                                        <Image
                                            style={{ height: 40, width: 40, marginTop: '2%', marginLeft: '2%' }}
                                            source={require('../../images/GroupCall.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: '7%', flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: 5 }}>
                                    <Image
                                        style={{ height: 19, width: 18.47, marginTop: '10%' }}
                                        source={require('../../images/calendar.png')}
                                    />
                                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Roboto', marginTop: '12%', marginLeft: '2%' }} >Mar 03, 18:00Hrs</Text>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity

                    >
                        <View container style={styles.listData}>

                            <View style={{ paddingTop: 5, marginBottom: '-1%' }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000000', fontFamily: 'Roboto' }}>Name</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Roboto' }}>Conneckt</Text>


                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: '#FFFFFF',
                                            fontFamily: 'Roboto',
                                            marginLeft: '2%',
                                            backgroundColor: '#FFBC04',
                                            borderRadius: 10,
                                            paddingLeft: 5, paddingRight: 5, padding: 1
                                        }}>My List</Text>



                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Image
                                        style={{ height: 20.70, width: 20.70, marginTop: '8%' }}
                                        source={require('../../images/detailcall.png')}
                                    />
                                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Roboto', marginTop: '9%', marginLeft: '2%' }}>+91 258564859</Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: '-5%' }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 5 }}>
                                    <TouchableOpacity
                                        // onPress={() => setModalVisible2(true)}
                                        onPress={() => setIsVisible(true)}
                                    >
                                        <Image
                                            style={{ height: 40, width: 40, marginTop: '2%', marginLeft: '6%' }}
                                            source={require('../../images/Group.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ReportFeedback')}
                                    >
                                        <Image
                                            style={{ height: 40, width: 40, marginTop: '2%', marginLeft: '2%' }}
                                            source={require('../../images/GroupCall.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: '7%', flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: 5 }}>
                                    <Image
                                        style={{ height: 19, width: 18.47, marginTop: '10%' }}
                                        source={require('../../images/calendar.png')}
                                    />
                                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Roboto', marginTop: '12%', marginLeft: '2%' }} >Mar 03, 18:00Hrs</Text>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>


                </View> :
                <FlatList
                    data={Contact}
                    renderItem={ContactView}
                />
            }
            <BottomSheet
                modalProps={{
                    animationType: 'fade',
                    hardwareAccelerated: true,
                    onRequestClose: () => {
                        setIsVisible(false);
                    },
                }}
                isVisible={isVisible}>
                <View>
                    <View style={styles.headerView2}>
                        <TouchableOpacity
                            onPress={() => AddFunction('Call Next')}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.title3}>Call Next</Text>
                                <Image
                                    style={{ height: 13, width: 20, marginRight: '2%' }}
                                    source={require('../../images/arrowforward.png')}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => AddFunction('Shift Up')}
                        >
                            <View style={{ borderWidth: 0.3, borderColor: '#B9BAC8', margin: '2%' }}></View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '3%' }}>
                                <Text style={styles.title3}>Shift Up</Text>
                                <Image
                                    style={{ height: 13, width: 20, marginRight: '2%' }}
                                    source={require('../../images/arrowforward.png')}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => AddFunction('Shift Down')}
                        >
                            <View style={{ borderWidth: 0.3, borderColor: '#B9BAC8', margin: '2%' }}></View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '3%' }}>
                                <Text style={styles.title3}>Shift Down</Text>
                                <Image
                                    style={{ height: 13, width: 20, marginRight: '2%' }}
                                    source={require('../../images/arrowforward.png')}
                                />
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </BottomSheet>

            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible2(!modalVisible2);
                }}
             >
                <Card style={styles.headerView2}>
                    <TouchableOpacity
                        onPress={() => AddFunction('Call Next')}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.title3}>Call Next</Text>
                            <Image
                                style={{ height: 22, width: 33, marginRight: '2%' }}
                                source={require('../../images/arrowforward.png')}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => AddFunction('Shift Up')}
                    >
                        <View style={{ borderWidth: 0.4, margin: '2%' }}></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '3%' }}>
                            <Text style={styles.title3}>Shift Up</Text>
                            <Image
                                style={{ height: 22, width: 33, marginRight: '2%' }}
                                source={require('../../images/arrowforward.png')}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => AddFunction('Shift Down')}
                    >
                        <View style={{ borderWidth: 0.4 }}></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '3%' }}>
                            <Text style={styles.title3}>Shift Down</Text>
                            <Image
                                style={{ height: 22, width: 33, marginRight: '2%' }}
                                source={require('../../images/arrowforward.png')}
                            />
                        </View>
                    </TouchableOpacity>

                </Card>
            </Modal> */}

        </View>
    );
};


