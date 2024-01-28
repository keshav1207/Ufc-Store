import axiosInstance  from "./axiosInstance";
import axiosMultiFormInstance from './axiosMultiFormInstance'
import { API_BASE_URL } from "./apiService";

//Register User

export const registerUser = async function(payload){
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/api/users/register`, payload);
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
        const response = await axiosMultiFormInstance.put(`${API_BASE_URL}/api/users/editUserInfo`, payload);
        return response.data;
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
            
        } 
    }
}




