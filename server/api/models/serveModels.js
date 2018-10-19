'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Temp = new Schema({
  date: {
    type: String,
    required: 'Date value' 
  },
  hour: {
    type: String,
    required: 'Hour value' 
  },
  temperature: {
    type: String,
    required: 'Temp value'
  },
  humidity: {
    type: String,
    required: 'Humidity value'
  },
  room: {
    type: String,
    required: 'Romm number'
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
},
{ collection: 'data' });

module.exports = mongoose.model('Temperature' , Temp, 'data');