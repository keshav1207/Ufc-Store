import '../index.css'
import { useId } from 'react';
import { Link } from 'react-router-dom';
import { RegisterUser } from '../apicalls/users';
import { useState } from 'react';
import Alert from './alert';


export default function RegisterForm(){

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

      function submitForm(event){
        (async() =>{
          try {
            event.preventDefault();
            const response = await RegisterUser(formData);
            console.log(response);

            //Reset form after submission
            setFormData({name: "",email: "",password:""})
           
            
  
          } catch (error) {
            console.log(error.message);
          }
          

        })();
        

    }





    return(
        <>
        <Alert message={' Account was created successfully!'} type={'success'}/>
         
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