const mongoose = require('mongoose');

const UGRSchema = mongoose.Schema({
    ugr: String
});

module.exports = mongoose.model('UGR', UGRSchema);
const UGR = mongoose.model('UGR', UGRSchema);

module.exports.addNewUGR = function (newUGR, callback) {
    UGR.create(newUGR, callback)
}

module.exports.getAllUGR = function (callback) {
    UGR.find(callback)
}
