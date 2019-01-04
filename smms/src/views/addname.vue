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
            <span class="spans">添加管理员账号</span>
            <el-button style="float: right; padding: 3px 10px" type="text">添加账号</el-button>
            <el-button style="float: right; padding: 3px 10px" type="text">管理账号</el-button>
            <el-button style="float: right; padding: 3px 10px" type="text">修改密码</el-button>
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
            <el-form-item label="账号" prop="username">
              <el-input
                type="text"
                v-model="ruleForm2.username"
                autocomplete="off"
                class="inputbox"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm2.pass"
                autocomplete="off"
                class="inputbox"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm2.checkPass"
                autocomplete="off"
                class="inputbox"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户组" prop="usergroup">
              <el-select v-model="ruleForm2.usergroup" placeholder="请选择">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通管理员" value="普通管理员"></el-option>
              </el-select>
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
    var validatePassword = (rule, value, callback) => {
      if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        username: "",
        checkPass: "",
        usergroup: ""
      },
      rules2: {
        username: [
          // require:true 必填   blur失焦事件     出错信息
          { required: true, trigger: "blur", message: "用户名必须填写" },
          //min: 6 最小长度   max: 18 最大长度
          {
            min: 6,
            max: 18,
            message: "用户名长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        pass: [
          { required: true, trigger: "blur", message: "密码必须填写" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12 个字符",
            trigger: "blur"
          }
        ],
        checkPass: [
          { required: true, trigger: "blur", message: "密码必须填写" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12 个字符",
            trigger: "blur"
          },
          { validator: validatePassword, trigger: "blur" }
        ],
        usergroup: [
          { required: true, trigger: "change", message: "请选择用户组" }
        ]
      }
    };
  },

  methods: {
    // 菜单展开和收起的方法
    handleOpen(key, keyPath) {

    },
    handleClose(key, keyPath) {
      
    },
    // 提交表单的方法
    submitForm(formName) {
      // 调用组件验证验证的方法
      this.$refs[formName].validate(valid => {
        //valid参数表示验证的结果，true表示验证通过，false验证失败
        if (valid) {
          this.axios
            .post(
              "http://127.0.0.1:9000/user/useradd",
              this.qs.stringify(this.ruleForm2) //使用qs处理post的参数
            )
            .then(result => {
              //3）根据返回的结果处理业务逻辑
              if (result.data.isOk) {
                //添加成功
                this.$message({
                  message: result.data.msg,
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push("/namelist");
                }, 100);
              } else {
                //添加失败
                this.$message.error(result.data.msg);
              }
            })
            .catch(err => {
              console.error("服务器错误返回的信息", err);
            });
        } else {
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



