<template>
	<div class="container">
		<div class="row">
			<div class="col-md-10">
				<h4>userId: {{ $store.state.userId }} roomId: {{ $route.params.roomId }} time: {{ $store.state.tmp }}
			</div>
		</div>

		<div class="row" v-show="$store.state.table.isWaiting">
			<div class="col-md-12">
				<h3 class="bg-primary text-center">等候匹配....</h3>
			</div>
		</div>

		<section v-show="!$store.state.table.isWaiting">
			<div class="row">
				<div class="col-md-12">
					<table class="table">
						<caption><strong>桌子情况</strong></caption>
						<tbody>
							<tr>
								<td>tableId: </td>
								<td>{{ $store.state.table.tableId }}</td>
								<td>secend: 　{{ $store.state.table.remainSecend || 0 }}</td>
							</tr>
							<tr>
								<td>公共球: </td>
								<td colspan="2">{{ $store.state.table.remainPublicBalls }}</td>
								<!--<td>状态: </td>
								<td v-if="$store.state.table.isStart">游戏开始</td>-->
							</tr>
							<tr>
								<td>轮次: </td>
								<td>{{ $store.state.table.roundCount || 0 }} / {{ $store.state.table.tableInfo.total_round }}</td>
							</tr>
							<tr>
								<td>奖池: </td>
								<td colspan="2">
									<span>总: {{ $store.state.table.tableInfo.main_amount }}</span>
									<span>边: {{ $store.state.table.tableInfo.side_amount }}</span>
								</td>
							</tr>

						</tbody>
					</table>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12">
					<table class="table table-bordered">
						<caption><strong>用户列表</strong></caption>
						<thead>
							<tr>
								<th>userId</th>
								<th>uname</th>
								<th>game<br>status</th>
								<th>seat_id</th>
								<th>amount</th>
								<th>private<br>point</th>
								<th>public<br>balls</th>
								<th>publicTotal</th>
								<th>total</th>
								<th>bet_amount</th>
								<!--<th>sit_time</th>-->
							</tr>
						</thead>
						<tbody>
							<template v-for="(user, id) in $store.state.table.users">
								<tr :class="id == $route.params.userId ? 'bg-info' : ''">
									<td :class="{ 'bg-danger': isSpeakerList[id] }">{{ id }} </td>
									<td>{{ user.uname }} </td>
									<td>{{ user.game_status}}</td>
									<td>{{ user.seat_id }} </td>
									<td>{{ user.amount || 0 }} </td>
									<td>{{ user.private_point }} </td>
									<td>{{ user.public_balls }} </td>
									<td>{{ user.public_point }} </td>
									<td>{{ toNumber(user.public_point) + toNumber(user.private_point) }} </td>
									<td>{{ user.bet_amount }} </td>
									<!--<td>{{ user.sit_time }} </td>-->
								</tr>
							</template>
						</tbody>
					</table>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12">
					<!--<div class="panel panel-info">-->
					<div class="panel panel-default">
						<div class="panel-heading">
							<form class="form-inline" role="form">
								<div class="form-group">
									<label>最小押注:　</label>
									<input type="text" class="form-control" readonly v-model="$store.state.table.minBetAmount">
								</div>

								<div class="form-group">
									<label for="amount">我要押注:　</label>
									<input type="text" class="form-control" id="amount" v-model="amount">
								</div>
							</form>
						</div>

						<div class="panel-body">
							<div class="col-md-4">
								<button class="btn btn-default" v-on:click="bet({isGiveUp: 1})">放弃</button>
								<button class="btn btn-primary" v-on:click="bet({isNeedBall: 1})">要球</button>
								<button class="btn btn-warning" v-on:click="bet({isNeedBall: 0})">不要球</button>
								<button class="btn btn-default" v-on:click="bet({isAllIn: 1})">Allin</button>
							</div>

							<div class="col-md-8">
								<div class="btn-group">
									<template v-for="a in betList">
										<button class="btn btn-default" v-on:click="changeAmount(a)">加到{{ a }}</button>
									</template>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>

		</section>

		<div class="row">
			<div class="col-md-12">
				<div class="panel panel-default">

					<div class="panel-body">
						<button class="btn btn-primary" v-on:click="changeTable()">换桌</button>
						<button class="btn btn-warning" v-on:click="leave()">退出</button>
					</div>
				</div>
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

      this[types.UPDATE_USER_ID](this.$route.params.userId);
      this[types.ROOM_INTO]({
            uid: this.$route.params.userId,
            roomId: this.$route.params.roomId,
      });
     
	 //console.log('this.$http',  this.$http, this.$http.get);
  },
  computed: mapGetters([
     'isSpeakerList',
	 'betList',
   ]),
  methods: {
    ...mapActions([
        types.ROOM_INTO,
        types.USER_BET,
		types.UPDATE_USER_ID,
		'leave',
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
	changeTable(){
		console.log('----changeTable----');
	},

	toNumber(s){
		return s ? parseInt(s) : 0;
	}
  }

}

</script>