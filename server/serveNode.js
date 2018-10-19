//#!/usr/bin/env node

var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  Task = require('./api/models/serveModels'), //created model loading here
  bodyParser = require('body-parser'),
  todoList = require('./api/controllers/serveController');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/UC', { useNewUrlParser: true })

require('http').createServer(app);  
var server = app.listen(port);
var io = require('socket.io')(server);


app.set('view engine', 'ejs');
app.set('socketio', io);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static( "public" ) );

app.get('/', function(req, res) {
  res.render('index')
});

var routes = require('./api/routes/serveRoutes'); //importing route
routes(app); //register the route

console.log('Server started on: ' + port);
