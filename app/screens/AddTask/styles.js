
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({

  dropdown3: {
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
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
  inputFields: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    marginTop: '3%',
    height: 45
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
  button: {
    backgroundColor: '#3373F3',
    borderRadius: 10,
    // alignSelf: 'center',
    marginTop: '5%',
    marginBottom: '10%'
  },
  textButton: {
    paddingTop: 15,
    paddingBottom: 15,
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Roboto'
  },
  icon: {
    height: 20,
    width: 18,
    marginTop: '3%',
    marginHorizontal: '2%'
  },
   askModel: {
    marginHorizontal: '2%',
    marginTop: '40%',
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height:'50%',
    paddingBottom:'5%'
  },
  askTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#3373F3',
    color: 'white',
    textAlign: "center",
    paddingVertical: '3%'
  },
  askTitleR: {
    margin: '5%',
    marginRight: '3%',
    marginTop: '-8%',
    alignSelf: 'flex-end',
    height: 14,
    width: 14
  },
  askSubtitle: {
    fontSize: 15,
    color: 'red',
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
  } 
});

export default styles