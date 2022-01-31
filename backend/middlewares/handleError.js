const errorLogger = (err, req, res, next) => {
  console.error('\x1b[31m', err); // adding some color to our logs
  next(err); // calling next middleware
};
const errorHandler = (err, req, res, next) => {
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

  res.header('Content-Type', 'application/json');
  return res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    message: error,
    error: 'Uups..Server error!!! Please contact the system admin',
    data: null,
  });
};

const invalidPathHandler = (req, res, next) => {
  res.redirect('/error');
};

module.exports = { errorLogger, errorHandler, invalidPathHandler };
