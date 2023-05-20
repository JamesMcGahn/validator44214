const User = require('../models/userModel');
const signToken = require('../utils/signToken');
const catchAsyncFn = require('../utils/catchAsyncFn');
const AppError = require('../utils/appError');

const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  ),
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
};

exports.login = catchAsyncFn(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Missing email or password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user._id);

  res.cookie('jwt', token, cookieOptions);

  const userInfo = {
    email: user.email,
    token,
  };
  res.status(201).json({
    status: 'success',
    user: userInfo,
  });
});

exports.register = catchAsyncFn(async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.cookie('jwt', token, cookieOptions);

  res.status(201).json({
    status: 'success',
    token,
  });
});
