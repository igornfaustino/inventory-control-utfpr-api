const mongoose = require('mongoose');

const StatusSchema = mongoose.Schema({
    status: String
});

module.exports = mongoose.model('Status', StatusSchema);
const Status = mongoose.model('Status', StatusSchema);

module.exports.addNewStatus = function (newStatus, callback) {
    Status.create(newStatus, callback)
}

module.exports.getAllStatus = function (callback) {
    Status.find(callback)
}
