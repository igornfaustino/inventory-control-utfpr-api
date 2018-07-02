const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    admin: String
});

module.exports = mongoose.model('Admin', AdminSchema);
const Admin = mongoose.model('Admin', AdminSchema);

// TODO: verify if is user
module.exports.addNewAdmin = function (newAdmin, callback) {
    Admin.create(newAdmin, callback)
}

module.exports.getAllAdmin = function (callback) {
    Admin.find(callback)
}

module.exports.deleteAdmin = function (AdminId, callback) {
    Admin.findById(AdminId).remove(callback);
}