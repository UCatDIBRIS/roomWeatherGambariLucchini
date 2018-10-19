
import React, { Component } from 'react';
import {Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Bar from './charts/Bar';
import styles from './../style/Style_calendar';
import moment from 'moment';


//import io from 'socket.io-client/dist/socket.io';

//var mysocket
var temp_room = {eight:0, ten:0, twelve:0, fourteen:0, sixteen:0, eighteen:0}

export default class Calendar extends Component {

  constructor(props) {

    super(props);

    this.state = {
      isDateTimePickerVisible: false,
      minDate: "2018, 09, 04",
      maxDate: "2018, 10, 04",
      currentDate: "Not Selected",
      temp_room
    };

    this.props.mysocket.on('data', (data)=> {
      if (data.length == 0){
        temp_room.eight = 0
        temp_room.ten = 0
        temp_room.twelve = 0
        temp_room.fourteen = 0
        temp_room.sixteen = 0
        temp_room.eighteen = 0
      }
      else{
        temp_room = {eight:0, ten:0, twelve:0, fourteen:0, sixteen:0, eighteen:0}
        data.forEach(function(d){
          if (d.hour=="08:00") temp_room.eight = d.temperature
          if (d.hour=="10:00") temp_room.ten = d.temperature
          if (d.hour=="12:00") temp_room.twelve = d.temperature
          if (d.hour=="14:00") temp_room.fourteen = d.temperature
          if (d.hour=="16:00") temp_room.sixteen = d.temperature
          if (d.hour=="18:00") temp_room.eighteen = d.temperature
        })
      }
      this.props.mysocket.off("data",function(){})
      this.setState({temp_room})
    })

  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
  _history = () =>{
    this.props.mysocket.emit('date', this.state.currentDate)
  }

  _handleDatePicked = (datatime) => {

    this.setState({currentDate: moment(datatime).format("YYYY-MM-DD")}, ()=>{
      this._history();
    })
    this._hideDateTimePicker();
    
  };

  componentWillUnmount() {
    temp_room = {eight:0, ten:0, twelve:0, fourteen:0, sixteen:0, eighteen:0}
  }
  
  componentDidMount() {
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({maxDate: year + ',' + month + ',' + day})
  }

  render () {
    return (
      <View>
        <View style={styles.container}>
          
          <TouchableOpacity onPress={this._showDateTimePicker} style={styles.button}>
            <Text style={styles.font}>Choose Date</Text>
          </TouchableOpacity>

          <Text style={[styles.font, styles.fontDate]}>{this.state.currentDate}</Text>
          
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            minimumDate={new Date(this.state.minDate)}
            maximumDate={new Date(this.state.maxDate)}
          />
        </View>
        <Bar temp={this.state.temp_room}/>
      </View>
    );
  }

}
