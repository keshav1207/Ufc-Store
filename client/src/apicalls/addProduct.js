import  axiosMultiFormInstance  from "./axiosMultiFormInstance";
import { API_BASE_URL } from "./apiService";

//Add new product

export const addNewProduct = async function(payload){
    try {
        
        const response = await axiosMultiFormInstance.post(`${API_BASE_URL}/api/addProduct`, payload);
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