import axios from "axios";



export const deleteFromCart = async function(userId,productId){
    try {
        
        const response = await axios.delete(`http://localhost:5000/api/delete/${userId}/${productId}`);
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        }else {
            // Generic catch block for unexpected errors
            console.error("Unexpected error:", error);
            return "An unexpected error occurred.";
          } 
    }
}
