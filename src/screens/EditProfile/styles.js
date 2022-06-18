import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    fieldsLable: {
        color: '#2F394E',
        fontFamily: 'Roboto',
        fontSize: 13,
        marginLeft: '1%'
    },
    inputFields2: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        alignItems: 'center',
    },
    icon: {
        height: height * 2.6 / 100,
        width: width * 4.8 / 100,
        marginLeft: '2%',
    },
    button: {
        backgroundColor: '#3373F3',
        borderRadius: 15,
        marginHorizontal: '10%',
        marginVertical: '3%',
        paddingVertical: '3%'
    },
    textButton: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
    },
});

export default styles;