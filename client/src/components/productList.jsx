import { useEffect,useState} from "react"
import { getAllProducts } from "../apicalls/getAllProducts"
import { DeleteProduct } from "../apicalls/productDetail";


export default function ProductList(){

    //Create a state to hold the productInfo fetched from database
    const [productInfo, setProductInfo] = useState(null);

    const fetchData = async()=>{
        try {
            const response = await getAllProducts();
            setProductInfo(response.data);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=> {
    fetchData();
        
    },[deleteProduct])





const[deleteModal, setDeleteModal] = useState(false);



    function toggleDeleteModal(){
            setDeleteModal(!deleteModal);
    }

    //Create state to hold the Id of the product to be deleted.
    const[deleteProductId, setDeleteProductId] = useState(null);


    function handleDelete(e){
        setDeleteProductId(e.target.value);
        toggleDeleteModal();
    }

    function deleteProduct(){
        DeleteProduct(deleteProductId);
        toggleDeleteModal();
        
    }




    return(
        <>
        <div className="productSection">
        
        <div className="manageProductHeading">Manage Products Page</div>

        <div className= {deleteModal?("modal"):("modal hideModal")}>
            <p>Do you want to delete this product?</p>
            <div className="confirmationBtn">
                <button onClick={deleteProduct}>Yes</button>
                <button onClick={toggleDeleteModal}>No</button>
            </div>
        </div>

        <div className= {deleteModal?("overlay"):("overlay hideOverlay")}></div>
       
        <button className="addProductBtn">Add New Product</button>

        <div className="products">

        <div className="productLine">

        <div><b>Images</b></div>
        <div><b>Name</b></div>
        <div><b>Price</b></div>

        </div>

                {productInfo?(productInfo.map((item,index)=>(

                        <div className="productLine" key={index}>

                        <img src={item.images[0]}/>
                        <div>{item.name}</div>
                        <div>${item.price}</div>
                        <div className="buttons">
                        <button className="editBtn">Edit</button>
                        <button className="deleteBtn" onClick={handleDelete}  value={item._id}>Delete</button>
                        </div>
                        
                        </div>
                        
                          
                ))):(null)}

        </div>

        </div>
        
      
        </>
    )
}