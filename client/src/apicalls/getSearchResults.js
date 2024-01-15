import axios from 'axios';

export const getSearchResults = async function(searchQuery,optionalFilter){
    try {
       
        const response = await axios.get(optionalFilter?(`http://localhost:5000/api/searchResults/${searchQuery}/${optionalFilter}`):(`http://localhost:5000/api/searchResults/${searchQuery}`));
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}