var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	Username: {
		type: String
	}, 
	Email:{
		type: String
	},
	Password: {
		type: String
	},
    PhoneNo : {
		type: Number
	}
});

var User = module.exports = mongoose.model('User', UserSchema);


//method to create User
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.Password, salt, function(err, hash) {
	        newUser.Password = hash;
	        newUser.save(callback);
	    });
	});
}

//methode to get user by User by Username
module.exports.getUserByUsername = function(username, callback){
	var query = {Username: re};
	User.findOne(query, callback);
}

//methode to get user by User by Id
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

//methode to check or compare password
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
