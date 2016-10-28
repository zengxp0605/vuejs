import config from '../config/socket.config';

export default function createWebSocketPlugin() {
    return store => {
        const socket = io.connect(config.socketUrl);
        socket.on('router', data => {
            if ('string' === typeof data) {
                data = JSON.parse(data);
            }
            if (data.cmd && data.cmd == 'notice::main') {
                //console.log('忽略公告', data.res);
                return;
            }
            console.log('服务端返回: ' + data.cmd);
            // console.log(data.res);

            var logStr = '服务端返回: ' + JSON.stringify(data).replace(/\\/g, '');
            store.dispatch('appendLog', logStr);
            // console.log(logStr);
            if (!data.cmd) {
                console.error('Error ==>' + data.code + '-' + data.error);
                return;
            }
            if (data.code == '-1' || data.res.code == '-1') {
                let msg = data.res.msg || '未知错误!';
                // console.log(msg);
                Tools.warn(msg);
                return;
            }

            // store.commit(data.cmd, data.res.content);
            store.dispatch(data.cmd, data.res.content);
        })
        store.subscribe(mutation => {
            // console.log('=========socket mutation.type', mutation.type);
            // socket 向服务端发送命令
            if (mutation.type === config.EMIT_FLAG) {
                console.log(`${config.EMIT_FLAG}, 发送:`, mutation.payload);
                let { cmd, params } = mutation.payload;
                var data = {
                    cmd: cmd,
                    params: params,
                };
                var logStr = '客户端发送: ' + JSON.stringify(data);
                // console.log(logStr);
                store.dispatch('appendLog', logStr);
                socket.emit('router', data);
            }
        })
    }
}
