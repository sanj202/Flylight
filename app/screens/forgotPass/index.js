import React, { useState, useEffect, useRef } from 'react';
import {Text,View,StyleSheet,TouchableOpacity,TextInput,Image,Alert,StatusBar,
ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector, connect } from 'react-redux';
import { forgotPassAction } from '../../redux/Actions/index'

export default function ForgotPassword({ navigation }) {

  const [state, setstate] = useState("")
  const [IsLodding, setIslogin] = useState(false)
  const dispatch = useDispatch()
  const getData = useSelector(state => state.forgotPass.data)

  useEffect(() => {
    if (getData) {
      if (getData.status == "success") {
        // console.log('sucess..............',)
        Alert.alert(getData.message)
        setstate("")
        setIslogin(false)
        navigation.navigate("F_Varification", { email: getData.data.email})
      }
      else if (getData.status == 'warning') {
        // console.log('sucess...........warning...')
        Alert.alert(getData.message)
        setstate("")
        setIslogin(false)
        navigation.navigate("F_Varification", {email: getData.data.email})                                                                                                           //otherwise alert show 
      }
      else if (getData.status == "fail") {
        // console.log('sucess...........fail...')
        setIslogin(false)
        Alert.alert(getData.message)                                                                                //otherwise alert show 

      }
      else if (getData.status == "failed") {
        // console.log('sucess...........failed...')
        setIslogin(false)
        Alert.alert(getData.message)                                                                                //otherwise alert show 

      }
    }
    else {
      // setLoading(false);
    }

  }, [getData])



  const login = () => {

    if (state == "") {
      Alert.alert(" Enter Email/Mobile ")
    }
    else {
      setIslogin(true)
      dispatch(forgotPassAction.forgotPassword(state));

      // navigation.navigate("F_Varification")
    }
  }

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [])


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

      <LinearGradient
        colors={['#2B6EF2', '#8DB3FF', '#8DB3FF']}

        style={{
          // flex: 1,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: "35%",
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
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={{ marginLeft: '5%', fontSize: 15, color: '#1E263C', fontFamily: 'Roboto', }}>Mobile number /Email</Text>

        <View style={styles.inputFields}>
          <Image
            style={[styles.icon, { height: 28, width: 17 }]}
            source={require('../../images/mobile.png')}
          />
          <TextInput
            style={{ flex: 1 }}
            // keyboardType='decimal-pad'
            ref={inputRef}
            autoFocus={true}
            placeholder="email@gmail.com"
            value={state}
            onChangeText={e => setstate(e)}
          />
        </View>
        {IsLodding == true ?
          <ActivityIndicator size="small" color="#0000ff" />
          :
          <View />
        }
        <TouchableOpacity style={styles.button} onPress={() => login()}>
          <Text style={styles.textButton}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


