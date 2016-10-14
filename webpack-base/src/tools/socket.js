import Vue from 'vue'
import config from '../config/socket.config.js';

import store from '../vuex/store'


console.log(config.socketUrl, store);

var _socket = null;

function init() {
    //连接至游戏服务器
    _socket = io.connect(config.socketUrl);

    install();
}

try {
    init();
} catch (e) {
    console.log("服务暂时不可用，请稍后刷新重试！");
    setTimeout(() => {
        init()
    }, 20);
}


var __LOCAL__ = true;
var log = console.log;

function isset(arg) {
    return (typeof arg === "undefined") ? false : true;
}

function install() {
    console.log('========socket install===========');
    // if (install.installed) {
    //     return;
    // }

    // install.installed = true;

    _socket.send = (cmd, params) => {
        //console.log('_socket send222', cmd, params);
        if (!_socket || !cmd)
            return;
        var data = {
            cmd: cmd,
            params: params,
        };
        var logStr = '客户端发送: ' + JSON.stringify(data);
        //console.log(logStr);
        store.dispatch('appendLog', logStr);
        if (!__LOCAL__) {
            //data.params.token = token || '';
            data = Base64.encode(JSON.stringify(data));
        }
        _socket.emit('router', data);
    };

    // 配置服务端返回soket 路由
    _socket.setRouter = (obj, key = config.interactiveKey) => {
        global.socket.serverAct[key] = obj;
    };

    _socket.cmd = config.cmd;

    // 路由
    _socket.on('router', function (data) {

        let ServerAct = global.socket.serverAct;

        // try{
        if (!__LOCAL__) {
            data = Base64.decode(JSON.stringify(data));
        }

        if ('string' === typeof data) {
            data = JSON.parse(data);
        }
        if (data.cmd && data.cmd == 'notice::main') {
            //console.log('忽略公告', data.res);
            return;
        }

        var logStr = '服务端返回: ' + JSON.stringify(data).replace(/\\/g, '');
        store.dispatch('appendLog', logStr);

        if (!data.cmd) {
            console.error('Error ==>' + data.code + '-' + data.error);
            return;
        }
        if (data.code == '-1') {
            alert(data.res.msg ? data.res.msg : '未知错误!');
            return;
        }

        var _module = data.cmd.split('::');
        if (!isset(ServerAct[_module[0]])) {
            throw new Error(_module[0] + ' 模块未定义.');
        }
        //log(Action[_module[0]][_module[1]]);
        var clientFun = ServerAct[_module[0]][_module[1]];
        if ('function' !== typeof clientFun) {
            throw new Error(`ServerAct.${_module[0]}.${_module[1]} 方法未定义.`);
        }
        clientFun(data.res.content);

        // }catch(e){
        //     console.error('Error ==>', e);
        // }

    });

    _socket.on('disconnect', function () {
        //log('disconnect');
    });
    _socket.on('connect_error', function (error) {
        //log('connect_error',error);
    });
    _socket.on('reconnect', function () {
        //log('reconnect');
    });
    _socket.on('reconnecting', function () {
        //log('reconnecting');
    });

    if (typeof window !== 'undefined') {
        window.global = {};
    }

    global.socket = _socket;
    global.socket.serverAct = {};

    console.log('===========socket intalled===========');
}
