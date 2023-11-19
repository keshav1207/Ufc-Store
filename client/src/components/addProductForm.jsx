import { useId } from "react"

export default function AddProductForm(){
    //Generating unique ids
    const imagesId = useId();
    const nameId = useId();
    const priceId = useId();
    const categoryId = useId();
    const commentsId = useId();
    const featuresId = useId();


    return(
        <>

        <div className="NewProductSection">
            <div className="NewProductBox">

                <h1>Add new product form</h1>
                <form className="NewProductForm">

                
                <div className="addProductField">
                    <label htmlFor={nameId}>Product Name</label>
                    <input type="text" id={nameId}/>
                </div>

                <div className="addProductField">
                    <label htmlFor={priceId}>Product Price</label>
                    <input type="text" id={priceId}/>
                </div>

                <div className="addProductField">
                     <label >Product Category</label>

                     <div className="radioBtns">

                    
                     <div className="radioBtn">
                        <label htmlFor="Apparel" >Apparel</label>
                        <input type="radio" id= "Apparel" name="Apparel" value="Apparel"/>
                     </div>

                     <div className="radioBtn">
                        <label htmlFor="Accessories" >Accessories</label>
                        <input type="radio" id= "Accessories" name="Accessories" value="Accessories"/>
                     </div>


                     <div className="radioBtn">
                        <label htmlFor="Equipment" >Equipment</label>
                        <input type="radio" id= "Equipment" name="Equipment" value="Equipment"/>
                    </div>   

                        
                     </div>


                    
                    
                   
                </div>

                <div className="addProductField">
                    <label htmlFor={featuresId}>New Features</label>
                    <input type="text" id={featuresId}/>
                </div>

                <div className="addProductField comment ">
                    <label htmlFor={commentsId}>Comments</label>
                    <input type="textarea" id={commentsId}/>

                </div>


                <div className="addProductField">
                    <label htmlFor={imagesId}>Product Images</label>
                    <input type="file" id={imagesId}/>

                </div>

            

                <button type="submit">Add</button>


                </form>

                
               

            </div>

        </div>
       
       
        </>
    )
}