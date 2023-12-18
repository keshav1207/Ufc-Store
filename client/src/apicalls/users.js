import axiosInstance ,{ setAuthToken } from "./axiosInstance";
import  {useDispatch,useSelector}  from 'react-redux';
import { saveToken } from "../redux/jwtSlice";





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
    const dispatch = useDispatch();
   
    try {

        
        const response = await axiosInstance.post("http://localhost:5000/api/users/login", payload);
        const token = response.data.token;
        localStorage.setItem('token', token);

        dispatch(saveToken(token));

        setAuthToken(token);
        
        
        return response.data.msg;
    } catch (error) {
        if(error.response){
            return `${error.response.data.msg}`
        } 
    }
}


