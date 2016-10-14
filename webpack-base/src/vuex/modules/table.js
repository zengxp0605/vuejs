import * as types from '../../libs/constants'

const state = {
    tableInfo: {},
    users: {},
    isWaiting: false,
    tablePublicBalls: null,
    isStart: false,
    s_timer: null,
}

const getters = {
    //tableInfo: (state, getters, rootState) => state.tableInfo,

}

const actions = {
    [types.ROOM_INTO]: ({ commit }, data) => commit(types.ROOM_INTO, data),
    [types.TABLE_SET_ROUTER]: ({ commit }) => commit(types.TABLE_SET_ROUTER),
    [types.USER_BET]: ({ commit }, params) => commit(types.USER_BET, params),
}

const mutations = {

    [types.ROOM_INTO](state, { roomId, userId}) {
        var params = {
            uid: userId,
            roomId: roomId,
        };
        global.socket.send(global.socket.cmd.roomInto, params);
    },

    [types.USER_BET](state, params) {
        console.log('========', state.userId);
     
        global.socket.send(global.socket.cmd.bet, params);
    },

    [types.TABLE_SET_ROUTER](state) {
        console.log('room TABLE_SET_ROUTER');

        const serverRouter = {
            roomInto: function (data) {
                console.log('=========', data);
            },
            chargeMoney: function (data) {
                console.log('=========> 兑入:', data);
            },
            roomShow: function (data) {
                console.log('=========> roomShow:', JSON.stringify(data, true, ' '));
                state.isWaiting = data.isWaiting;  // 等候匹配
                state.users = data.users ? data.users : {};
                state.tableInfo = data.tableInfo ? data.tableInfo : {};
                state.tablePublicBalls = data.tableInfo.public_balls;
                //state.isStart = state.tablePublicBalls.length > 0 ? true : false;
                console.log('开始倒计时剩余: ', state.tableInfo.secend);
                if (state.tableInfo.secend > 0) { // 倒计时
                    state.s_timer = setInterval(function () {
                        if (state.tableInfo.secend <= 0) {
                            state.s_timer = null;
                            clearInterval(state.s_timer);
                            return;
                        }
                        state.tableInfo.secend -= 1;
                    }, 1000);
                } else {
                    state.tableInfo.secend = 0;
                }
            },
            gameStart: function (data) {
                console.log('=========> gameStart:', JSON.stringify(data, true, ' '));
                state.tablePublicBalls = data.tableInfo.public_balls;
                state.users = data.users;
                state.isStart = true;
            },
            bet: function (data) {
                console.log('=========> bet:', JSON.stringify(data, true, ' '));
            },
            play: function (data) {
                console.log('=========> play:', JSON.stringify(data, true, ' '));
                var speakerId = data.speakerId;
                state.users[speakerId].isSpeaker = true;
            },

        };
        global.socket.setRouter(serverRouter);
    }

}


export default {
    state,
    actions,
    mutations,
    getters
}
