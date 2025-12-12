import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ListaUsuarios from './components/Usuarios/ListaUsuarios'
import Home from './pages/Home'
import './App.css'

function App(){
  return (
    <div className="app-root">
      <nav className="navbar bg-light p-2 mb-3">
        <div className="container">
          <Link to="/" className="me-3">Home</Link>
          <Link to="/login" className="me-3">Login</Link>
          <Link to="/dashboard" className="me-3">Dashboard</Link>
          <Link to="/usuarios">Usuarios</Link>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios" element={<ListaUsuarios />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
