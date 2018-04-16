import mongoose, { Schema } from 'mongoose';
const Schema = mongoose.Schema;

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

const purchaseRequisition = new Schema({
    purchaseId: { type: Number, require: true },
    management: String, 
    requisitionDate: Date,
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

module.exports = mongoose.model('purchase', purchaseRequisition);