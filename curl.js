var request = require('superagent'),
    connector = {},
    baseURL = 'http://localhost:8080/Server/rest/',
    Server_Session;

connector.test = function () {
    var url = 'http://test.com';
    var data = {
        username: 'test',
        password: 'test',
        image_code: '',
    };
    request
        .post(url)
        .type('form') // josn || form
        // .set('Content-Type', 'application/json')
        // .set('Content-Type', 'application/x-www-form-urlencoded')
        //.set('Cookie', 'SID=test')
        .send(data)
        .query({
            act: 'index',
            st: 'login',
        })
        .end(function (err, resp) {
            console.log(err, resp);
            console.log(err, resp.text, JSON.parse(resp.text));

        });
}
connector.test();


connector.EstablishSession = function () {
    var url = baseURL + 'session/establish';
    request
        .post(url)
        .end(function (err, resp) {
            if (err) {
                console.log(err);
            }
            if (resp.ok) {
                Server_Session = resp.body.sessionId;
                console.log("Establish Session Successful : " + Server_Session);
            }
        });
};

connector.Post = function (url, obj, fn) {
    request
        .post(baseURL + url)
        .set('Content-Type', 'application/json')
        .set('Cookie', 'SESSIONID=' + Server_Session)
        .send(obj)
        .end(function (err, resp) {
            fn(err, resp, resp.body);
        });
};