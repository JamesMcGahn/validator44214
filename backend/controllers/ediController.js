exports.readX12 = (req, res, next) => {
  res.status(200).json({
    status: 'success read',
  });
};

exports.validateX12 = (req, res, next) => {
  res.status(200).json({
    status: 'success validate ',
  });
};
