import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../../routers'
import * as types from '../../libs/constants'
import Tools from '../../tools/index'
import { cmd, EMIT_FLAG } from '../../config/socket.config';
Vue.use(VueRouter)
const router = new VueRouter({ routes })

const state = {
    tableId: '',
    tableInfo: {},
    users: {},
    isWaiting: false,
    remainPublicBalls: [],
    userPublicBalls: [],
    isStart: false,
    roundCount: 0,
    speakerId: 0,
    isSpeakerList: {},
    minBetAmount: 0, // 最小押注额
    remainSecend: 0,
}

const getters = {
    isSpeakerList: (state) => {
        let isSpeakerList = {};
        for (let id in state.users) {
            isSpeakerList[id] = state.speakerId == id ? true : false;
        }
        if (state.speakerId == state.userId) {
            document.title = 'spreaker';
        } else {
            document.title = '火拼15球'
        }
        return isSpeakerList;
    },
    betList(state) {
        return (state.tableInfo.bet_list + '').split(',');
    }
}

const actions = {
    [types.ROOM_INTO]: ({ commit }, params) => commit(EMIT_FLAG, { cmd: cmd.roomInto, params }),
    [types.USER_BET]: ({ commit, state }, params) => {
        commit('testTmp');
        // if (params.betAmount < state.minBetAmount) {
        //     Tools.warn('押注金额不能小于最低押注额:' + state.minBetAmount);
        //     return;
        // }
        commit(EMIT_FLAG, { cmd: cmd.bet, params })
    },
    leave: ({ commit, rootState }) => {
        let params = { uid: rootState.userId };
        commit(EMIT_FLAG, { cmd: cmd.roomLeave, params })
    },


    [cmd.chargeMoney]({ commit, state }, data) {
        console.log('actions=========> 兑入:', data.amount);
    },
    [cmd.bet]({ commit, state }, data) {
        if (data.isBaoDian) {
            Tools.warn('爆点了!!!!!!!!');
        }
        commit(cmd.bet, data);
    },
    [cmd.play]({ commit, state }, data) {
        commit(cmd.play, data);
    },
    [cmd.gameOver]({ commit, state }, data) {
        commit(cmd.gameOver, data);
    },
    [cmd.gameStart]({ commit, state }, data) {
        commit(cmd.gameStart, data);
    },
    [cmd.roomLeave]({ commit, state }, data) {
        console.log('----roomLeave-----', data);
    },
    [cmd.roomShow](store, data) {
        let { commit, state, rootState } = store;
        console.log('----------', rootState.userId, state.userId);
        let hash = `/table/${data.roomId}/${data.uid}`;
        //window.location.hash = hash;
        console.log(`actions -----> ${cmd.roomShow} -> hash: ${hash}`, router, Vue.$route, Vue.router, Vue.route, Vue.$route);

        // TODO:  切换路由
        router.push({ name: 'table', params: { userId: data.uid, roomId: data.roomId } })
        
        commit(cmd.roomShow, data);
    },
    [cmd.countDown]({ commit, state}, data) {
        console.log('开始倒计时剩余: ', data.secend);
        Vue.s_timer = null;
        clearInterval(Vue.s_timer);
        commit('setSecend', data.secend);
        // 倒计时
        Vue.s_timer = setInterval(() => {
            if (state.remainSecend <= 0) {
                Vue.s_timer = null;
                clearInterval(Vue.s_timer);
                console.log('clearSecendInterval', state.remainSecend);
                return;
            }
            console.log('decrSecend', state.remainSecend);
            commit('decrSecend');
        }, 1000);
    },

}

const mutations = {
    decrSecend() {
        state.remainSecend -= 1;
    },
    setSecend(state, s) {
        state.remainSecend = s;
    },
    clearSecendInterval() {
        // state.remainSecend = 0;
        // s_timer = null;
        // clearInterval(s_timer);
    },

    [cmd.roomShow](state, data) {
        console.log('=========> roomShow:', JSON.stringify(data));
        // console.log('test-http', this.$http);
        state.isWaiting = data.isWaiting;  // 等候匹配
        state.users = data.users ? data.users : {};
        if (data.tableInfo) {
            state.tableInfo = data.tableInfo;
            state.remainPublicBalls = data.tableInfo.public_balls;
            state.roundCount = data.tableInfo.round_count;
            state.speakerId = data.tableInfo.speaker_uid;
        }
        //state.isStart = state.remainPublicBalls.length > 0 ? true : false;

        state.tableId = state.tableInfo.tid;
        state.minBetAmount = state.tableInfo.last_bet_amount;

    },

    [cmd.gameStart](state, data) {
        console.log('=========> gameStart:', JSON.stringify(data, true, ' '));
        state.remainPublicBalls = data.tableInfo.public_balls;
        state.users = data.users;
        state.tableInfo = data.tableInfo;
        state.isStart = true;
    },

    [cmd.bet](state, data) {
        console.log('=========> bet:', state.userId, JSON.stringify(data, true, ' '));
        if (data.remainPublicBalls) {
            state.remainPublicBalls = data.remainPublicBalls;
        }

        if (data.mainAmount) {
            console.log('bet => 更新总池金额', data.mainAmount);
            state.tableInfo.main_amount = data.mainAmount;
        }
        if (data.sideAmount) {
            console.log('bet => 更新边池金额', data.sideAmount);
            state.tableInfo.side_amount = data.sideAmount;
        }
        // 首次押注
        if (data.isFirst) {
            // 更新余额和押注金额
            for (let uid in data.usersNewAmount) {
                state.users[uid].amount = data.usersNewAmount[uid];
                state.users[uid].bet_amount = data.betAmount;
            }
            state.tableInfo.main_amount = data.mainAmount;
        } else {
            let actUserId = data.uid || 0;
            if (data.userPublicBalls) {
                state.users[actUserId].public_balls = data.userPublicBalls + '';
                state.users[actUserId].public_point = data.userPublicBalls.reduce((m, n) => Number(m) + Number(n));
            }
            state.users[actUserId].bet_amount = data.betAmount;
            state.users[actUserId].amount = data.userNewAmount;
        }

        state.minBetAmount = data.betAmount;
    },

    [cmd.play](state, data) {
        console.log('=========> play:', state.userId, JSON.stringify(data, true, ' '));
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
