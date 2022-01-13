
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC'
  },
  listData: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DBDBDB',
    margin: '3%',
    // marginTop: '-0.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerView: {
    backgroundColor: '#3373F3',
    height: '10%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  reView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '-13%',
    margin: '5%',
  },
  cardBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
  },
  cardBox2: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3373F3',
  },
  counter: {
    textAlign: 'center',
    fontSize: 30,
    color: '#3072F2',
    fontWeight: 'bold',
  },
  counter2: {
    textAlign: 'center',
    paddingRight: 30,
    fontSize: 30,
    color: '#FE2EA4',
    fontWeight: 'bold',
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 150,
    marginTop: '2%',
    backgroundColor: 'red'
  },
  image2: {
    width: 28,
    height: 28
  },
  opportunityText: {
    padding: 5,
    textAlign: 'center',
    marginLeft: '5%',
    marginTop: '2%',
    borderRadius: 10
  },
  pickers: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor:'#E8EAF5',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 50,
    borderRadius: 10
  },

  //  -------------------------------------------------------

  centeredView3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView3: {
    margin: 20,
    backgroundColor: "white",
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
  button3: {
    borderRadius: 5,
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    elevation: 2
  },
  buttonOpen3: {
    backgroundColor: "#F194FF",
  },
  buttonClose3: {
    backgroundColor: '#3373F3',
    borderRadius: 10,
    // alignSelf: 'center',
    margin: '5%',
    backgroundColor: "#2196F3",
  },
  textStyle3: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    paddingLeft: 15,
    paddingRight: 15
  },
  modalText3: {
    marginBottom: 15,
    fontSize: 25,
    paddingLeft: 25,
    paddingRight: 25,
    textAlign: "center"
  },
  button: {
    backgroundColor: '#3373F3',
    borderRadius: 10,
    // alignSelf: 'center',
    marginLeft:'3%',
    marginRight:'3%'
  },
  textButton: {
    padding: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18
  },

  inputFields: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#C3C7E5',
    borderRadius: 10,
  },
  icon: {
    height: 24,
    width: 22,
    marginRight: '2%',
    marginTop:'3%',
    marginLeft:'2%'
  },

  container3: {
    padding:10,
  },
  dropdown3: {
    height: 50,
    borderColor: '#C3C7E5',
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
    fontSize: 12,
    color:'#111111'
  },
  selectedTextStyle3: {
    fontSize: 12,
    color:'#111111'
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