var Promise = require("bluebird");
var moment = require("moment");
var request = require('superagent');
var fs = require('fs');

var baseURL = 'http://www.cnblogs.com/sunada2005/p/3829772.html';

var test = function () {
    var url = baseURL;
    return new Promise(function (resolve, reject) {
        request
            .get(url)
            .end(function (err, resp) {
                if (err) {
                    reject(err);
                } else {
                    console.log(err, resp.text);
                    resolve(resp.text);
                }
            });
    });

}

let funcs = [];
for (let i = 0; i < 3; i++) {
    funcs.push(test());
}

Promise.all(funcs).then(rs => {
    // console.log(rs);
    let _time = moment().format('YYYYMMDDHHmmss');
    rs.map((s, idx) => {
        fs.writeFile(`d:/tmp/${_time}-${idx}.html`, s, (err, rp) => { });
    })
}).catch(err => {
    console.log(err.message);
    fs.appendFile(`d:/tmp/error.log`, err.message + '\r\n', (err, rp) => { });
}).done();

let counter = 0;
setInterval(() => {
    counter++;
    console.log(counter);
}, 1000)

process.on('message', (m) => {
    console.log('CHILD got message:', m);
});