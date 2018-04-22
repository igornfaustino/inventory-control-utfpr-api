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

const RequisitionSchema = mongoose.Schema ({
    management: String, 
    requisitionDate: String,
    UGR: String,
    originOfCost: String,
    sector: String,
    requester: String,
    requisitionItems: [{
        itemId: Number,
        itemSupplier: [{
            supplierId: { type: Number, require: true }
        }],
    }],
});

module.exports = mongoose.model('Purchase', RequisitionSchema);
const Purchase = mongoose.model('Purchase', RequisitionSchema);

module.exports.getPurchaseById = function(id, callback) {
    Purchase.findById(id, callback);
}

//module.exports.getPurchaseByRequisitionDate = function(requisitionDate, callback) {
//   Purchase.find(callback);
//}

module.exports.getAllPurchases = function(callback) {
    Purchase.find(callback);
}

module.exports.updatePurchase = function(updatedPurchase, callback) {
    this.getPurchaseById(updatedPurchase._id, function(err, purchase) {
        if(err) throw err;
        if(purchase) {
            purchase.management = updatedPurchase.management;
            purchase.requisitionDate = updatedPurchase.requisitionDate;
            purchase.UGR = updatedPurchase.UGR;
            purchase.originOfCost = updatedPurchase.originOfCost;
            purchase.sector = updatedPurchase.sector;
            purchase.requester = updatedPurchase.requester;
            purchase.requisitionItems = updatedPurchase.requisitionItems;
            purchase.save(callback);
        }
    })
}

module.exports.addNewPurchase = function(newPurchase, callback) {
    Purchase.create(newPurchase, callback);
}

module.exports.deletePurchase = function(purchaseId, callback) {
    Purchase.findById(purchaseId).remove(callback);
}
