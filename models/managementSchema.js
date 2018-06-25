const mongoose = require('mongoose');

const ManagementSchema = mongoose.Schema({
    management: String
});

module.exports = mongoose.model('Management', ManagementSchema);
const Management = mongoose.model('Management', ManagementSchema);

module.exports.addNewManagement = function (newManagement, callback) {
    Management.create(newManagement, callback)
}

module.exports.getAllManagement = function (callback) {
    Management.find(callback)
}
