
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFC'
    },
    listData1: {
        padding: 2,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000000',
        marginVertical: '3%',
    },
    listData: {
        padding: 2,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000000',
        marginHorizontal: '2%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonClose3: {
        backgroundColor: "#3373F3",
        borderRadius: 10,
        padding: 10,
        marginHorizontal: '15%',
        marginTop: '-9%'
    },
    textStyle3: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 16,
    },
    title: {
        marginLeft: '3%',
        fontSize: 19,
        fontWeight: 'bold',
        color: '#2D2D2D',
        padding: '2%'
    },
    headerTitleBtn:{
        flexDirection: 'row',
        marginHorizontal: '15%',
        marginTop: '-5%',
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'space-between',
    },
    headerBtn: {
        borderRadius: 20,
        paddingHorizontal: '10%'
    },
    listDataModal: {
        padding: 1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#DBDBDB',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalText3: {
        marginBottom: 15,
        fontSize: 16,
        color: '#000000',
        textAlign: "center",
        fontWeight: 'bold'
    },
    askModel: {
        marginHorizontal: '5%',
        marginTop: '80%',
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