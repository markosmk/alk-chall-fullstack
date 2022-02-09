import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { login } from '../../../context/reducers/authSlice';
import { clearMessage } from '../../../context/reducers/messageSlice';

import { ExclamationCircleIcon } from '@heroicons/react/solid';

import toast from 'react-hot-toast';

const FormLogin = () => {
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // handle if redirect saved location
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    isSubmitting: false,
    email: 'markosmk@me.com',
    password: '123456',
  });
  const { isSubmitting, email, password } = formData;

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmit = (event, email, password) => {
    event.preventDefault();
    setFormData({ ...formData, isSubmitting: true });
    dispatch(login({ email, password }))
      .unwrap()
      .then((data) => {
        toast.success('Hola 👋 , Bienvenido ' + data.user?.name, {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        // console.log('correcto ingresado', data.user?.name);
        // window.location.reload();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log('ups', error);
      })
      .finally(() => {
        setFormData({ ...formData, isSubmitting: false });
      });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, email, password)} className="space-y-6">
      {message && (
        <div className="rounded-md bg-red-100 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{message}</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Correo Electronico
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="tuemail@mail.com"
            autoComplete="email"
            required
            className="transition appearance-none block w-full px-3 py-2 border-2 border-gray-200 rounded-md bg-gray-100 placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:ring-black focus:border-black focus:bg-white sm:text-sm"
            value={email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="******"
            autoComplete="current-password"
            required
            className="transition appearance-none block w-full px-3 py-2 border-2 border-gray-200 rounded-md bg-gray-100 placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:ring-black focus:border-black focus:bg-white sm:text-sm"
            value={password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center justify-between disabled">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-5 w-5 text-black focus:ring-0 focus:ring-offset-0 border-2 border-gray-300 rounded transition"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 select-none block text-sm text-gray-900"
          >
            Recordarme
          </label>
        </div>

        <div className="text-sm">
          <a
            href="#s"
            className="font-medium text-gray-400 hover:text-black transition-colors"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Olvidaste la contraseña?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Iniciar Sesion'}
        </button>
      </div>

      <div className="text-sm text-center hidden">
        <Link
          to="/register"
          className="font-medium text-gray-400 hover:text-black transition-colors"
        >
          No tienes cuenta?... Crea una nueva!
        </Link>
      </div>
    </form>
  );
};

export default FormLogin;
