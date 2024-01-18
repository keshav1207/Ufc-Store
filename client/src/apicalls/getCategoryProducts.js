import  axiosMultiFormInstance  from "./axiosMultiFormInstance";

//Get all products from a category

export const getCategoryProducts = async function(category,optionalFilter){
    try {
        
        const response = await axiosMultiFormInstance.get(optionalFilter?(`http://localhost:5000/api/categories/${category}/${optionalFilter}`):(`http://localhost:5000/api/categories/${category}`));
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
        
