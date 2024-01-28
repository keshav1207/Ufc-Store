import axios from 'axios';
import { API_BASE_URL } from "./apiService";

export const getSearchResults = async function(searchQuery,optionalFilter){
    try {
       
        const response = await axios.get(optionalFilter?(`${API_BASE_URL}/api/searchResults/${searchQuery}/${optionalFilter}`):(`${API_BASE_URL}/api/searchResults/${searchQuery}`));
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } else {
            // Generic catch block for unexpected errors
            console.error("Unexpected error:", error);
            return "An unexpected error occurred.";
          }
    }
}