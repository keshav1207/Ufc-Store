import '../index.css'
import { useId } from 'react';

export default function LoginForm(){
    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();

    return(
        <>
         
        <div className="loginSection">

        
        <div className="loginBox">
        
        <h1>LOGIN</h1>

        <span className="underline"></span>

        <form  className= 'loginForm' action="post">

           <label htmlFor={nameId}>Name</label>
           <input  required='true ' name="name" id={nameId}/>

           <label htmlFor={emailId}>Email</label>
           <input  required='true ' name="email"  id={emailId}/>


           <label htmlFor={passwordId} >Password</label>
           <input  required='true ' name="password" id={passwordId} type='password'/>

           <button type="submit" className="loginBtn">Login</button>

        </form>

        
        

        </div>
       
        </div>
        
        
        
        </>
    )
}