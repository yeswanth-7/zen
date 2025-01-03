const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/apiError');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName, location, dietPreference, transportationPreference } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return next(new ApiError('Username or email already in use.', 400));
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, passwordHash, firstName, lastName, location, dietPreference, transportationPreference });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(new ApiError(`Error registering user: ${error.message}`, 500));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return next(new ApiError('Invalid credentials', 401));
    }
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return next(new ApiError('Invalid credentials', 401));
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, message: 'Login Successful' });
  } catch (error) {
    next(new ApiError(`Error logging in user: ${error.message}`, 500));
  }
};