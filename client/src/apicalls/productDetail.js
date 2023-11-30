import axios from 'axios';

export const ProductDetail = async function(){
    try {
        
        const response = await axios.get("http://localhost:5000/api/product/:productId");
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}