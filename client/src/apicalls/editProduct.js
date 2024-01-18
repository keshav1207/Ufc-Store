import  axiosMultiFormInstance  from "./axiosMultiFormInstance";

export const editProduct = async function(productId,payload){
    try {
        
        const response = await axiosMultiFormInstance.put(`http://localhost:5000/api/editProduct/${productId}`,payload);
        
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