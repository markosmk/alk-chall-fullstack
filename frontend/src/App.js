import Header from './components/Header';
import { AuthProvider, useAuth } from './context';
import Router from './routes';
import { useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <AuthStatus />
      <Header />
      <Router />
    </AuthProvider>
  );
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{' '}
      <button
        onClick={() => {
          auth.signout(() => navigate('/'));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export default App;
