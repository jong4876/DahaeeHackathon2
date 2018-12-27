var deasync = require('deasync');
var errorHandlingModule = require('../errorHandlingModule.js');


module.exports.getDynamic100CountByYear = function(conn, ContestID, Year) { // ContestId년도에 백점인 Year학년
  var sql = 'select ProblemNum, count(*) as count from score where ContestID = ? and Score = 100 and StudentID in (select ID from student where Year = ?) group by ProblemNum ';
  var results = new Object();
  conn.query(sql, [ContestID, Year], function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) {
    deasync.sleep(200);
  }
  return results;
}

module.exports.getDynamicALLCountByYear = function(conn, ContestID, Year) { // ContestId년도에 모든 Year학년
  var sql = 'select ProblemNum, count(*) as count from score where ContestID = ? and StudentID in (select ID from student where Year = ?) group by ProblemNum ';
  var results = new Object();
  conn.query(sql, [ContestID, Year], function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) {
    deasync.sleep(200);
  }
  return results;
}

module.exports.getDynamic100CountByMajor = function(conn, ContestID, Major) { // ContestId년도에 백점인 Major전공
  var sql = 'select ProblemNum, count(*) as count from score where ContestID = ? and Score = 100 and StudentID in (select ID from student where Major = ?) group by ProblemNum ';
  var results = new Object();
  conn.query(sql, [ContestID, Major], function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) {
    deasync.sleep(200);
  }
  return results;
}

module.exports.getDynamicALLCountByMajor = function(conn, ContestID, Major) { // ContestId년도에 모든 Major전공
  var sql = 'select ProblemNum, count(*) as count from score where ContestID = ? and StudentID in (select ID from student where Major = ?) group by ProblemNum ';
  var results = new Object();
  conn.query(sql, [ContestID, Major], function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) {
    deasync.sleep(200);
  }
  return results;
}

// 문제별 통과 현황
/////////////////////////////////////////////////////////
// 학과별 평균 점수

module.exports.getDynamicAVGInfoByYear = function(conn, ContestID, Major) { // Year 학년별 Major전공 ContestID년도 대회 평균
  var sql = 'SELECT Year, Major, avg(SWContest' + ContestID + ') as AVG FROM student where Major = ? group by Year';
  var jsonTotalArray = new Array();
  var results = new Object();
  conn.query(sql, [Major], function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) {
    deasync.sleep(200);
  }
  return results;
}

module.exports.getDynamicAVGInfoByYearMajor = function(conn, ContestID, Year, Major) { // Year 학년별 Major전공 ContestID년도 대회 평균
  var sql = 'SELECT Year, Major, avg(SWContest' + ContestID + ') as AVG FROM student where Major = ? and Year = ? group by Year';
  var jsonTotalArray = new Array();
  var results = new Object();
  conn.query(sql, [Major, Year], function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) {
    deasync.sleep(200);
  }
  return results;
}



// 학과별 평균점수
////////////////////////////////////////////////////
// 문제별 점수


module.exports.getDynamicScoreInfoByYear = function(conn, ContestID, Year) { // Year 학년별 ContestID년도 문제별 점수
  var sql = 'SELECT * from score, student where student.ID = score.StudentID and ContestID = ? and `StudentID` in (select ID from student where Year = ?) ';
  var jsonTotalArray = new Array();
  var results = new Object();
  conn.query(sql, [ContestID, Year], function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) {
    deasync.sleep(200);
  }
  return results;
}

module.exports.getDynamicScoreInfoByMajor = function(conn, ContestID, Major) { // Year 학년별 ContestID년도 문제별 점수
  var sql = 'SELECT * from score, student where student.ID = score.StudentID and ContestID = ? and `StudentID` in (select ID from student where Major = ?)';
  var jsonTotalArray = new Array();
  var results = new Object();
  conn.query(sql, [ContestID, Major], function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) {
    deasync.sleep(200);
  }
  return results;
}

module.exports.getDynamicAVGInfoByMajor = function(conn, ContestID, Year) { // Major전공의 학년별 ContestID년도 대회 평균
  var sql = 'SELECT Year, Major, avg(SWContest' + ContestID + ') as AVG FROM student where Year = ? group by Major';
  var jsonTotalArray = new Array();
  var results = new Object();
  conn.query(sql, [Year], function(err, result, fields) {
    if (err) {
      console.log(err);
      return 'Internal Server Err';
    } else {
      results = result;
    }
  });
  while (!errorHandlingModule.isObjectData(results)) {
    deasync.sleep(200);
  }
  return results;
}