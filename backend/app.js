const express = require('express');
const ediRouter = require('./routes/ediRouter');

const app = express();

app.use(express.json({ limit: '10kb' }));

//  ROUTES
app.use('/api/v1/edi', ediRouter);
app.all('*', (req, res, next) => {
  res.status(200).json({
    status: 'OK',
  });
});

module.exports = app;
