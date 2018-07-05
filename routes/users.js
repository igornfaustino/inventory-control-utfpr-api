const express = require('express');
const router = express.Router();
const config = require('config');
const User = require('../models/userScheme');
const Admin = require('../models/adminSchema');

// Login
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { isAdmin, isUserAdmin } = require("../middleWares/isAdminMW");

// Validation
const Joi = require('joi');
const validator = require('express-joi-validation')({});
const { LoginSchema, UserSchema, AdminSchema } = require('../utils/validatorSchema');
const userValidation = Joi.object(UserSchema);
const loginValidation = Joi.object(LoginSchema);
const adminValidation = Joi.object(AdminSchema);

// REGISTER
router.post('/register', validator.body(userValidation), function (req, res, next) {
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});

	User.addUser(newUser, function (err, user) {
		if (err) {
			res.status(400).json({ success: false, msg: 'Failed to register user' });
		} else {
			res.status(201).json({ success: true, msg: 'user registered' });

		}
	});
});

// AUTHENTICATE
router.post('/authenticate', validator.body(loginValidation), isUserAdmin, function (req, res, next) {
	email = req.body.email;
	password = req.body.password;

	User.getUserByEmail(email, function (err, user) {
		if (err) throw err;
		if (!user) {
			return res.json({ success: false, msg: 'User not found' });
		}
		User.comparePassword(password, user.password, function (err, isMatch) {
			if (isMatch) {
				user.password = undefined;
				const token = jwt.sign(user.toJSON(), config.secret);
				res.json({
					success: true,
					token: "bearer " + token,
					user: {
						id: user._id,
						name: user.name,
						email: user.email,
						admin: req.admin
					}
				});
			} else {
				return res.json({ succes: false, msg: 'Wrong password' });
			}
		});
	});
});

// // UPDATE USER
// router.put('/update', validator.body(userValidation), passport.authenticate('jwt', { session: false }), function (req, res, next) {
// 	updatedUser = req.body;
// 	User.updateUser(updatedUser, function (err, user) {
// 		if (err) {
// 			res.json({ success: false, msg: 'Failed to update user' });
// 		} else {
// 			res.json({ success: true, msg: 'User updated' });
// 		}
// 	});
// });

// // UPDATE PASSWORD
// router.put('/update/:id', passport.authenticate('jwt', { session: false }, (teste) => { console.log(teste) }), function (req, res, next) {
// 	id = req.params.id;
// 	updatedPassword = req.body.password;
// 	User.updatePassword(id, updatedPassword, function (err, user) {
// 		if (err) {
// 			res.json({ success: false, msg: 'Failed to update password' });
// 		} else {
// 			res.json({ success: true, msg: 'Password updated' });
// 		}
// 	});
// });

// PROFILE
router.get('/profile', passport.authenticate('jwt', { session: false }), isAdmin, function (req, res) {
	res.json({ user: req.user });
})

// Admin Functions

// GET all type of itens.
router.get('/admin', function (req, res) {
	Admin.getAllAdmin((err, admin) => {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).json({ success: true, admin: admin })
	})
});

// add new Admin
router.post('/admin', validator.body(adminValidation), function (req, res) {
	let newAdmin = req.body;
	Admin.addNewAdmin(newAdmin, (err, admin) => {
		if (err) {
			return res.status(400).send(err);
		}
		res.status(201).json({ success: true, msg: 'Admin added', admin: admin });
	})
});

/**
 * DELETE /api/equipment/:id
 */
router.delete('/admin/:id', function (req, res) {
	const id = req.params.id;
	Admin.deleteAdmin(id, function (err) {
		if (err) {
			return res.json({ success: false, msg: 'Failed to delete Admin' });
		}
		res.status(204).send()
	});
});

module.exports = router;
