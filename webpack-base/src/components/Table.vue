<template>
  <div class="table">
    <h4>userId: {{ $route.params.userId }} roomId: {{ $route.params.roomId }} </h4>

    <div class="color-red" v-show="$store.state.table.isWaiting">等候匹配....</div>
    <div v-show="!$store.state.table.isWaiting">
      <table>
        <tr>
          <td>tableId: </td>
          <td>{{ $store.state.table.tableInfo.tid }}</td>
          <td>secend: </td>
          <td>{{ $store.state.table.tableInfo.secend }}</td>
        </tr>
        <tr>
          <td>Balls: </td>
          <td>{{ $store.state.table.tablePublicBalls }}</td>
          <td>状态: </td>
          <td v-if="$store.state.table.isStart">游戏开始</td>
        </tr>
        <tr>
          <td>users:</td>
          <td>
            <table>
              <tr>
                <td>userId</td>
                <td>uname</td>
                <td>game_status</td>
                <td>seat_id</td>
                <td>amount</td>
                <td>sit_time</td>
                <td>private_point</td>
                <td>public_balls</td>
                <td>amount</td>
                <td>bet_amount</td>
              </tr>
              <template v-for="(user, id) in $store.state.table.users">
                <tr :class="id == $route.params.userId ? 'my-bgc' : ''">
                  <td :class="{'active': user.isSpeaker }">{{ id }} </td>
                  <td>{{ user.uname }} </td>
                  <td>{{ user.game_status}}</td>
                  <td>{{ user.seat_id }} </td>
                  <td>{{ user.amount }} </td>
                  <td>{{ user.sit_time }} </td>
                  <td>{{ user.private_point }} </td>
                  <td>{{ user.public_balls }} </td>
                  <td>{{ user.amount }} </td>
                  <td>{{ user.bet_amount }} </td>
                </tr>
              </template>
            </table>
          </td>
        </tr>
      </table>

      <div class="oper-bar">
        <button v-on:click="bet({isGiveUp: 1})">放弃</button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as types from '../libs/constants'

export default {
  data () {
    return {
    }
  },
  created: function() {
      this[types.ROOM_INTO]({
            userId: this.$route.params.userId,
            roomId: this.$route.params.roomId,
      });
      this[types.TABLE_SET_ROUTER]();
      this[types.UPDATE_USER_ID](this.$route.params.userId);
  },
  // computed: mapGetters([
  //   'tableInfo',
  // ]),
  methods: Object.assign(
    mapActions([
        types.ROOM_INTO,
        types.TABLE_SET_ROUTER,
        types.UPDATE_USER_ID,
        types.USER_BET,
    ]),{
        bet (params){
          console.log('-------bet ', params, this.$route.params.userId);
          params.uid = this.$route.params.userId;
          this[types.USER_BET](params);
        }
    }
  ),

}

</script>

<style>
  button {
    padding: 2px;
    cursor: pointer;
    margin-left: 5px;
  }
  
  table {
    border-collapse: collapse;
    empty-cells: show;
    border: none;
    margin-top: 10px;
    display: block;
    height: auto;
  }
  
  table td,
  table th {
    border: 1px solid #d3d3d3;
    text-align: center;
    padding: 3px;
  }
  
  td.left,
  td.right {
    width: 50%;
    min-width: 100px;
    min-height: 20px;
  }
  
  .my-bgc {
    background-color: lightblue;
  }
  
  .active {
    background-color: grey;
    color: red;
  }

  .oper-bar {

    margin-top: 15px;
  }
</style>