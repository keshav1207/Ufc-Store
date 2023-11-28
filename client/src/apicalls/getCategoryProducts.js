import { axiosMultiFormInstance } from "./axiosMultiFormInstance";

        



//Get all products from a category

export const getCategoryProducts = async function(category){
    try {
        
        const response = await axiosMultiFormInstance.get(`http://localhost:5000/api/categories/${category}`);
        return response.data;

    } catch (error) {
        
        if(error.response){
            return `${error.response.data.msg}`
        } 
        
            
        } 
    
}        
        
