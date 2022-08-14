import { Router } from 'express';

// routes
import routesAuth from './modules/auth/auth.router';
import routesUsers from './modules/user/user.router';
// import routesCategories from './modules/categories/categories.router';
import routesOperations from './modules/operation/operation.router';

// middleware
import { authenticated } from './middlewares/authenticated.middleware';

const router = Router();

// api routes
router.use('/auth', routesAuth);
router.use('/users', authenticated, routesUsers);
// router.use('/categories', authenticated, routesCategories);
router.use('/operations', authenticated, routesOperations);

export default router;
