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
            <span class="spans">添加分类</span>
            <el-button style="float: right; padding: 3px 10px" type="text">添加分类</el-button>
            <el-button style="float: right; padding: 3px 10px" type="text">分类管理</el-button>
          </div>
          <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            label-width="100px"
            class="demo-ruleForm"
            label-position="top"
          >
            <el-form-item label="所属分类:" prop="usergroup">
              <el-select v-model="ruleForm2.usergroup" placeholder="--请选择--">
                <el-option label="--普通分类--" value="--普通分类--"></el-option>
                <el-option label="--顶级分类--" value="--顶级分类--"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分类名称：" prop="username">
              <el-input type="text" v-model="ruleForm2.username" autocomplete="off" class="inputbox"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="radio">
              <el-radio v-model="ruleForm2.radio" label="1">启用</el-radio>
              <el-radio v-model="ruleForm2.radio" label="2">不启用</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">添加</el-button>
            </el-form-item>
          </el-form>
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
      ruleForm2: {
        usergroup: "",
        username: "",
        raido:""
      },
      rules2: {
        usergroup: [
          { required: true, trigger: "change", message: "请选择分类等级" }
        ],
        username: [
          // require:true 必填   blur失焦事件     出错信息
          { required: true, trigger: "blur", message: "名称必须填写" },
          //min: 6 最小长度   max: 18 最大长度
          {
            min: 6,
            max: 18,
            message: "请填写正确的名称",
            trigger: "blur"
          }
        ],
        radio: [
          { required: true, trigger: "change", message: "请选择状态" }
        ],
      }
    };
  },

  methods: {
    // 菜单展开和收起的方法
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
     // 提交表单的方法
    submitForm(formName) {
      // 调用组件验证验证的方法
      this.$refs[formName].validate(valid => {
        //valid参数表示验证的结果，true表示验证通过，false验证失败
        if (valid) {
          alert("添加成功✔");
          //使用路由对象的push实现跳转(this指向实例)
          this.$router.push("/ment");
        } else {
          alert("添加失败✖");
          return false;
        }
      });
    }
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



