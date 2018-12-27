
var deasync = require('deasync');
var errorHandlingModule = require('../errorHandlingModule.js');

module.exports.getInfo = function(conn) { // 1qjs
  var sql = 'select * from student order by ID';
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
module.exports.getSW18Info = function(conn) { // 2번
  var sql = 'select * from student order by SWContest18 desc';
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

module.exports.getSW17Info = function(conn) { 
  var sql = 'select * from student order by SWContest17 desc';
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
      sql = 'select year, count(year) as count from (select * from student order by SWContest17 DESC LIMIT ?) as sub group by year';
      var intCount = 9; //parseInt(count[0].count / 5);

      conn.query(sql,intCount, function(err, result, fields) {
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

module.exports.getAVGInfo = function(conn) { // 학과별 평균

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
