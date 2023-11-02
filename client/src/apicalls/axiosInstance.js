import axios from 'axios';

export const axiosInstance = axios.create({
    headers: `Bearer ${localStorage.getItem('token')}`
});




  