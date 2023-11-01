import '../index.css'
import { useId } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterForm(){
    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();

    return(
        <>
         
        <div className="registerSection">

        
        <div className="registerBox">
        
        <h1>CREATE ACCOUNT</h1>

        <span className="underline"></span>

        <form  className= 'registerForm' action="post">

           <label htmlFor={nameId}>Name</label>
           <input  required='true ' name="name" id={nameId}/>

           <label htmlFor={emailId}>Email</label>
           <input  required='true ' name="email"  id={emailId}/>


           <label htmlFor={passwordId} >Password</label>
           <input  required='true ' name="password" id={passwordId}/>

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