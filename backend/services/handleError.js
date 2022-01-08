const handleError = (err, req, res, next) => {
  return res.status(500).json({
    code: 500,
    message: 'Uups..Server error!!! Please conctact the system admin',
    error: err,
    data: null,
    success: false,
  });
};
module.exports = handleError;
