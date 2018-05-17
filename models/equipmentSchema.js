const mongoose = require('mongoose');
const LocationHistory = require('./locationHistorySchema')

/**
 * Equipment Schema models It's Equipments and Location Backtracking: 
 * Equipment fields include:
 * - locationHistory: all the locations the equipment has travelled
 * - buyer: who bought the equipment
 * - equipmentState: used, new, etc.
 * - locationType: class, teacher, etc.
 * - location: E102, etc.
 * - solicitor: who solicited the equipment
 * - origin: origem
 * The rest is self explanatory.
 */
const EquipmentSchema = mongoose.Schema({
    siorg: String,
    buyer: String,
    solicitor: String,
    description: String,
    origin: String,
    equipmentType: String,
    quantity: Number,
    equipmentState: String,
    locationHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LocationHistory' }]
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
const Equipment = mongoose.model('Equipment', EquipmentSchema);

module.exports.getEquipmentById = function (id, callback) {
    Equipment.findById(id).populate('locationHistory').exec(callback);
}

module.exports.getAllEquipments = function (callback) {
    Equipment.find().populate('locationHistory').exec(callback);
}

module.exports.updateEquipment = function (updateEquipment, callback) {
    Equipment.update({ '_id': updateEquipment._id }, updateEquipment, callback);
}

module.exports.addNewEquipment = function (newEquipment, callback) {
    Equipment.create(newEquipment, callback);
}

module.exports.deleteEquipment = function (equipmentId, callback) {
    Equipment.findById(equipmentId).remove(callback);
}