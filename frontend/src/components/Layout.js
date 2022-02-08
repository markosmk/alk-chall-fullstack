import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  return (
    <div className="px-6 min-h-full ">
      <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col h-screen">
          <Header />
          <div className="-mt-2 flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
