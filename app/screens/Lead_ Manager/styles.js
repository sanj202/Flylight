
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  listData: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DBDBDB',
    marginHorizontal:'3%',
    marginVertical:'1%',
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
    // alignItems: "center",
    // marginTop: 22
    margin:'10%',
    marginTop:'0%'
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
    color:'#000000',
    textAlign: "center"
  }
});

export default styles