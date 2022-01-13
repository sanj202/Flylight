

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';


export default function AddContactPopup({ navigation }) {
    return (
        <Card style={styles.headerView}>
            <View style={styles.headerView2}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        style={{ margin: '5%', marginTop: '3%', alignSelf: 'flex-end', height: 14, width: 14 }}
                        source={require('../../images/crossImgR.png')}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>
                Add Contacts
            </Text>
            <View style={{ marginTop: '3%' }}>
                <TouchableOpacity>
                    <View style={styles.listData}>
                        <Image
                            style={styles.titleImg}
                            source={require('../../images/book.png')}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.btnText}>Import from contact book</Text>

                            <Image
                                style={styles.navigateImg}
                                source={require('../../images/navR.png')}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: '3%' }}>
                <TouchableOpacity
                    onPress={
                        () => navigation.navigate('AddContactUpload')
                        //   ()=>  console.log("presss hare ")
                    }
                >
                    <View style={styles.listData}>
                        <Image
                            style={styles.titleImg}
                            source={require('../../images/upload.png')}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.btnText}>Upload contact file</Text>

                            <Image
                                  style={[styles.navigateImg,{marginLeft:'25%'}]}
                                source={require('../../images/navR.png')}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: '3%' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("AddContact")}
                >
                    <View style={[styles.listData, { borderBottomWidth: 0, }]}>
                        <Image
                            style={styles.titleImg}
                            source={require('../../images/addR.png')}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.btnText}>Add manually</Text>

                            <Image
                                style={[styles.navigateImg,{marginLeft:'37%'}]}
                                source={require('../../images/navR.png')}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    headerView: {
        marginTop: '45%',
        margin: '7%',
        borderRadius: 10,
        paddingBottom: 30,

        // borderColor:'#707070',
        // borderWidth:0.1
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#000000'
    },
    btn: {
        marginTop: '10%',
        padding: 10,
        borderRadius: 20,
    },
    btnText: {
        fontSize: 14,
        fontWeight:'bold',
        marginTop: '8%',
        color: '#0F0F0F',
        marginLeft: '5%'
    },
    listData: {
        padding: 5,

        borderBottomWidth: 1,
        borderRadius: 10,
        borderColor: '#DBDBDB',
        margin: '3%',
        marginTop: '-5%',
        flexDirection: 'row',
    },
    headerView2: {
        paddingTop: '3%'
    },
    titleImg: {
        height: 48,
        width: 48,
        marginTop: '2%',
        marginBottom: '2%'
    },
    navigateImg: {
        height: 21,
        width: 21,
        marginTop: '8%',
        marginRight: '2%',
        marginLeft:'10%'
    }

})