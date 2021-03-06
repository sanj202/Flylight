

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
        borderColor: '#000000',
        flexDirection: 'row',
        marginHorizontal: '3%',
        marginVertical: '1%'
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
        flex: 1,
        // justifyContent: 'flex-start',
        padding: 15,
        paddingLeft: 10,
        paddingRight: 30,
        borderRadius: 15,
    },

    //    --------------------------------------------------------------------------------------------


    modalView: {
        // margin: 20,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // padding: 15,
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
        backgroundColor: '#114DC4',
        borderRadius: 10,
        // alignSelf: 'center',
        margin: '2%',
    },
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
        borderColor: '#000000',
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


    container3: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown3: {
        height: 50,
        marginHorizontal: '3%',
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
        marginHorizontal: '2%',
        marginTop: '40%',
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
        paddingVertical: '3%'
    },
    askSubtitle: {
        fontSize: 15,
        color: 'red',
        textAlign: "center"
    },
    askBtn: {
        borderRadius: 10,
        backgroundColor: "#2196F3",
    },
    askBtnText: {
        margin: '5%',
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    },
    askTitleR: {
        margin: '5%',
        marginRight: '3%',
        marginTop: '-11.5%',
        alignSelf: 'flex-end',
        padding: 10
    },
    DetailCampTitle: {
        fontSize: 14,
        color: '#0F0F0F',
        fontFamily: 'Roboto'
    },

    askTitleDetailR: {
        marginTop: '-8%',
        alignSelf: 'flex-end',
        paddingVertical: '3%',
        paddingLeft: '15%',
        paddingRight:'2%'
    },
    askTitleDetail: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#46484B',
        // paddingVertical: '3%'
    },
});

export default styles