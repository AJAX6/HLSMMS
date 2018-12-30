import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

//自己的样式在element 后面引入
import './assets/style/public.css'
// 引入axios
import axios from "axios"
// 挂载axios原型上
Vue.prototype.axios=axios
// 引入qs
import qs from "qs"
// 挂载qs原型上
Vue.prototype.qs=qs
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
