
var deasync = require('deasync');
var errorHandlingModule = require('../errorHandlingModule.js');


module.exports.getInfo = function(conn) { // 2번
  var sql = 'select * from student';
  var jsonTotalArray = new Array();
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


module.exports.getInfoUp20per = function(conn) { // 상위 20퍼의 학생 추출
  var sql = 'SELECT count(*) as count FROM student';
  var results = new Object();
  conn.query(sql, function(err, count, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      console.log("count : "+ count[0].count );
      sql = 'SELECT * FROM student order by SWContest17 DESC LIMIT ?';
      conn.query(sql,[count[0].count / 5], function(err, result, fields) {
        if (err) {
          console.log(err);
          return 'Internal Server Err';
        } else {
          results = result;
        }
      })
    }
  });
  while (!errorHandlingModule.isObjectData(results)) {
    deasync.sleep(100);
  }

  return results;
}

module.exports.getAVGInfo = function(conn) { // 2번
  var sql = 'SELECT Major, avg(SWContest17) as AVG FROM student group by Major';
  var jsonTotalArray = new Array();
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
