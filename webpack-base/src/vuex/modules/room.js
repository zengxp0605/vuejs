import * as types from '../../libs/constants'

const room = {}

const state = {
  count: 0,
  roomList: {},
  roomNames: {
    1: '初级房',
    2: '中级房',
    3: '高级房',
  }
}


const actions = {
  [types.ROOM_FETCH_LIST]: ({ commit }) => commit(types.ROOM_FETCH_LIST),
  [types.ROOM_UPDATE_LIST]: ({ commit }, roomList) => commit(types.ROOM_UPDATE_LIST, roomList),
  [types.ROOM_SET_ROUTER]: ({ commit }) => commit(types.ROOM_SET_ROUTER),
}


const mutations = {
  [types.ROOM_FETCH_LIST](state) {
    console.log('room fetchRoomList', global.socket);
    global.socket.send(global.socket.cmd.roomList, {});
  },

  [types.ROOM_UPDATE_LIST](state, roomList) {
    console.log('room updateRoomList', roomList);
    state.roomList = roomList;
  },

  [types.ROOM_SET_ROUTER](state) {
    console.log('room ROOM_SET_ROUTER');

    global.socket.setRouter({
      roomList: function (data) {
        var newData = {};
        for (var k in data.list) {
          var _tmp = JSON.parse(data.list[k]);
          newData[_tmp.type] = data.list[k];
        }
        //self[types.ROOM_UPDATE_LIST](newData);
        state.roomList = newData;
      },
      
    });
  }


}


const getters = {
  testCount: state => state.count % 2 === 0 ? 'even' : 'odd',

  roomList: (state, getters, rootState) => {
    //console.log(state.roomList, rootState.userId);
    return state.roomList;
  },
}


export default {
  state,
  actions,
  mutations,
  getters
}
