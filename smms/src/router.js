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

    // 公共组件 菜单 左边标题和底部标题
    /* {
      path: '/useradd',
      component: UserAdd
    },
    {
      path: '/userlist',
      component: UserList
    },
    {
      path: '/pwdedit',
      component: UserPwdEdit
    }, */
  ]


})
