import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance  from "../apicalls/axiosInstance";
import { setAuthToken } from "../apicalls/axiosInstance"
import  { useSelector}  from 'react-redux';
import { API_BASE_URL } from "../apicalls/apiService";



export  function ProtectedPage({children}){
    const [user,setUser] = useState(false);
    const navigate = useNavigate();

    
    const token = localStorage.getItem('token');

    const reloadredux = useSelector((state) => state.reload. value);
    

    const getUser = async () => {
        try {
    
            setAuthToken(token);
            const response = await axiosInstance.get(`${API_BASE_URL}/api/users/getUserInfo`);
            return response.data ;
            
        } catch (error) {
            
            return`${error.response.data.msg}` ;
            
        }

    }

    const validateToken = async () => {
    
        try {
            
            const response = await getUser();
            if(response.success){
            setUser(response.success);

            }
    
            else{
                console.log("validate token error");
                navigate("/login");
                throw Error(response.msg);
                
            } 
        } catch (error) {
            console.log(error);
        }
        

    };


    useEffect(()=>{
        
        if(localStorage.getItem('token')){
           
            validateToken();
            
        }

        else{
            navigate("/login");
        }
        
    },[token, reloadredux]);


    return(
        <div>

        {user? <div>{children}</div>: null}
        
        </div>

    )




}