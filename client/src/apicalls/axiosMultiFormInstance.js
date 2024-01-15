import axios from 'axios';

 const axiosMultiFormInstance = axios.create({
   
     headers: { 
        "Content-Type": "multipart/form-data" 
    
    }
        
});

export const setAuthTokenMulti = (token) => {
    // Set the Authorization header in the Axios instance
    axiosMultiFormInstance.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
  };



  export default axiosMultiFormInstance;



