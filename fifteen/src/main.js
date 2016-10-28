import Vue from 'vue'
import VueRouter from 'vue-router'
//import VueResource from 'vue-resource'
import App from './components/App'
import routes from './routers'
import store from './vuex/store'
import Tools from './tools'
// import Test from './tools/test'

window.Tools = Tools;

Vue.use(VueRouter)
//Vue.use(VueResource)

// Vue.use(Test) // 插件测试

// console.log(Test);

const router = new VueRouter({ routes })
/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')













