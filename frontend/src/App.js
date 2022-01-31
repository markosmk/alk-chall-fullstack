import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Router from './routes';
import Header from './components/Header';
import { logout } from './context/reducers/authSlice';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthStatus />
      <Header />
      <Router />
    </BrowserRouter>
  );
}

function AuthStatus() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!isLoggedIn) {
    return <p>No has iniciado sesion.</p>;
  }

  return (
    <p>
      Bienvenido <strong>{user?.email}!</strong>
      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        Salir
      </button>
    </p>
  );
}

export default App;
