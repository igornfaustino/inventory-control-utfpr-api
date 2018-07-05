const mongoose = require('mongoose');
const User = require('./userScheme');

const AdminSchema = mongoose.Schema({
    admin: String
});

module.exports = mongoose.model('Admin', AdminSchema);
const Admin = mongoose.model('Admin', AdminSchema);

module.exports.getAdmin = function (admin, callback) {
    Admin.findOne({
        admin: admin
    }, callback)
}

module.exports.addNewAdmin = function (newAdmin, callback) {
    User.getUserByEmail(newAdmin.admin, (err, user) => {
        if (user) {
            Admin.create(newAdmin, callback)
        } else {
            callback("user not found", null)
        }
    })
}

module.exports.getAllAdmin = function (callback) {
    Admin.find(callback)
}

module.exports.deleteAdmin = function (AdminId, callback) {
    Admin.findById(AdminId).remove(callback);
}