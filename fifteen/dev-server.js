var path = require('path');
var express = require('express');
var app = express();
var config = require('./webpack.config');
var port = config.serverPort || 3000;

var webpack = require('webpack');

var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(hotMiddleware);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, 'localhost', function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:' + port);
});

process.on('uncaughtException', function (err) {
    console.error('uncaughtException : ', err);
});