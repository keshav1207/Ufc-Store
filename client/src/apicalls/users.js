import axiosInstance  from "./axiosInstance";
import axiosMultiFormInstance from './axiosMultiFormInstance'

//Register User

export const registerUser = async function(payload){
    try {
        const response = await axiosInstance.post("http://localhost:5000/api/users/register", payload);
        return response.data;
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
            
        } 
    }
}

//Edit User details
export const editUser = async function(payload){
    try {
        const response = await axiosMultiFormInstance.put("http://localhost:5000/api/users/editUserInfo", payload);
        return response.data;
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
            
        } 
    }
}




