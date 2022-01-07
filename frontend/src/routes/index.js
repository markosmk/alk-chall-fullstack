import { Navigate, useRoutes, useNavigate } from 'react-router-dom';
// layouts
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';

// pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import User from '../pages/User/User';
import Panel from '../pages/Panel/Panel';
import Categories from '../pages/Categories/Categories';
import { useAuth } from '../context';

export default function Router() {
  let auth = useAuth();
  let navigate = useNavigate();

  return useRoutes([
    {
      path: '/panel',
      element: <PrivateLayout />,
      children: [
        { path: '/panel', element: <Panel /> },
        { path: 'user', element: <User /> },
        { path: 'categories', element: <Categories /> },
      ],
    },
    // {
    //   path: '/',
    //   element: <PrivateLayout s />,
    //   children: [{ path: 'logout', element: }],
    // },
    {
      path: '/',
      element: <PublicLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '/404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/panel" /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
