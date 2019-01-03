import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// 引入登录组件
import Login from './views/Login.vue'
// 添加账号
import Addname from "./views/addname.vue"
// 账号管理
import Namelist from "./views/namelist.vue"
// 修改密码
import Pwdedit from "./views/pwdedit.vue"
// 分类管理
import Management from "./views/management.vue"
// 添加分类
import Addment from "./views/addment.vue"
// 商品添加
import Goodsadd from "./views/GoodsAdd.vue"
//商品管理
import Goodslist from "./views/GoodsList.vue"





Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/addname',
      component: Addname
    },
    {
      path: '/namelist',
      component: Namelist
    },
    {
      path: '/pwdedit',
      component: Pwdedit
    },
    {
      path: '/ment',
      component: Management
    },
    {
      path: '/addment',
      component: Addment
    },
    {
      path: '/goodsadd',
      component:Goodsadd
    },
    {
      path: '/goodslist',
      component:Goodslist
    },
  ]


})
