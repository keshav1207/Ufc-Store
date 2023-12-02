import { useEffect,useState} from "react"
import { getAllProducts } from "../apicalls/getAllProducts"


export default function ProductList(){

    //Create a state to hold the productInfo fetched from database
    const [productInfo, setProductInfo] = useState(null);


    useEffect(()=> {
    const fetchData = async()=>{
        try {
            const response = await getAllProducts();
            setProductInfo(response.data);
        } catch (error) {
            console.log(error);
            
        }
    }
    
    fetchData();
        
    },[])



    return(
        <>
        <div className="productSection">
        
        <div className="manageProductHeading">Manage Products Page</div>

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
                        <button className="deleteBtn">Delete</button>
                        </div>
                        
                        </div>
                        
                          
                ))):(null)}

        </div>

        </div>
        
      
        </>
    )
}