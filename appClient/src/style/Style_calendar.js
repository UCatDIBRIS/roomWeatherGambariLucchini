import {StyleSheet } from 'react-native';
import {Fonts} from './../utils/Fonts';

export default StyleSheet.create({
  container: {
    color: '#F5F5F5', 
    paddingTop: 10,
    flex:1,
    alignItems:"center"
  },
  font:{
    fontSize: 25,
    color: '#f4511e',
    fontFamily:Fonts.SunMedium
  },
  fontDate:{
    fontSize:18,
    paddingTop:10
  },
  button:{
    borderColor: '#f4511e',
    borderWidth: 1,
    borderRadius: 10,
    padding:5
  }
});