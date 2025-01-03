const Recommendation = require('../models/recommendationModel');

// Service to get recommendations
exports.getRecommendations = async (lifestyleFactors) => {
    try {
        // Find recommendations based on the user's relevant lifestyle factors
        const recommendations = await Recommendation.find({
          relevantLifestyleFactors: { $in: lifestyleFactors },
         });
        return recommendations;
    } catch(error){
        // Re-throw error for the controller to handle
        throw error;
    }
};