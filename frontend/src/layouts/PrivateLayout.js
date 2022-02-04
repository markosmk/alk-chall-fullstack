import { Outlet } from 'react-router-dom';

const PrivateLayout = () => {
  return (
    <div className="private">
      <h1>Layout Private</h1>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
