import axios from 'axios';

export const axiosMultiFormInstance = axios.create({
   
     headers: { 
        "Content-Type": "multipart/form-data" 
    
    }
        
});



