const Promise = require('bluebird');
const Redis = require('ioredis');
const conf = require('./config/server.json');

function initRedis() {
    let redis = new Redis(conf.redis, {
        enableReadyCheck: true,
        retryStrategy: function (times) {
            console.log('Redis reconnecting...');
            return Math.min(times * 2, 2000);
        }
    });


    redis.on('error', function (error) {
        console.log('Redis ' + error);
    });

    redis.on('ready', function () {
        console.log('Load redis [ok]');
    });

    Promise.promisifyAll(redis);

    app.set('redis', redis);
}

function test() {
    let key = 'hashTest';
    let data = {
        a: 111,
        b: 222,
        obj: { t: 1, k: 2 },
        arr: [1, 2, 3],
        time: (new Date).getTime()
    }
    let redis = app.get('redis')
    redis.hmset(key, data).then(rs => {
        console.log('hmset: ', rs);
        return redis.hgetall(key);
    }).then(rs => {
        console.log('hgetall: ', rs);
    })
}

module.exports = function (server) {
    initRedis();

    test();
    server.listen(conf.port, function listening() {
        console.log(`Open http://localhost:${conf.port} in your browser`);
    });
}