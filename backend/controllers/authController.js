const User = require('../models/userModel');
const signToken = require('../utils/signToken');
const catchAsyncFn = require('../utils/catchAsyncFn');
const { promisify } = require('util');

const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  ),
  httpOnly: true,
};

exports.login = catchAsyncFn(async (req, res, next) => {});

exports.register = catchAsyncFn(async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }
  res.cookie('jwt', token, cookieOptions);

  res.status(201).json({
    status: 'success',
    token,
  });
});
