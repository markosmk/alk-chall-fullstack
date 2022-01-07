import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <>
      <nav
        style={{
          display: 'flex',
          gap: '10px',
          padding: '1rem',
          border: 'solid 2px #aaa',
          borderRadius: '8px',
        }}
      >
        <Link to="/">Inicio</Link>
        <Link to="/panel">Panel</Link>
        <Link to="/panel/user">Info Usuario</Link>
        <Link to="/panel/categories">Categorias</Link>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginLeft: 'auto',
          }}
        >
          <Link to="/login">Iniciar Sesion</Link>
          <Link to="/register">Registro</Link>
          <Link to="/logout">Salir</Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
