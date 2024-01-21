import { useId , useState, useEffect, useRef} from "react";
import { useDispatch } from "react-redux";
import { editUserFormToggle } from "../redux/editUserFormVisibility";
import { editUser } from "../apicalls/users";
import { setAuthTokenMulti } from "../apicalls/axiosMultiFormInstance";
import LoadingSpinner from "./loadingSpinner";
import {  toast } from 'react-toastify';
import { reloadToggle } from "../redux/reloadSlice";



export default function EditUserForm({userInformation}){
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  
    

    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();
    const pictureId = useId();

    const [inputValues, setInputValues] = useState({
        name: "",
        email: "" ,
        password:  "",
        profilePicture:"",
        
        
      });

      useEffect(() => {
            if(userInformation){
                setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    name: userInformation.name,
                    email: userInformation.email,
                    profilePicture: userInformation.profilePicture,
                    
                    
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
  

    //This ref will be used to clear the file input name 
    const hiddenFileInput = useRef(null);


    const [selectedImage, setSelectedImage] = useState([userInformation.profilePicture]);


    

    
    const handleFileUpload = (event) => {
      
      //Convert the filelist to an Array
      const ImageArray = Array.from(event.target.files);

      setSelectedImage(ImageArray);
      
        
        
    };


    const handleDelete = (event) => {
      event.preventDefault();

      setSelectedImage([])

       //Clear file Input after deleting  image
      hiddenFileInput.current.value = null;
      
    }



   function handleSubmit(e) {
    
   

    (async() =>{

      // Prevent the browser from reloading the page
      e.preventDefault();

      setIsLoading(true);

      // Read the form data
      const form = e.target;
      const formData = new FormData(form);
  
      //Delete the original picture key captured by the formdata above
      formData.delete('picture');


      //Append the image in selectedImage
      formData.append('picture', selectedImage[0]);
    
      // Convert it into an object:
      const formJson = Object.fromEntries(formData.entries());
      
      
      
      const token = localStorage.getItem('token');
     

      setAuthTokenMulti(token);

     try {
      const response = await editUser(formJson);
     } catch (error) {
      toast.dismiss();
      toast.error("An error occured! Please try again", { 
        position: toast.POSITION.TOP_CENTER,
      });
     }
      
    
      if(formJson.password !== ""){
        localStorage.removeItem('token');
        window.location.reload();
      }

      dispatch(reloadToggle());
      toast.dismiss();
      toast.success("User details successfully updated", {
        position: toast.POSITION.TOP_CENTER,
      });


      setIsLoading(false);

      
      dispatch(editUserFormToggle());
      
     

    })();

  }

    return(
        <>
           {isLoading?<LoadingSpinner/>:(<div className="editUserBox">
          
          <button type="button" className="closeFormBtn" onClick={handleClose}>X</button>

          <h1>Edit User details</h1>
           <form className="editUserForm" encType="multipart/form-data" onSubmit={handleSubmit} >

            <div className="formField">
                  <label htmlFor= {nameId}>Name</label>
                  <input type="text" name="name" id={nameId} onChange={handleInputChange} value={inputValues.name} />
            </div>
                  
            <div className="formField">
                <label htmlFor= {emailId}>Email</label>
                <input type="text" name="email" id={emailId} onChange={handleInputChange} value={inputValues.email} />
            </div>
                
            <div className="formField">
                  <label htmlFor= {passwordId}> New Password</label>
                  <input type="password" name="password" id={passwordId} onChange={handleInputChange} value={inputValues.password} />

            </div>
                  
            <div className="formField">
                <label htmlFor= {pictureId}>Picture</label>
                  <input type="file" name="picture" id={pictureId} onChange={handleFileUpload}  ref={hiddenFileInput}/>

            </div>  


            <div className="selectedImages">
                                {selectedImage && selectedImage[0] !== ""?(selectedImage.map((file,index)=>(
                                
                                      <div className="selectedImageContainer"key={index}>

                                    {typeof file === "string"?(<img className="selectedImage" src={file} />):(<img className="selectedImage" src={URL.createObjectURL(file)} />)}
                                      {/* Check ()=> handleDelete(index) */}
                                      <button className="deleteImageBtn" onClick={handleDelete} >X</button>
                                      </div>
                                    
        
                                )

                                )): (null)}
                                

            </div>

     

      <button type="submit" className="editUserBtn" >Save changes</button>


      </form>

           </div>)}
           

          
           
        </>
    )
}