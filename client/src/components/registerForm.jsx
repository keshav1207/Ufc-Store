import '../index.css'
import {  useEffect, useId} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../apicalls/users';
import { useState } from 'react';

import LoadingSpinner from './loadingSpinner';
import {  toast } from 'react-toastify';


export default function RegisterForm(){
  const [isLoading, setIsLoading] = useState(false);

  //Generating unique ids
    const nameId = useId();
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

    

      function submitForm(event){
        (async() =>{
          try {

            event.preventDefault();
            setIsLoading(true);
             const response = await registerUser(formData);
             
             setResponse(response);
            
            if(response != "User created successfully!"){
              setIsLoading(false);
              throw Error(response);
             
            }


            //Reset form after submission
            setFormData({name: "",email: "",password:""})

            toast.dismiss();

            toast.success(response, {
              position: toast.POSITION.TOP_CENTER,
            });
              setIsLoading(false);
  
  
          } catch (error) {
            console.log(`The error is ${error.message}`);
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
  },[]);

  

   
    return(
        <>
      
        <div className="registerSection">

        
       {isLoading? <LoadingSpinner/>:( <div className="registerBox">
        
        <h1>CREATE ACCOUNT</h1>

        <span className="underline"></span>

        <form  className= 'registerForm'  onSubmit={submitForm}>

           <label htmlFor={nameId}>Name</label>
           <input  required='true ' name="name" id={nameId}  type='text'  onChange={handleInputChange}  value={formData.name} autoComplete="on"/>

           <label htmlFor={emailId}>Email</label>
           <input  required='true ' name="email"  id={emailId} type='text' onChange={handleInputChange}  value={formData.email} autoComplete="on"/>


           <label htmlFor={passwordId} >Password</label>
           <input  required='true ' name="password" id={passwordId} type='password' onChange={handleInputChange} value={formData.password}/>

           <button type="submit" className="registerBtn">Register</button>

        </form>

        <span className="alreadyHaveAcc">
        Already have an account? <Link to="/login">Login</Link>
        </span>
        

        </div>)}
       
        </div>
        
        
        
        </>
    )
}