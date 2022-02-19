
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  listData: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DBDBDB',
    marginHorizontal: '3%',
    marginVertical: '1%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  headerView: {
    backgroundColor: '#3373F3',
    height: '15%',
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
    borderColor: '#E8EAF5',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 50,
    borderRadius: 10
  },


  //  -------------------------------------------------------

  centeredView3: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // marginTop: 22
    margin: '10%',
    marginTop: '0%'
  },
  modalView3: {
    // margin: 20,
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
    paddingRight: 20,
    paddingLeft: 20,
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
    fontSize: 21,
    color: '#000000',
    textAlign: "center"
  },
  btn: { borderRadius: 20, width: '30%', paddingVertical: 1.5, },
  btnText: { padding: 5, textAlign: 'center' },

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
  },
  addNewBtn: {
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#2296E4',
    borderRadius: 15
  },
  radio: {
    marginTop: '6%',
    marginHorizontal: '1%',
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1
  },
  AssignTitle: {
    fontSize: 14,
    color: '#0F0F0F',
    fontFamily: 'Roboto'
  },
  askTitleR: {
    margin: '5%',
    marginRight: '3%',
    marginTop: '-12%',
    alignSelf: 'flex-end',
    padding:'3%'
    // height: 14,
    // width: 14
  },


});

export default styles