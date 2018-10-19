import {StyleSheet } from 'react-native';
import {Fonts} from './../utils/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f4511e', 
  },
  icon: {
    marginTop:160,
    fontSize:140,
    color:"#ECF0F1"
  },
  title: {
    marginTop:250,
    fontSize: 35,
    color:"#ECF0F1",
    fontFamily:Fonts.SunMedium,
  }
});