<template>
  <!-- 左边的盒子 -->
  <el-aside width="231px">
    <!-- 自己加的标签 -->
    <h2>军火超市管理系统</h2>
    <p class="titlebox">
      您好,
      <span>好扯</span>
    </p>
    <p class="titlebox">
      <router-link to="/">管理首页</router-link> |
      <a href="javascript:void(0)" @click="loginOut()">退出系统</a>
    </p>
    <!-- 左边菜单 -->
    <el-menu
      :unique-opened="true"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1">
        <template slot="title">
          <span>分类管理</span>
        </template>
        <el-menu-item index="/ment">
          <router-link to="/ment">分类管理</router-link>
        </el-menu-item>
        <el-menu-item index="/addment">
          <router-link to="/addment">添加分类</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>商品管理</span>
        </template>
        <el-menu-item index="/goodslist"><router-link to="/goodslist">商品管理</router-link></el-menu-item>
        <el-menu-item index="/goodsadd"><router-link to="/goodsadd">商品添加</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>进货管理</span>
        </template>
        <el-menu-item index="1-1">库存管理</el-menu-item>
        <el-menu-item index="1-2">添加库存</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <span>出货管理</span>
        </template>
        <el-menu-item index="1-1">销售列表</el-menu-item>
        <el-menu-item index="1-2">商品出库</el-menu-item>
        <el-menu-item index="1-3">商品退货</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <span>统计管理</span>
        </template>
        <el-menu-item index="1-1">统计管理</el-menu-item>
        <el-menu-item index="1-2">进货管理</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <span>账号管理</span>
        </template>
        <el-menu-item index="/namelist">
          <router-link to="/namelist">账号管理</router-link>
        </el-menu-item>
        <el-menu-item index="/addname">
          <router-link to="/addname">添加账号</router-link>
        </el-menu-item>
        <el-menu-item index="/pwdedit">
          <router-link to="/pwdedit">密码修改</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <span>会员管理</span>
        </template>
        <el-menu-item index="1-1">账号管理</el-menu-item>
        <el-menu-item index="1-2">添加管理</el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <span>系统管理</span>
        </template>
        <el-menu-item index="/">
          <router-link to="/">系统信息</router-link>
        </el-menu-item>
        <el-menu-item index="1-2">系统配置</el-menu-item>
        <el-menu-item index="1-3">权限管理</el-menu-item>
        <el-menu-item index="1-4">添加管理组</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>



<script>
export default {
  data() {
    return {
      isOpened: true
    };
  },
  methods: {
    // 菜单展开和收起的方法
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    loginOut() {
      //发起ajax到后端路由去执行清除cookie的操作
      this.axios
        .get("http://127.0.0.1:9000/user/loginOut")
        .then(result => {
          //根据是否清除成功处理业务逻辑
          if (result.data.isOk) {
            this.$message({
              message: "退出成功",
              type: "success"
            });
            this.$router.push("/login");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


<style>
</style>
