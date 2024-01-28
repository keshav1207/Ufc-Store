import axios from 'axios';
import { API_BASE_URL } from "./apiService";

export const getAllProducts = async function(){
    try {
       
        const response = await axios.get(`${API_BASE_URL}/api/manageProducts`);
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } else {
            // Generic catch block for unexpected errors
            console.error("Unexpected error:", error);
            return "An unexpected error occurred.";
          }
    }
}