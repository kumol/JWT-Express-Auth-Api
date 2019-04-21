var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var checkAuth = require('./check-auth');
var localStorage = require("localStorage");
/* GET users listing. */
router.get('/',checkAuth,function(req, res, next) {
  console.log(req.userData.username); 
  res.redirect("/users/user");
});
router.get('/register',(req,res)=>{
  res.render('user/register',{layout:"main"});
})
router.get('/login',checkAuth,(req,res)=>{
  res.redirect('/users/user');
});
router.get('/logout',(req,res)=>{
  localStorage.removeItem('token');
  res.redirect('/users/login');
})
router.get('/user',checkAuth,(req,res)=>{
  res.render("user/user",{layout:"main"});
});
/* all POST Users listing */
router.post('/register',(req,res)=>{
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  
    var newUser = new User({
      name : name,
      username : username,
      email : email,
      password : password
    });

    User.createUser(newUser,(err,user)=>{
      if (err) throw err;
      console.log(newUser);
    });
    res.redirect('login');
});
router.post('/login',(req,res,next)=>{
  var username = req.body.username;
  User.findOne({username:username},(err,user)=>{
    if(!user){
      console.log("Invalid user");
    }else{
      User.checkPassword(req.body.password,user.password,(err,isMatch)=>{
        if(err) throw err;
        if(isMatch){
          jwt.sign({username : user.username , email:user.email},'secretkey',(err,token)=>{
            localStorage.setItem('token',token);
            var myValue = localStorage.getItem("token");
            console.log("my value is : :" + myValue);
            res.redirect('/users');
            next();
          });
        }else{
          console.log("Invalid password");
        }
      });
    }
  });
});

module.exports = router;