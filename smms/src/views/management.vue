<template>
  <el-container id="frameBox">
    <!-- 左边的盒子 -->
    <LeftMenu></LeftMenu>

    <!-- 右边的盒子 包含 变化内容 头部 尾部-->
    <el-container id="mainContent">
      <!-- 右边上面的盒子 -->
      <RightTop></RightTop>

      <!-- 中间内容盒子 --------------------内容模块-->
      <el-main>
        <!-- 卡片组件 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="spans">分类管理</span>
            <el-button style="float: right; padding: 3px 10px" type="text">添加分类</el-button>
            <el-button style="float: right; padding: 3px 10px" type="text">分类管理</el-button>
          </div>
          <el-table :data="tableUse" style="width: 100%">
            <el-table-column label="分类名称" width="680">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.usename }}</span>
              </template>
            </el-table-column>
            <el-table-column label="分类管理">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                  <i class="el-icon-edit"></i>编辑
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                  <i class="el-icon-delete"></i>删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>

      <!-- 下面的盒子 -->
      <RightBottom></RightBottom>
    </el-container>
  </el-container>
</template>




<script>
// 引入导航组件
import LeftMenu from "../components/leftMenu";
import RightTop from "../components/rightTop.vue";
import RightBottom from "../components/rightBottom.vue";

export default {
  // 表格的
  data() {
    return {
      tableUse: [
        {
          usename: "好扯"
        },
        {
          usename: "All in"
        },
        {
          usename: "AJAX"
        },
        {
          usename: "All in"
        },
        {
          usename: "好扯"
        }
      ]
    };
  },

  //公共样式 注册组件
  components: {
    LeftMenu,
    RightTop,
    RightBottom
  }
};
</script>

<style>
</style>



