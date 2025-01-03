const User = require('../models/userModel');
const { ApiError } = require('../utils/apiError');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(new ApiError(`Could not get users`, 500));
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ApiError('User not found', 404));
    }
    res.status(200).json(user);
  } catch (error) {
    next(new ApiError(`Could not get user`, 500));
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return next(new ApiError(`User not found`, 404));
    }
    res.status(200).json(user);
  } catch (error) {
    next(new ApiError(`Could not update user`, 500));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(new ApiError(`User not found`, 404));
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(new ApiError(`Could not delete user`, 500));
  }
};
