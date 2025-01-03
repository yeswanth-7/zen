const CarbonData = require('../models/carbonModel');
const { ApiError } = require('../utils/apiError');

exports.getCarbonData = async (req, res, next) => {
    try {
        const carbonData = await CarbonData.find();
        res.status(200).json(carbonData);
    } catch (error) {
        next(new ApiError(`Could not get carbon data: ${error.message}`, 500));
    }
};

exports.getCarbonDataById = async (req, res, next) => {
    try {
        const carbonData = await CarbonData.findById(req.params.id);
        if (!carbonData) {
            return next(new ApiError(`Carbon data not found`, 404));
        }
        res.status(200).json(carbonData);
    } catch (error) {
        next(new ApiError(`Could not get carbon data: ${error.message}`, 500));
    }
};
