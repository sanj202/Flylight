
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC'
  },
  reView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '-12%',
    margin: '3%',
  },
  cardBox: {
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    paddingLeft: 17,
  },
  counter: {
    fontSize: 38,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  cardTitle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#000000'
  },
  parcentage: {
    position: 'absolute',
    fontSize: 20,
    color: '#fff'
  },
  opportunityBtn: {
    marginTop: '5%',
    marginLeft: '10%',
    borderRadius: 15,
    borderWidth: 1,
    width: '80%',
  },
  opportunityText: {
    padding: 5,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  listData: {
    padding: 5,
    borderBottomWidth: 1,
    // borderRadius: 10,
    borderColor: '#DBDBDB',
    margin: '3%',
    marginTop: '-3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredViewM: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22
  },
  modalViewM: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
},
titleM: {
  textAlign: 'center',
  fontSize: 21,
  fontWeight: 'bold',
  color: '#000000'
},
btnM: {
  marginTop: '10%',
  padding: 10,
  // paddingTop:15,
  // paddingBottom:15,
  borderRadius: 20,
  width: '40%',
},
btnTextM: {
  fontSize: 20,
  color: '#fff',
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  textAlign: 'center',
},
centeredViewM2: {
  marginTop: '45%',
  margin: '7%',
  borderRadius: 18,
  paddingBottom: 30,
},
titleA: {
  textAlign: 'center',
  fontSize: 30,
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  color: '#000000'
},
btnA: {
  marginTop: '10%',
  padding: 10,
  borderRadius: 20,
},
btnTextA: {
  fontSize: 14,
  fontWeight:'bold',
  marginTop: '8%',
  color: '#0F0F0F',
  marginLeft: '5%'
},
listDataA: {
  padding: 5,
  borderBottomWidth: 1,
  borderRadius: 10,
  borderColor: '#DBDBDB',
  margin: '3%',
  marginTop: '-5%',
  flexDirection: 'row',
},
titleImgA: {
  height: 48,
  width: 48,
  marginTop: '2%',
  marginBottom: '2%'
},
navigateImgA: {
  height: 21,
  width: 21,
  marginTop: '8%',
  marginRight: '2%',
  marginLeft:'10%'
}

});

export default styles