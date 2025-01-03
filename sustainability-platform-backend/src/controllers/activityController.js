const Activity = require('../models/activityModel');
const { ApiError } = require('../utils/apiError');
const carbonService = require('../services/carbonService');

exports.createActivity = async (req, res, next) => {
  try {
    const { goalId, activityType, value, unit, activityDate } = req.body;
    const newActivity = new Activity({ userId: req.userId, goalId, activityType, value, unit, activityDate });
    await newActivity.save();
    const emissions = await carbonService.calculateEmissions(activityType, value);
    res.status(201).json({ message: "Activity added successfully", emissions });
  } catch (error) {
    next(new ApiError(`Error creating activity: ${error.message}`, 500));
  }
};

exports.getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find({ userId: req.userId });
    res.status(200).json(activities);
  } catch (error) {
    next(new ApiError(`Could not get activities`, 500));
  }
};

exports.getActivityById = async (req, res, next) => {
  try {
    const activity = await Activity.findOne({ _id: req.params.id, userId: req.userId });
    if (!activity) {
      return next(new ApiError(`Activity not found`, 404));
    }
    res.status(200).json(activity);
  } catch (error) {
    next(new ApiError(`Could not get activity`, 500));
  }
};

exports.updateActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
    if (!activity) {
      return next(new ApiError(`Activity not found`, 404));
    }
    res.status(200).json(activity);
  } catch (error) {
    next(new ApiError(`Could not update activity`, 500));
  }
};

exports.deleteActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!activity) {
      return next(new ApiError(`Activity not found`, 404));
    }
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    next(new ApiError(`Could not delete activity`, 500));
  }
};
