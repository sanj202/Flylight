import React, { useState, useEffect } from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';

export default function CustomTab() {
    return (
        <View style={{ flexDirection: 'row', paddingVertical: '2%', justifyContent: 'space-evenly', backgroundColor: "#2296E4" }}>
            <TouchableOpacity>
                <View>
                    <Image
                        style={{ width: 22, height: 24, marginTop: '7%', }}
                        source={require('../images/homeTab.png')}
                    />
                    <Text style={{ color: '#fff' }}>Home</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View>
                    <Image
                        style={{ width: 23, height: 23, marginTop: '5%', }}
                        source={require('../images/report.png')}
                    />
                    <Text style={{ color: '#fff' }}>Report</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View>
                    <Image style={{ width: 30, height: 30}}
                        source={require('../images/Add.png')}
                    />
                    <Text style={{ color: '#fff' }}>AddTab</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View>
                    <Image style={{ width: 30, height: 11, marginTop: '7%', alignItems: 'center', }}
                        source={require('../images/callTab.png')}
                    />
                    <Text style={{ color: '#fff' }}>ContactList</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View>
                    <Image style={{ width: 21, height: 22, marginTop: '6%' }}
                        source={require('../images/profile.png')}
                    />
                    <Text style={{ color: '#fff' }}>Profile</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};



