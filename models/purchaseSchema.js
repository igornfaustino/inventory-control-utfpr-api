const mongoose = require('mongoose');

/**
 * Purchase (Requisição) Schema models It's Requisitions and Items: 
 * Purchase fields include:
 * - purchase identification: obrigatory
 * - management: for example '15246-UTFPR-UTFPR'
 * - requisitionDate
 * - UGR: for example '153251.04.17 - LABORATÓRIOS DE COMPUTAÇÃO'
 * - requester
 * - originOfCost: for example consumption or permanent equipment
 * - sector: 'DACOM'
 * - itemId: used for searching and recovering it's justification, prices and descriptions from
 *   the Requisition Schema.
 * - itemSupplier: each product need to be provided by a supplier. Supplier model holds information
 *   about CNPJ, corporate name (razão social), company name, bids on other trades.
 */

const Purchasechema = mongoose.Schema({
    management: String,
    requisitionDate: String,
    UGR: String,
    sector: String,
    requester: String,
    requisitionItems: [{
        siorg: String,
        description: { type: String, require: true },
        justification: { type: String, require: true },
        prices: [
            {
                requisitionType: { type: String, require: true },
                reference: String,
                value: Number
            }
        ],
        priceJustification: String,
        qtd: { type: Number, require: true },
        itemSupplier: {
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
        },
    }],
});

module.exports = mongoose.model('Purchase', Purchasechema);
const Purchase = mongoose.model('Purchase', Purchasechema);

module.exports.getPurchaseById = function (id, callback) {
    Purchase.findById(id, callback);
}

//module.exports.getPurchaseByRequisitionDate = function(requisitionDate, callback) {
//   Purchase.find(callback);
//}

module.exports.getAllPurchases = function (callback) {
    Purchase.find(callback);
}

module.exports.updatePurchase = function (updatedPurchase, callback) {
    Purchase.update({ '_id': updatedPurchase._id }, updatedPurchase, callback)
}

module.exports.addNewPurchase = function (newPurchase, callback) {
    Purchase.create(newPurchase, callback);
}

module.exports.deletePurchase = function (purchaseId, callback) {
    Purchase.findById(purchaseId).remove(callback);
}

module.exports.getAllItens = function (purchaseId, callback) {
    Purchase.findById(purchaseId, 'requisitionItems', callback)
}

module.exports.updateSupplier = function (supplier, callback) {
    Purchase.updateMany({
        'requisitionItems.itemSupplier.cnpj': supplier.cnpj
    },
        {
            $set:
                {
                    'requisitionItems.$.itemSupplier': supplier
                }

        }, callback);
}
