var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const passport = require('passport');

//express的消息提示中间件,用于传递登录失败的一些信息
var flash = require('express-flash');


var app = express();

// 连接数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/local',{ config: { autoIndex: false }, useNewUrlParser: true });
const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open',()=>{
    console.log('数据库连接成功！');
})


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header('Cache-Control','no-store')
  next();
})

//这里周期只设置为20秒，为了方便测试
//secret在正式用的时候务必修改
//express中间件顺序要和下面一致
// app.use(session({secret: 'zhoulijie', cookie: { maxAge: 20000 }}));
app.use(flash());
// passport 初始化
app.use(passport.initialize());
/**
 * 加载路由
 */
require('./routes/index')(app);

require('./config/passport')(passport);

module.exports = app;
