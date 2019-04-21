var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var localStorage = require("localStorage");
var adminAuth = require('./admin-auth-check');
router.get('/login',adminAuth,(req,res)=>{
    console.log("Will be redirected to the page ");
    res.redirect('/admin/dashbord');
});
router.post('/login',(req,res,next)=>{
    var adminUsername = req.body.username;
    var adminPassword = req.body.password;
    if(adminUsername==="admin"){
        if(adminPassword==="admin"){
            jwt.sign({username:adminUsername,password:adminPassword},'secretkeyadmin',(err,token)=>{
                localStorage.setItem('adminToken',token);
                var myValue = localStorage.getItem("token");
                console.log("my value is : :" + myValue);
                next();
            });
            res.redirect("/admin/dashbord");
        }else{
            res.redirect('/admin/auth/login');
        }
    }else{
        res.redirect('/admin/auth/login');
    }
})
module.exports = router;