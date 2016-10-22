<template>
	<div class="rooms">
		<p>uid: {{ $route.params.userId }} -- {{ testCount }}</p>
		<div v-for="(room,key) in $store.state.room.roomList">

			<router-link :to="{ name: 'table', params: { userId: $route.params.userId,roomId: key }}">
				{{ roomNames[key] }}
			</router-link>
			<span>{{ room }}</span><br />
		</div>

		<button @click="test">test</button>

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