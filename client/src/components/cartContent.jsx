import { useEffect, useState } from "react"
import { getAllCartProducts } from "../apicalls/getAllCartProducts"
import { useJwtAuth } from "../hooks/useJwtAuth";
import axiosInstance from "../apicalls/axiosInstance";
import { setAuthToken } from "../apicalls/axiosInstance";
import { DeleteFromCart } from "../apicalls/deleteFromCart";
import { MdDeleteOutline } from "react-icons/md";

export default function CartContent(){

    const { jwtToken } = useJwtAuth();
    const[userId, setUserId] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
    
    
    useEffect(()=>{
        const fetchUserId =  async ()=>{
            try {
                setAuthToken(jwtToken);
                const response = await axiosInstance.get("http://localhost:5000/api/users/getUserInfo") ;
               setUserId(response.data.data._id);
            

            } catch (error) {
                console.log(error);
            }
           
        };

      if(jwtToken){
        fetchUserId()
      }
       
    },[jwtToken]);


    async function deleteProduct(e){
        try {
            const productId = e.target.value;
            const response =  await DeleteFromCart(userId,productId);
            console.log(response);
           
        } catch (error) {
            console.log(error);
        }
       
    }




    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await getAllCartProducts(userId);
                console.log(response.data);
                setProductInfo(response.data);
                
            } catch (error) {
                console.log(error);
            }
        }
        if(userId){
            fetchData()
        }
      
    },[userId,deleteProduct])



   

   

  

    return(
        <>
        <div className="productSection">
        {userId?(<div className="CartProducts">Products in Cart</div>):(<div className="CartProducts">Cart empty</div>)}
        

        <div className="products">
        <div className="productLineCart">

            <div><b>Images</b></div>
            <div><b>Name</b></div>
            <div><b>Price</b></div>
            <div><b>Category</b></div>
            <div><b>Quantity</b></div>

        </div>

        {productInfo?(productInfo.map((item,index)=>(

                <div className="productLineCart" key={index}>

                <img src={item.productInfo.images[0]}/>
                <div>{item.productInfo.name}</div>
                <div>${item.productInfo.price}</div>
                <div>{item.productInfo.category.name}</div>
                <div>{item.quantity}</div>
                <div className="buttons">
                
                <button className="deleteBtn" onClick={deleteProduct}  value={item.productInfo._id}><MdDeleteOutline /></button>
                </div>
                
                </div>
                
                  
        ))):(null)}

</div>

</div>

    
        

        </>
    )
}
    
