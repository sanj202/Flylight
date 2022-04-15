import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    image2: {
        width: 25,
        height: 25,
    },
    items: {
        // marginLeft: '5%',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#444444',
        paddingBottom: '8%',
        fontFamily: 'Roboto'
    },

    image3: {
        width: 7.11,
        height: 15,
        marginTop: '3%',
    },



    headerView: {
        flexDirection: 'row',
        height: "28%",
        // marginTop:'0%'
    },
    headerView2: {
        backgroundColor: 'red',
        backgroundColor: '#017EEB',
        paddingTop: '3%'
    },
    menus: {
        flexDirection: 'row',
        justifyContent:'space-between',
        borderBottomWidth: 1,
        borderColor: '#444444',
        paddingHorizontal:'3%',
        width:'65%',
        // backgroundColor:'red'
    },
    menusTop: {
        marginTop: '3%',
        padding: 5,
    },


});

export default styles;