import {StyleSheet } from 'react-native';
import {Fonts} from '../utils/Fonts';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily:Fonts.SunMedium,
    color: '#F5F5F5',
  },
  button: {
    alignItems:'center',
    paddingTop: 20,
    height: 210,
  },
  icon: {
    marginLeft:10,
    color:"#ECF0F1",
    fontSize:40 
  },
  Description: {
    color: '#f4511e',
    fontSize: 30,
    fontFamily:Fonts.SunMedium
  },
  size: {
    fontSize: 25
  },
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    width:'100%'
  },
  title_app:{
    paddingLeft:10,
    color:"#ECF0F1",
    fontSize:25, 
    fontFamily:Fonts.SunMedium,
  }
  
});