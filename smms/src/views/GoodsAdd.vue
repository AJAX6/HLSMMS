<template>
  <el-container id="frameBox">
    <!-- 左侧 -->
    <LeftMenu></LeftMenu>
    <!-- 右侧 -->
    <el-container id="mainContent">
      <!-- 顶部 -->
      <RightTop></RightTop>
      <!-- 中间 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>添加商品</h3>
          </div>
          <div class="text item">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="所属分类" prop="classname">
                <el-select v-model="ruleForm.classname" placeholder="请选择分类">
                  <el-option label="日用品" value="日用品"></el-option>
                  <el-option label="零食" value="零食"></el-option>
                  <el-option label="酒水" value="酒水"></el-option>
                  <el-option label="饮料" value="饮料"></el-option>
                  <el-option label="服装" value="服装"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="商品条形码" prop="barcode" class="inputboxs">
                <el-input v-model="ruleForm.barcode"></el-input>
                <el-button type="success" @click="createBarcode()">生成条码</el-button>
              </el-form-item>

              <el-form-item label="商品名称" prop="goodsname" class="inputboxs">
                <el-input v-model="ruleForm.goodsname"></el-input>
              </el-form-item>

              <el-form-item label="商品进价" prop="costprice" class="inputboxs">
                <el-input v-model="ruleForm.costprice" @blur="updatePrice()"></el-input>
              </el-form-item>

              <el-form-item label="商品售价" prop="saleprice" class="inputboxs">
                <el-input v-model="ruleForm.saleprice"></el-input>
              </el-form-item>

              <el-form-item label="市场价" prop="marketprice" class="inputboxs">
                <el-input v-model="ruleForm.marketprice"></el-input>
              </el-form-item>

              <el-form-item label="入库数量" prop="stocknum" class="inputboxs">
                <el-input v-model="ruleForm.stocknum"></el-input>
              </el-form-item>

              <el-form-item label="商品重量" prop="weight" class="inputboxs">
                <el-input v-model="ruleForm.weight"></el-input>
              </el-form-item>

              <el-form-item label="商品单位" prop="unit" class="inputboxs">
                <el-input v-model="ruleForm.unit"></el-input>
              </el-form-item>

              <!-- 注意： 选中的时候使用的是radio的label -->
              <el-form-item label="会员优惠" prop="isdiscount">
                <el-radio-group v-model="ruleForm.isdiscount">
                  <el-radio label="1" value="1">享受</el-radio>
                  <el-radio label="0" value="0">不享受</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="是否促销" prop="ispromotion">
                <el-radio-group v-model="ruleForm.ispromotion">
                  <el-radio label="1" value="1">启用</el-radio>
                  <el-radio label="0" value="0">禁用</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="商品简介" prop="details">
                <el-input type="textarea" rows="5" v-model="ruleForm.details"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">添加商品</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-main>
      <!-- 底部 -->
      <RightBottom></RightBottom>
    </el-container>
  </el-container>
</template>

<script>
//引入导航组件
import LeftMenu from "../components/leftMenu";
import RightTop from "../components/rightTop";
import RightBottom from "../components/rightBottom";

export default {
  components: {
    //注册组件
    LeftMenu,
    RightTop,
    RightBottom
  },
  data() {
    return {
      ruleForm: {
        classname: "",
        barcode: "",
        goodsname: "",
        saleprice: 0,
        marketprice: 0,
        costprice: 0,
        stocknum: 0,
        weight: "",
        unit: "",
        isdiscount: "1",
        ispromotion: "0",
        details: ""
      },
      rules: {
        classname: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        barcode: [{ required: true, message: "请输入条码", trigger: "blur" }],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        costprice: [
          { required: true, message: "商品进货价必须输入", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //表单验证通过
          this.axios
            .post("http://127.0.0.1:9000/goods/add", this.qs.stringify(this.ruleForm))
            .then(result => {
              if (result.data.isOk) {
                this.$message({
                  message:result.data.msg,
                  type: "success"
                });
                //确认对话框的内容
                this.$confirm(result.data.msg+', 是否继续添加?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  //重置表单
                  this.ruleForm={
                    classname: "",
                    barcode: "",
                    goodsname: "",
                    saleprice: 0,
                    marketprice: 0,
                    costprice: 0,
                    stocknum: 0,
                    weight: "",
                    unit: "",
                    isdiscount: "1",
                    ispromotion: "0",
                    details: ""
                  };
                }).catch(() => {
                  //取消执行的操作
                  this.$router.push("/goodslist");     
                });
              } else {
                this.$message.error(result.data.msg);
              }
            })
            .catch(err => {
              console.error(err.message);
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //生成条码的方法
    createBarcode() {
      this.ruleForm.barcode = new Date().getTime(); //根据客户的需求生成
    },
    updatePrice() {
      this.ruleForm.marketprice = this.ruleForm.costprice * 5;
      this.ruleForm.saleprice = this.ruleForm.marketprice * 0.9;
    }
  }
};
</script>


<style>

</style>













