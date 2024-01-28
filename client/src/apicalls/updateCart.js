import axios from "axios";
import { API_BASE_URL } from "./apiService";

export const updateCart = async function(userId,payload){
    try {
        
        const response = await axios.put(`${API_BASE_URL}/api/updateCart/${userId}`,payload);
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`;
        } 
    }

}