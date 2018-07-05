const mongoose = require('mongoose');

const RequisitionHistorySchema = mongoose.Schema({
	date: { type: Date, require: true },
	changeJustification: { type: String, require: true },
	siorg: String,
	description: String,
	justification: String,
	itemType: String,
	priceJustification: String,
	qtd: Number,
	date: Date,
	status: String
});

module.exports = mongoose.model('RequisitionHistory', RequisitionHistorySchema);
const RequisitionHistory = mongoose.model('RequisitionHistory', RequisitionHistorySchema);

module.exports.addNewHistory = function (newHistory, callback) {
	RequisitionHistory.create(newHistory, callback);
}