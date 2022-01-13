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
    ScrollView,
    SafeAreaView
} from 'react-native';

import styles from './styles'
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

export default function Header(props) {


    // console.log("header page.........................", props)


    const {
        title,
        style,
        onPressLeft,
        onPressRight,
        renderLeft,
        renderRight
    } = props;


    return (


        <LinearGradient
            colors={['#2B6EF2', '#8DB3FF',]}

            style={[styles.contain, style]}
        >
            
            <SafeAreaView
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: '5%',
                }}>
             
                <TouchableOpacity
                    onPress={onPressLeft}
                >
                    <Image
                        style={styles.image2}
                        source={require('../../images/home.png')}
                    />
                </TouchableOpacity>
               
                <Text style={{
                    color: 'white', fontSize: 16,
                    fontFamily: 'Roboto',
                     textAlign: 'center',justifyContent:'center'
                }}> {title}</Text>
               
                <TouchableOpacity
                    onPress={onPressRight}
                >
                    <Image
                        style={styles.image2}
                        source={require('../../images/Notifications.png')}
                    />
                </TouchableOpacity>
                
                </SafeAreaView>
            
        </LinearGradient>


        // <View
        //     style={styles.headerView}>
        //     <View
        //         style={{
        //             flexDirection: 'row',
        //             justifyContent: 'space-between',
        //             margin: '5%',
        //         }}>
        //         <TouchableOpacity
        //             onPress={onPressLeft}
        //         >
        //             <Image
        //                 style={styles.image2}
        //                 source={require('../../images/home.png')}
        //             />
        //         </TouchableOpacity>
        //         <Text style={{
        //             color: 'white', fontSize: 16,
        //             fontFamily: 'Roboto'
        //         }}>
        //             {title}
        //         </Text>
        //         <TouchableOpacity
        //             onPress={onPressRight}
        //         >
        //             <Image
        //                 style={styles.image2}
        //                 source={require('../../images/Notifications.png')}
        //             />
        //         </TouchableOpacity>
        //     </View>
        // </View>

    );
}



