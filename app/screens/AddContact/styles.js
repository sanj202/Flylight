
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  headerView: {
    backgroundColor: '#3373F3',
    height: '10%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  inputFields: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#000000',
    borderRadius: 10,
    marginTop: '3%',
    height: 45
  },
  icon: {
    height: 20,
    width: 18,
    marginRight: '2%',
    marginTop: '3%',
    marginLeft: '2%'
  },
  button: {
    backgroundColor: '#3373F3',
    borderRadius: 10,
    // alignSelf: 'center',
    margin: '5%',
  },
  textButton: {
    padding: 10,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  image2: {
    width: 28,
    height: 28
  },

  // ---------------------------------------------

  headerView2: {
    marginTop: '45%',
    margin: '7%',
    // height: '40%',
    borderRadius: 10,
    // backgroundColor:'#fff'
  },
  headerView3: {
    paddingTop: '2%',

  },
  title3: {
    textAlign: 'center',
    fontSize: 21,
    marginTop: '3%',
    fontWeight: 'bold',
    color: '#000000'
  },
  btn3: {
    marginTop: '5%',
    padding: 12,
    // paddingTop:15,
    // paddingBottom:15,
    borderRadius: 20,
    width: '40%',
    backgroundColor: '#3373F3',
  },
  btnText3: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  container3: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown3: {
    height: 45,
    borderColor: '#000000',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  icon3: {
    marginRight: 5,
  },
  label3: {
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle3: {
    fontSize: 13,
    color: '#B9BAC8',
    fontFamily: 'Roboto'
  },
  selectedTextStyle3: {
    fontSize: 13,
    color: '#000000',
    fontFamily: 'Roboto'
  },
  iconStyle3: {
    width: 20,
    height: 20,
  },
  inputSearchStyle3: {
    height: 40,
    fontSize: 16,
  },
});

export default styles