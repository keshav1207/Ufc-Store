import axiosInstance  from "./axiosInstance";
import { setAuthToken } from "./axiosInstance"
import { useEffect , useState} from "react";
import { API_BASE_URL } from "./apiService";


const LoginUser = ({ payload }) => {
    
   
    const [data, setData] = useState(null);

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                
                const response = await axiosInstance.post(`${API_BASE_URL}/api/users/login`, payload);
                const token = response.data.token;

                localStorage.setItem('token', token);
                
                setAuthToken(token);
                setData(response.data.msg);
                
                
                
            } catch (error) {
                if(error.response){
                    setData(error.response.data.msg);
                } else {
                    console.error("Unexpected error:", error);
                    
                }
            }
        }

        fetchData();
    },[payload]);

    return  data ;
}

export default LoginUser;