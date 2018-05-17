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
 * - itemId: used for searching and recovering it's justification, quotation and descriptions from
 *   the Requisition Schema.
 * - itemSupplier: each product need to be provided by a supplier. Supplier model holds information
 *   about CNPJ, corporate name (razão social), company name, bids on other trades.
 */

const Purchasechema = mongoose.Schema({
    number: String,
    management: String,
    requisitionDate: String,
    UGR: String,
    sector: String,
    requester: String,
    requisitionItems: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Requisition' },
        itemSupplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Requisition' },
    }],
});

module.exports = mongoose.model('Purchase', Purchasechema);
const Purchase = mongoose.model('Purchase', Purchasechema);

module.exports.getPurchaseById = function (id, callback) {
    Purchase.findById(id).exec((err, purchase) => {
        purchase.populate('requisitionItems.item').populate('requisitionItems.itemSupplier', callback)
    });
}

//module.exports.getPurchaseByRequisitionDate = function(requisitionDate, callback) {
//   Purchase.find(callback);
//}

module.exports.getAllPurchases = function (callback) {
    Purchase.find().exec((err, purchase) => {
        Purchase.populate(purchase, 'requisitionItems.item requisitionItems.itemSupplier', callback)
    });
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
    Purchase.findById(purchaseId, 'requisitionItems').exec((err, purchase) => {
        Purchase.populate(purchase, 'requisitionItems.item', callback)
    });
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
