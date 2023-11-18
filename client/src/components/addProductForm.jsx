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

                

                <label htmlFor={nameId}>Name</label>
                <input type="text" id={nameId}/>

                <label htmlFor={priceId}>Price</label>
                <input type="text" id={priceId}/>

                <label htmlFor={categoryId}>Category</label>
                <input type="text" id={categoryId}/>

                <label htmlFor={featuresId}>New Features</label>
                <input type="text" id={featuresId}/>

                <label htmlFor={commentsId}>Comments</label>
                <input type="text" id={commentsId}/>
            
                <label htmlFor={imagesId}>Add Images</label>
                <input type="file" id={imagesId}/>


                </form>

            </div>

        </div>
       
       
        </>
    )
}