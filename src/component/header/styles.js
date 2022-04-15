
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({

  headerView: {
    backgroundColor: '#3373F3',
    // marginTop: '2%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  image2: {
    width: 28,
    height: 28
  },
  contain: {
    // flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: height * 10 / 100,
    width: width,
  }
});

export default styles