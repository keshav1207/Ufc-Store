import { useId,useState } from "react"
import { AddNewProduct } from "../apicalls/addProduct";



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

        const response = await AddNewProduct(formData);
        console.log(`the response is: ${response}`);

        })    
    }

    return(
        <>

        <div className="NewProductSection">
            <div className="NewProductBox">

            

                <h1>New product form</h1>
                <form className="NewProductForm" onSubmit={handleSubmit}>

                    <div className="formField">
                        <label htmlFor={nameId}>Product Name</label>
                        <input type="text" id={nameId} name="Name" />
                    </div>
                   


                    <div className="formField">
                        <label htmlFor={priceId}>Product Price</label>
                        <input type="text" id={priceId}  name="Price"/>
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
                            <textarea id={featuresId} name="Features"/>  

                        </div>
                   

                    <div className="formField">
                        <label htmlFor={commentsId}>Comments</label>
                        <textarea id={commentsId} name="Comments" />

                    </div>
              

                    <div className="formField">
                        <label htmlFor={imagesId}>Product Images</label>
                        <input type="file" id={imagesId}  name="images"/>
                    </div>
                  
                
                <button type="submit"  className="addProductBtn">Add Product</button>


                </form>

                
               

            </div>

        </div>
       
       
        </>
    )
}