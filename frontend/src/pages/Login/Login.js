import { Link, useLocation } from 'react-router-dom';

import FormLogin from './components/FormLogin';

const Login = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  return (
    <div className="min-h-full flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Iniciar sesión
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Debes iniciar sesion para ver la pagina <strong>{from}</strong>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 rounded-lg sm:px-8">
          <FormLogin />
        </div>
      </div>

      <div className="text-sm text-center mt-6">
        <Link
          to="/register"
          className="font-medium text-gray-400 hover:text-black transition-colors"
        >
          No tienes cuenta?... Crea una nueva!
        </Link>
      </div>
    </div>
  );
};

export default Login;
