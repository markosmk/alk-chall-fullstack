import { useLocation } from 'react-router-dom';

import FormLogin from './components/FormLogin';

const Login = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  return (
    <div>
      <p>
        Debes iniciar sesion para ver la pagina <strong>{from}</strong>
      </p>

      <FormLogin />
    </div>
  );
};

export default Login;
