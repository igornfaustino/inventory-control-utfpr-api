const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

/**
 * Requisition Schema is a model of one product requisition
 * - can have a siorg code
 * - Must have a description
 * - Must have a justification
 * - When is create, can have a price... in the end.. should have at least 3 quotation, if not, should have a price justification
 * - qtd of products
 * - requestId is a ID of the guy who ade the requisition. 
 */
const RequisitionSchema = mongoose.Schema({
	siorg: String,
	description: { type: String, require: true },
	justification: { type: String, require: true },
	quotation: [
		{
			requisitionType: { type: String, require: true },
			reference: String,
			price: Number,
		}
	],
	priceJustification: String,
	qtd: { type: Number, require: true },
	date: Date,
	status: String
	// requesterId: { type: String, require: true }
});

module.exports = mongoose.model('Requisition', RequisitionSchema);
const Requisition = mongoose.model('Requisition', RequisitionSchema);

/**
 * 
 * @param {mongoose.Types.ObjectId} id requisition id
 * @param {function(err, requisition)} callback callback function
 */
module.exports.getRequisitionById = function (id, callback) {
	Requisition.findById(id, callback);
};

module.exports.getAllRequisition = function (callback){
	Requisition.find(callback);
};

module.exports.addNewRequisition = function (newRequisition, callback){
	Requisition.create(newRequisition, callback);
}

// update requisition
module.exports.updateRequisition = function (updatedRequisition, callback){
	this.getRequisitionById(updatedRequisition._id, function (err, requisition) {
		if (err) throw err;
		if (requisition) {
			requisition.siorg = updatedRequisition.siorg;
			requisition.description = updatedRequisition.description;
			requisition.justification = updatedRequisition.justification;
			requisition.quotation = updatedRequisition.quotation;
			requisition.priceJustification = updatedRequisition.priceJustification;
			requisition.qtd = updatedRequisition.qtd;
			requisition.status = updatedRequisition.status;
			requisition.save(callback);
		}
	})
}

// delete requisition
module.exports.deleteRequisition = function (id, callback){
	Requisition.findById(id).remove(callback);
}