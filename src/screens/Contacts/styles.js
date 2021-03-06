import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        backgroundColor: 'red',
        flexDirection: 'row',
    },
    itemStyle: {
        padding: 10,
    },
    addNewBtn: {
        borderColor: '#fff',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#2296E4',
        borderRadius: 10,
        alignSelf: 'flex-end',
        marginTop:'1%',
        marginRight: '3%'
        // marginBottom: '2%',
        // marginTop: '-2%',
       
    },


    inputFields2: {
        flexDirection: 'row',
        borderWidth: 1,
        padding:'1%',
        borderColor: '#000000',
        borderRadius: 10,
        // margin: '3%',
        marginHorizontal:'3%',
        marginTop: '-6%',
        backgroundColor: '#FFFFFF'
    },
    image2: {
        width: 28,
        height: 28
    },
    headerView: {
        backgroundColor: '#3373F3',
        height: '18%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    listData: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#DBDBDB',
        margin: '3%',
        marginTop: '-1.5%',
        backgroundColor: '#FFFFFF',
    },
    // ---------------------------------------------------------


    headerView2: {
        // marginTop: '155%',
        // flexGrow: 1,
        // backgroundColor: 'transparent',
        // borderRadius: 10,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        backgroundColor: '#fff',
        padding: 10

    },

    title3: {
        fontSize: 16,
        color: '#000000',
        paddingLeft: '2%',
        // fontWeight: 'bold',
    },

    centeredViewM: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },
    modalViewM: {
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },


    headerViewM: {
        // marginTop: '45%',
        // margin: '7%',
        // height: '35%',
        // borderRadius: 10
    },
    headerView2M: {
        // paddingTop: '3%'
    },
    titleM: {
        textAlign: 'center',
        fontSize: 21,
        fontWeight: 'bold',
        color: '#000000'
    },
    btnM: {
        marginTop: '10%',
        padding: 10,
        // paddingTop:15,
        // paddingBottom:15,
        borderRadius: 20,
        width: '40%',
    },
    btnTextM: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    headerViewA: {
        marginTop: '45%',
        margin: '7%',
        borderRadius: 18,
        paddingBottom: 30,

        // borderColor:'#707070',
        // borderWidth:0.1
    },
    titleA: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#000000'
    },
    btnA: {
        marginTop: '10%',
        padding: 10,
        borderRadius: 20,
    },
    btnTextA: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: '8%',
        color: '#0F0F0F',
        marginLeft: '5%'
    },
    listDataA: {
        padding: 5,

        borderBottomWidth: 1,
        borderRadius: 10,
        borderColor: '#DBDBDB',
        margin: '3%',
        marginTop: '-5%',
        flexDirection: 'row',
    },
    headerView2A: {
        paddingTop: '3%'
    },
    titleImgA: {
        height: 48,
        width: 48,
        marginTop: '2%',
        marginBottom: '2%'
    },
    navigateImgA: {
        height: 21,
        width: 21,
        marginTop: '8%',
        marginRight: '2%',
        marginLeft: '10%'
    }

});


export default styles