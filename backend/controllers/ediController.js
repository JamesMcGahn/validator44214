const axios = require('axios');
const catchAsyncFn = require('../utils/catchAsyncFn');

exports.readX12 = catchAsyncFn(async (req, res, next) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', async () => {
    const response = await axios({
      method: 'post',
      url: `${process.env.EDI_URL}read?model=en_44_1`,
      data: data,
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.EDI_API_KEY,
      },
    });
    const ediPayload = await response.data;

    res.status(201).json({
      status: 'success',
      data: ediPayload,
    });
  });
});

exports.validateX12 = catchAsyncFn(async (req, res, next) => {
  const response = await axios({
    method: 'post',
    url: `${process.env.EDI_URL}validate?model=en_44_1`,
    data: req.body,
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.EDI_API_KEY,
    },
  });
  const validatedPayload = await response.data;

  res.status(201).json({
    status: 'success validated',
    data: validatedPayload,
  });
});
