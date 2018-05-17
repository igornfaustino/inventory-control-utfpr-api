const mongoose = require('mongoose');

const SupplierSchema = mongoose.schema({
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