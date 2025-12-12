import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // On mount, try to populate user if token exists
    const init = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Set the token into axios default headers
        setAuthToken(token);
        try {
          const res = await api.get('/user');
          setUser(res.data);
          setRol(res.data?.rol ?? null);
        } catch (err) {
          // Token invalid, remove it
          setAuthToken(null);
          setUser(null);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  const login = async (correo, contrasena) => {
    const res = await api.post('/login', { correo, contrasena });
    if (res.data?.token) {
      setAuthToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.usuario);
      setRol(res.data.usuario?.rol ?? null);
      return res.data;
    }
    throw new Error(res?.data?.message || 'Login failed');
  };

  const logout = async () => {
    try {
      // Try to inform server
      await api.post('/logout');
    } catch (err) {
      // ignore
    }
    setAuthToken(null);
    localStorage.removeItem('token');
    setUser(null);
    setRol(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, rol, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;