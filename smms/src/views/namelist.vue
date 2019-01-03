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
            <span class="spans">账号管理</span>
            <el-button style="float: right; padding: 3px 10px" type="text">添加账号</el-button>
            <el-button style="float: right; padding: 3px 10px" type="text">管理账号</el-button>
            <el-button style="float: right; padding: 3px 10px" type="text">修改密码</el-button>
          </div>

          <el-table :data="tableUse" style="width: 100%">
            <el-table-column label="用户ID" width="200">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.userid }}</span>
              </template>
            </el-table-column>

            <el-table-column label="用户名称" width="200">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.username }}</span>
              </template>
            </el-table-column>

            <el-table-column label="用户组" width="200">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.usergroup }}</el-tag>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="日期" width="200">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.addDate }}</span>
              </template>
            </el-table-column>

            <el-table-column label="用户管理">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row.userid)">
                  <i class="el-icon-edit"></i>编辑
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.userid)">
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
    <!-- 编辑用户 -->
    <el-dialog
      title="修改用户资料"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      id="mydailog"
    >
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
        label-position="right"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="userpwd">
          <el-input type="text" v-model="ruleForm2.userpwd" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="用户组" prop="usergroup">
          <el-select v-model="ruleForm2.usergroup" placeholder="请选择">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm2')">确定修改</el-button>
      </span>
    </el-dialog>
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
      tableUse: [],
      dialogVisible: false,
      ruleForm2: {
        userpwd: "",
        username: "",
        usergroup: "",
        userid: 0
      },
      rules2: {
        username: [
          //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "用户名必须填写" },
          //min: 6 最小长度   max: 18 最大长度
          {
            min: 6,
            max: 18,
            message: "用户名长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        userpwd: [
          { required: true, trigger: "blur", message: "密码必须填写" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12 个字符",
            trigger: "blur"
          }
        ],
        usergroup: [
          { required: true, trigger: "change", message: "请选择用户组" }
        ]
      }
    };
  },
  methods: {
    //提交表单的方法
    submitForm(formName) {
      //调用组件的验证方法提交表单是验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          //获取用户数据
          console.log(this.ruleForm2);
          this.axios
            .post(
              "http://127.0.0.1:9000/user/usersave",
              this.qs.stringify(this.ruleForm2)
            )
            .then(result => {
              if (result.data.isOk) {
                this.$message({
                  message: result.data.msg,
                  type: "success"
                });
                //修改完毕就关闭对话框
                this.dialogVisible = false;
                //调用获取数据的方法更新数据列表
                this.getusers();
              } else {
                this.$message.error(result.data.msg);
              }
            })
            .catch(err => {
              this.$message.error(err.message);
            });
        } else {
          return false;
        }
      });
    },

    getusers() {
      this.axios
        .get("http://127.0.0.1:9000/user/getusers")
        .then(result => {
          this.tableUse = result.data; //
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    
    handleEdit(userid) {
       this.axios
        .get("http://127.0.0.1:9000/user/getuserbyid?userid=" + userid)
        .then(oldUserData => {
          //(5)前端——把旧的数据回填的表单中
          this.ruleForm2 = oldUserData.data[0]; //把旧的数据赋值给表单数据对象，包含了userid
          //5-1. 准备模态框
          //5-2. 使用双向数据绑定回填数据
          this.dialogVisible = true; //显示对话框
        })
        .catch(err => {
          this.$message.error("出错了：" + err.message); //调用消息框给用户提示
        });
    },
    handleDelete(userid) {
      this.$confirm("确认要删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("http://127.0.0.1:9000/user/deluser?userid=" + userid)
            .then(result => {
              //删除成功
              result = result.data;
              if (result.isOk) {
                this.$message({
                  message: result.msg,
                  type: "success"
                });
                // 更新用户
                this.getusers();
              } else {
                //删除失败
                this.$message.error(result.msg);
              }
            })
            .catch(err => {
              this.$message.error(err.message); //调用消息框给用户提示
            });
        })
        .catch(() => {});
    },
    //关闭对话框的确认方法
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },

  // 列表添加
  created() {
    this.axios
      .get("http://127.0.0.1:9000/user/getusers")
      .then(result => {
        this.tableUse = result.data;
      })
      .catch(err => {
        console.log(err.message);
      });
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



