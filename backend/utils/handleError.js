const handleError = (err, req, res, next) => {
  let error = null;
  if (err.errors) {
    error = err.errors?.map((item) => {
      const { instance, original, ...newItem } = item;
      return newItem;
    });
  } else if (err.message) {
    error = err.message;
  } else {
    error = err;
  }

  return res.status(500).json({
    code: 500,
    message: 'Uups..Server error!!! Please contact the system admin',
    error: error,
    data: null,
    success: false,
  });
};
module.exports = handleError;
