const mongoose = require('mongoose');

const LocationHistorySchema = mongoose.Schema({
    date: Date,
    justification: String,
    locationType: String,
    location: String,
});

module.exports = mongoose.model('LocationHistory', LocationHistorySchema);
const LocationHistory = mongoose.model('LocationHistory', LocationHistorySchema);