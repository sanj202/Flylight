
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
    borderWidth: 1,
    padding: 3,
    borderColor: '#C3C7E5',
    borderRadius: 10,
    marginTop: '2%',
  },
  pickers: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor:'#E8EAF5',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15
  },

  icon: {
    height: 24,
    width: 22,
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
    width: 35,
    height: 35
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
    paddingTop: '3%',

  },
  title3: {
    textAlign: 'center',
    fontSize: 28,
    marginTop: '3%',
    fontWeight: 'bold',
  },
  btn3: {
    marginTop: '10%',
    padding: 10,
    borderRadius: 20,
    width: '40%',
  },
  btnText3: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // -------------------------------------------------------------------

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
  actionSheet: {
    marginTop: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    borderColor:'#E8EAF5'
  }

});

export default styles