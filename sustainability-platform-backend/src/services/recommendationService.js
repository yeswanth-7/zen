const Recommendation = require('../models/recommendationModel');

exports.getRecommendations = async (lifestyleFactors) => {
    try {
        const recommendations = await Recommendation.find({
          relevantLifestyleFactors: { $in: lifestyleFactors },
         });
        return recommendations;
    } catch(error){
        throw error;
    }
};