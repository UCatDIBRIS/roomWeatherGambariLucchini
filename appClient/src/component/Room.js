import React, {Component} from 'react';
import {
  Text, 
  ScrollView,
  View,
} from 'react-native';

window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';

import styles from './../style/Style_room';
import Pie from './charts/MyPie';
import Calendar from './Calendar'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';


console.disableYellowBox = true;

var data_room = {temp: 0, hum: 0};
var mysocket;
var room;
var room_split
export default class Room extends Component {

  static navigationOptions = ({ navigation }) => {
    room =  navigation.getParam('itemId')
    return {
      title : navigation.getParam('itemId'),
    };
  };

  constructor(props) {
    
    super(props);

    data_room={temp: 0, hum: 0};

    this.state = {
      temp : 0,
      hum: 0,
      data_room
    };

    room_split= room.split(" ")
    fetch("http://< your ip address>/room?room="+room_split[1])
    mysocket = io('http://< your ip address>', {jsonp:false});
    mysocket.on('messages', (data) => { 
      data_room.temp = data.temp
      data_room.hum = data.humidity
      this.setState({temp: data.temp, hum: data.humidity}) 
    })
  }

  componentWillUnmount() {
    mysocket.emit("close-app", mysocket.id)
  }

  render () {

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header_title}>
            <Ionicons name='md-timer' size={45}  color="#f4511e"/>
            <Text style={[styles.font, styles.title]}>Live</Text>
          </View>
          <View style={styles.float_header}>
              <Text style={[styles.font, styles.padding_left]}>Temp: {this.state.temp}°</Text>
              <Text style={[styles.font, styles.padding_right]}>Hum: {this.state.hum}%</Text>
          </View>
          <Pie data_room={data_room}/>
          <View style={[styles.header_title, styles.padd]}>
            <MaterialCom name='google-analytics' size={45}  color="#f4511e"/>
            <Text style={[styles.font, styles.title]}>History</Text>
          </View>
          <Calendar room={room_split} mysocket={mysocket}/>
        </View>
      </ScrollView> 
    )
  }
} 




