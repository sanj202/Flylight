
import { StyleSheet ,Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    inputFields: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        marginVertical: '1%',
    },
    icon: {
        height: height*3/100,
        width:  width*5.5/100,
        marginHorizontal:'2%',
        marginVertical:'3%'
    },
    dropdown3: {
        height: height*6.7/100,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 8,
        marginVertical: '1%',
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
        fontSize: 14,
        color: '#000000'
    },
    selectedTextStyle3: {
        fontSize: 14,
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









    headerView: {
        backgroundColor: '#3373F3',
        height: '10%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
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
        margin: "5%"
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