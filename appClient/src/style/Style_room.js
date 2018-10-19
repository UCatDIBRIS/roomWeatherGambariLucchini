import {StyleSheet } from 'react-native';
import {Fonts} from './../utils/Fonts';

export default StyleSheet.create({
  container: {
    color: '#F5F5F5', 
    paddingTop: 10,
    flex:1,
  },
  font:{
    fontSize: 25,
    color: '#f4511e',
    fontFamily:Fonts.SunMedium
  },

  header_title:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  title:{
    fontSize: 35,
    paddingLeft: 5
  },
  padd:{
    paddingTop: 40,
  },
  float_header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  padding_right:{
    paddingRight: 15,
    color:'#283593',
  },
  padding_left:{
    paddingLeft: 15,
    color:'#D32F2F',
  },
});