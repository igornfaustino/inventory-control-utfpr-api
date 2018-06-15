const mongoose = require('mongoose');

const LocationHistorySchema = mongoose.Schema({
    date: Date,
    justification: String,
    locationType: String,
    location: String,
});

module.exports = mongoose.model('LocationHistory', LocationHistorySchema);
const LocationHistory = mongoose.model('LocationHistory', LocationHistorySchema);

module.exports.addNewLocation = function (newLocation, callback) {
    LocationHistory.create({"date":newLocation.date, 
							"justification": newLocation.justification,
							"locationType": newLocation.locationType,
							"location": newLocation.location}, callback);
}