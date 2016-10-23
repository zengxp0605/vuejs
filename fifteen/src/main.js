import Vue from 'vue'
import VueRouter from 'vue-router'
//import VueResource from 'vue-resource'
import App from './App'
import routes from './routers'
import store from './vuex/store'
// require('./tools/socket');

Vue.use(VueRouter)
//Vue.use(VueResource)

// 接收服务端返回的 socket命令
// const ServerAct = {};
// ServerAct.install = function (Vue, options) {
//   console.log('ServerAct.install');
//   // 1. 添加全局方法或属性
//   Vue.myGlobalMethod = { a() { }, b() { } }
//   // 2. 添加全局资源
//   Vue.directive('my-directive', { d: 'test' })
//   // 3. 添加实例方法
//   Vue.prototype.$ServerAct = {
//     test() { },
//   }

// }
// Vue.use(ServerAct);
// console.log('----------start---------');


const router = new VueRouter({ routes })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')













