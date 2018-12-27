var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var studentSQLModule = require('./sqlLib/studentSQLModule.js');
var profSQLModule = require('./sqlLib/profSQLModule.js');
var classSQLModule = require('./sqlLib/classSQLModule.js');


app.set('views', __dirname + '/view');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); //default엔진을 html로
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));



app.get('/test', function(req, res) {

  var profInfo = profSQLModule.getInfo();
  var studentInfo = studentSQLModule.getInfo();
  var classInfo = studentSQLModule.getInfo();
  res.send(studentInfo);
})

app.get('/', function(req, res) {
  var studentInfo = studentSQLModule.getInfo();
  res.render('starter.html', {
    studentInfo: studentInfo
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
