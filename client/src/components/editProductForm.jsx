import { useId,useState,useEffect,useRef } from "react"
import Alert from "./alert";


export default function EditProductForm(){
    

  
    //Generating unique ids
    const imagesId = useId();
    const nameId = useId();
    const priceId = useId();
    const equipmentcategoryId = useId();
    const apparelcategoryId = useId();
    const accessoriescategoryId = useId();
    const commentsId = useId();
    const featuresId = useId();


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
    }, 10000);
  },[showAlert]);


  //This response state will used as a prop to display  messages in the alert forms

    const[response,setResponse] = useState("");



  // State to hold selected file
    const [selectedFiles, setSelectedFiles] = useState([]);

    
    const handleFileUpload = (event) => {
      //Use spread operator to copy the state into a  new array
      const currentFiles = [...selectedFiles];

      //Convert the fileslist to an Array
      const newFiles = Array.from(event.target.files);
      
      
      

      //Add each file to our currentFiles variable
        newFiles.forEach(file => {

        // Limit the number of images that can be uploaded to 5
          if(currentFiles.length >= 5){
        alert('You can only upload up to 5 images.');
        setSelectedFiles(currentFiles);
        hiddenFileInput.current.value = null;
        return;
        }

        //Check if image is already uploaded
        if(!currentFiles.some(item => item.name == file.name)){
          currentFiles.push(file);
        }
        else{
          alert("Image already uploaded!")
        }
        
        });

        setSelectedFiles(currentFiles);
        hiddenFileInput.current.value = null;
        
    
    };


    

   //State to manage visibility  of the 2 tabs
   const[visible,setvisible] = useState(1);

   function handleClick(index){
    setvisible(index);
   }


  //This ref will be used to clear the file input name 
  const hiddenFileInput = useRef(null);

//Function to handle the removal of images from selectedFiles
   function handleDelete(event,index){
    event.preventDefault();
    const files = [...selectedFiles];
    files.splice(index,1);
    setSelectedFiles(files);
    
    //Clear file Input after deleting last image
    if(files.length==0)
    hiddenFileInput.current.value = null;
   }



   function handleClose(e){
    e.preventDefault();
  
    // Add Dispatch edit product toggle
    
   
    
   }


   
   

    return(
        <>
        {isAlert?(isSuccess?<Alert type={'success'} message={response}/>:<Alert type={'warning'} message={response}/>)
        :null}

        <div className="NewProductSection">
            <div className="NewProductBox">
              <button className="closeFormBtn" onClick={handleClose}>X</button>
                <div className="tabs">
                  {/* We add ()=>handleclick() to the onClick so that React stores the function instead calling it everytime it renders these buttons */}
                    <button className= {visible==1?("TabBtn TabBtnActive"):("TabBtn")} onClick={()=>handleClick(1)}>General</button>
                    <button className= {visible==2?("TabBtn TabBtnActive"):("TabBtn")} onClick={()=>handleClick(2)}>Images</button>
                </div>

                {visible==1?(<h1> Product details</h1>):(<h1>Product images</h1>)}
                <form className="NewProductForm"  encType="multipart/form-data">

                    <div className={visible==1?("formField"):("formfield hidden")}>
                        <label htmlFor={nameId}>Product Name</label>
                        <input type="text" id={nameId} name="name" />
                    </div>
                   


                    <div className={visible==1?("formField"):("formfield hidden")}>
                        <label htmlFor={priceId}>Product Price</label>
                        <input type="text" id={priceId}  name="price" placeholder="$5"/>
                    </div>
                  


                    <div className={visible==1?("formField"):("formfield hidden")}>
                    <div className="inline">
                    <label >Product Category</label>
                    
                    <div className="radioBtns">

                     {/* ALl radiobtn input have the same name so that only one can be checked at a time*/}
                                    
                    <div className="radioBtn">
                    <label htmlFor={apparelcategoryId} >Apparel</label>
                    <input type="radio" id= {apparelcategoryId} name="category" value="Apparel" />
                    </div>

                    <div className="radioBtn">
                    <label htmlFor={accessoriescategoryId} >Accessories</label>
                    <input type="radio" id= {accessoriescategoryId} name="category" value="Accessories" />
                    </div>


                    <div className="radioBtn">
                    <label htmlFor={equipmentcategoryId} >Equipment</label>
                    <input type="radio" id= {equipmentcategoryId} name="category" value="Equipment" />
                    </div>   


                    </div>

                    </div>
                    </div>
                    

                    

                        <div className={visible==1?("formField"):("formfield hidden")}>
                            <label htmlFor={featuresId}>New Features</label>
                            <textarea id={featuresId} name="features"/>  

                        </div>
                   

                    <div className={visible==1?("formField"):("formfield hidden")}>
                        <label htmlFor={commentsId}>Comments</label>
                        <textarea id={commentsId} name="comments" />

                    </div>

                    
                    <div className={visible==2?("selectedImages"):(" hidden")}>
                        {selectedFiles?(selectedFiles.map((file,index)=>(
                            

                            <div className="selectedImageContainer"key={index}>
                            <img className="selectedImage" src={URL.createObjectURL(file)} />
                            {/* Check ()=> handleDelete(index) */}
                            <button className="deleteImageBtn" onClick={(event) => handleDelete(event,index)}>X</button>
                            </div>
                            
                           
                            
                        )

                        )): ("...Loading")}
                        

                    </div>

                    <div className={visible==2?("formField"):("formfield hidden")}>
                        <label htmlFor={imagesId}>Images</label>
                        <input type="file" multiple onChange={handleFileUpload} id={imagesId} ref={hiddenFileInput} name="files" />

                    </div>
              

                  
                
                <button type="submit"  className={visible==1?("addProductBtn"):("addProductBtn hidden")}>Save changes</button>


                </form>

                
               

            </div>

        </div>
       
       
        </>
    )
}