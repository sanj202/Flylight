

import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
    headerView:{
        backgroundColor: '#3373F3',
        height: '12%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      },
      image2:{
        width:35,
        height:35
      },
      title:{
          fontSize:16,
          color:'#111111',
          fontFamily:'Roboto',
          fontWeight:'bold',
      },
      inputFields: {
        flexDirection: 'row',
        borderWidth: 1,
        paddingLeft: 2,
        borderColor: '#C3C7E5',
        borderRadius: 10,
        marginTop: '2%',
      },
      container: {

      },

      container3: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown3: {
        height: 50,
        borderColor: '#C3C7E5',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 8,
    },
    icon3: {
        marginRight: 5,
    },
    label3: {
        // position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle3: {
        fontSize: 16,
        color: '#B9BAC8'
    },
    selectedTextStyle3: {
        fontSize: 16,
        color: '#B9BAC8'
    },
    iconStyle3: {
        width: 20,
        height: 20,
    },
    inputSearchStyle3: {
        height: 40,
        fontSize: 16,
    },
    modalText3: {
        marginBottom: 15,
        fontSize: 21,
        fontFamily: 'Roboto',
        color: '#000000',
        textAlign: "center"
    },
    textStyle3: {
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 21,
        paddingLeft: 15,
        paddingRight: 15
    },
   
})

export default styles