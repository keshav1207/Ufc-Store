import { useId,useState,useEffect } from "react"
import { AddNewProduct } from "../apicalls/addProduct";
import Alert from "./alert";



export default function AddProductForm(){
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


    function handleSubmit(e) {
      

        (async() =>{
        
          // Prevent the browser from reloading the page
          e.preventDefault();
    
          // Read the form data
          const form = e.target;
          const formData = new FormData(form);
      
          
      
          // Or you can work with it as a plain object:
          const formJson = Object.fromEntries(formData.entries());
          console.log(formJson);
          const response = await AddNewProduct(formJson);
           

          if(response.success){
             
            setResponse(response.msg); 
           
            successType();
            showAlert();
          }

          else{
            setResponse(response);
            errorType();
            showAlert();
          }
         
        

        })();  

        //clear inputs
        e.currentTarget.reset();
    }


   //State to manage visibility  of the 2 tabs
   const[visible,setvisible] = useState(1);

   function handleClick(index){
    setvisible(index);
   }

   

    return(
        <>
        {isAlert?(isSuccess?<Alert type={'success'} message={response}/>:<Alert type={'warning'} message={response}/>)
        :null}

        <div className="NewProductSection">
            <div className="NewProductBox">

                <div className="tabs">
                    <button className= {visible==1?("TabBtn TabBtnActive"):("TabBtn")} onClick={()=>handleClick(1)}>General</button>
                    <button className= {visible==2?("TabBtn TabBtnActive"):("TabBtn")} onClick={()=>handleClick(2)}>Images</button>
                </div>

                <h1>New product details</h1>
                <form className="NewProductForm" onSubmit={handleSubmit}>

                    <div className="formField">
                        <label htmlFor={nameId}>Product Name</label>
                        <input type="text" id={nameId} name="name" />
                    </div>
                   


                    <div className="formField">
                        <label htmlFor={priceId}>Product Price</label>
                        <input type="text" id={priceId}  name="price" placeholder="$5"/>
                    </div>
                  


                    <div className="formField">
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
                    

                    

                        <div className="formField">
                            <label htmlFor={featuresId}>New Features</label>
                            <textarea id={featuresId} name="features"/>  

                        </div>
                   

                    <div className="formField">
                        <label htmlFor={commentsId}>Comments</label>
                        <textarea id={commentsId} name="comments" />

                    </div>
              

                  
                
                <button type="submit"  className="addProductBtn">Add Product</button>


                </form>

                
               

            </div>

        </div>
       
       
        </>
    )
}