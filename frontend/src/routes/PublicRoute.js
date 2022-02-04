import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  return isLoggedIn ? (
    // Redirect to previous url from saved or route '/' if user is logged
    <Navigate to={from} />
  ) : (
    <div className="public">
      <Outlet />
    </div>
  );
};

export default PublicRoute;
