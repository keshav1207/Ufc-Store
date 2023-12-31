import  AxiosInstance  from "axios";

export const AddToCart = async function(userId,productId){
    try {
        
        const response = await AxiosInstance.put(`http://localhost:5000/api/addToCart/${userId}/${productId}`);
        
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }

}