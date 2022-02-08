import { Link } from 'react-router-dom';
import FormRegister from './FormRegister';

const Register = () => {
  return (
    <div className="min-h-full flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Registrarse
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 rounded-lg sm:px-8">
          <FormRegister />
        </div>

        <div className="text-sm text-center mt-6">
          <Link
            to="/login"
            className="font-medium text-gray-400 hover:text-black transition-colors"
          >
            Ya tienes cuenta?... Ingresar!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
