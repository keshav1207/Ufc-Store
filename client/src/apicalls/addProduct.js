import  axiosMultiFormInstance  from "./axiosMultiFormInstance";




//Add new product

export const AddNewProduct = async function(payload){
    try {
        
        const response = await axiosMultiFormInstance.post("http://localhost:5000/api/addProduct", payload);
        return response.data;

    } catch (error) {
        
        if(error.response){
            return `${error.response.data.msg}`
        } 
        
            
        } 
    
}