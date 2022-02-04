import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../../../context/reducers/authSlice';

const FormLogin = () => {
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

  const handleSubmit = (event, email, password) => {
    event.preventDefault();
    setFormData({ ...formData, isSubmitting: true });
    dispatch(login({ email, password }))
      // .unwrap()
      .then((data) => {
        console.log('correcto ingresado', data);
        // window.location.reload();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log('ups', error);
        setFormData({ ...formData, isSubmitting: false });
      });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, email, password)}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <hr />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Iniciar Sesion'}
        </button>
      </form>
    </>
  );
};

export default FormLogin;
