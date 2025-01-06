const mongoose = require('mongoose');

const userRecommendationSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    recommendationId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Recommendation'},
   dateDisplayed: {type: Date, default: Date.now},
    wasRead: {type: Boolean, default: false},
   wasImplemented: {type: Boolean, default: false}
});

module.exports = mongoose.model('UserRecommendation', userRecommendationSchema);