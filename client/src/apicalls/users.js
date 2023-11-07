import { axiosInstance } from "./axiosInstance";


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

// Login User
export const LoginUser = async function(payload){
    try {
        const response = await axiosInstance.post("http://localhost:5000/api/users/login", payload);
        return response.data.msg;
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}