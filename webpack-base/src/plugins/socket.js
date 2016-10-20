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

            var logStr = '服务端返回: ' + JSON.stringify(data).replace(/\\/g, '');
            store.dispatch('appendLog', logStr);

            if (!data.cmd) {
                console.error('Error ==>' + data.code + '-' + data.error);
                return;
            }
            if (data.code == '-1' || data.res.code == '-1') {
                console.log(data.res.msg ? data.res.msg : '未知错误!');
                return;
            }

            store.commit(data.cmd, data.res.content);
        })
        store.subscribe(mutation => {
            //console.log('=========socket mutation', mutation.type);

            if (mutation.type === config.cmd.emit) {
                //console.log('mutation.payload:', mutation, mutation.payload);
                // socket.emit('update', mutation.payload)
                let { cmd, params } = mutation.payload;
                var data = {
                    cmd: cmd,
                    params: params,
                };
                var logStr = '客户端发送: ' + JSON.stringify(data);
                //console.log(logStr);
                store.dispatch('appendLog', logStr);

                socket.emit('router', data);
            }
        })
    }
}
