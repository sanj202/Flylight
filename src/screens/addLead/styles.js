
import { StyleSheet } from 'react-native';
import { transparent } from 'react-native-paper/lib/typescript/styles/colors';


const styles = StyleSheet.create({
    headerView: {
        backgroundColor: '#3373F3',
        height: '10%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    inputFields: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        marginTop: '3%',
    },
    icon: {
        height: 20,
        width: 18,
        marginRight: '2%',
        marginTop: '3%',
        marginLeft: '2%'
    },
    button: {
        backgroundColor: '#3373F3',
        borderRadius: 10,
        // alignSelf: 'center',
        marginTop: '3%',
    },
    textButton: {
        padding: 7,
        fontSize: 21,
        color: 'white',
        textAlign: 'center',
    },
    image2: {
        width: 28,
        height: 28
    },

    // ----------------------------------------------------------

    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22
        margin:"5%"
    },

    modalView: {
        margin: 20,
        
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button2: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginBottom: '4%'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: '#3373F3',
        borderRadius: 10,
        // alignSelf: 'center',
        margin: '5%',
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 25,
        paddingLeft: 15,
        paddingRight: 15
    },
    modalText: {
        marginBottom: 15,
        fontSize: 25,
        paddingLeft: 25,
        paddingRight: 25,
        textAlign: "center"
    },

    // ------------------------------

    container3: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown3: {
        height: 45,
        borderColor: '#000000',
        borderWidth: 1,
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
        color: '#000000'
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
});

export default styles