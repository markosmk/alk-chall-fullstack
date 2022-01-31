const express = require('express');

// routes
const routesAuth = require('./components/auth/auth.router');
const routesUsers = require('./components/user/user.router');
const routesCategories = require('./components/category/category.router');
const routesOperations = require('./components/operation/operation.router');

// middleware jwt
const { validateRequest } = require('./middlewares/authenticated');

const router = express.Router();

// api routes
router.use('/auth', routesAuth);
router.use('/users', validateRequest, routesUsers);
router.use('/categories', validateRequest, routesCategories);
router.use('/operations', validateRequest, routesOperations);

module.exports = router;
