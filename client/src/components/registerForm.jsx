import '../index.css'
import {  useEffect, useId} from 'react';
import { Link } from 'react-router-dom';
import { RegisterUser } from '../apicalls/users';
import { useState } from 'react';
import Alert from './alert';


export default function RegisterForm(){

  //Generating unique ids
    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();



    const[isAlert,setAlert] = useState(false);
    const[isSuccess,setSuccess] = useState(true);

   
   
    function showAlert(){
      setAlert(true);
   }

   function successType(){
    setSuccess(true);
 }

 function errorType(){
  setSuccess(false);
}


   //Adding the auto-dismiss feature on the alert message components

   useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  },[showAlert]);
   


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

      function submitForm(event){
        (async() =>{
          try {
            event.preventDefault();
            const response = await RegisterUser(formData);
            console.log(response);

            //Reset form after submission
            setFormData({name: "",email: "",password:""})

           successType();
            showAlert();

            
  
  
          } catch (error) {
            console.log(error.message);
            errorType();
            showAlert();

           

            
          }

        })();

        
        

    }

  


    return(
        <>
       
        {isAlert?(isSuccess?<Alert type={'success'} message={'New user created successfully'}/>:<Alert type={'warning'} message={'Error! Please try again'}/>)
        :null}
      
         
        <div className="registerSection">

        
        <div className="registerBox">
        
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
        

        </div>
       
        </div>
        
        
        
        </>
    )
}