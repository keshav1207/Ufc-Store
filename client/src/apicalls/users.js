import axiosInstance ,{ setAuthToken } from "./axiosInstance";






//Register User

export const RegisterUser= async function(payload){
    try {
        const response = await axiosInstance.post("http://localhost:5000/api/users/register", payload);
        return response.data;
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
            
        } 
    }
}

//Edit User
export const EditUser= async function(payload){
    try {
        const response = await axiosInstance.put("http://localhost:5000/api/users/editUserInfo", payload);
        return response.data;
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
            
        } 
    }
}




