import { axiosInstance } from "./axiosInstance";


//Add new product

export const AddNewProduct = async function(payload){
    try {
        console.log("Api call addProduct");
        const response = await axiosInstance.post("http://localhost:5000/api/addProduct", payload);
        return response.data.msg;
    } catch (error) {
        console.log("Api call addProduct errorrr");
        if(error.response){
            return `${error.response.data.msg}`
            
        } 
    }
}