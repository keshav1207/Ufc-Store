import axios from 'axios';

export const EditProduct = async function(productId){
    try {
        
        const response = await axios.put(`http://localhost:5000/api/editProduct/${productId}`);
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}