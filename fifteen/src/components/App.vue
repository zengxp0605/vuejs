<template>
	<div>
		<div class="container" v-if="false">
			<router-link :to="{ name: 'hello', params: { userId: 123 }}">hello</router-link>
			<br />
			<router-link :to="{ name: 'home', params: { userId: 123 }}">home</router-link>
		</div>

		<router-view></router-view>

		<Log></Log>

	</div>
</template>

<script>
  
import Log from './Log'

export default {
  components: {
    Log
  },
  methods: {
 
  }
}
</script>

<style>
	.mt50 {
		margin-top: 50px;
	}
</style>
<!--
<style>

  
	html {
		height: 100%;
		margin: 0;
		padding: 0;
	}
	
	body {
		display: flex;
		align-items: top;
		justify-content: left;
		height: 100%;
	}
	
	#app {
		color: #2c3e50;
		margin-top: 10px;
		/*max-width: 600px;
  text-align: center;*/
		font-family: Source Sans Pro, Helvetica, sans-serif;
	}
	
	#app a {
		color: #42b983;
		text-decoration: none;
	}
	
	a {
		display: inline-block;
		padding: 5px;
	}
	

	
	.mt10 {
		margin-top: 10px;
	}
	
	.hide {
		display: none;
	}
	
	.clearboth {
		clear: both;
	}
	
	.color-red {
		color: red;
	}-->
</style>