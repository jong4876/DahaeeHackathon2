/* 에러처리
   변수의 데이터 존재확인
 */
module.exports.isData = function(obj) {
  if (obj == undefined || obj.length == 0) {
    console.log("No Data");
    return false;
  } else
    return true;
}

/* http request 시 데이터가 존재하는지 판단,
  출, 도착지가 700m이내일때도 에러
*/
module.exports.isRequestData = function(obj) {
  if (obj.error != undefined) {
    console.log("Request Fail");
    return false;
  } else
    return true;
}

/*object의 널값 확인
 */
module.exports.isObjectData = function(obj) {
  if (JSON.stringify(obj) == '{}') {
    console.log("Wait Async");
    return false;
  } else
    return true;
}

/* 에러 메시지 클라이언트용 json형태로 반환
 */
module.exports.returnErrMsg = function(msg) {
  var errorObj = {
    error: msg
  };
  return msg;
}
