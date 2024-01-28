import  AxiosInstance  from "axios";
import { API_BASE_URL } from "./apiService";

export const addToCart = async function(userId,productId){
    try {
        
        const response = await AxiosInstance.put(`${API_BASE_URL}/api/addToCart/${userId}/${productId}`);
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        }  else {
            // Generic catch block for unexpected errors
            console.error("Unexpected error:", error);
            return "An unexpected error occurred.";
          }
    }

}