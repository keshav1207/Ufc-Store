import { useEffect ,useState} from "react";
import axiosInstance ,{ setAuthToken } from "./axiosInstance";
import  {useSelector}  from 'react-redux';


export default function GetUser(){
    const [data, setData] = useState(null);
    const token = useSelector((state) => state.token.token);
    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async() =>{  
        try {
        
            console.log("axios currentUser function");
           
            setAuthToken(token);
            const response = await axiosInstance.get("http://localhost:5000/api/users/getUserInfo");
            console.log(`axios response is ${response}`);
            setData(response.data) ;
            
        } catch (error) {
            console.log("axios currentUser function error");
            if(error.response){
                setData(`${error.response.data.msg}`) ;
            } 
        }
    };


    return {data};
}