const monoogose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Requisition Schema is a model of one product requisition
 * - can have a siorg code
 * - Must have a description
 * - Must have a justification
 * - When is create, can have a price... in the end.. should have at least 3 prices, if not, should have a price justification
 * - qtd of products
 * - requestId is a ID of the guy who ade the requisition. 
 */
const RequisitionSchema = new Schema({
	siorg: String,
	description: { type: String, require: true },
	justification: { type: String, require: true },
	prices: [
		{
			type: { type: String, require: true },
			priceRef: String
		}
	],
	priceJustification: String,
	qtd: { type: Number, require: true },
	// requesterId: { type: String, require: true }
});

module.exports = mongoose.model('Requisition', RequisitionSchema);