<template>
  <div>
    <h1>登陆</h1>
    <p>{{ $store.state.userId }}</p>
    <p>
      <span>userId: </span>
      <input type="text" v-model="$store.state.userId">
      <button v-on:click="login">登陆</button>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },

  methods: {
    login: function() {
      let userId = this.$store.state.userId;
      console.log('userId: ', userId);
      this.$router.push({ name: 'room', params: { userId } });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    color: #42b983;
  }
</style>