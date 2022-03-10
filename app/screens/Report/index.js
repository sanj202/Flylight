import React, { useState, useEffect } from "react";
import {
    StyleSheet, ScrollView, StatusBar, View,
    Text, TouchableOpacity, Image, Touchable, Dimensions
} from 'react-native';
import PieChart from 'react-native-pie-chart';
// import {
//     LineChart,
//     BarChart,
//     // PieChart,
//     ProgressChart,
//     ContributionGraph,
//     StackedBarChart
// } from 'react-native-chart-kit'
// import { Grid, LineChart, XAxis, YAxis, BarChart } from 'react-native-svg-charts'
import { Picker, } from '@react-native-picker/picker'
import { Card } from 'react-native-paper'
import styles from "./styles";
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import * as scale from 'd3-scale';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from "../../component/header";
import {
    LineChart,
    BarChart,
    // PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";



// import PieChart from 'react-native-chart-kit';

export default function Report({ navigation }) {

    const [selectedValue1, setSelectedValue1] = useState('');
    const [callAction, setcallAction] = useState('15 Days');
    const [callStatus, setcallStatus] = useState('15 Days');

    const [value3, setValue3] = useState(null);
    const [isFocus3, setIsFocus3] = useState(false);

    const data3 = [
        { label: 'Holi Campaign', value: 'Holi Campaign' },
        { label: 'Holi Campaign2', value: 'Holi Campaign2' },
        { label: 'Holi Campaign3', value: 'Holi Campaign3' },
    ];

    const widthAndHeight = 100
    const series = [123, 123, 789, 537, 456, 258]
    const sliceColor = ['#FF420E', '#579D1C', '#004586', '#7E0021', '#FFD320', '#83CAFF']

    const widthAndHeight2 = 112
    const series2 = [123, 123, 789, 456, 258]
    const sliceColor2 = ['#4DB866', '#EDB019', '#F08A1E', '#FFD320', '#83CAFF']


    const barData = {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                data: [20, 45, 30, 50, 99, 43]
            },
        ],
    };

    const TEstdata = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        barPercentage: 0.6,
        height: 5000,
        fillShadowGradient: `rgba(255, 0, 255, 1)`,
        fillShadowGradientOpacity: 1,
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 0, 255, 1)`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,

        style: {
            borderRadius: 16,
            fontFamily: "Roboto",
        },
        propsForBackgroundLines: {
            strokeWidth: 1,
            stroke: "#fff",
            strokeDasharray: "0",
        },
        propsForLabels: {
            fontFamily: "Roboto",
        },
    };

    const graphStyle = {
        // color: '#7E0021',
        // backgroundColor: '#fff',
    }

    const callActionFunction = (value) => {
        // console.log("value.................callStatusFunction........................", value)
        setcallAction(value)
    }

    const callStatusFunction = (value) => {
        // console.log("value............callStatusFunction.............................", value)
        setcallStatus(value)
    }

    const data = [
        {
            value: 50,
            labelY: '400',

        },
        {
            value: 70,
            labelY: '350',
        },

        {
            value: 85,
            labelY: '300',
        },

        {
            value: 5,
            labelY: '250',
        },

        {
            value: 80,
            labelY: '200',
        },
        {
            value: 10,
            labelY: '150',
        },
        {
            value: 40,
            labelY: '100',
        },
        {
            value: 45,
            labelY: '50',
        },
        {
            value: 45,
            labelY: '0',
        },

    ];

    const CUT_OFF = 20;
    const Labels = ({ x, y, bandwidth, data }) =>
        data.map((item, index) => (
            <Text
                key={index}
                x={x(index) + bandwidth / 2}
                y={item.value < CUT_OFF ? y(item.value) - 10 : y(item.value) + 15}
                fontSize={14}
                fill={item.value >= CUT_OFF ? 'white' : 'black'}
                alignmentBaseline={'middle'}
                textAnchor={'middle'}>
                {item.value}
            </Text>
        ));

    return (
        <View style={{ flex: 1 }}>


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
                // style={{ height: "10%" }}
                onPressLeft={() => {
                    // navigation.openDrawer()
                    navigation.goBack()
                }}
                title='Reports'
                onPressRight={() => {
                    navigation.navigate('Notification')
                }}
            />

            <View style={{ margin: '5%', marginTop: '3%' }}>
                <Text style={styles.title}>Select Campaign</Text>

                <View style={{ marginTop: '2%' }}>

                    <Dropdown
                        style={[styles.dropdown3, isFocus3]}
                        placeholderStyle={styles.placeholderStyle3}
                        selectedTextStyle={styles.selectedTextStyle3}
                        // inputSearchStyle={styles.inputSearchStyle3}
                        iconStyle={styles.iconStyle3}
                        data={data3}
                        // search
                        maxHeight={160}
                        labelField="label"
                        valueField="value"
                        placeholder='Holi Campaign'
                        // searchPlaceholder="Search..."
                        value={value3}
                        onFocus={() => setIsFocus3(true)}
                        onBlur={() => setIsFocus3(false)}
                        onChange={item => {
                            setValue3(item.value);
                            setIsFocus3(false);
                        }}
                        renderLeftIcon={() => (

                            <View>
                                <Image
                                    source={require('../../images/list.png')}
                                    style={{ height: 21.20, width: 16, marginLeft: '5%' }}
                                />
                            </View>
                        )}
                    />
                </View>


            </View>
            <ScrollView style={{ marginTop: '-3%' }}>
                <Card style={{ padding: '3%', margin: '2%', marginTop: '0%' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Report2")}
                    >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{
                                marginLeft: '2.5%',
                                marginRight: '2%', fontFamily: 'Roboto',
                                color: '#0F0F0F', fontWeight: 'bold', fontSize: 14,
                            }} >CALL ACTIONS</Text>

                            <View style={{ flexDirection: 'row' }}>
                                {
                                    callAction == "7 Days" ?
                                        <View style={{ marginLeft: '2%' }}>
                                            <TouchableOpacity
                                                onPress={() => callActionFunction('7 Days')}
                                                style={{
                                                    borderWidth: 1, paddingLeft: 15, paddingRight: 15,
                                                    padding: 2, borderRadius: 15, borderColor: '#5E92F8',
                                                    backgroundColor: '#5E92F8'
                                                }}
                                            >
                                                <Text style={{ color: '#fff', fontSize: 10 }} >7 Days</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={{ marginLeft: '2%' }}>
                                            <TouchableOpacity
                                                onPress={() => callActionFunction('7 Days')}
                                                style={{ borderWidth: 1, paddingLeft: 15, paddingRight: 15, padding: 2, borderRadius: 15, borderColor: '#5E92F8' }}
                                            >
                                                <Text style={{ color: '#5E92F8', fontSize: 10 }}>7 Days</Text>
                                            </TouchableOpacity>
                                        </View>
                                }
                                {
                                    callAction == "15 Days" ?
                                        <View style={{ marginLeft: '2%' }}>
                                            <TouchableOpacity
                                                onPress={() => callActionFunction('15 Days')}
                                                style={{
                                                    borderWidth: 1, paddingLeft: 15, paddingRight: 15,
                                                    padding: 2, borderRadius: 15, borderColor: '#5E92F8',
                                                    backgroundColor: '#5E92F8'
                                                }}
                                            >
                                                <Text style={{ fontSize: 10, color: '#fff' }} >15 Days</Text>
                                            </TouchableOpacity>
                                        </View> :
                                        <View style={{ marginLeft: '2%' }}>
                                            <TouchableOpacity
                                                onPress={() => callActionFunction('15 Days')}
                                                style={{ borderWidth: 1, paddingLeft: 15, paddingRight: 15, padding: 2, borderRadius: 15, borderColor: '#5E92F8' }}
                                            >
                                                <Text style={{ color: '#5E92F8', fontSize: 10 }} >15 Days</Text>
                                            </TouchableOpacity>
                                        </View>
                                }

                                {
                                    callAction == "30 Days" ?
                                        <View style={{ marginLeft: '2%' }} >
                                            <TouchableOpacity
                                                onPress={() => callActionFunction('30 Days')}
                                                style={{
                                                    borderWidth: 1, paddingLeft: 15,
                                                    paddingRight: 15, padding: 2, borderRadius: 15, borderColor: '#5E92F8', backgroundColor: '#5E92F8'
                                                }}
                                            >
                                                <Text style={{ color: '#fff', fontSize: 10 }} >30 Days</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={{ marginLeft: '2%' }}>
                                            <TouchableOpacity
                                                onPress={() => callActionFunction('30 Days')}
                                                style={{ borderWidth: 1, paddingLeft: 15, paddingRight: 15, padding: 2, borderRadius: 15, borderColor: '#5E92F8' }}
                                            >
                                                <Text style={{ color: '#5E92F8', fontSize: 10 }} >30 Days</Text>
                                            </TouchableOpacity>
                                        </View>
                                }


                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {/* <View style={{ marginLeft: '-2%', marginBottom: '2%' }}> */}
                            <PieChart
                                widthAndHeight={widthAndHeight}
                                series={series}
                                sliceColor={sliceColor}
                                doughnut={true}
                                coverRadius={0.55}
                                coverFill={'#FFF'}
                            />
                            {/* </View> */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: '5%', margin: '4%' }}>
                                <View style={{ marginTop: '3%', marginLeft: '10%' }}>
                                    <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                        <View style={{
                                            backgroundColor: '#004586', height: 14, width: 14,
                                            borderRadius: 14 / 2, marginRight: '2%'
                                        }}>
                                        </View>
                                        <Text style={{ fontSize: 11, fontFamily: 'Roboto', color: '#111111' }}>Interested</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: '12%' }}>
                                        <View style={{
                                            backgroundColor: '#FFD320', height: 14,
                                            width: 14, borderRadius: 14 / 2, marginRight: '2%'
                                        }}>
                                        </View>
                                        <Text style={{ fontSize: 11, fontFamily: 'Roboto', color: '#111111' }} >Busy</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: '16%' }}>
                                        <View style={{
                                            backgroundColor: '#7E0021', height: 14, width: 14,
                                            borderRadius: 14 / 2, marginRight: '2%'
                                        }}>
                                        </View>
                                        <Text style={{ fontSize: 11, fontFamily: 'Roboto', color: '#111111' }} >Callback</Text>
                                    </View>

                                </View>
                                <View style={{ marginTop: '3%', marginRight: '-3%' }}>
                                    <View style={{ flexDirection: 'row', marginTop: '8%' }}>
                                        <View style={{
                                            backgroundColor: '#FF420E', height: 14,
                                            width: 14, borderRadius: 14 / 2, marginRight: '2%'
                                        }}>
                                        </View>
                                        <Text style={{ fontSize: 11, fontFamily: 'Roboto', color: '#111111' }} >Not Interested</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: '8%' }}>
                                        <View style={{
                                            backgroundColor: '#579D1C', height: 14,
                                            width: 14, borderRadius: 14 / 2, marginRight: '2%'
                                        }}>
                                        </View>
                                        <Text style={{ fontSize: 11, fontFamily: 'Roboto', color: '#111111' }} >Callback</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                        <View style={{
                                            backgroundColor: '#83CAFF', height: 14,
                                            width: 14, borderRadius: 14 / 2, marginRight: '2%'
                                        }}>
                                        </View>
                                        <Text style={{ fontSize: 11, fontFamily: 'Roboto', color: '#111111' }}>Wrong Number</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: '3%', margin: '2%', marginTop: '0%' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Report2")}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginLeft: '2.5%', marginRight: '2%', fontFamily: 'Roboto', color: '#0F0F0F', fontWeight: 'bold', fontSize: 14, }} >CALL STATUS</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    callStatus == "7 Days" ?
                                        <View style={{ marginLeft: '2%' }}>
                                            <TouchableOpacity
                                                onPress={() => callStatusFunction('7 Days')}
                                                style={{
                                                    borderWidth: 1, paddingLeft: 15, paddingRight: 15,
                                                    padding: 2, borderRadius: 15, borderColor: '#5E92F8',
                                                    backgroundColor: '#5E92F8'
                                                }}
                                            >
                                                <Text style={{ fontSize: 10, color: '#fff' }} >7 Days</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={{ marginLeft: '2%' }}>
                                            <TouchableOpacity
                                                onPress={() => callStatusFunction('7 Days')}
                                                style={{ borderWidth: 1, paddingLeft: 15, paddingRight: 15, padding: 2, borderRadius: 15, borderColor: '#5E92F8' }}
                                            >
                                                <Text style={{ color: '#5E92F8', fontSize: 10 }} >7 Days</Text>
                                            </TouchableOpacity>
                                        </View>
                                }
                                {
                                    callStatus == "15 Days" ?
                                        <View style={{ marginLeft: '2%' }}>
                                            <TouchableOpacity
                                                onPress={() => callStatusFunction('15 Days')}
                                                style={{
                                                    borderWidth: 1, paddingLeft: 15, paddingRight: 15,
                                                    padding: 2, borderRadius: 15, borderColor: '#5E92F8',
                                                    backgroundColor: '#5E92F8'
                                                }}
                                            >
                                                <Text style={{ fontSize: 10, color: '#fff' }} >15 Days</Text>
                                            </TouchableOpacity>
                                        </View> :
                                        <View style={{ marginLeft: '2%' }}>
                                            <TouchableOpacity
                                                onPress={() => callStatusFunction('15 Days')}
                                                style={{ borderWidth: 1, paddingLeft: 15, paddingRight: 15, padding: 2, borderRadius: 15, borderColor: '#5E92F8' }}
                                            >
                                                <Text style={{ color: '#5E92F8', fontSize: 10 }} >15 Days</Text>
                                            </TouchableOpacity>
                                        </View>
                                }

                                {
                                    callStatus == "30 Days" ?
                                        <View style={{ marginLeft: '2%' }}>
                                            <TouchableOpacity
                                                onPress={() => callStatusFunction('30 Days')}
                                                style={{
                                                    borderWidth: 1, paddingLeft: 15, paddingRight: 15,
                                                    padding: 2, borderRadius: 15, borderColor: '#5E92F8',
                                                    backgroundColor: '#5E92F8'
                                                }}
                                            >
                                                <Text style={{ fontSize: 10, color: '#fff' }} >30 Days</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={{ marginLeft: '2%' }}>
                                            <TouchableOpacity
                                                onPress={() => callStatusFunction('30 Days')}
                                                style={{ borderWidth: 1, paddingLeft: 15, paddingRight: 15, padding: 2, borderRadius: 15, borderColor: '#5E92F8' }}
                                            >
                                                <Text style={{ color: '#5E92F8', fontSize: 10 }} >30 Days</Text>
                                            </TouchableOpacity>
                                        </View>
                                }
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {/* <View style={{ marginLeft: '-2%', marginBottom: '2%' }}> */}
                            <PieChart
                                widthAndHeight={widthAndHeight2}
                                series={series2}
                                sliceColor={sliceColor2}
                                doughnut={true}
                                coverRadius={0.45}
                                coverFill={'#FFF'}
                            />
                            {/* </View> */}

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: '5%', margin: '4%' }}>
                                <View style={{ marginTop: '3%', marginLeft: '5%' }}>
                                    <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                        <View style={{
                                            backgroundColor: '#EDB019', height: 14, width: 14,
                                            borderRadius: 14 / 2, marginRight: '2%'
                                        }}>
                                        </View>
                                        <Text style={{ fontSize: 11, fontFamily: 'Roboto', color: '#111111' }}>In-Progress</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: '12%' }}>
                                        <View style={{
                                            backgroundColor: '#39A2D1', height: 14,
                                            width: 14, borderRadius: 14 / 2, marginRight: '2%'
                                        }}>
                                        </View>
                                        <Text style={{ fontSize: 11, fontFamily: 'Roboto', color: '#111111' }}>Successful</Text>
                                    </View>

                                </View>
                                <View style={{ marginTop: '3%', marginLeft: '-2.5%' }}>
                                    <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                        <View style={{
                                            backgroundColor: '#4DB866', height: 14,
                                            width: 14, borderRadius: 14 / 2,
                                            marginTop: '10%', marginRight: '2%'
                                        }}>
                                        </View>
                                        <Text style={{
                                            marginTop: '5%', marginLeft: '2%',
                                            fontSize: 11, fontFamily: 'Roboto',
                                            color: '#111111'
                                        }}>New</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: '12%' }}>
                                        <View style={{
                                            backgroundColor: '#F08A1E', height: 15,
                                            width: 15, borderRadius: 15 / 2, marginTop: '12%', marginRight: '2%'
                                        }}>
                                        </View>
                                        <Text style={{
                                            marginTop: '10%',
                                            fontSize: 11, fontFamily: 'Roboto', marginLeft: '2%', color: '#111111'
                                        }}>Fail</Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Card>

                <Card style={{ paddingBottom: '-3%', padding: '3%', margin: '2%', marginTop: '0%' }}>
                    {/* <TouchableOpacity> */}
                    {/* <View > */}
                    <Text style={{ fontWeight: 'bold', color: '#0F0F0F', fontSize: 14, fontFamily: 'Roboto' }} >CONTACT RATE PER WEEKDAY</Text>
                    {/* </View> */}
                    {/* <Text>In-Progress</Text> */}
                    <View style={{ marginLeft: '-10%', marginTop: '5%' }}>
                        <BarChart
                            style={graphStyle}
                            data={barData}
                            width={330}
                            height={160}

                            // yAxisLabel={'$'}
                            chartConfig={chartConfig}
                        />
                    </View>
                    {/* </TouchableOpacity> */}



                </Card>
            </ScrollView>
        </View>

    );
}