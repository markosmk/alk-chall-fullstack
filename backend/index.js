const express = require('express');
const app = express();

app.use(express.json());

// api routes
app.use('/operations', require('./components/operation/routes'));

// errors
app.use((err, req, res, next) => {
  return res.status(500).json({
    code: 500,
    message: 'Uups..Server error!!! Please conctact the system admin',
    error: err,
    data: null,
    success: false,
  });
});

app.listen(8000);
