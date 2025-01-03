const Goal = require('../models/goalModel');
const { ApiError } = require('../utils/apiError');
const { body, validationResult } = require('express-validator');

exports.createGoal = [
    body('goalName').notEmpty().withMessage("Goal name can not be empty"),
    body('goalType').notEmpty().withMessage("Goal type can not be empty"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ApiError(`Validation error: ${errors.array()[0].msg}`, 400));
    }
    try {
      const { goalName, goalDescription, goalType, targetValue, targetUnit, startDate, endDate } = req.body;
      const newGoal = new Goal({ userId: req.userId, goalName, goalDescription, goalType, targetValue, targetUnit, startDate, endDate });
      await newGoal.save();
      res.status(201).json({ message: "Goal created successfully" });
    } catch (error) {
      next(new ApiError(`Error creating goal: ${error.message}`, 500));
    }
  },
];

exports.getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ userId: req.userId });
    res.status(200).json(goals);
  } catch (error) {
    next(new ApiError(`Could not retrieve goals: ${error.message}`, 500));
  }
};

exports.getGoalById = async (req, res, next) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.userId });
    if (!goal) {
      return next(new ApiError('Goal not found', 404));
    }
    res.status(200).json(goal);
  } catch (error) {
    next(new ApiError(`Could not retrieve goal: ${error.message}`, 500));
  }
};

exports.updateGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
    if (!goal) {
      return next(new ApiError("Goal not found", 404));
    }
    res.status(200).json(goal);
  } catch (error) {
    next(new ApiError(`Could not update goal: ${error.message}`, 500));
  }
};

exports.deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!goal) {
      return next(new ApiError('Goal not found', 404));
    }
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    next(new ApiError(`Could not delete goal: ${error.message}`, 500));
  }
};
