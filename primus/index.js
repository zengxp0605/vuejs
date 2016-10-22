//
// Require all dependencies.
//
var authorize = require('./server/libs/authorize')
  , bodyParser = require('body-parser')
  , express = require('express')
  , http = require('http')
  , Primus = require('primus')
  , routes = require('./server/routes');

//
// Create an Express application.
//
var app = express();
global.app = app;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post('/login', routes.login);

//
// Create an HTTP server and our Primus server.
//
var server = http.createServer(app)
  , primus = new Primus(server);

//
// Add the authorization hook.
//
primus.authorize(authorize);

//
// `connection` is only triggered if the authorization succeeded.
//
primus.on('connection', function connection(spark) {
  spark.on('data', function received(data) {
    console.log(spark.id, 'received message:', data);

    //
    // Echo back to the client any received data.
    //
    spark.write(data);
  });
});

// 测试 开启异步进程
//require('./server/child_process/index');

require('./server/booter.js')(server);

