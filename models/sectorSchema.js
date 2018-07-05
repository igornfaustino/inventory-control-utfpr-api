const mongoose = require('mongoose');

const SectorSchema = mongoose.Schema({
    sector: String
});

module.exports = mongoose.model('Sector', SectorSchema);
const Sector = mongoose.model('Sector', SectorSchema);

module.exports.addNewSector = function (newSector, callback) {
    Sector.create(newSector, callback)
}

module.exports.getAllSector = function (callback) {
    Sector.find(callback)
}

module.exports.deleteSector = function (sectorId, callback) {
    Sector.findById(sectorId).remove(callback);
}