var mysql = require('mysql');
var deasync = require('deasync');
var errorHandlingModule = require('../errorHandlingModule.js');


module.exports.getInfo = function(conn) {
  var sql = 'select * from class order by Num';
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
