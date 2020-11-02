var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userShema = new Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    identity: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
  });

  userShema.index({userName: 1}); 
  userShema.statics.saveUserInfo = function(obj,callback){
      return this.create(obj,callback)
  }
  userShema.statics.findUserByName = function(name,callback){
      return this.find({userName:name},callback)
  }

  
exports.userModel = mongoose.model('USERINFO', userShema)