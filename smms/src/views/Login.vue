<template>
  <div id="logBox">
    <h1>军火超市管理系统</h1>
    <!-- 卡片 -->
    <el-card class="box-card" id="Login">
      <div slot="header" class="clearfix">
        <span>
          <h3>用户登录</h3>
        </span>
        <!-- 登录 -->
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="ruleForm2.username" autocomplete="off" class="loginuse"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </div>
</template>


<script>
export default {
  data() {
    return {
      ruleForm2: {
        pass: "",
        username: ""
      },
      rules2: {
        username: [
          // require:true 必填   blur失焦事件     出错信息
          { required: true, trigger: 'blur', message: "用户名必须填写" },
           //min: 6 最小长度   max: 18 最大长度
          { min:6, max:18, message: '用户名长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        pass:[
          { required: true, trigger: 'blur', message: "密码必须填写" },
          { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    // 提交表单的方法
    submitForm(formName) {
      // 调用组件验证验证的方法
      this.$refs[formName].validate(valid => {
        //valid参数表示验证的结果，true表示验证通过，false验证失败
        if (valid) {
          alert("登录成功✔");
          //使用路由对象的push实现跳转(this指向实例)
          this.$router.push('/');
        } else {
          alert("登录失败✖");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
  #logBox{
    background:url(../assets/bjt.jpg) no-repeat;
    background-size:100%;
  }
  #Login{
    width:450px;
    height:280px;
    position:absolute;
    top:0px;
    left: 0px;
    right:0px;
    bottom: 0px;
    margin:auto;
  }
h1{
  margin: 0 auto;
  color: #fff;
  line-height: 100px;
  width: 400px;
  font-size: 50px;
}
</style>







