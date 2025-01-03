const recommendationService = require('../services/recommendationService');
const User = require('../models/userModel');
const UserRecommendation = require('../models/userRecommendationModel');
const { ApiError } = require('../utils/apiError');

exports.getRecommendations = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return next(new ApiError(`Could not find user`, 404));
    }

    const lifestyleFactors = [user.dietPreference, user.transportationPreference, user.location];
    const recommendations = await recommendationService.getRecommendations(lifestyleFactors);
    res.status(200).json(recommendations);
  } catch (error) {
    next(new ApiError(`Could not fetch recommendations: ${error.message}`, 500));
  }
};

exports.trackRecommendation = async (req, res, next) => {
  try {
    const { recommendationId, wasRead, wasImplemented } = req.body;
    const userRecommendation = new UserRecommendation({
      userId: req.userId,
      recommendationId,
      wasRead,
      wasImplemented,
    });
    await userRecommendation.save();

    res.status(200).json({ message: "Recommendation status updated" });
  } catch (error) {
    next(new ApiError(`Could not track recommendation: ${error.message}`, 500));
  }
};
