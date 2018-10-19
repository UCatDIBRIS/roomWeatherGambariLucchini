import React, {Component} from 'react';
import {
  Text, 
  View,
} from 'react-native';
import styles from './../style/Style_splash';
import MaterialIconCom from 'react-native-vector-icons/MaterialCommunityIcons';


export default class Splash extends Component {
  
  static navigationOptions = {
    header:null
  }


  componentDidMount(){
    setInterval(()=>{
      this.props.navigation.navigate('Main');
    }, 2000)
  }
  render () {
    return (
      <View style={styles.container}>
        <MaterialIconCom name='cloud-braces' style={styles.icon} />
        <Text style={styles.title}>roomWeather</Text>
      </View>
    )
  }
}