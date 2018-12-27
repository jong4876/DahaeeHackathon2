var mysql = require('mysql');
var deasync = require('deasync');
var errorHandlingModule = require('../errorHandlingModule.js');

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'test2',
  //user: 'debian-sys-maint',   //AWS 전용
  password: '111111',
  //password: 'HoF7vJTdGAyfMvIc',
  database: 'hackathondb'
});
conn.connect();

module.exports.getInfo = function() {
  var sql = 'select * from student order by ID';
  var results = new Object();
  conn.query(sql, function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) { // 비동기 처리
    deasync.sleep(100);
  }
  return results;
}


module.exports.getInfoByID = function(ID) {
  var sql = 'select * from student where ID = ? ';
  var results = new Object();
  conn.query(sql, [ID], function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) { // 비동기 처리
    deasync.sleep(100);
  }

  return results;
}
