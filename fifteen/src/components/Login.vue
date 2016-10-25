<template>
	<div class="container">
		<h1>登陆</h1>
		<p>{{ $store.state.userId }}</p>

		<form class="form-inline" role="form">
			<div class="form-group">
				<label class="sr-only">用户ID</label>
				<input type="text" class="form-control" placeholder="请输入用户ID" v-model="$store.state.userId">
			</div>
			<button v-on:click="login" class="btn btn-default">登陆</button>
		</form>

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

<style scoped>
	h1 {
		color: #42b983;
	}
</style>