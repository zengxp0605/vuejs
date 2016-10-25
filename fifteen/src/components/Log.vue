<template>
	<div class="container mt50">
		<div class="panel panel-default">
			<div class="panel-heading">
				<button type="button" class="btn btn-default" v-on:click="emptyLog">清除日志</button>
			</div>

			<div class="panel-body">
				<p class="bg-info" v-for="str in $store.state.logs">
					{{ str }}
				</p>
			</div>
		</div>

	</div>
</template>

<script>

export default {
  methods: {
      emptyLog () {
        this.$store.dispatch('emptyLog');
      }
  }
}

</script>