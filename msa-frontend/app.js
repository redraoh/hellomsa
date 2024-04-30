var express = require('express');
var path = require('path');
var request = require('request');
var port = 3000

var app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


var client_id = 'afRq5keZDhlJRnL3NrY0';
var client_secret = 'eiwMwJVYbF';
var state = "RAMDOM_STATE";
var redirectURI = encodeURI("http://127.0.0.1:3000/callback/naver");
var api_url = "";


app.get('/api', function (req, res){
  res.json({message: 'Hello, World!!'})
});
//

// naver API

app.get('/login/naver', function (req, res) {
  api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
});
app.get('/callback/naver', function (req, res) {
  code = req.query.code;
  state = req.query.state;
  api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
      + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
  var request = require('request');
  var options = {
    url: api_url,
    headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});
// app.listen(3000, function () {
//   console.log('http://127.0.0.1:3000/naverlogin app listening on port 3000!');
// });


// // 서버 시작
app.listen(port, () => {
  console.log(`frontend server on port ${port}`)
})
