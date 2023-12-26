
import { useId , useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { editUserFormToggle } from "../redux/editUserFormVisibility";


export default function EditUserForm({userInformation}){
  const dispatch = useDispatch();
    console.log(userInformation);

    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();
    const pictureId = useId();

    const [inputValues, setInputValues] = useState({
        name: "",
        email: "" ,
        password:  "",
        
        
      });

      useEffect(() => {
            if(userInformation){
                setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    name: userInformation.name,
                    email: userInformation.email,
                    
                    
                  }));
            }
      },[userInformation])

      function handleInputChange(event){
        event.preventDefault();
        const { name, value } = event.target;
     // Update the state with the new value for the specific input
         setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
        
      }


    function handleClose(){
        dispatch(editUserFormToggle());
    }
  

    return(
        <>
           
           <div className="editUserBox">
          
          <button className="closeFormBtn" onClick={handleClose}>X</button>

          <h1>Edit User details</h1>
           <form className="editUserForm" encType="multipart/form-data" >

<div className="formField">
      <label htmlFor= {nameId}>Name</label>
      <input type="text" name="name" id={nameId} onChange={handleInputChange} value={userInformation?(inputValues.name):("")} />
</div>
      
<div className="formField">
    <label htmlFor= {emailId}>Email</label>
    <input type="text" name="email" id={emailId} onChange={handleInputChange} value={userInformation?(inputValues.email):("")} />
</div>
     
<div className="formField">
      <label htmlFor= {passwordId}> New Password</label>
      <input type="password" name="password" id={passwordId} onChange={handleInputChange} value={userInformation?(inputValues.password):("")} />

</div>
      
<div className="formField">
     <label htmlFor= {pictureId}>Picture</label>
      <input type="file" name="picture" id={pictureId} />

</div>  


     

      <button type="submit" className="editUserBtn">Save changes</button>


      </form>

           </div>

          
           
        </>
    )
}