const express = require('express');
const ediRouter = require('./routes/ediRouter');
const authRouter = require('./routes/authRouter');

const app = express();

app.use(express.json({ limit: '10kb' }));

//  ROUTES
app.use('/api/v1/edi', ediRouter);
app.use('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => {
  res.status(200).json({
    status: 'OK',
  });
});

module.exports = app;
