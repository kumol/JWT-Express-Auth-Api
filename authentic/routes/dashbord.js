var express = require('express');
var router = express.Router();
var adminAuth = require('./admin-auth-check');
var localStorage = require('localStorage');
router.get('/',adminAuth,(req,res)=>{
    res.render("admin/dashbord/index",{layout:'admin'});
});
router.get('/logout',(req,res,next)=>{
    localStorage.removeItem("adminToken");
    res.redirect("/admin/auth/login");
});
module.exports = router;