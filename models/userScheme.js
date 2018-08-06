const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// user schema
const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique:true
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('User', UserSchema);
const User = mongoose.model('User', UserSchema);

// get a single user by the id
module.exports.getUserById = function (id, callback) {
	User.findById(id, callback);
}

// get a single user by the id
module.exports.getAllUser = function (callback) {
    User.find(callback);
}

// get a single user by the email
module.exports.getUserByEmail = function (email, callback) {
	const query = {
		email: email			
	};
	User.findOne(query, callback);
}

// add a new user
module.exports.addUser = function (newUser, callback) {
	bcrypt.genSalt(10, function (err, salt){
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			if (err) throw err;
			newUser.password = hash;
			newUser.save(callback);
		})
	});
}

// compare the inputed password with the saved password
module.exports.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
		if(err) throw err;
		callback(null, isMatch);
	})
}

// update user data
module.exports.updateUser = function (updatedUser, callback) {
	this.getUserById(updatedUser._id, function (err, user) {
		if (err) throw  err;
		if (user) {
			user.name = updatedUser.name;
			user.email = updatedUser.email;
			user.save(callback);
		}
	});
}

// update password
module.exports.updatePassword = function (id, updatedPassword, callback) {
	this.getUserById(id, function (err, user) {
		bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(updatedPassword, salt, function (err, hash) {
				if (err) throw  err;
				user.password = hash;
				user.save(callback);
			});
		});
	});
}