import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import Pie from 'react-native-pie'



export default class MyPie extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      temp : 0,
      hum: 0
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pie}>
          <Pie
            radius={90}
            innerRadius={65}
            series={[parseInt(this.props.data_room.temp)]}
            colors={['#D32F2F']}
            backgroundColor='#ddd' 
          />
          <View style={styles.gauge}>
            <Text style={styles.gaugeText}>{this.props.data_room.temp}</Text>
          </View>
        </View>
        <View style={styles.pie}>
          <Pie 
            style={styles.pie}
            radius={90}
            innerRadius={65}
            series={[parseInt(this.props.data_room.hum)]}
            colors={['#283593']}
            backgroundColor='#ddd'
          />
          <View style={styles.gauge}>
            <Text style={styles.gaugeText}>{this.props.data_room.hum}</Text>
          </View>
        </View>
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  gauge: {
    position: 'absolute',
    width: 180,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },
  pie:{
    marginTop:20
  }
})