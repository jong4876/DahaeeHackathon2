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

  var scoreNot100Info = scoreSQLModule.getNot100Info(conn,1,1); // 100점 사람  4번
  var score100Info = scoreSQLModule.get100Info(conn,1,1);

  res.send(score100Info);
})

app.get('/', function(req, res) {
  var studentInfo = studentSQLModule.getInfo(conn);

  var data17 = [0, 0, 0, 0, 0, 0, 0, 0];
  var data18 = [0, 0, 0, 0, 0, 0, 0, 0];

  for(var i=0; i<Object.keys(studentInfo).length; i++) {
    data17[parseInt(studentInfo[i].SWContest17*1 / 100)]++;
    data18[parseInt(studentInfo[i].SWContest18*1 / 100)]++;
  }

  res.render('starter.ejs', {
    data17: data17,
    data18: data18
  });
})

app.get('/header', function(req, res) {
  res.render('include/header.html');
})

app.get('/sidebar', function(req, res) {
  res.render('include/sidebar.html');
})

app.get('/footer', function(req, res) {
  res.render('include/footer.html');
})

app.get('/index', function(req, res) {
  res.render('index.html');
})

app.get('/index2', function(req, res) {
  res.render('index2.html');
})

app.get('/scoreChart', function(req, res) {
  var mod = 100;
  var score = new Array();
  for(var i = 0; i<8; i++)
    score[i] = parseInt(Math.random() * mod);

  res.send(score);
})

app.get('/gradeChart', function(req, res) {
  var mod = 100;
  var score = new Array();
  for(var i = 0; i<8; i++)
    score[i] = parseInt(Math.random() * mod);

  res.send(score);
})

app.get('/majorChart', function(req, res) {
  var mod = 100;
  var score = new Array();
  for(var i = 0; i<8; i++)
    score[i] = parseInt(Math.random() * mod);

  res.send(score);
})

app.get('/problemChart', function(req, res) {
  var mod = 100;
  var score = new Array();
  for(var i = 0; i<8; i++)
    score[i] = parseInt(Math.random() * mod);

  res.send(score);
})

app.get('/select', function(req, res) {
  res.render('select.ejs');
})

app.listen(3001, function() {
  console.log('Connected, 3000port!!');
});
