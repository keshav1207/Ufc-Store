import axios from 'axios';
import { API_BASE_URL } from "./apiService";

export const productDetail = async function(productId){
    try {
       
        const response = await axios.get(`${API_BASE_URL}/api/product/${productId}`);
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}


export const deleteProduct = async function(productId){
    try {
        
        const response = await axios.delete(`${API_BASE_URL}/api/product/${productId}`);
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}
