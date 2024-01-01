import axios from 'axios';

export const getAllCartProducts = async function(userId){
    try {
       
        const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}