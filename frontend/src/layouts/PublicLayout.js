import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="public">
      <h1>Layout Public</h1>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
