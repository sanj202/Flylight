import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, ActivityIndicator,ToastAndroid,
  TextInput, Image, Alert, StatusBar, SafeAreaView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import styles from './styles';
import { useDispatch, useSelector, connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { authAction } from '../../redux/Actions/index'

export default function Login({ navigation, route, props }) {

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [checked, setChecked] = useState(false);
  const [IsLodding, setIsLodding] = useState(false)
  const [isSelection, setisSelection] = useState(false);
  const dispatch = useDispatch()
  const loginData = useSelector(state => state.auth.data)

  useEffect(() => {
    AsyncStorage.getItem('Email', (err, Email) => {
      if (Email !== null) { setEmail(Email) }
    })
    AsyncStorage.getItem('Password', (err, Password) => {
      if (Password !== null) { setPassword(Password) }
    })
  }, [])

  const login = () => {
    if (Email == "") {
      ToastAndroid.show('Enter Email/Mobile', ToastAndroid.SHORT);    
    }
    else if (Password == "") {
      ToastAndroid.show('Enter Password', ToastAndroid.SHORT);    
    }
    else {
      setIsLodding(true)
      dispatch(authAction.login(Email, Password));
    }
  }

  useEffect(() => {
    if (loginData) {
      if (loginData.status == "success") {
        setEmail("")
        setPassword("")
        // AsyncStorage.setItem('uid', loginData.data.uid)
        // AsyncStorage.setItem('cProfile', loginData.data.cProfile.toString())
        // AsyncStorage.setItem('org_uid', loginData.data.org_uid)
        // AsyncStorage.setItem('token', loginData.data.token)
        // AsyncStorage.setItem('user_id', loginData.data.user.id.toString())
        // AsyncStorage.setItem('org_id', loginData.data.user.org_id.toString())

        setIsLodding(false)
        if (loginData.data.token) {
          navigation.navigate("MainStack")
        }
        else {
          console.log('something wrong')
        }
        // dispatch(authAction.clearResponse())
        // navigation.navigate("MainStack")
        // dispatch(authAction.clearResponse())
      }
      else if (loginData.status == "failed") {
        setIsLodding(false)
        dispatch(authAction.clearResponse())
        ToastAndroid.show(loginData.message, ToastAndroid.SHORT);                                                                               //otherwise alert show 
      }
      else {
        setIsLodding(false) 
      }
    }
  }, [loginData])

  const storeData = async (Email, Password) => {
    try {
      await AsyncStorage.setItem('Email', Email)
      await AsyncStorage.setItem('Password', Password)
    } catch (e) {
      // saving error
    }
  }

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('Email')
      await AsyncStorage.removeItem('Password')
    } catch (e) {
      // remove error
    }
    console.log('Done.')
  }

  checkedFuction = () => {
    if (checked == false) {
      storeData(Email, Password)
    }
    else {
      removeValue(Email, Password)
    }
    setChecked(!checked)
  }

  return (
    //     <SafeAreaView style={styles.container} >

    //  <StatusBar>
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
      {/* <SafeAreaView> */}
      <LinearGradient
        colors={['#2B6EF2', '#8DB3FF', '#8DB3FF']}

        style={{
          // flex: 1,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: "42%",
          width: "100%",
        }}
      >
        <View
          style={{
            margin: 20,
          }}
        >
          <Image
            style={styles.image}
            source={require('../../images/Splash.png')}
          />
        </View>
      </LinearGradient>
      <View
        style={styles.boxView}>
        <Text style={styles.title}>Welcome Back !</Text>
        <Text style={{ margin: '3%', marginBottom: '-1%', color: '#2F394E', fontFamily: 'Roboto', marginTop: '-2%', fontSize: 15 }}>Mobile number /Email </Text>

        <View style={styles.inputFields2}>
          <Image
            style={Platform.OS == 'ios' ? [styles.icon, {
              height: 17, width: 21, margin: '3%', marginLeft: '2%'
            }]
              :
              [styles.icon, {
                height: 17, width: 21, marginTop: '7%', margin: '3%', marginLeft: '2%'
              }]}
            source={require('../../images/mail.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            value={Email}
            onChangeText={e => setEmail(e)}
            placeholder="example@gmail.com"
          />
        </View>

        <Text style={{ marginLeft: '3%', fontFamily: 'Roboto', marginRight: '5%', color: '#2F394E', marginBottom: '-1%', fontSize: 15 }}>Password</Text>

        <View style={styles.inputFields2}>
          <Image
            style={Platform.OS == 'ios' ?
              [styles.icon, { height: 19.20, width: 17.80, margin: '3%' }]
              :
              [styles.icon, { height: 19.20, width: 17.80, margin: '3%', marginTop: '5%', }]
            }
            source={require('../../images/icon-password.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            value={Password}
            onChangeText={e1 => setPassword(e1)}
            placeholder="Password"
            // autoFocus={true}
            secureTextEntry={!isSelection}
          // keyboardShouldPersistTaps='handled'
          />
          <TouchableOpacity
            style={{ margin: '3%', marginRight: '0%' }}
            onPress={() => setisSelection(!isSelection)}
          >
            <Image
              style={
                Platform.OS == 'ios' ? [styles.icon, {
                  height: 18, width: 20,
                  marginTop: '5.5%', marginRight: '5%'
                }]
                  :
                  [styles.icon, {
                    height: 18, width: 20,
                    marginTop: '25%', marginRight: '5%'
                  }]}
              source={require('../../images/private.png')}
            />
          </TouchableOpacity>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>

          <View style={{ marginLeft: '3%', flexDirection: 'row' }}>
            <View style={{ marginTop: '-4%' }}>
              <BouncyCheckbox
                size={16}
                fillColor="#00BE7E"
                unfillColor="#00BE7E"
                bounceEffect={1}
                isChecked={checked}
                // text="Remember me"
                iconStyle={{ borderColor: "#fff" }}
                // textStyle={{ fontFamily: "JosefinSans-Regular" }}
                onPress={() => checkedFuction()}
              />
            </View>
            <Text style={{ fontSize: 12, marginLeft: '-10%', fontFamily: 'Roboto', color: '#6B7285' }}>Remember me</Text>
          </View>
          {IsLodding == true ?
            <ActivityIndicator size="small" color="#0000ff" />
            :
            <View />
          }
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={{ color: '#FB4B0D', fontSize: 12, marginRight: '5%', fontFamily: 'Roboto' }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => login()}>
          <Text style={styles.textButton}>Sign In </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('register')}>
          <Text style={styles.textButton}>To Sign Up Press Here</Text>
        </TouchableOpacity>
      </View>

      {/* </SafeAreaView> */}
    </View>
  );
}


