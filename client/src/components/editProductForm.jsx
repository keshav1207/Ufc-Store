import { useId,useState,useEffect,useRef } from "react"
import { editFormToggle } from "../redux/editFormVisibilitySlice";
import  {useDispatch}  from 'react-redux';
import  { useSelector}  from 'react-redux';
import { ProductDetail } from "../apicalls/productDetail";

export default function EditProductForm(){

  const dispatch = useDispatch();

  const editProductId = useSelector((state) => state.editProductId.productId);

  const[productInfo,setProductInfo] = useState(null);


  useEffect(() => {

    const fetchData =  async ()=>{
      try {
          const response = await ProductDetail(editProductId);
          setProductInfo(response);
          

      } catch (error) {
          console.log(error);
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
  
    //  Dispatch edit product toggle
    dispatch(editFormToggle());
    
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
                        <input type="text" id={nameId} name="name" value={productInfo?(productInfo.data.name):("")} />
                    </div>
                   


                    <div className={visible==1?("formField"):("formfield hidden")}>
                        <label htmlFor={priceId}>Product Price</label>
                        <input type="text" id={priceId}  name="price" value={productInfo?(productInfo.data.price):("")}/>
                    </div>
                  


                    <div className={visible==1?("formField"):("formfield hidden")}>
                    <div className="inline">
                    <label >Product Category</label>
                    
                    <div className="radioBtns">

                     {/* ALl radiobtn input have the same name so that only one can be checked at a time*/}
                                    
                    <div className="radioBtn">
                    <label htmlFor={apparelcategoryId} >Apparel</label>
                    <input type="radio" id= {apparelcategoryId} name="category" value="Apparel" checked={productInfo?(productInfo.data.category.name == "Apparel"?(true):(false)):("")}/>
                    </div>

                    <div className="radioBtn">
                    <label htmlFor={accessoriescategoryId} >Accessories</label>
                    <input type="radio" id= {accessoriescategoryId} name="category" value="Accessories" checked={productInfo?(productInfo.data.category.name == "Accessories"?(true):(false)):("")} />
                    </div>


                    <div className="radioBtn">
                    <label htmlFor={equipmentcategoryId} >Equipment</label>
                    <input type="radio" id= {equipmentcategoryId} name="category" value="Equipment" checked={productInfo?(productInfo.data.category.name == "Equipment"?(true):(false)):("")} />
                    </div>   


                    </div>

                    </div>
                    </div>
                    

                    

                        <div className={visible==1?("formField"):("formfield hidden")}>
                            <label htmlFor={featuresId}>New Features</label>
                            <textarea id={featuresId} name="features" value={productInfo?(productInfo.data.features):("")}/>  

                        </div>
                   

                    <div className={visible==1?("formField"):("formfield hidden")}>
                        <label htmlFor={commentsId}>Comments</label>
                        <textarea id={commentsId} name="comments" value={productInfo?(productInfo.data.comments):("")}/>

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