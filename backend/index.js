const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors());

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
