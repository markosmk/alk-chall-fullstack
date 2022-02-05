import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// actions
import { logout } from '../context/reducers/authSlice';

const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <header>
      <nav>
        {!isLoggedIn && <Link to="/">Inicio</Link>}
        {isLoggedIn && (
          <>
            <Link to="/">Panel</Link>
            <Link to="/operations">Operations</Link>
            <Link to="/categories">Categorias</Link>
            <Link to="/user">Info Usuario</Link>
          </>
        )}
        <div className="nav-right">
          {!isLoggedIn && <Link to="/login">Iniciar Sesion</Link>}
          {!isLoggedIn && <Link to="/register">Registrarse</Link>}
          {isLoggedIn && <button onClick={() => dispatch(logout())}>Salir</button>}
        </div>
      </nav>
    </header>
  );
};

export default Header;
