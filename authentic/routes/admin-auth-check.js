var jwt = require('jsonwebtoken');
var localStorage = require('localStorage');
module.exports = (req,res,next)=>{
    var adminToken = localStorage.getItem('adminToken');
    try{
        const decoded = jwt.verify(adminToken,'secretkeyadmin');
        req.adminData = decoded;
        next();
    }catch(error)
    {   console.log(req.url);
        if(req.url=="/login"){
            console.log(req.url + " going to render admin/login/index");
            res.render('admin/login/index',{layout:'adminraw'}).reload(app);
        }else{
            console.log(req.url+ " Going to redirect /admin/auth/login");
            res.redirect('/admin/auth/login');
        }
    }
}