var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var studentSQLModule = require('./sqlLib/studentSQLModule.js');
var profSQLModule = require('./sqlLib/profSQLModule.js');
var classSQLModule = require('./sqlLib/classSQLModule.js');
var scoreSQLModule = require('./sqlLib/scoreSQLModule.js');
var mysql = require('mysql');

app.set('views', __dirname + '/view');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); //default엔진을 html로
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));

var conn = mysql.createConnection({
  host: '13.125.192.103',
  port: '3306',
  user: 'test',
  password: '111111',
  database: 'hackathondb'
});
conn.connect();

app.get('/test', function(req, res) {

  var profInfo = profSQLModule.getInfo(conn);
  var classInfo = classSQLModule.getInfo(conn);
  var studentAVGInfo = studentSQLModule.getAVGInfo(conn);
  var studentInfoUp20per = studentSQLModule.getInfoUp20per(conn);

  var scoreInfo = scoreSQLModule.getNot100Info(conn,1,1); // 100점 사람  4번


  res.send(studentInfoUp20per);
})

app.get('/', function(req, res) {
  var scoreInfo = scoreSQLModule.getNot100Info(conn,1,1);
  console.log(scoreInfo);

  res.render('starter.ejs', {
    scoreInfo: scoreInfo
  });
})

app.get('/index', function(req, res) {
  res.render('index.html');
})

app.get('/index2', function(req, res) {
  res.render('index2.html');
})

app.listen(3000, function() {
  console.log('Connected, 3000port!!');
});
