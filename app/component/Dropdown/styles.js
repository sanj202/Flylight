
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    headerView: {
        backgroundColor: '#3373F3',
        height: '15%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    image2: {
        height: 35,
        width: 35
    },

    // ----------------------------------------------------------------------------

    container3: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown3: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
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
    button: {
        backgroundColor: '#3373F3',
        borderRadius: 15,
        // alignSelf: 'center',
        margin: '5%',
        marginTop: '0%',
        marginBottom: '1%'
    },
    textButton: {
        padding: 10,
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    },
});

export default styles