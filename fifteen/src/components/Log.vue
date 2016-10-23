<template>
    <div id="logs-container">
        <button v-on:click="emptyLog" style="margin-top: 20px;">清除日志</button>
        <div id="logs">
            <div class="log-server" v-for="str in $store.state.logs">
                {{ str }}
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

<style>
    #logs {
        margin-top: 10px;
        border: 1px solid #d3d3d3;
        min-height: 200px;
    }
    
    #logs .log-client {
        background-color: #fff;
        border-bottom: 1px solid #fff;
        margin-top: 5px;
    }
    
    #logs .log-server {
        background-color: #eee;
        border-bottom: 1px solid #fff;
        margin-top: 5px;
    }
</style>