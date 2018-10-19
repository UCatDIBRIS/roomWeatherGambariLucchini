import React, {Component} from 'react';
import {
        Text, 
        View,
        TouchableOpacity,
        ScrollView,
        ActivityIndicator,
        ListView,
        RefreshControl
      } from 'react-native';
      
import { createStackNavigator } from 'react-navigation';

import MaterialIconCom from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Room from './Room';
import styles from './../style/Style_main';

console.disableYellowBox = true;


class LogoTitle extends Component {
  render() {
    return (
      <View style={{flexDirection:'row', flexWrap:'wrap'}}>
        <MaterialIconCom 
          name='cloud-braces'  
          style={styles.icon}
        />
        <Text style={styles.title_app}>roomWeather</Text>
      </View>  
    );
  }
}

class Home extends Component {

  constructor(props){
    super(props)
    this.state={
      isLoading:true,
      getSensors:[],
      refreshing: false,
    }
  }

  _handleRefresh = () =>{
    this.setState({refreshing: true});
    this._loadRoom()
    this.setState({refreshing: false});
  }

  _loadRoom = () =>{
      fetch("http://< your ip address> /sensors") 
      .then((response)=> response.json())
      .then((responseJson)=>{
        var standardDataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});
        this.setState({
          isLoading: false,
          getSensors: standardDataSource.cloneWithRows(responseJson.sensors)
        })
      })
      .catch(function (err){
        return err;
      })
  }
  componentDidMount(){
    this._loadRoom()
  }


  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };

  render() {
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator/>
        </View>
      )
    }
    
    return (
      <ScrollView>
        <View style = {styles.container}>
          <ListView
            dataSource={this.state.getSensors}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._handleRefresh}
              />
            }
            renderRow={
              (rowData) => 
              <TouchableOpacity style={[styles.button, styles.line]} onPress={() => { this.props.navigation.navigate('Room', {
                    itemId: "Room: " + rowData.room,
                    otherParam: "Floor: " + rowData.floor,
                  });
                }}>
                <MaterialIcon name='room' size={100}  color="#f4511e"/>
                <Text style={styles.Description}>Room: {rowData.room} </Text>
                <Text style={[styles.Description, styles.size]}>Floor: {rowData.floor} </Text>
              </TouchableOpacity>
            }>
          </ListView>
        </View>
      </ScrollView>
    );
  }
}


const RootStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
    },
  },
  Room: {
    screen: Room,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleStyle: {
        color: '#f4511e',
        alignSelf: 'center',
      }
    }
  }
});

export default class Main extends Component {
  static navigationOptions = {
    header:null
  }

  render() {
    return <RootStack />;
  }
}