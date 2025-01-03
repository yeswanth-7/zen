const mongoose = require('mongoose');

const carbonSchema = new mongoose.Schema({
    activityType: { type: String, required: true, unique: true},
    emissionFactor: { type: Number, required: true },
    unit: String,
    source: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CarbonData', carbonSchema);