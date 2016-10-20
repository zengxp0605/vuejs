import * as types from '../../libs/constants'
import { cmd } from '../../config/socket.config';

const state = {
    tableInfo: {},
    users: {},
    isWaiting: false,
    remainPublicBalls: [],
    userPublicBalls: [],
    isStart: false,
    s_timer: null,
    roundCount: 0,
    speakerId: 0,
    isSpeakerList: {},
}

const getters = {
    // tableInfo: (state, getters, rootState) => state.tableInfo,
    isSpeakerList: (state) => {
        let isSpeakerList = {};
        for (let id in state.users) {
            isSpeakerList[id] = state.speakerId == id ? true : false;
        }
        return isSpeakerList;
    },

}

const actions = {
    [types.ROOM_INTO]: ({ commit }, params) => commit(cmd.emit, { cmd: cmd.roomInto, params }),
    [types.USER_BET]: ({ commit }, params) => {
        commit('testTmp');
        commit(cmd.emit, { cmd: cmd.bet, params })
    },
}

const mutations = {

    [cmd.chargeMoney](state, data) {
        console.log('=========> 兑入:', data.amount);
    },
    [cmd.roomShow](state, data) {
        console.log('=========> roomShow:', JSON.stringify(data, true, ' '));
        state.isWaiting = data.isWaiting;  // 等候匹配
        state.users = data.users ? data.users : {};
        if (data.tableInfo) {
            state.tableInfo = data.tableInfo;
            state.remainPublicBalls = data.tableInfo.public_balls;
            state.roundCount = data.tableInfo.round_count;
            state.speakerId = data.tableInfo.speaker_uid;
        }
        //state.isStart = state.remainPublicBalls.length > 0 ? true : false;
        console.log('开始倒计时剩余: ', state.tableInfo.secend);
        if (state.tableInfo.secend > 0) { // 倒计时
            state.s_timer = setInterval(() => {
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
    [cmd.gameStart](state, data) {
        console.log('=========> gameStart:', JSON.stringify(data, true, ' '));
        state.remainPublicBalls = data.tableInfo.public_balls;
        state.users = data.users;
        state.isStart = true;
    },
    [cmd.bet](state, data) {

        console.log('=========> bet:', state.userId, JSON.stringify(data, true, ' '));
        let actUserId = data.uid || 0;
        if (data.remainPublicBalls) {
            state.remainPublicBalls = data.remainPublicBalls;
        }
        if (data.userPublicBalls) {
            state.users[actUserId].public_balls = data.userPublicBalls + '';
            state.users[actUserId].public_point = data.userPublicBalls.reduce((m, n) => Number(m) + Number(n));
        }
    },
    [cmd.play](state, data) {
        console.log('=========> play:', JSON.stringify(data, true, ' '));
        state.roundCount = data.roundCount;
        state.speakerId = data.speakerId;
    },
    [cmd.gameOver](state, data) {
        console.log('=========> gameOver:', JSON.stringify(data, true, ' '));

    },

}


export default {
    state,
    actions,
    mutations,
    getters
}
