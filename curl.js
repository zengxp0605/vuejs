var request = require('superagent'),
    fs = require('fs'),
    connector = {},
    baseURL = 'http://localhost:8080/Server/rest/',
    Server_Session;

connector.test = function() {
    var url = '';
    var data = {
        rows: 3
    };
    request
        .post(url)
        .set('Content-Type', 'application/json')
        .set('Cookie', 'SID=test')
        .send(data)
        .end(function(err, resp) {
            console.log(err, resp.body);
        });
}

//connector.test();

var counter = 1;
var maxTry = 500;

connector.baidu = function() {

  var url = 'https://passport.baidu.com/center';
   
   var _cookieStr = 'BAIDUID=Hm_lvt_90056b3f84f90da57dc0f40150f005d5=1476453507,1476453515;PTOKEN=da84e6fb6755d8e0a08983fad1a013e1;STOKEN=bb0ba3d90bfbf3dc6e4605f9aa2b5ff0af16eb1e5ab08070cc8ce1e28226f490; ';
    request
      .get(url)
      .set('Cookie', _cookieStr)
      .end(function(err, resp) {
          if(!err && resp.ok){
            var _html = resp.text;
            console.log(resp.ok);
            var _subStr = '<a href="http://www.baidu.com/p/setting/profile/basic" target="_blank">修改资料</a>';   
            if(_html.includes(_subStr)){
                var msg = `${counter} is ok\r\n`;
                console.log(msg);
                writeLog(msg, 'success');
            } else {
                fs.writeFileSync('./tmp/' + counter + '.txt', _html);
                let msg = `${counter} login status error\r\n`;
                writeLog(msg, 'error');
                console.log(msg);
            }
          } else {
              console.log(err, 'read-error: ' , counter);
          }
      });
}

var timer = null;

connector.baidu();

timer = setInterval(function(){

  counter ++;
  if(counter > maxTry){
    timer = null;
    clearInterval(timer);
    return false;
  }
  connector.baidu();
}, 120 * 1000);


function writeLog(msg, type = 'error'){
  let _time = require('moment')().format("YYYY-MM-DD HH:mm:ss");
  require('fs').appendFile('./tmp/' + type + '.log', _time + '  ' + msg, function (err) {
    if (err) {
      console.log(err);
    }
    // console.log('The "data to append" was appended to file!');
  });
}

connector.EstablishSession = function() {
    var url = baseURL + 'session/establish';
    request
        .post(url)
        .end(function(err, resp) {
            if (err) {
                console.log(err);
            }
            if (resp.ok) {
                Server_Session = resp.body.sessionId;
                console.log("Establish Session Successful : " + Server_Session);
            }
        });
};

connector.Post = function(url, obj, fn) {
    request
        .post(baseURL + url)
        .set('Content-Type', 'application/json')
        .set('Cookie', 'SESSIONID=' + Server_Session)
        .send(obj)
        .end(function(err, resp) {
            fn(err, resp, resp.body);
        });
};