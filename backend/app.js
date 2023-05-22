const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const appErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const ediRouter = require('./routes/ediRouter');
const authRouter = require('./routes/authRouter');

const app = express();

// security
app.use(helmet());

// rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP',
});

app.use('/api', limiter);

// body parser - reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization - NoSQL query injections
app.use(mongoSanitize());

// Data sanitization - XSS
app.use(xss());

// Prevent param pollution
app.use(
  hpp({
    whitelist: [],
  }),
);

//  ROUTES
app.use('/api/v1/edi', ediRouter);
app.use('/api/v1/auth', authRouter);

if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.all('*', (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl}`, 404));
  });
}

// Global Error Handler
app.use(appErrorHandler);

module.exports = app;
