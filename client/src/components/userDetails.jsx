import { useEffect, useState } from "react";
import axiosInstance ,{ setAuthToken } from "../apicalls/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import EditUserForm from "./editUserForm";
import { useDispatch, useSelector } from "react-redux";
import { editUserFormToggle } from "../redux/editUserFormVisibility";
import { useJwtAuth } from '../hooks/useJwtAuth';
import LoadingSpinner from "./loadingSpinner";
import { reloadToggle } from "../redux/reloadSlice";
export default function UserDetails(){
    const navigate = useNavigate();
    
    const [data,setData] = useState(null);
    const dispatch = useDispatch();
    const editForm = useSelector((state) => state.editUserFormVisibility.editUserFormVisibilityValue);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const { jwtToken } = useJwtAuth();
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {

        const fetchData = async() =>{  
            try {
                
                setIsLoading(true);
                setAuthToken(jwtToken);
                
                
                const response = await axiosInstance.get("http://localhost:5000/api/users/getUserInfo");
                
                setData(response.data.data);
                
                
            } catch (error) {
               
                if(error.response){
                    console.log(`${error.response.data.msg}`) ;
                } 
            }

            setIsLoading(false);
            
        };


        if(jwtToken){
            fetchData();
        }
        else{
            navigate('/login');
        }
      
    },[jwtToken, isLoggedOut,editForm])


 

    const handleEdit = () => {
       dispatch(editUserFormToggle());
       
      };

      const handleLogOut = () => {
        localStorage.removeItem('token');
        setIsLoggedOut(true);
        dispatch(reloadToggle());
        
       };
      


    return(
        <>
        <div className="container">

            <div className="userButtons">

                    <button className="editBtn" onClick={handleEdit} disabled={isLoading}>Edit details</button>

                    <button className="LogOutBtn" onClick={handleLogOut} disabled={isLoading}>Log out</button>

                    {data?(data.role == 'admin'?(<Link to={'/manageproduct'}><button className="manageBtn"> Go to Manage Products Page</button></Link>):(null)):(null)}
                    
                    
            </div>

           {isLoading?<LoadingSpinner/>:( <div className="userDetails">
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
                <div><img src={data.profilePicture} alt="profile picture" /></div></>):(null)):(null)}

            </div>
            
            


            </div>)}

           
        </div>
       
           
        <div className= {editForm?("overlay"):("overlay hideOverlay")}></div>
        {editForm?( <EditUserForm userInformation={data}/>):(null)}
   
        
        </>
    )
}