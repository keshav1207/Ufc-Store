import { useEffect,useState} from "react"
import { getAllProducts } from "../apicalls/getAllProducts"
import { DeleteProduct } from "../apicalls/productDetail";
import AddProductForm from "../components/addProductForm"
import EditProductForm from "../components/editProductForm"
import  { useSelector}  from 'react-redux';
import  {useDispatch}  from 'react-redux';
import {addProductFormToggle} from '../redux/addProductFormSlice';
import { editFormToggle } from "../redux/editFormVisibilitySlice";
import { setProductId } from "../redux/editProductIdSlice";
import {  useNavigate } from "react-router-dom";
import { UseJwtAuth } from '../hooks/UseJwtAuth';
import LoadingSpinner from "./loadingSpinner";
import {  toast } from 'react-toastify';





export default function ProductList(){
    const dispatch = useDispatch();
    const addProductFormVisibility = useSelector((state) => state.addProductForm. addProductFormVisible);
    const editProductFormVisiblity = useSelector((state) => state.editFormVisibility. editFormVisibility);
    const reloadredux = useSelector((state) => state.reload. value);
    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] =  useState(false);
  
    
    //Create a state to hold the productInfo fetched from database
    const [productInfo, setProductInfo] = useState(null);

  



    useEffect(()=> {
        const fetchData = async()=>{
            try {
                setIsLoading(true);
                const response = await getAllProducts();
                setProductInfo(response.data);
                console.log(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
                
                
            }
    
           
        }
    fetchData();
        
    },[reload, reloadredux])


//Check if token is expired and redirect to login page
const { jwtToken } = UseJwtAuth();
const navigate = useNavigate();
useEffect(()=> {
    if(!jwtToken){
        navigate('/login');
    }
        
    },[jwtToken])





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

    async function deleteProduct(){
        try {
       
        const response  = await DeleteProduct(deleteProductId);
        toast.dismiss();
        toast.success("Product Deleted", {
            position: toast.POSITION.TOP_CENTER,
          });
        setReload(prev => !prev);
        
        
        
        } catch (error) {
            
            console.log(error);
            
        }

        toggleDeleteModal();
        
    }


    function handleEdit(e){
        e.preventDefault();
        
       
        //Toggle edit form
        dispatch(editFormToggle());

        //Save product Id to redux
        dispatch(setProductId(e.target.value));

       

    }




    return(
        <>

      

         <div className="productSection">
        
        <div className="manageProductHeading">Manage Products Page</div>
        
        <div className= {addProductFormVisibility?("overlay"):("overlay hideOverlay")}></div>
        {addProductFormVisibility?(<AddProductForm/>):(null)}

        <div className= {editProductFormVisiblity?("overlay"):("overlay hideOverlay")}></div>
        {editProductFormVisiblity?(<EditProductForm/>):(null)}

        <div className= {deleteModal?("modal"):("modal hideModal")}>
            <p>Do you want to delete this product?</p>
            <div className="confirmationBtn">
                <button onClick={deleteProduct}>Yes</button>
                <button onClick={toggleDeleteModal}>No</button>
            </div>
        </div>

        <div className= {deleteModal?("overlay"):("overlay hideOverlay")}></div>
       
        <button className="addProductBtn" onClick={()=>dispatch(addProductFormToggle())} disabled={isLoading}>Add New Product</button>

       {isLoading?(<LoadingSpinner/>):( <div className="products">

<div className="productLine">



<div className="Pimage"><b>Images</b></div>
<div className="Pname"><b>Name</b></div>
<div className="Pprice" ><b>Price</b></div>
<div  className="Pcategory"><b>Category</b></div>



</div>

        {productInfo?(productInfo.map((item,index)=>(

                <div className="productLine" key={index}>

                <img  className= 'Pimage'src={item.images[0]}/>
                <div className="Pname">{item.name}</div>
                <div className="Pprice">${item.price}</div>
                <div className="Pcategory">{item.category.name}</div>
                <div className="buttons">
                <button className="editBtn"  value={item._id} onClick={handleEdit}>Edit</button>
                <button className="deleteBtn" onClick={handleDelete}  value={item._id}>Delete</button>
                </div>
                
                </div>
                
                  
        ))):(null)}

</div>)}
        

        </div>
       
        
      
        </>
    )
}