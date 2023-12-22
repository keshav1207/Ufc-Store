import axios from 'axios';

export const getSearchResults = async function(query){
    try {
       
        const response = await axios.get(`http://localhost:5000/api/searchResults/${query}`);
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}