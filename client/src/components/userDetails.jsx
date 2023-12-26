import { useEffect, useState } from "react";
import axiosInstance ,{ setAuthToken } from "../apicalls/axiosInstance";
import { Link } from "react-router-dom";
import EditUserForm from "./editUserForm";
export default function UserDetails(){
    const token = localStorage.getItem('token');
    const [data,setData] = useState(null);
    

    useEffect( () => {

        const fetchData = async() =>{  
            try {
                
                
                setAuthToken(token);
                
                
                const response = await axiosInstance.get("http://localhost:5000/api/users/getUserInfo");
                
                setData(response.data.data);
                
            } catch (error) {
               
                if(error.response){
                    console.log(`${error.response.data.msg}`) ;
                } 
            }
            
        };


        if(token){
            fetchData();
        }
      
    },[])


    console.log(data);

    const handleEdit = () => {
        
       
      };


    return(
        <>
        <div className="container">

            <div className="userButtons">

                    <button className="editBtn" onClick={handleEdit}>Edit details</button>

                    <button className="LogOutBtn">Log out</button>

                    {data?(data.role == 'admin'?(<Link to={'/manageproduct'}><button className="manageBtn"> Go to Manage Products Page</button></Link>):(null)):(null)}
                    
                    
            </div>

            <div className="userDetails">
            <div className="userInfo">
                <div>Name:</div>
                <div>{data?(data.name):(null)}</div>
            </div>

            <div className="userInfo">
                <div>Email:</div>
                <div>{data?(data.email):(null)}</div>
            </div>


           
            <div className="userInfo">
                <div>Role:</div>
                <div>{data?(data.role):(null)}</div>
            </div>

            <div className="userInfo">
                <div>Password:</div>
                <div>********</div>
            </div>

            <div className="userInfo">
                {data?(data.profilePicture?(<><div>Profile Picture:</div>
                <div>{data.profilePicture}</div></>):(null)):(null)}

            </div>
            


            </div>

           
        </div>
        <EditUserForm userInformation={data}/>
        
        
        
        </>
    )
}