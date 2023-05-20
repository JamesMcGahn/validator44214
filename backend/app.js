const express = require('express');
const cookieParser = require('cookie-parser');
const appErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const ediRouter = require('./routes/ediRouter');
const authRouter = require('./routes/authRouter');

const app = express();

app.use(express.json({ limit: '50kb' }));
app.use(cookieParser());

//  ROUTES
app.use('/api/v1/edi', ediRouter);
app.use('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl}`, 404));
});

// Global Error Handler
app.use(appErrorHandler);

module.exports = app;
