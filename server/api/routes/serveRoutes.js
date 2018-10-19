'use strict';
module.exports = function(app) {
  var server = require('../controllers/serveController')
  // server Routes
  app.route('/room')
    .get(server.create_connection)
    .post(server.create_temp)
      
  app.route('/history')
    .get(server.read_temp)
    
  app.route('/sensors')
    .get(server.read_sensors)
};