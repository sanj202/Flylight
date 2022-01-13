
import React, { useState, useEffect, useDebugValue } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, TextInput, Alert, Image, StatusBar, } from 'react-native';
import { useDispatch, useSelector, connect } from 'react-redux';
import { varificationAction, resendOtpAction } from '../../redux/Actions/index'
// import OtpInputs from 'react-native-otp-inputs';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

export default function Varification({ navigation, route }) {
  // console.log("previes screen ....................", route.params.uid)
  const [state, setstate] = useState(route.params ? route.params.uid : '')
  const [IsLodding, setIsLodding] = useState(false)
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const dispatch = useDispatch()
  const otpData = useSelector(state => state.varify.otp)
  const resendOtpData = useSelector(state => state.resendOTP.otpResend)

  // console.log("otpData......../..........................", otpData, resendOtpData)

  useEffect(() => {
    if (otpData) {
      if (otpData.status == "success") {
        // console.log('sucess..............', otpData)
        setValue('')
        Alert.alert(otpData.message)
        // navigation.navigate("MainStack", {
        //   uid: route.params.uid
        // })
        setIsLodding(false)
        navigation.navigate("Login")
      }
      else if (otpData.status == "failed") {
        // console.log('sucess...........false...')
        setIsLodding(false)
        Alert.alert(otpData.message)                                                                                //otherwise alert show 
      }
    }
    else {
    }
    // }
  }, [otpData])


  useEffect(() => {
    if (resendOtpData) {
      if (resendOtpData.status == "success") {
        // console.log('sucess..............', otpData)
        setIsLodding(false)
        Alert.alert(resendOtpData.message)
      }
      else if (resendOtpData.status == "failed") {
        // console.log('sucess...........false...')
        setIsLodding(false)
        Alert.alert(resendOtpData.message)                                                                                //otherwise alert show 
      }
    }
    else {
      // setLoading(false);
    }
    // }
  }, [resendOtpData])

  const login = () => {
    if (value == "") {
      Alert.alert("Enter OTP")
    }
    else {
      setIsLodding(true)
      dispatch(varificationAction.varification(value, state));
      // navigation.navigate("Varification")
      // navigation.navigate('DashBoard');
    }
  }

  const resend = () => {
    setIsLodding(true)
    dispatch(resendOtpAction.resend(state));
  }

  useEffect(() => {
    ref.current.focus();
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
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={{ marginTop: '-5%', color: '#131313', fontFamily: 'Roboto', textAlign: 'center', fontSize: 14 }}>
          Please enter the OTP sent {'\n'} on your Email Id
        </Text>
        <Text style={{ margin: '5%', fontSize: 16, fontFamily: 'Roboto', color: '#000000' }}>Verification Code</Text>

        <View style={{ marginLeft: '5%', marginRight: '7%' }}>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoFocus={true}
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: '5%', marginBottom: '0%' }}>
          <Text style={{ fontSize: 12, fontFamily: 'Roboto', color: '#000000' }}>Don't Received OTP?</Text>
          <TouchableOpacity
            onPress={() => resend()}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={require('../../images/refresh.png')}
                style={{ height: 20, width: 20, marginRight: '2%' }}
              />
              <Text style={{ color: '#1E32FA', fontSize: 12, }}>SEND AGAIN</Text>
            </View>
          </TouchableOpacity>
        </View>

        {IsLodding == true ?
          <ActivityIndicator size="small" color="#0000ff" />
          :
          <View />
        }

        <TouchableOpacity style={styles.button} onPress={() => login()}>
          <Text style={styles.textButton}>Verify & Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


