import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  // Redirect them to the /login page, but save the current location
  return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
