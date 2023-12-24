import { useEffect ,useState} from "react";
import axiosInstance ,{ setAuthToken } from "./axiosInstance";



export default function GetUser(){
    const [data, setData] = useState(null);
    const token = localStorage.getItem('token');
    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async() =>{  
        try {
        
            
           
            setAuthToken(token);
            const response = await axiosInstance.get("http://localhost:5000/api/users/getUserInfo");
            console.log(`axios response is ${response}`);
            setData(response.data) ;
            
        } catch (error) {
           
            if(error.response){
                setData(`${error.response.data.msg}`) ;
            } 
        }
    };


    return data;
}