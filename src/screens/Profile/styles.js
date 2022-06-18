import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    height: height * 18 / 100
  },
  headerTouchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '3%',
    alignItems: 'center'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto',
    marginLeft: '10%'
  },
  headerBtn: {
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    borderRadius: 15
  },
  headerBtntext: {
    fontSize: 12,
    color: '#fff'
  },
  avtarStyle: {
    backgroundColor: '#FFF',
    width: 104,
    height: 104,
    borderRadius: 52,
    alignSelf: 'center',
    marginTop: '-5%'
  },
  inputFields: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: '3%'
  },
  textValues: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Roboto',
    flex: 1
  },
  icon: {
    height: height * 2.6 / 100,
    width: width * 4.8 / 100,
    marginHorizontal: '2%'
  },
  fieldsLable: {
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: 13,
    marginLeft: '1%'
  },
  button: {
    backgroundColor: '#3373F3',
    borderRadius: 10,
    marginVertical: '3%',
    marginHorizontal: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '2%'
  },
  textButton: {
    fontSize: 21,
    color: '#FFFFFF',
  },
  profileName: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: '#000000'
  },
});

export default styles