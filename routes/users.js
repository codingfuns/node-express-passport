
var User = require('../app/controllers/controller-user');
var Spider = require('../app/controllers/controller-spider');
var passport = require('passport');
module.exports = function(app){
    app.get('/getUserInfo',passport.authenticate('jwt', { session: false }),User.getUserInfo);
    app.post('/register',User.userRegist);
    app.post('/userlogin',User.userLogin);
    app.get('/getSpiderData',Spider.getData)
}