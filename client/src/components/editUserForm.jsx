import { useId , useState, useEffect, useRef} from "react";
import { useDispatch } from "react-redux";
import { editUserFormToggle } from "../redux/editUserFormVisibility";



export default function EditUserForm({userInformation}){
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


    const [selectedImage, setSelectedImage] = useState([]);

    
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
      <input type="file" name="picture" id={pictureId} onChange={handleFileUpload}  ref={hiddenFileInput}/>

</div>  


    <div className="selectedImages">
                        {selectedImage?(selectedImage.map((file,index)=>(
                        
                              <div className="selectedImageContainer"key={index}>

                            {typeof file === "string"?(<img className="selectedImage" src={file} />):(<img className="selectedImage" src={URL.createObjectURL(file)} />)}
                              {/* Check ()=> handleDelete(index) */}
                              <button className="deleteImageBtn" onClick={handleDelete} >X</button>
                              </div>
                            
 
                        )

                        )): ("...Loading")}
                        

     </div>

     

      <button type="submit" className="editUserBtn">Save changes</button>


      </form>

           </div>

          
           
        </>
    )
}