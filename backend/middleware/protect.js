const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsyncFn = require('../utils/catchAsyncFn');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.protect = catchAsyncFn(async (req, res, next) => {
  console.log(req.cookies.jwt);
  const { authorization } = req.headers;
  let token;

  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  } else {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const isUserActive = await User.findById(decoded.id);

  if (!isUserActive) {
    return next(new AppError('User does not exist. Token invalid', 401));
  }

  req.user = isUserActive;
  next();
});
