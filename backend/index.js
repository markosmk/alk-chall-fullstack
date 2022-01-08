const express = require('express');
const cors = require('cors');
const handleError = require('./services/handleError');
// routes
const routesOperations = require('./components/operation/routes');
const app = express();

app.use(express.json());
app.use(cors());

// api routes
app.use('/operations', routesOperations);

// errors
app.use(handleError);

app.listen(8000);
