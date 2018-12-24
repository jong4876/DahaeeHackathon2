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
app.use(express.static('images')); // 정적인 이미지 저장공간 접근 허용 images폴더
app.use(express.static('tempurl'));
app.use(express.static('css'));
app.use(express.static('js'));

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '111111',
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


app.listen(3000, function() {
  console.log('Connected, 3000port!!');
});
