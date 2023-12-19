import axiosInstance  from "./axiosInstance";
import { setAuthToken } from "./axiosInstance"
import  {useDispatch}  from 'react-redux';
import { saveToken } from "../redux/jwtSlice";
import { useEffect , useState} from "react";


const LoginUser = ({ payload }) => {
    
    const dispatch = useDispatch();

    const [data, setData] = useState(null);


    
    

    useEffect(()=>{
        const fetchData = async()=>{
            try {
    
                console.log("LoginUser component fetch data");
                const response = await axiosInstance.post("http://localhost:5000/api/users/login", payload);
                const token = response.data.token;
                localStorage.setItem('token', token);
        
                dispatch(saveToken(token));
        
                setAuthToken(token);
    
                setData(response.data.msg);
                
                
                
            } catch (error) {
                if(error.response){
                    setData(error.response.data.msg);
                } 
            }
        }

        fetchData();
    },[payload]);

    return  data ;
}

export default LoginUser;