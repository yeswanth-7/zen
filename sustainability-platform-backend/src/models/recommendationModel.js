const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    recommendationType: {type: String, required: true},
    title: {type: String, required: true},
    description: { type: String, required: true},
    relevantLifestyleFactors: [String],
    createdAt: {type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Recommendation', recommendationSchema);