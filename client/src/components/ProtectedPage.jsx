import { useEffect, useState } from "react";
import { CurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({children}){
    const [user,setUser] = useState(null);
    const navigate = useNavigate();

    const validateToken = async () => {
    
        try {
            
            const response = await CurrentUser();
            
            console.log(response);
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
        if(localStorage.getItem("token")){
           
            validateToken();
           
            
        }

        else{
            navigate("/login");
        }
        
    },[]);


    return(
        <div>

        {user? <div>{children}</div>: null}
        
        </div>

    )




}