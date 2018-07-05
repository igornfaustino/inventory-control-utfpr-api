const mongoose = require('mongoose');

const TypeItemSchema = mongoose.Schema({
    type: String
});

module.exports = mongoose.model('TypeItem', TypeItemSchema);
const TypeItem = mongoose.model('TypeItem', TypeItemSchema);

module.exports.addNewTypeItem = function (newTypeItem, callback) {
    TypeItem.create(newTypeItem, callback)
}

module.exports.getAllTypeItems = function (callback) {
    TypeItem.find(callback)
}

module.exports.deleteType = function (typeId, callback) {
    TypeItem.findById(typeId).remove(callback);
}