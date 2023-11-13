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
        localStorage.setItem("token", response.data.token);
        return response.data.msg;
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}


// Get Current User
export const CurrentUser = async function(){
    try {
        console.log("Calling currentuser axios function");
        const response = await axiosInstance.get("http://localhost:5000/api/users/get-user-info");
        console.log(`The response is ${response.data}`);
        return response.data;
        
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}