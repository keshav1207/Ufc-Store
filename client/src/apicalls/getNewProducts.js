import axios from "axios";

export const getNewProducts = async function(){
    try {
       
        const response = await axios.get("http://localhost:5000/api/newProducts");
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}