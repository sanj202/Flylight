

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFC'
    },
    listData: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#DBDBDB',
        margin: '3%',
        marginTop: '-0.5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerView: {
        backgroundColor: '#3373F3',
        height: '15%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    reView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '-13%',
        margin: '5%',
    },
    cardBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
    },
    cardBox2: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3373F3',
    },
    counter: {
        textAlign: 'center',
        fontSize: 30,
        color: '#3072F2',
        fontWeight: 'bold',
    },
    counter2: {
        textAlign: 'center',
        paddingRight: 30,
        fontSize: 30,
        color: '#FE2EA4',
        fontWeight: 'bold',
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 150,
        marginTop: '2%',
        backgroundColor: 'red'
    },
    image2: {
        width: 28,
        height: 28
    },
    opportunityText: {
        padding: 5,
        textAlign: 'center',
        marginLeft: '5%',
        marginTop: '2%',
        borderRadius: 10
    },
    pickers: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#E8EAF5',
        padding: 10,
        paddingHorizontal: '7%',
        borderRadius: 10
    },
    dropdown3: {
        height: 42,
        borderColor: '#E8EAF5',
        borderWidth: 1,
        borderRadius: 8,
        width: '50%',
        marginRight: '3%',
        paddingHorizontal: 8,
    },
    icon3: {
        marginRight: 5,
    },

    placeholderStyle3: {
        fontSize: 16,
    },
    selectedTextStyle3: {
        fontSize: 16,
    },
    iconStyle3: {
        width: 20,
        height: 20,
    },
    inputSearchStyle3: {
        height: 40,
        fontSize: 16,
    },

    headerBtn: {
        borderRadius: 20,
        paddingHorizontal:10,
        paddingVertical:7
        // width: '30%',
        // paddding: 5,
    },

    //    --------------------------------------------------------------------------------------------
    modalView: {
        // margin: 20,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // padding: 15,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    updateBtn:{
        backgroundColor: '#114DC4',
        borderRadius: 10,
        padding: 10,
        marginHorizontal:'20%',
        marginVertical:'3%'
    },
    // button2: {
    //     borderRadius: 5,
    //     padding: 10,
    //     elevation: 2,
    //     marginBottom: '4%'
    // },
    
    // buttonClose: {
    //     backgroundColor: '#114DC4',
    //     borderRadius: 10,
    //     // alignSelf: 'center',
    //     margin: '2%',
    // },
    textStyle: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15,
        paddingLeft: 20,
        paddingRight: 20
    },
    modalText: {
        margin: 5,
        fontSize: 16,
        color: '#000000',
        paddingTop: '3%',
        textAlign: "center",

    },

    inputFields: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E8EAF5',
        borderRadius: 10,
        margin: '3%',

    },
    icon: {
        height: 21,
        width: 19,
        margin: '2%',
        marginTop: '3%'
    },

    // --------------------------------------------------

    centeredView3: {
        flex: 1,

        justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22

    },
    modalView3: {
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
    button3: {
        borderRadius: 5,
        padding: 10,
        paddingRight: 20,
        paddingLeft: 20,
        elevation: 2
    },
    buttonOpen3: {
        backgroundColor: "#F194FF",
    },
    buttonClose3: {
        backgroundColor: '#3373F3',
        borderRadius: 10,
        // alignSelf: 'center',
        margin: '5%',
        backgroundColor: "#2196F3",
    },
    textStyle3: {
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 21,
        paddingLeft: 15,
        paddingRight: 15
    },
    modalText3: {
        marginBottom: 15,
        fontSize: 21,
        fontFamily: 'Roboto',
        color: '#000000',
        textAlign: "center"
    },
    askModel: {
        marginHorizontal: '5%',
        marginTop: '50%',
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    askTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#3373F3',
        color: 'white',
        textAlign: "center",
        paddingVertical: '3%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    askSubtitle: {
        margin: '5%',
        fontSize: 21,
        color: '#000000',
        textAlign: "center"
    },
    askBtn: {
        paddingVertical: '2%',
        borderRadius: 10,
        backgroundColor: "#2196F3",
    },
    askBtnText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    }
});

export default styles