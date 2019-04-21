var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var UserSchema = mongoose.Schema({
	name: {
		type: String
	},
    username: {
		type: String,
		index:true
	},
	email: {
		type: String,
		index:true
	},
	password: {
		type: String
	}
});
var User = module.exports = mongoose.model('User',UserSchema);
module.exports.createUser  = function(newUser,callback){
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}
module.exports.checkPassword = function(password,hash,callback){
	bcrypt.compare(password,hash,(err,isMatch)=>{
		if(err) throw err;
		callback(null,isMatch);
	});
}
/*module.exports.compare = function(password,hash,callback){
	bcrypt.compare(password,hash,(err,isMatch)=>{
		if(err) throw err;
    	callback(null, isMatch);
	});
}*/