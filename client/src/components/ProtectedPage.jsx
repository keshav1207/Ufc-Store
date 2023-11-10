import { useEffect, useState } from "react";
import { CurrentUser } from "../apicalls/users";

export default function ProtectedPage({children}){
    const [user,setUser] = useState(null);

    const validateToken = async () => {
    
        try {
            const response = await CurrentUser();
            
            if(response.success){
            setUser(response.success);
            }
    
            else{
                throw Error(response.msg);
            } 
        } catch (error) {
            console.log(error);
        }
        

    };


    useEffect(()=>{
        validateToken();
    },[]);


    return(
        <div>

        {user? <div>{children}</div>: <h1>Error</h1>}
        
        </div>

    )




}