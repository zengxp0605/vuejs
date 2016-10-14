import Vue from 'vue'
import Vuex from 'vuex'
import room from './modules/room'
import table from './modules/table'
import * as types from '../libs/constants'

const state = {
    userId: '',
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
}

const mutations = {
    [types.UPDATE_USER_ID](state, userId) {
        state.userId = userId;
        console.log('root state updateUserId', userId);
    },
    appendLog(state, logStr) {
        state.logs.push(logStr);
    },
    emptyLog(state) {
        state.logs = [];
    },
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
    }
})