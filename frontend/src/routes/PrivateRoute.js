import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className="private">
      <Outlet />
    </div>
  ) : (
    // Redirect them to the /login page, but save the current location
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
