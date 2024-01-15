import axios from 'axios';

export const ProductDetail = async function(productId){
    try {
       
        const response = await axios.get(`http://localhost:5000/api/product/${productId}`);
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}


export const DeleteProduct = async function(productId){
    try {
        
        const response = await axios.delete(`http://localhost:5000/api/product/${productId}`);
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}
