<template>
	<div class="table">
		<h4>userId: {{ $store.state.userId }} roomId: {{ $route.params.roomId }} tmp: {{ $store.state.tmp }}
		</h4>

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
					<td>{{ $store.state.table.remainPublicBalls }}</td>
					<td>状态: </td>
					<td v-if="$store.state.table.isStart">游戏开始</td>
				</tr>
				<tr>
					<td>轮次: </td>
					<td>{{ $store.state.table.roundCount }} / {{ $store.state.table.tableInfo.total_round }}</td>
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
								<td>publicTotal</td>
								<td>total</td>
								<td>bet_amount</td>
							</tr>
							<template v-for="(user, id) in $store.state.table.users">
								<tr :class="id == $route.params.userId ? 'my-bgc' : ''">
									<td :class="{ active: isSpeakerList[id] }">{{ id }} </td>
									<td>{{ user.uname }} </td>
									<td>{{ user.game_status}}</td>
									<td>{{ user.seat_id }} </td>
									<td>{{ user.amount }} </td>
									<td>{{ user.sit_time }} </td>
									<td>{{ user.private_point }} </td>
									<td>{{ user.public_balls }} </td>
									<td>{{ user.public_point }} </td>
									<td>{{ parseInt(user.public_point) + (user.private_point ? parseInt(user.private_point) : 0) }} </td>
									<td>{{ user.bet_amount }} </td>
								</tr>
							</template>
						</table>
					</td>
				</tr>
			</table>

			<div class="mt10">
				<label for="amount">押注:</label><input type="text" id="amount" v-model="amount">
			</div>

			<div class="oper-bar">
				<button v-on:click="bet({isGiveUp: 1})">放弃</button>
				<button v-on:click="bet({isNeedBall: 1})">要球</button>
				<button v-on:click="bet({isNeedBall: 0})">不要求</button>
				<button v-on:click="bet({isAllIn: 1})">Allin</button>

				<br/> <br/>
				<button v-on:click="changeAmount(100)">加到100</button>
				<button v-on:click="changeAmount(200)">加到200</button>
				<button v-on:click="changeAmount(500)">加到500</button>

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
      amount: 50,
    }
  },
  created: function() {
	  console.log('table created');
      this[types.ROOM_INTO]({
            uid: this.$route.params.userId,
            roomId: this.$route.params.roomId,
      });

      this[types.UPDATE_USER_ID](this.$route.params.userId);
  },
  computed: mapGetters([
     'isSpeakerList',
   ]),
  methods: {
    ...mapActions([
        types.ROOM_INTO,
        types.USER_BET,
		types.UPDATE_USER_ID,
    ]),
	bet (params){
		console.log('-------bet ', params, this.$route.params.userId, this.amount);

		params.uid = this.$route.params.userId;
		params.betAmount = this.amount;
		this[types.USER_BET](params);
	},
	changeAmount(a){
		this.amount = a;
	},
  }

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