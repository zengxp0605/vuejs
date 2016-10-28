import * as types from '../../libs/constants'
import { cmd, EMIT_FLAG } from '../../config/socket.config';

const state = {
  testCount: 0,
  roomList: {},

}

const actions = {
  [types.ROOM_FETCH_LIST]: ({ commit }) => {
    commit(EMIT_FLAG, { cmd: cmd.roomList });
  },

  checkGameStatus: ({ commit }, params) => {
    commit(EMIT_FLAG, { cmd: cmd.checkGameStatus, params });
  },

  // 服务端返回的命令处理
  [cmd.roomList]: ({ commit }, data) => commit(cmd.roomList, data),
  [cmd.checkGameStatus]: ({ commit }, data) => {
    // 如果返回说明可以进入房间
    //commit(cmd.checkGameStatus, data);
    console.log(`actions-> ${cmd.checkGameStatus}, 自动进入房间`);
    let params = {
      uid: data.uid,
      roomId: data.roomId,
    }
    commit(EMIT_FLAG, { cmd: cmd.roomInto, params });
  },

  'test': ({ commit }) => commit('test'),

  'dispatchTest1': (store, data) => {
    // console.log('actions->dispatchTest1', store, data);
  },
  'commitTest2': (store, data) => {
    // console.log('actions->commitTest2', store, data);
  },
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

  [cmd.checkGameStatus](state, data) {
    console.log(cmd.checkGameStatus, data);
  },

  test(state) {
    state.testCount++;
    console.log('testCount: ', state.testCount);
  },

  // 'dispatchTest1': (state, data) => {
  //   console.log('mutations->dispatchTest1', state, data);
  // },
  'commitTest2': (state, data) => {
    // console.log('mutations->commitTest2', state, data);
  },
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
