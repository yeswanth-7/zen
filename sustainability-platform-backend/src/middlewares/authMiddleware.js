const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/apiError'); 

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return next(new ApiError('Authorization token missing', 401)); 
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(new ApiError('Invalid authorization token', 403)); 
  }
};