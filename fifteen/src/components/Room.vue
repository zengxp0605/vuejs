<template>
	<div class="container">
		<div class="row">
			<div class="col-md-10">
				<h4>uid: {{ $route.params.userId }} -- {{ testCount }}</h4>
			</div>
		</div>


		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered">
					<caption>房间列表</caption>
					<thead>
						<tr>
							<th>房间</th>
							<th>详情</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(room,key) in $store.state.room.roomList">
							<td>
								<router-link :to="{ name: 'table', params: { userId: $route.params.userId,roomId: key }}">
									{{ roomNames[key] }}
								</router-link>
							</td>
							<td>{{ room }}</td>
						</tr>

					</tbody>
				</table>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<button type="button" class="btn btn-default" @click="quickInto">快速入座</button>
				<button type="button" class="btn btn-default" @click="test">test</button>
			</div>
		</div>

	</div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import * as types from '../libs/constants'
import { cmd,EMIT_FLAG } from '../config/socket.config';

export default {
    data (){
        return {
            roomNames: {
                1: '新手场',
                2: '普通场',
                3: '高级场',
                4: '大师场',
            }
        }
    },
    created: function() {
        console.log('room created', this.$router, Vue.$router);

        this[types.ROOM_FETCH_LIST]();
		//this.$store.dispatch(types.ROOM_FETCH_LIST, {});
		this.$store.dispatch('checkGameStatus', {uid:  this.$route.params.userId });

		//this.$store.dispatch('dispatchTest1', {test1: '--dispatch--'});
		//this.$store.commit('commitTest2', {test2: '--commit--'});
    },
    computed: mapGetters([
        'testCount',
    ]),
    methods: {
		...mapActions([
            types.ROOM_FETCH_LIST,
            'test',
    	]),
		quickInto(){
			this.$store.commit(EMIT_FLAG , {
				cmd: cmd.quickInto,
				params:{
					uid: this.$route.params.userId,
				}
			});
		}
	}
  }

</script>