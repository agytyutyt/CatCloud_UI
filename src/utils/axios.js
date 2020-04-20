import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials=true;

const service = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000,
});



export default service;
