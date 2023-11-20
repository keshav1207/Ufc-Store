import { useId } from "react"

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


    return(
        <>

        <div className="NewProductSection">
            <div className="NewProductBox">

            

                <h1>New product form</h1>
                <form className="NewProductForm">

                    <div className="formField">
                        <label htmlFor={nameId}>Product Name</label>
                        <input type="text" id={nameId}/>
                    </div>
                   


                    <div className="formField">
                        <label htmlFor={priceId}>Product Price</label>
                        <input type="text" id={priceId}/>
                    </div>
                  


                    <div className="formField">
                    <div className="inline">
                    <label >Product Category</label>
                    
                    <div className="radioBtns">

                     {/* ALl radiobtn input have the same name so that only one can be checked at a time*/}
                                    
                    <div className="radioBtn">
                    <label htmlFor={apparelcategoryId} >Apparel</label>
                    <input type="radio" id= {apparelcategoryId} name="category" value="Apparel"/>
                    </div>

                    <div className="radioBtn">
                    <label htmlFor={accessoriescategoryId} >Accessories</label>
                    <input type="radio" id= {accessoriescategoryId} name="category" value="Accessories"/>
                    </div>


                    <div className="radioBtn">
                    <label htmlFor={equipmentcategoryId} >Equipment</label>
                    <input type="radio" id= {equipmentcategoryId} name="category" value="Equipment"/>
                    </div>   


                    </div>

                    </div>
                    </div>
                    

                    

                        <div className="formField">
                            <label htmlFor={featuresId}>New Features</label>
                            <textarea id={featuresId}/>  

                        </div>
                   

                    <div className="formField">
                        <label htmlFor={commentsId}>Comments</label>
                        <textarea id={commentsId}/>

                    </div>
              

                    <div className="formField">
                        <label htmlFor={imagesId}>Product Images</label>
                        <input type="file" id={imagesId}/>
                    </div>
                  
                
                <button type="submit"  className="addProductBtn">Add Product</button>


                </form>

                
               

            </div>

        </div>
       
       
        </>
    )
}