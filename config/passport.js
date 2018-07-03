const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userScheme');
const config = require('config')

module.exports = function (passport) {
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
		User.getUserById(jwt_payload._id, function (err, user) {
			if (err){
				return done(err, false);
			}
			if(user){
				user.password = undefined
				return done(null, user);
			} else {
				return done(null, false);
			}
		})
	}))
}
