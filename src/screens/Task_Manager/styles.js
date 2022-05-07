

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    listData: {padding: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000000',
        marginVertical: '0.5%',
        marginHorizontal: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerBtn: {
        borderRadius: 20,
        width: '30%',
        paddding: 10,
    },
    modalView: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
        marginVertical: '2%',
    },
    icon: {
        height: 21,
        width: 19,
        margin: '2%',
        marginTop: '3%'
    },
    pickers: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#000000',
        padding: 10,
        paddingHorizontal: '7%',
        borderRadius: 10
    },
    dropdown3: {
        height: 42,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 8,
        width: '50%',
        // marginRight: '3%',
        paddingHorizontal: 8,
    },
    placeholderStyle3: {
        fontSize: 16,
    },
    selectedTextStyle3: {
        fontSize: 16,
        color: '#000000'
    },
    updateBtn: {
        backgroundColor: '#114DC4',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: '20%',
        marginVertical: '3%'
    },
    textStyle: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15,
        paddingLeft: 20,
        paddingRight: 20
    },
    centeredView3: {
        flex: 1,
        justifyContent: "center"
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
    modalText3: {
        marginBottom: 15,
        fontSize: 21,
        fontFamily: 'Roboto',
        color: '#000000',
        textAlign: "center"
    },
    button3: {
        borderRadius: 5,
        padding: 10,
        paddingRight: 20,
        paddingLeft: 20,
        elevation: 2
    },
    buttonClose3: {
        backgroundColor: '#3373F3',
        borderRadius: 10,
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
    },
    askTitleR: {
        margin: '5%',
        marginRight: '3%',
        marginTop: '-11.5%',
        alignSelf: 'flex-end',
        padding: 10
    },
    askTitleEdit: {
        alignSelf: 'flex-end',
        paddingVertical: '3%',
        paddingLeft: '15%',
        paddingRight:'2%'
    },
    modalTextLL: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#46484B',
        textAlignVertical:'center'
    },
});

export default styles