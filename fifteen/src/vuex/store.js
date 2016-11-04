import Vue from 'vue'
import Vuex from 'vuex'
import room from './modules/room'
import table from './modules/table'
import * as types from '../libs/constants'
import socketio from '../plugins/socket';
import { cmd, EMIT_FLAG } from '../config/socket.config';

const state = {
    userId: 0,
    tmp: 'tmp',
    logs: [],
}

const actions = {
    [types.UPDATE_USER_ID]({ commit }, userId) {
        commit(types.UPDATE_USER_ID, userId)
    },
    appendLog: ({ commit }, logStr) => {
        commit('appendLog', logStr)
    },
    emptyLog: ({ commit }) => {
        commit('emptyLog');
    },

    // [EMIT_FLAG]: ({ commit }, data) => {
    //     // console.log('-------------actions', EMIT_FLAG);
    //     commit(EMIT_FLAG, data);
    // },
}

const mutations = {
    [types.UPDATE_USER_ID](state, userId) {
        state.userId = userId;
        state.tmp = new Date().getTime();
        console.log('root state updateUserId', userId);
    },
    appendLog(state, logStr) {
        state.logs.push(logStr);
    },
    emptyLog(state) {
        state.logs = [];
    },

    testTmp(state) {
        state.tmp = new Date().getTime();
    },

    [EMIT_FLAG](state) { },
}

Vue.use(Vuex)

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
    state,
    actions,
    mutations,
    modules: {
        room,
        table,
    },
    plugins: [socketio()],
    strict: true,
})