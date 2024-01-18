import axios from "axios";

export const clearCart = async function(userId){
    try {
        
        const response = await axios.delete(`http://localhost:5000/api/clearCart/${userId}`);
        
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