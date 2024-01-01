import { useEffect, useState } from "react"
import { getAllCartProducts } from "../apicalls/getAllCartProducts"
import { useJwtAuth } from "../hooks/useJwtAuth";
import axiosInstance from "../apicalls/axiosInstance";
import { setAuthToken } from "../apicalls/axiosInstance";


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
      
    },[userId])

    return(
        <>
        <div className="productSection">
        <div className="CartProducts">Products in Cart</div>

        <div className="products">
        <div className="productLine">

            <div><b>Images</b></div>
            <div><b>Name</b></div>
            <div><b>Price</b></div>
            <div><b>Category</b></div>

        </div>

        {productInfo?(productInfo.map((item,index)=>(

                <div className="productLine" key={index}>

                <img src={item.images[0]}/>
                <div>{item.name}</div>
                <div>${item.price}</div>
                <div>{item.category.name}</div>
                <div className="buttons">
                
                <button className="deleteBtn"   value={item._id}>Delete</button>
                </div>
                
                </div>
                
                  
        ))):(null)}

</div>

</div>

    
        

        </>
    )
}
    
