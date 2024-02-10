import { useId,useState,useEffect,useRef } from "react"
import { editFormToggle } from "../redux/editFormVisibilitySlice";
import  {useDispatch}  from 'react-redux';
import  { useSelector}  from 'react-redux';
import { productDetail } from "../apicalls/productDetail";
import { editProduct } from "../apicalls/editProduct";
import LoadingSpinner from "./loadingSpinner";
import { reloadToggle } from "../redux/reloadSlice";
import {  toast } from 'react-toastify';

export default function EditProductForm(){

  const dispatch = useDispatch();

  const editProductId = useSelector((state) => state.editProductId.productId);

  const [isLoading, setIsLoading] = useState(false); 


  const [inputValues, setInputValues] = useState({
    name: "",
    price: "",
    features:  "",
    comments: "",
    category:""
  });

  useEffect(() => {

    const fetchData =  async ()=>{
      try {
        setIsLoading(true);
          const response = await productDetail(editProductId);
          setSelectedFiles(response.data.images)


          setInputValues((prevInputValues) => ({
            ...prevInputValues,
            name: response.data.name,
            price: response.data.price,
            features: response.data.features,
            comments: response.data.comments,
            category: response.data.category.name,
          }));

      } catch (error) {
          console.log(error);

      }finally{
        setIsLoading(false);
      }

  };

  fetchData();
  },[editProductId]);

  
    //Generating unique ids
    const imagesId = useId();
    const nameId = useId();
    const priceId = useId();
    const equipmentcategoryId = useId();
    const apparelcategoryId = useId();
    const accessoriescategoryId = useId();
    const commentsId = useId();
    const featuresId = useId();



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
            toast.dismiss();
            toast.warning('You can only upload up to 5 images.', {
              position: toast.POSITION.TOP_CENTER,
            });
        setSelectedFiles(currentFiles);
        hiddenFileInput.current.value = null;
        return;
        }

        //Check if image is already uploaded
        if(!currentFiles.some(item => item.name == file.name)){
          currentFiles.push(file);
        }
        else{
          toast.dismiss();
            toast.warning("Image already uploaded!", {
              position: toast.POSITION.TOP_CENTER,
            });
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
  
    //  Dispatch edit product toggle
    dispatch(editFormToggle());
    
   }


   function handleSubmit(e) {

    (async() =>{
      setIsLoading(true);

      try {
        // Prevent the browser from reloading the page
      e.preventDefault();

      // Read the form data
      const form = e.target;
      const formData = new FormData(form);
  
      //Delete the original files key captured by the formdata above
      formData.delete("files");
      
      
      //Upload image files
      const selectFilesArray = [...selectedFiles]
      
      for(var i=0; i < selectFilesArray.length; i++){

        if(typeof selectFilesArray[i] === "string"){
          formData.append(`existing-${i}`, selectFilesArray[i]);
        }

        else{
          formData.append(`file-${i}`, selectFilesArray[i]);
        }
        
      }
      

      // Convert it into an object:
      const formJson = Object.fromEntries(formData.entries());
      
      
      console.log(formJson);
      
      
      const response = await editProduct(editProductId,formJson);
      toast.dismiss();
      toast.success("Product Edited successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(response);

      } catch (error) {
        console.log(error);
      
      
      }finally{
      setIsLoading(false);
      dispatch(editFormToggle());
      dispatch(reloadToggle());

      }

    })();

  }

  

  function handleInputChange(e){
    const { name, value } = e.target;
     // Update the state with the new value for the specific input
     setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  }
   
   

    return(
        <>
        

        <div className="editProductSection">
          {isLoading?(<LoadingSpinner/>):(  <div className="editProductBox">
              <button className="closeFormBtn" onClick={handleClose}>X</button>
                <div className="tabs">
                  {/* We add ()=>handleclick() to the onClick so that React stores the function instead calling it everytime it renders these buttons */}
                    <button className= {visible==1?("tabBtn tabBtnActive"):("tabBtn")} onClick={()=>handleClick(1)}>General</button>
                    <button className= {visible==2?("tabBtn tabBtnActive"):("tabBtn")} onClick={()=>handleClick(2)}>Images</button>
                </div>

                {visible==1?(<h1> Product details</h1>):(<h1>Product images</h1>)}
                <form className="editProductForm" onSubmit={handleSubmit} encType="multipart/form-data">

                    <div className={visible==1?("formField"):("formfield hidden")}>
                        <label htmlFor={nameId}>Product Name</label>
                        <input type="text" id={nameId} name="name" onChange={handleInputChange} value= {inputValues.name} />
                    </div>
                   


                    <div className={visible==1?("formField"):("formfield hidden")}>
                        <label htmlFor={priceId}>Product Price</label>
                        <input type="text" id={priceId}  name="price" onChange={handleInputChange} value={inputValues.price}/>
                    </div>
                  


                    <div className={visible==1?("formField"):("formfield hidden")}>
                    <div className="inline">
                    <label >Product Category</label>
                    
                    <div className="radioBtns">

                     {/* ALl radiobtn input have the same name so that only one can be checked at a time*/}
                                    
                    <div className="radioBtn">
                    <label htmlFor={apparelcategoryId} >Apparel</label>
                    <input type="radio" id= {apparelcategoryId} name="category" onChange={handleInputChange} value="Apparel" checked={inputValues?(inputValues.category == "Apparel"?(true):(false)):("")}/>
                    </div>

                    <div className="radioBtn">
                    <label htmlFor={accessoriescategoryId} >Accessories</label>
                    <input type="radio" id= {accessoriescategoryId} name="category" onChange={handleInputChange} value="Accessories" checked={inputValues?(inputValues.category == "Accessories"?(true):(false)):("")} />
                    </div>


                    <div className="radioBtn">
                    <label htmlFor={equipmentcategoryId} >Equipment</label>
                    <input type="radio" id= {equipmentcategoryId} name="category" onChange={handleInputChange} value="Equipment" checked={inputValues?(inputValues.category == "Equipment"?(true):(false)):("")} />
                    </div>   


                    </div>

                    </div>
                    </div>
                    

                    

                        <div className={visible==1?("formField"):("formfield hidden")}>
                            <label htmlFor={featuresId}>New Features</label>
                            <textarea id={featuresId} name="features" onChange={handleInputChange} value={inputValues.features}/>  

                        </div>
                   

                    <div className={visible==1?("formField"):("formfield hidden")}>
                        <label htmlFor={commentsId}>Comments</label>
                        <textarea id={commentsId} name="comments" onChange={handleInputChange} value={inputValues.comments}/>

                    </div>

                    
                    <div className={visible==2?("selectedImages"):(" hidden")}>
                        {selectedFiles?(selectedFiles.map((file,index)=>(
                        
                              <div className="selectedImageContainer"key={index}>

                            {typeof file === "string"?(<img className="selectedImage" src={file} />):(<img className="selectedImage" src={URL.createObjectURL(file)} />)}
                          
                              <button className="deleteImageBtn" onClick={(event) => handleDelete(event,index)}>X</button>
                              </div>
                            
 
                        )

                        )): ("...Loading")}
                        

                    </div>

                    <div className={visible==2?("formField"):("formfield hidden")}>
                        <label htmlFor={imagesId}>Images</label>
                        <input type="file" multiple onChange={handleFileUpload} id={imagesId} ref={hiddenFileInput} name="files" />

                    </div>
              

                  
                
                <button type="submit"  className={visible==1?("editProductBtn"):("editProductBtn hidden")}>Save changes</button>


                </form>

                
               

            </div>)}

        </div>
       
       
        </>
    )
}