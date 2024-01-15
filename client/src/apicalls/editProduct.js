import  axiosMultiFormInstance  from "./axiosMultiFormInstance";

export const EditProduct = async function(productId,payload){
    try {
        
        const response = await axiosMultiFormInstance.put(`http://localhost:5000/api/editProduct/${productId}`,payload);
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}