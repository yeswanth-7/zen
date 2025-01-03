const EducationalResource = require('../models/educationalModel');
const { ApiError } = require('../utils/apiError');

exports.createEducationalResource = async (req, res, next) => {
    try {
        const { title, content, category } = req.body;
        const newResource = new EducationalResource({ title, content, category });
        await newResource.save();
        res.status(201).json({ message: 'Educational resource created successfully' });
    } catch (error) {
        next(new ApiError(`Error creating educational resource: ${error.message}`, 500));
    }
};

exports.getEducationalResources = async (req, res, next) => {
    try {
        const resources = await EducationalResource.find();
        res.status(200).json(resources);
    } catch (error) {
        next(new ApiError(`Error getting educational resources: ${error.message}`, 500));
    }
};

exports.getEducationalResourceById = async (req, res, next) => {
    try {
        const resource = await EducationalResource.findById(req.params.id);
        if (!resource) {
            return next(new ApiError(`Educational resource not found`, 404));
        }
        res.status(200).json(resource);
    } catch (error) {
        next(new ApiError(`Could not find educational resource: ${error.message}`, 500));
    }
};

exports.updateEducationalResource = async (req, res, next) => {
    try {
        const resource = await EducationalResource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!resource) {
            return next(new ApiError(`Educational resource not found`, 404));
        }
        res.status(200).json(resource);
    } catch (error) {
        next(new ApiError(`Could not update educational resource: ${error.message}`, 500));
    }
};

exports.deleteEducationalResource = async (req, res, next) => {
    try {
        const resource = await EducationalResource.findByIdAndDelete(req.params.id);
        if (!resource) {
            return next(new ApiError(`Educational resource not found`, 404));
        }
        res.status(200).json({ message: "Educational Resource deleted successfully" });
    } catch (error) {
        next(new ApiError(`Could not delete educational resource: ${error.message}`, 500));
    }
};
