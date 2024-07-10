// client/src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3200/api',
  withCredentials: true, // Include credentials (cookies) with requests
});

export default axiosInstance;
