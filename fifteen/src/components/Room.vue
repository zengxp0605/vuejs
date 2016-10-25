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
				<button type="button" class="btn btn-default" @click="test">test</button>
			</div>
		</div>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as types from '../libs/constants'

export default {
    data (){
        return {
            roomNames: {
                1: '初级房',
                2: '中级房',
                3: '高级房',
            }
        }
    },
    created: function() {
        console.log('room created');

        this[types.ROOM_FETCH_LIST]();
    },
    computed: mapGetters([
        'testCount',
    ]),
    methods: mapActions([
            types.ROOM_FETCH_LIST,
            'test',
    ]),
  }

</script>