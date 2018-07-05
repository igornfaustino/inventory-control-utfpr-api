const Admin = require("../models/adminSchema");

const isAdmin = (req, res, next) => {
	Admin.getAdmin(req.user.email, (err, admin) => {
		if(admin){
			req.admin = true;
			next();
		} else {
			res.status(401).send("Unauthorized");
		}
	})
};

const isUserAdmin = (req, res, next) => {
	Admin.getAdmin(req.body.email, (err, admin) => {
		if(admin){
			req.admin = true;
		} else {
			req.admin = false;
		}
		next();
	})
}

module.exports = {
	isAdmin,
	isUserAdmin
}