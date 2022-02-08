import { useRoutes } from 'react-router-dom';
import Layout from '../components/Layout';

import {
  Panel,
  User,
  Categories,
  Login,
  NotFound,
  Operations,
  CreateOperation,
  Register,
} from '../pages';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <PrivateRoute />,
          children: [
            { index: true, element: <Panel /> },
            { path: 'user', element: <User /> },
            { path: 'categories', element: <Categories /> },
            { path: 'operations', element: <Operations /> },
            { path: 'operations/new', element: <CreateOperation /> },
            { path: 'operations/:id/edit', element: <CreateOperation /> },
          ],
        },
      ],
    },
    {
      path: '/',
      element: <PublicRoute />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        // { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    // { path: '*', element: <Navigate to="/404" replace /> },
    { path: '*', element: <NotFound /> },
  ]);
};
export default Router;
