import axios from 'axios';

export const getAllProducts = async function(){
    try {
        console.log("Axios activated");
        const response = await axios.get("http://localhost:5000/api/manageProducts");
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}