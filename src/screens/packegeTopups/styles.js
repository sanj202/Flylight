

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFC'
    },
    headerBtn: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 7
        // width: '30%',
        // paddding: 5,
    },
    serviceItems: {
        textAlign: 'center',
        fontSize: 18,
        color: '#111211',
        fontWeight: 'bold',
    },
    headerTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '20%',
        marginTop: '-5%',
        backgroundColor: '#fff',
        // height: 35,
        borderRadius: 20,
    }

});

export default styles