var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require("express-handlebars");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var dashbordRouter = require('./routes/dashbord');
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
mongoose.connect("mongodb://kumol:kumol@ds127490.mlab.com:27490/registration",(err)=>{
    if(err){
        console.log("Unable to connect the database");
    }else{
        console.log("Successfully connected with database ");
    }
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//   handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// bodyparser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/auth',adminRouter);
app.use('/admin/dashbord',dashbordRouter);
module.exports = app;
