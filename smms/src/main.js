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

//构造全局守卫
router.beforeEach((to, from, next) => {
  axios.defaults.withCredentials=true;
  axios.get("http://127.0.0.1:9000/user/getCookie").then(result=>{
    if(result.data.isOk || to.path=="/login"){
      next(); //录成功放行
    }
    //否则就跳转到登录页面
    else{
      //console.log("to",to);
      next("/login");
    }
  }).catch(err=>{
    console.error(err.message);
  });
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
