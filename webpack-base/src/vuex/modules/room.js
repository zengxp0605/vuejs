import * as types from '../../libs/constants'
import { cmd } from '../../config/socket.config';

const state = {
  testCount: 0,
  roomList: {},

}

const actions = {
  [types.ROOM_FETCH_LIST]: ({ commit }) => commit(cmd.emit, { cmd: cmd.roomList }),

  'test': ({ commit }) => commit('test'),
}


const mutations = {

  [cmd.roomList](state, data) {
    var newData = {};
    for (var k in data.list) {
      var _tmp = JSON.parse(data.list[k]);
      newData[_tmp.type] = data.list[k];
    }
    state.roomList = newData;
  },

  test(state) {
    state.testCount++;
    console.log('testCount: ', state.testCount);
  }

}

const getters = {
  testCount: state => state.testCount % 2 === 0 ? 'even' : 'odd',
}

export default {
  state,
  actions,
  mutations,
  getters
}
