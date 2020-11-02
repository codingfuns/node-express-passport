const userModel = require('../models/model-user').userModel;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const keys = require('../../config/keys');
const passport = require('passport');
/**
 * @description register controller
 */
exports.userRegist = function(req,res){
  console.log(req.body.email)
  userModel.findOne({email:req.body.email}).then(user=>{
    if(user){
      return res.status(400).json('邮箱已被注册');
    }else{
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      const newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password:req.body.password,
        identity:req.body.identity
      });

      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err, hash)=>{
          if(err) throw err;
          newUser.password = hash;

          newUser.save().then(user=>{
            res.json(user);
            
          })
          .catch(err => console.log(err));
        })
      })
    }
  })
}

/**
 * @description login api
 */
exports.userLogin = function(req,res){
  const email = req.body.email;
  const password = req.body.password;
  console.log(email,password)
  userModel.findOne({email:email}).then(user=>{
    if(!user){
      return res.status(404).json('用户不存在1！');
    }    
    bcrypt.compare(password,user.password).then(isMatch=>{
      if(isMatch){
        const rule = {
          id: user.id,
          name:user.name,
          avatar:user.avatar,
          identity: user.identity
        };
        console.log(rule);
        jwt.sign(rule,keys.secretOrKey,{expiresIn: 3600},(err,token)=>{
          if (err) throw err;
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
          console.log('Bearer ' + token)
        })
      }else{
        return res.json({
          status:400,
          errmsg: '密码错误!'
        })
      }
    })
  })
}

/**
 * @description get user info
 */
exports.getUserInfo = (req, res) => {
  console.log(req.user)
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identity: req.user.identity
  });
}
