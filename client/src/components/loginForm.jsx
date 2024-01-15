
import { useId, useEffect, useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axiosInstance  from "../apicalls/axiosInstance";
import { setAuthToken } from "../apicalls/axiosInstance"
import LoadingSpinner from './loadingSpinner';
import {  toast } from 'react-toastify';



export default function LoginForm(){

  
  const[logIn,setLogIn] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
 

    //Generating unique ids
   
    const emailId = useId();
    const passwordId = useId();

 
   


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password:""
      });


     

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      //This response state will used as a prop to display  messages in the alert forms

        const[response,setResponse] = useState("");

        const LoginUser = async (payload) => { 
        try {
    
          setIsLoading(true);
          const response = await axiosInstance.post("http://localhost:5000/api/users/login", payload);
          const token = response.data.token;
          localStorage.setItem('token', token);
          
         
          
          setAuthToken(token);

          setIsLoading(false);

          return response.data.msg;
        
          
      } catch (error) {
        setIsLoading(false);
          if(error.response){
              return (error.response.data.msg);
          } 
          
      }
      }
      
     

      function submitForm(event){
       
        (async() =>{
          try {
            event.preventDefault();
            const data = await LoginUser(formData);
            const response =  data;
            console.log(`the response is: ${response}`)
            setResponse(response);
            
            if(response != "User Logged in Successfully"){
              
              throw Error(response);

            }
            
            //Reset form after submission
            setFormData({name: "",email: "",password:""})

          
            setLogIn(1);

            toast.dismiss();
             toast.success(response, {
                position: toast.POSITION.TOP_CENTER,
              });
            

            

            
  
  
          } catch (error) {
            console.log(error.message);
            toast.dismiss();
            toast.error(error.message, {
              position: toast.POSITION.TOP_CENTER,
              
            });

            
          }

        })();
    }


    const navigate = useNavigate();
    // If user is already log in, redirect to home page
    useEffect(()=>{
      if(localStorage.getItem("token")){
        navigate("/");
      }
  },[logIn]);

    return(
        <>
        

     
       
        <div className="loginSection">

        {isLoading ? <LoadingSpinner /> : (<div className="loginBox">
        
        <h1>LOGIN</h1>

        <span className="underline"></span>

        <form  className= 'loginForm'  onSubmit={submitForm}>

           

           <label htmlFor={emailId}>Email</label>
           <input  required='true ' name="email"  id={emailId} type='text'  onChange={handleInputChange}  value={formData.email} autoComplete="on"/>


           <label htmlFor={passwordId} >Password</label>
           <input  required='true ' name="password" id={passwordId} type='password' onChange={handleInputChange} value={formData.password} autoComplete="on"/>

           <button type="submit" className="loginBtn" disabled={isLoading}>Login</button>

        </form>

        <span className="alreadyHaveAcc">
        Don't have an account? <Link to="/register">Register</Link>
        </span>

        </div>)}
        
       
        </div>
        
        
        
        </>
    )
}