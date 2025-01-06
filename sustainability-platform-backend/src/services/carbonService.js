const CarbonData = require('../models/carbonModel');
const { ApiError } = require('../utils/apiError');

exports.calculateEmissions = async (activityType, value) => {
    try {
        const carbonData = await CarbonData.findOne({ activityType });
        if (!carbonData) {
            throw new ApiError("Could not calculate emissions", 500);
        }
        return carbonData.emissionFactor * value;
    } catch (error) {
        throw error;
    }
};
