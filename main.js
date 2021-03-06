var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var studentSQLModule = require('./sqlLib/studentSQLModule.js');
var profSQLModule = require('./sqlLib/profSQLModule.js');
var classSQLModule = require('./sqlLib/classSQLModule.js');
var scoreSQLModule = require('./sqlLib/scoreSQLModule.js');
var dynamicSQLModule = require('./sqlLib/dynamicSQLModule.js');
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
  var studentSWYearInfo = studentSQLModule.getSWYearInfo(conn, 18);

  var scoreNot100Count = scoreSQLModule.getNot100Info(conn, 17, 1); // 도넛
  var score100Count = scoreSQLModule.get100Count(conn);



  res.send(scoreNot100Count);
})

app.get('/', function(req, res) {

  var allRanking = studentSQLModule.getSWYearInfo(conn, 18);

  res.render('starter.ejs', {
    allRanking: allRanking
  });
})

app.get('/receiver', function(req, res) {
  var allRanking = studentSQLModule.getSWYearInfo(conn, 18);
  var avgObj = dynamicSQLModule.getDynamicAVGInfoByYear(conn, req.query.year, req.query.major);
  var data = new Array();

  for (var i = 0; i < Object.keys(avgObj).length; i++)
    data[i] = avgObj[i].Year + "," + avgObj[i].AVG;
  console.log(data);
  res.send(data);
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

app.get('/areachart', function(req, res) {
  res.render('include/areachart.html');
})

app.get('/donutchart', function(req, res) {
  res.render('include/donutchart.html');
})

app.get('/flotBarchart', function(req, res) {
  res.render('include/flotBarchart.html');
})

app.get('/barchart', function(req, res) {
  res.render('include/barchart.html');
})

app.get('/index', function(req, res) {
  res.render('index.html');
})

app.get('/index2', function(req, res) {
  res.render('index2.html');
})

app.get('/scoreChart', function(req, res) {
  var studentInfo = studentSQLModule.getInfo(conn);

  var data = new Array();

  // 라디오버튼 선택 정보 들어와야함
  for (var i = 0; i < Object.keys(studentInfo).length; i++)
    data[i] = studentInfo[i].SWContest17 + "," + studentInfo[i].SWContest18;

  res.send(data);
})

app.get('/gradeChart', function(req, res) {
  var studentInfoUp20per = studentSQLModule.getInfoUp20per(conn);

  var data = new Array();

  for (var i = 0; i < Object.keys(studentInfoUp20per).length; i++)
    data[i] = studentInfoUp20per[i].year + "," + studentInfoUp20per[i].count;

  res.send(data);
})

app.get('/majorChart', function(req, res) {
  var studentAVGInfo = studentSQLModule.getAVGInfo(conn);
  var data = new Array();

  for (var i = 0; i < Object.keys(studentAVGInfo).length; i++)
    data[i] = studentAVGInfo[i].Major + "," + studentAVGInfo[i].AVG;

  res.send(data);
})

app.get('/problemChart', function(req, res) {
  var scoreNot100Count = scoreSQLModule.getNot100Count(conn); // 100점 사람  4번
  var score100Count = scoreSQLModule.get100Count(conn);

  var data = new Array();
  for (var i = 0; i < score100Count.length; i++)
    data[i] = score100Count[i].count + "," + scoreNot100Count[i].count;

  res.send(data);
})

app.get('/select', function(req, res) {
  var scoreNot100Info = scoreSQLModule.getNot100Info(conn, 17, 1); // 100점 사람  4번
  var score100Info = scoreSQLModule.get100Info(conn, 17, 1);

  res.render('select.ejs', {
    score100Info: score100Info,
    scoreNot100Info: scoreNot100Info
  });
})

app.listen(3000, function() {
  console.log('Connected, 3000port!!');
});
