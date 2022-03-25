
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  headerView: {
    backgroundColor: '#3373F3',
    height: '26%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  inputFields: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    marginVertical: '2%',
    paddingVertical: 10,
    paddingHorizontal: 5,
    // height: 43
  },
  icon: {
    height: 24,
    width: 22,
    marginRight: '2%',
    marginTop: '1%',
    marginLeft: '2%'
  },
  button: {
    backgroundColor: '#3373F3',
    borderRadius: 10,
    marginVertical: '2%'
  },
  textButton: {
    padding: 10,
    fontSize: 21,
    color: '#FFFFFF',
  },
  image2: {
    width: 35,
    height: 35
  },
  textValues: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Roboto'
  },
  dropdown: {
    height: 45,
    borderColor: '#C3C7E5',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    marginVertical: '1%'
  },
  selectedTextStyle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Roboto'
  },
  headerBtn: {
    alignSelf: 'flex-end',
    marginTop: '2%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
  },
  headerBtntext: {
    fontSize: 10,
    color: '#fff'
  },
  avtarStyle: {
    backgroundColor: '#FFF',
    width: 104,
    height: 104,
    borderRadius: 52,
    alignSelf: 'center',
    marginTop: '-5%'
  }
});

export default styles