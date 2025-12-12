// Servicio de API genérico para futuras conexiones con Laravel mediante axios
// Por ahora solo definimos las funciones y dejamos la implementación pendiente.

import api from '../services/api';

export const getData = async (url) => {
  // TODO: implementar llamada real con axios
  // return api.get(url);
  return Promise.resolve({ data: [] });
};

export const createData = async (url, body) => {
  // TODO: implementar llamada real con axios
  // return api.post(url, body);
  return Promise.resolve({ data: body });
};

export const updateData = async (url, body) => {
  // TODO: implementar llamada real con axios
  // return api.put(url, body);
  return Promise.resolve({ data: body });
};

export const deleteData = async (url) => {
  // TODO: implementar llamada real con axios
  // return api.delete(url);
  return Promise.resolve({ success: true });
};


