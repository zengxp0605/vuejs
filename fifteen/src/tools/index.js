export default {
    warn(msg) {
        let _ele = document.getElementById('msg-warn');
        _ele.innerHTML = msg;
        _ele.style = 'display: block!important;visibility:visible!important;';
        console.log('tools.warn', msg);
        setTimeout(() => {
            _ele.innerHTML = '';
            _ele.style = 'display: none;';
        }, 3000);
    },
    success(msg) {
        let _ele = document.getElementById('msg-info');
        _ele.innerHTML = msg;
        _ele.style = 'display: block!important;visibility:visible!important;';
        console.log('tools.success', msg);
        setTimeout(() => {
            _ele.innerHTML = '';
            _ele.style = 'display: none;';
        }, 3000);
    },
}