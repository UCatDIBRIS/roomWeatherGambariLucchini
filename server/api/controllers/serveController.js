'use strict';
var mongoose = require('mongoose'),
    Temp = mongoose.model('Temperature'),
    clients = {},
    sensors = {
      "sensors": [
        { "id": "1", "room": "203", "floor": "2" },
        { "id": "2", "room": "211", "floor": "2" },
        { "id": "3", "room": "212", "floor": "2" }
      ]
    };

exports.create_connection = function(req, res) {

  var index = sensors["sensors"].findIndex(function(e){
    return e.room == req.query.room
  })

  if(index != -1){
    
    var io = req.app.get('socketio')
      
    io.sockets.on('connection', function(client) {  

      if(!(client.id in clients)){     
        client.on('disconnect', function(data) {
          delete clients[client.id];
          client.disconnect()
        });

        client.on('close-app', function(data) {
          delete clients[client.id];
          client.disconnect()
        });

        client.on('date', function(data) {
          Temp.find({date:data,room:clients[client.id].room}, function(err, temp) {
            if (err)
              res.send(err);
            client.emit('data',temp)
          });      
        });
      }

      clients[client.id] = {'client': client, 'room': req.query.room}
    });

    res.render('room');
  }

  else{
    res.render('');
  }

};

  exports.create_temp = function(req, res) {
    
      var value = new Temp(req.body);
      var time = hhmmss();
      var date = yyyymmdd();
      var message = { temp: value.temperature,
                      humidity: value.humidity,
                      room: value.room,
                      time: time }
      
      console.log(message)

      for(var key in clients){
        if(clients[key].room == message.room) clients[key].client.emit('messages', message)
      }

      var hours = time.split(":")[0]
      var minutes = time.split(":")[1]
      var seconds = time.split(":")[2]
      
      if(minutes == "00" && (seconds == "00" || seconds == "01")){
        var new_task = new Temp({
          temperature: message.temp,
          humidity: message.humidity,
          hour: hours+":00",//+minutes,
          date: date,
          room: message.room
        });
        new_task.save(function(err, temp) {
        });
      }
  }

  exports.read_temp = function(req, res) {  

    var index = sensors["sensors"].findIndex(function(e){
        return e.room == req.query.room
      })

    if(index != -1 || Object.keys(clients).length != 0) res.render('history')

    else res.render('')

  };




exports.read_sensors = function(req, res) {
  res.send(sensors)
};

function hhmmss() {
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
  var hh = h < 10 ? '0' + h : h;
  var mm = m < 10 ? '0' + m : m;
  var ss = s < 10 ? '0' + s : s;
  return hh + ':' + mm + ':' + ss;
}

function yyyymmdd() {
  var now = new Date();
  var y = now.getFullYear();
  var m = now.getMonth()+1;
  var d = now.getDate();
  var mm = m < 10 ? '0' + m : m;
  var dd = d < 10 ? '0' + d : d;
  return y + '-' + mm + '-' + dd;
}

