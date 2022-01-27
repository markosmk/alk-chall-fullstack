const express = require('express');
const cors = require('cors');
const handleError = require('./utils/handleError');
// routes
const routesAuth = require('./components/auth/routes.auth');
const routesUsers = require('./components/user/routes.user');
const routesOperations = require('./components/operation/routes.operation');

const app = express();

app.use(express.json());
app.use(cors());

// api routes
app.use('/api/v1/auth', routesAuth);
app.use('/api/v1/users', routesUsers);
app.use('/api/v1/operations', routesOperations);

// errors
app.use(handleError);

app.listen(8000);
