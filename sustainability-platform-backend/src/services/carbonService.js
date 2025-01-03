const CarbonData = require('../models/carbonModel');
const { ApiError } = require('../utils/apiError');

// Service to calculate carbon emissions
exports.calculateEmissions = async (activityType, value) => {
    try {
        // Find the carbon emission data using the activity type
        const carbonData = await CarbonData.findOne({ activityType });
        // If no data is found throw an error
        if (!carbonData) {
            throw new ApiError("Could not calculate emissions", 500);
        }
         // Calculate the emissions
        return carbonData.emissionFactor * value;
    } catch (error) {
        // Re-throw error for the controller to handle
        throw error;
    }
};