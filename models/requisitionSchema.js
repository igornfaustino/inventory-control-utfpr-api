const mongoose = require('mongoose');
const moment = require('moment');
const RequisitionHistory = require('./requisitionHistorySchema');
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
	itemType: String,
	priceJustification: String,
	qtd: { type: Number, require: true },
	date: Date,
	status: String,
	history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RequisitionHistory' }]
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
	Requisition.findById(id).populate('history').exec(callback);
};

module.exports.getAllRequisition = function (callback) {
	Requisition.find().populate('history').exec(callback);
};

module.exports.addNewRequisition = function (newRequisition, callback) {
	// saves the creation on history
	newRequisition.date = moment();
	newRequisition.changeJustification = "Criação da requisição"
	RequisitionHistory.addNewHistory(newRequisition, (err, history) => {
		if (err) {
			return callback(true, null)
		}
		delete newRequisition.date;
		delete newRequisition.changeJustification;
		Requisition.create(newRequisition, (err, requisition) => {
			if (err) {
				return callback(true, null)
			}
			requisition.history.unshift(history._id);
			requisition.save(callback);
		});
	})
}

// update requisition
module.exports.updateRequisition = function (updatedRequisition, callback) {
	let requisitionHistory = {}
	requisitionHistory.siorg = updatedRequisition.siorg;
	requisitionHistory.description = updatedRequisition.description;
	requisitionHistory.justification = updatedRequisition.justification;
	requisitionHistory.quotation = updatedRequisition.quotation;
	requisitionHistory.priceJustification = updatedRequisition.priceJustification;
	requisitionHistory.qtd = updatedRequisition.qtd;
	requisitionHistory.status = updatedRequisition.status;
	requisitionHistory.itemType = updatedRequisition.itemType;
	requisitionHistory.date = moment();
	requisitionHistory.changeJustification = updatedRequisition.changeJustification;

	this.getRequisitionById(updatedRequisition._id, function (err, requisition) {
		if (err) {
			return callback(true, null)
		}
		RequisitionHistory.addNewHistory(requisitionHistory, (err, history) => {
			if (err) {
				return callback(true, null)
			}
			if (history && history._id) {
				requisition.siorg = updatedRequisition.siorg;
				requisition.description = updatedRequisition.description;
				requisition.justification = updatedRequisition.justification;
				requisition.quotation = updatedRequisition.quotation;
				requisition.priceJustification = updatedRequisition.priceJustification;
				requisition.qtd = updatedRequisition.qtd;
				requisition.status = updatedRequisition.status;
				requisition.itemType = updatedRequisition.itemType;
				requisition.history.unshift(history._id);
				requisition.save(callback);
			}
		});
	});
}

// delete requisition
module.exports.deleteRequisition = function (id, callback) {
	Requisition.findById(id).remove(callback);
}