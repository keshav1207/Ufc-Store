import  axiosMultiFormInstance  from "./axiosMultiFormInstance";
import { API_BASE_URL } from "./apiService";

//Get all products from a category

export const getCategoryProducts = async function(category,optionalFilter){
    try {
        
        const response = await axiosMultiFormInstance.get(optionalFilter?(`${API_BASE_URL}/api/categories/${category}/${optionalFilter}`):(`${API_BASE_URL}/api/categories/${category}`));
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
        
