import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333' // html que não muda
});

export default api;