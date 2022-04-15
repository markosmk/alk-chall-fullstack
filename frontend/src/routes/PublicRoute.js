import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const { user } = useSelector((state) => state.auth);
  // const location = useLocation();
  // const from = location.state?.from?.pathname || '/';
  // Redirect to previous url from saved or route '/' if user is logged
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
