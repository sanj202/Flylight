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
    Pressable,
    StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import Header from '../../component/header/index'
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

    const [singleFile, setSingleFile] = useState('');
    const [multipleFile, setMultipleFile] = useState([]);
    const [newAray, setnewAray] = useState([])

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const selectOneFile = async () => {
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
                // DocumentPicker.types.csv
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            // console.log('URI : ' + res.uri);
            // console.log('Type : ' + res.type);
            // console.log('File Name : ' + res.name);
            // console.log('File Size : ' + res.size);
            //Setting the state to show single file attributes
            setSingleFile(res);

            StoreData(res)

        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                // alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    // console.log("value of ,...............................", value
    //     // ,singleFile.map((item,index)=>item.name) 
    //     , newAray)

    const StoreData = (value) => {

        let tem = value
        setnewAray([...data, tem])
    }

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
        setModalVisible2(!modalVisible2)
    }


    const data = [
        { label: 'My List', value: '+ My List' },
        { label: 'Sales List', value: 'Sales List' },
        // {label:singleFile.map((item,index)=>item.name) ,value : singleFile},
        { label: '+ Add List', value: '+ Add List' }
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

            <Header
                // style={{ height: "16%" }}
                onPressLeft={() => {
                    // navigation.OpenDrawer()
                    navigation.goBack()
                }}
                title='Upload Contact File'
                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />

            <View>
                <View style={{ paddingTop: 16, paddingBottom: 16, margin: '5%', borderRadius: 10, borderWidth: 1, borderStyle: 'dashed' }}>
                    <Image
                        source={require('../../images/file-import.png')}
                        style={{ height: 50, width: 50, alignSelf: 'center' }}
                    />
                    <Text style={{
                        fontFamily: 'Roboto',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#000000',
                        fontSize: 16,
                        paddingBottom: 5,
                        paddingTop: 8
                    }}>Upload Contact File</Text>
                </View>
                <View style={styles.container3}>
                    {/* {renderLabel()} */}
                    <Text style={{ color: 'black', paddingBottom: '2%', fontSize: 12, fontFamily: 'Roboto' }}>Import to list</Text>

                    <Dropdown
                        style={[styles.dropdown3, isFocus && { color: '' }]}
                        placeholderStyle={styles.placeholderStyle3}
                        selectedTextStyle={[styles.selectedTextStyle3,]}
                        // inputSearchStyle={styles.inputSearchStyle3}
                        iconStyle={styles.iconStyle3}
                        data={data}
                        // labelcolor='red'
                        // search
                        maxHeight={140}
                        labelField="label"
                        valueField="value"
                        placeholder='Select list'
                        // searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            if (item.value == '+ Add List') {
                                selectOneFile()
                            }
                            else {
                                setValue(item.value);
                            }
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (

                            <View>
                                <Image
                                    source={require('../../images/list.png')}
                                    style={{ height: 23, width: 17, marginRight: '2%' }}
                                />
                            </View>
                        )}
                    />

                    <View style={{ flexDirection: 'row', marginLeft: '2%', margin: '5%' }}>
                        <Image
                            source={require('../../images/infoDark.png')}
                            style={{ height: 19, width: 19, marginRight: '2%' }}
                        />
                        <Text style={{
                            marginTop: '0%',
                            fontSize: 14,
                            fontFamily: 'Roboto',
                            color: '#888888'
                        }}>Supported formats are xls, xlsx, and .csv</Text>
                    </View>
                    <TouchableOpacity style={styles.button}
                        onPress={() => Search(value)}>
                        <Text style={[styles.textButton, { fontWeight: 'bold' }]}>ADD</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => {
                    setModalVisible2(!modalVisible2);
                }}
            >
                <View style={[styles.centeredView3]}>

                    <View style={[styles.modalView3, { paddingBottom: '-5%' }]}>
                        <View style={{ marginLeft: '80%' }}>
                            <TouchableOpacity
                                onPress={() => setModalVisible2(!modalVisible2)}
                            >
                                <Image
                                    style={{ margin: '5%', marginTop: '3%', alignSelf: 'flex-end', height: 14, width: 14 }}
                                    source={require('../../images/crossImgR.png')}
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalText3}>Add Contact</Text>

                        <TextInput style={{
                            borderWidth: 1,
                            borderColor: '#D6D6D6',
                            borderRadius: 10,
                            paddingLeft: 10,
                            backgroundColor: '#F6F6F6'
                        }}
                            placeholder='Enter Name of list' placeholderTextColor="#000000">

                        </TextInput>
                        <TextInput style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            marginTop: '4%',
                            borderColor: '#D6D6D6',
                            paddingLeft: 10,
                            paddingTop: '15%',
                            paddingBottom: "15%",
                            backgroundColor: '#F6F6F6'
                        }} placeholder='Enter Description' placeholderTextColor='#000000' >

                        </TextInput>

                        <Pressable
                            style={[styles.buttonClose3, { marginBottom: '5%', borderRadius: 20 }]}
                            onPress={() => AddFunction()}
                        >
                            <Text style={[styles.textStyle3, {}]}>ADD</Text>
                        </Pressable>


                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={[styles.centeredView3, {}]}>
                    <View style={[styles.modalView3, { height: '40%', }]}>

                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end', }}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Image
                                style={{ margin: '5%', marginTop: '3%', height: 14, width: 14 }}
                                source={require('../../images/crossImgR.png')}
                            />
                        </TouchableOpacity>


                        <Image
                            source={require('../../images/checkmark-circle.png')}
                            style={{ width: 38.75, height: 38.75, alignSelf: 'center' }}
                        />
                        <Text style={[styles.modalText3, { marginTop: 10, fontSize: 21, paddingBottom: 0, marginBottom: 0 }]}>
                            List Add{'\n'}Successfully
                        </Text>
                        <Pressable
                            style={[styles.button3, styles.buttonClose3, { borderRadius: 20, marginBottom: '-20%', }]}
                            onPress={() => ShareFunction()}
                        >
                            <Text style={[styles.textStyle3, { paddingLeft: 50, paddingRight: 50 }]}>OK</Text>
                        </Pressable>

                        <View style={{ marginBottom: '25%' }}></View>
                    </View>


                </View>
            </Modal>

        </View >
    );
}


