const mongoose = require('mongoose');

const SupplierSchema = mongoose.Schema({
    name: String,
    cnpj: String,
    phone: String,
    address: {
        number: Number,
        street: String,
        city: String,
        state: String,
        country: String,
    }
});

module.exports = mongoose.model('Supplier', SupplierSchema);
const Supplier = mongoose.model('Supplier', SupplierSchema);

module.exports.addNewSupplier = function (newSupplier, callback) {
    Supplier.create(newSupplier, callback)
}

module.exports.getAllSuppliers = function (callback) {
    Supplier.find(callback)
}

module.exports.getSupplierById = function (supplierId, callback) {
    Supplier.findById(supplierId, callback)
}

module.exports.updateSupplier = function (updateSupplier, callback) {
    Supplier.update({ '_id': updateSupplier._id }, updateSupplier, callback);
}

module.exports.deleteSupplier = function (supplierId, callback) {
    Supplier.findById(supplierId).remove(callback);
}