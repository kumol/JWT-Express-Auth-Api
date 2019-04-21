const jwt = require('jsonwebtoken');
var localStorage = require('localStorage');

module.exports = (req,res,next)=>{
    try{
        const to_token = localStorage.getItem('token');
        const decoded = jwt.verify(to_token,'secretkey');
        req.userData = decoded;
        next();
    }catch(error){
        if(req.url=='/login'){
            res.render('user/login',{layout:'main'});
        }else{
            res.redirect("/users/login");
        }
    }
}