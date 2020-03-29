import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.144:3333' //url exibida no expo // url da sua máquina// ip config
});

export default api;