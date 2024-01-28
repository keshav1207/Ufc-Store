import axios from "axios";
import { API_BASE_URL } from "./apiService";

export const clearCart = async function(userId){
    try {
        
        const response = await axios.delete(`${API_BASE_URL}/api/clearCart/${userId}`);
        
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