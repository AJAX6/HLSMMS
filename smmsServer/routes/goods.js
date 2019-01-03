var express = require("express");
var router = express.Router();

//引入自定义的数据库连接模块
var mysql = require("mysql");

//数据库连接配置（创建数据库连接）
const conn = mysql.createConnection({
    host: "localhost", //数据库主机名
    user: "root", //数据库账号
    password: "root", //密码
    database: "hlsmms" //使用哪个数据库
  });

//通用的跨域路由
router.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080"); //允许携带cookie证书的域名
  res.header("Access-Control-Allow-Credentials", true); //值是一个布尔值，表示是否允许发送Cookie
  next(); //放行执行下面的路由
});

//添加商品的路由
router.post("/add", (req, res) => {
  //接收数据
  let {
    classname,
    barcode,
    goodsname,
    saleprice,
    marketprice,
    costprice,
    stocknum,
    weight,
    unit,
    isdiscount,
    ispromotion,
    details
  } = req.body;

  //构造sql语句
  let sqlStr =
    "insert into goodsinfo(classname,barcode,goodsname,saleprice,marketprice,costprice,stocknum,weight,unit,isdiscount,ispromotion,details) values(?,?,?,?,?,?,?,?,?,?,?,?)";
  let sqlParams = [
    classname,
    barcode,
    goodsname,
    saleprice,
    marketprice,
    costprice,
    stocknum,
    weight,
    unit,
    isdiscount,
    ispromotion,
    details
  ];
  conn.query(sqlStr, sqlParams, (err, result) => {
    if (err) {
      throw err;
    } else {
      //后端——根据执行是否成功返回json给前端
      if (result.affectedRows > 0) {
        res.json({ isOk: true, msg: "商品添加成功!" });
      } else {
        res.json({ isOk: false, msg: "商品添加失败!" });
      }
    }
  });
});

//获取商品列表的路由
router.get("/getgoods", (req, res) => {
  //后端——接收 商品分类和关键词
  let { classname, keywords } = req.query;
  let sqlStr = "select * from goodsinfo where 1=1";
  //商品分类有值就执行拼接
  if (classname) {
    sqlStr += ` and classname='${classname}'`; //字符串加引号
  }
  //关键词有值就执行拼接
  if (keywords) {
    sqlStr += ` and (goodsname like '%${keywords}%' or barcode like '%${keywords}%')`; //商品名和条码二选一
  }

  //拼接排序的字句【排序】---------------------------------------------------------------------------
  sqlStr += " order by goodsid DESC";

  let total = 0;
  conn.query(sqlStr, (err, goodsTotal) => {
    if (err) {
      throw err;
    } else {
      total = goodsTotal.length;
    }
  });

  // 分页
  let { pagesize, currentpage } = req.query;
  console.log("pagesize", pagesize, "currentpage", currentpage);

  //拼接分页的sql语句
  if (pagesize && currentpage) {
    let skip = (currentpage - 1) * pagesize;
    sqlStr += ` limit ${skip},${pagesize}`;
  }

  //执行sql查询
  conn.query(sqlStr, (err, goodsArray) => {
    if (err) {
      throw err;
    } else {
      res.send({ total: total, goodsArray: goodsArray }); //如果没有数据就是空数组，有数据就是数组对象
    }
  });
});

module.exports = router;
