const handleError = (err, req, res, next) => {
  return res.status(500).json({
    code: 500,
    message: 'Uups..Server error!!! Please contact the system admin',
    error: err.errors
      ? err.errors?.map((item) => {
          const { instance, original, ...newItem } = item;
          return newItem;
        })
      : err.message,
    data: null,
    success: false,
  });
};
module.exports = handleError;
