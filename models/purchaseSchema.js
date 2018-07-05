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

const PurchaseSchema = mongoose.Schema({
    number: String,
    management: String,
    requisitionDate: Date,
    UGR: String,
    sector: String,
    requester: String,
    requisitionItems: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Requisition' },
        itemSupplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
        qtdReceived: Number
    }],
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports.getPurchaseById = function (id, callback) {
    Purchase.findById(id).exec((err, purchase) => {
        if (err) {
            return callback(true, null)
        }
        purchase.populate('requisitionItems.item').populate('requisitionItems.itemSupplier', callback)
    });
}

module.exports.getAllPurchases = function (callback) {
    Purchase.find().exec((err, purchase) => {
        if (err) {
            return callback(true, null)
        }
        Purchase.populate(purchase, 'requisitionItems.item requisitionItems.itemSupplier', callback)
    });
}

module.exports.updatePurchase = function (updatedPurchase, callback) {
    Purchase.findOne({ '_id': updatedPurchase._id }, (err, purchase) => {
        purchase.number = updatedPurchase.number ? updatedPurchase.number : purchase.number
        purchase.management = updatedPurchase.management ? updatedPurchase.management : purchase.management
        purchase.requisitionDate = updatedPurchase.requisitionDate ? updatedPurchase.requisitionDate : purchase.requisitionDate
        purchase.UGR = updatedPurchase.UGR ? updatedPurchase.UGR : purchase.UGR
        purchase.sector = updatedPurchase.sector ? updatedPurchase.sector : purchase.sector
        purchase.requester = updatedPurchase.requester ? updatedPurchase.requester : purchase.requester
        purchase.requisitionItems = updatedPurchase.requisitionItems ? updatedPurchase.requisitionItems : purchase.requisitionItems

        purchase.save(callback)
    })
}

module.exports.addNewPurchase = function (newPurchase, callback) {
    Purchase.create(newPurchase, callback);
}

module.exports.deletePurchase = function (purchaseId, callback) {
    Purchase.findById(purchaseId).remove(callback);
}

module.exports.getAllItens = function (purchaseId, callback) {
    Purchase.findById(purchaseId, 'requisitionItems').exec((err, purchase) => {
        if (err) {
            return callback(true, null)
        }
        Purchase.populate(purchase, 'requisitionItems.item', callback)
    });
}
