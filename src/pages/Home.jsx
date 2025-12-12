import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-hero container mt-5">
      <div className="row align-items-center">
        <div className="col-md-7">
          <h1>Bienvenido a Tienda Ropa</h1>
          <p className="lead">Gestiona productos, usuarios y pedidos desde esta interfaz. Inicia sesión para acceder al panel de administración.</p>
          <div className="d-flex gap-2 mt-3">
            <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>
            <Link to="/usuarios" className="btn btn-outline-primary">Ver usuarios</Link>
          </div>
        </div>
        <div className="col-md-5 d-none d-md-block">
          <div style={{height:200, borderRadius:12}} className="login-illustration">
            <img src="/vite.svg" alt="logo" style={{width:96, opacity:0.9}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
