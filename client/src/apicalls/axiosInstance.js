import axios from 'axios';

const jwtToken = localStorage.getItem('token')

export const axiosInstance = axios.create({
    headers: {
       authorization: `Bearer ${jwtToken}`,
      
      
    }
});




  