
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFC'
    },
    listData1: {
        padding: 5,
        paddingTop: 1,
        paddingBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#DBDBDB',
        margin: '1%',
        marginTop: '-0.5%',
    },
    listData: {
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#DBDBDB',
        margin: '1%',
        marginTop: '-0.5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listDataModal: {
        padding: 1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#DBDBDB',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    inputFields2: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: 3,
        borderColor: '#C3C7E5',
        borderRadius: 10,
        // margin: '3%',
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
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 15
    },

    //  -------------------------------------------------------

    centeredView3: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      
    },
    modalView3: {
        margin: 20,
        backgroundColor: "white",
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
        padding: 5,
        paddingRight: 10,
        paddingLeft: 10,
        elevation: 2
    },
    buttonClose2: {
        backgroundColor: "#3373F3",
        borderRadius: 10,
        // alignSelf: 'center',
        marginLeft: '30%',
        marginRight: '30%',
        marginTop: '0%'
        // backgroundColor: "#2196F3",
    },
    buttonClose2Modal: {
        backgroundColor: "#3373F3",
        borderRadius: 10,
        // alignSelf: 'center',
        marginLeft: '30%',
        marginRight: '30%',
        marginTop: '5%',
        padding:9
        // backgroundColor: "#2196F3",
    },
    textStyle2: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 25,
        padding: 5,
        paddingRight: 25,
        paddingLeft: 25
    },

    buttonClose3: {
        backgroundColor: "#3373F3",
        borderRadius: 10,
        padding: 10,
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: '-9%'
    },
    textStyle3: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 16,
    },
    modalText3: {
        marginBottom: 15,
        fontSize: 16,
        color: '#000000',
        textAlign: "center",
        fontWeight:'bold'
    },
    modalText3Modal: {
        marginBottom: 15,
        fontSize: 21,
        color: '#000000',
        textAlign: "center"
    }
});

export default styles