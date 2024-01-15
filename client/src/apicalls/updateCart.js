import axios from "axios";

export const UpdateCart = async function(userId,payload){
    try {
        
        const response = await axios.put(`http://localhost:5000/api/updateCart/${userId}`,payload);
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }

}