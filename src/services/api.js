import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", 
  withCredentials: true // cámbiala cuando tengas el backend
});

export default api;