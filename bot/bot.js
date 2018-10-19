const querystring = require('querystring');
const https = require('http');

function sendDataPost() {

  var temp = Math.floor(Math.random() * 5) + 20+"."+Math.floor(Math.random() * 9);
  var humidity = Math.floor(Math.random() * 10)+40+"."+Math.floor(Math.random() * 9);
  var room = Math.floor(Math.random() * 2) + 1;

  var postData = querystring.stringify({
      'temperature' : temp,
      'humidity': humidity,
      'room' : 211
  });

  var options = {
    //hostname: 'jjcomline.servehttp.com',
    hostname: '130.251.61.45',
    //port: 443,
    port: 8080,
    //path: '/node/room',
    path: '/room?room=211',
    method: 'POST',
    headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Content-Length': postData.length
       }
  };

  var req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('send:', temp);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.write(postData);
  req.end();

  setTimeout(sendDataPost, 1000)
}

sendDataPost()
