import axios from 'axios';

// Leer la URL de la API desde la variable de entorno Vite
const API_URL = import.meta.env?.VITE_API_URL || 'http://127.0.0.1:8000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});

// Exponer la instancia para usos avanzados (login, configuración de headers)
export default axiosInstance;

export const getUsuarios = () => axiosInstance.get('/usuarios');
export const getUsuario = (id) => axiosInstance.get(`/usuarios/${id}`);

export const getCategorias = () => axiosInstance.get('/categorias');
export const getCategoria = (id) => axiosInstance.get(`/categorias/${id}`);

export const getProductos = () => axiosInstance.get('/productos');
export const getProducto = (id) => axiosInstance.get(`/productos/${id}`);

export const getPersonalizaciones = () => axiosInstance.get('/personalizaciones');
export const getPersonalizacion = (id) => axiosInstance.get(`/personalizaciones/${id}`);

export const getCarritos = () => axiosInstance.get('/carritos');
export const getCarrito = (id) => axiosInstance.get(`/carritos/${id}`);


