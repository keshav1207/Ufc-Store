import axios from 'axios';

const axiosInstance = axios.create();

export const setAuthToken = (token) => {
  if (token) {
    // Set the Authorization header in the Axios instance
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // If the token is not provided, remove the Authorization header
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;




  