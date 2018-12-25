var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
app.set('views', __dirname + '/view');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); //default엔진을 html로
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));


var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  //user: 'debian-sys-maint',   //AWS 전용
  password: '111111',
  //password: 'HoF7vJTdGAyfMvIc',
  database: 'hackathondb'
});
conn.connect();

app.get('/', function(req, res) {
  var id = '14011003';
  var sql = 'select * from student where ID = ? ';
  conn.query(sql, [id], function(err, results, fields) {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Err');
    } else {
      res.send(results);

    }
  });
})

app.get('/starter', function(req, res) {
  res.render('starter.html');
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
