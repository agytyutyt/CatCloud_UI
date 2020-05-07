import axios from 'axios';
import qs from 'qs';
import properties from "../properties";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials=true;

const service = axios.create({
  baseURL: 'http://'+properties.props.baseIP+'/',
  timeout: 600000,
});



export default service;
