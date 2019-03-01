import {API_ROOT} from './api-config';
import axios from 'axios';

const api = axios.create({
  baseURL: API_ROOT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: localStorage.nureviewtoken
  }
});

export default api;
