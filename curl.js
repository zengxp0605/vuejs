var request = require('superagent'),
    connector = {},
    baseURL = 'http://localhost:8080/Server/rest/',
    Server_Session;

connector.test = function() {
    var url = 'http://yx32-admin.stg2.24cp.com/?act=runfast_room&st=main&action=main&id=&page=1&rows=3';
    var data = {
        rows: 3
    };
    request
        .post(url)
        .set('Content-Type', 'application/json')
        .set('Cookie', 'YOUXIADMINSID=495f16727621c615c2ca97940e239b02344c9e27')
        .send(data)
        .end(function(err, resp) {
            console.log(err, resp.body);
        });
}

connector.test();

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