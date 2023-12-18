import axios from 'axios';


 const axiosInstance = axios.create({
    
}); 

export const setAuthToken = (token) => {
    // Set the Authorization header in the Axios instance
    axiosInstance.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
  };


  export default axiosInstance;




  