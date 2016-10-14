<template>
    <div class="rooms">
        <p>uid: {{ $route.params.userId }} -- {{ testCount }}</p>
        <div v-for="(room,key) in roomList">

            <router-link :to="{ name: 'table', params: { userId: $store.state.userId,roomId: key }}">{{ roomNames[key] }}</router-link>
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
            roomList: this.$store.state.room.roomList,
            roomNames: this.$store.state.room.roomNames,
        }
    },
    created: function() {
        // console.log('room created');
        // console.log('myGlobalMethod',this.myGlobalMethod, this.$myMethod);

        this[types.UPDATE_USER_ID](this.$route.params.userId);
        this[types.ROOM_FETCH_LIST]();
        this[types.ROOM_SET_ROUTER]();
    },
    computed: mapGetters([
        'testCount',
        'roomList',
    ]),
    methods: mapActions([
            types.ROOM_FETCH_LIST,
            types.ROOM_SET_ROUTER,
            types.UPDATE_USER_ID,
            'test',
    ]),
  }

</script>