// Servicio de API genérico para futuras conexiones con Laravel mediante axios
// Por ahora solo definimos las funciones y dejamos la implementación pendiente.

import api from '../services/api';

export const getData = async (url) => {
  try {
    const res = await api.get(url);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createData = async (url, body) => {
  try {
    const res = await api.post(url, body);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateData = async (url, body) => {
  try {
    const res = await api.put(url, body);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteData = async (url) => {
  try {
    const res = await api.delete(url);
    return res.data;
  } catch (err) {
    throw err;
  }
};


