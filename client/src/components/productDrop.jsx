
import { getNewProducts } from "../apicalls/getNewProducts"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import LoadingSpinner from "./loadingSpinner";



export default function ProductDropScreen(){
    const [isLoading, setIsLoading] = useState(false);
    const[data,setData] = useState(null);

    useEffect(()=>{
        const fetchData =  async ()=>{
            try {
                setIsLoading(true);
                const response = await getNewProducts();
                setData(response.data);
                setIsLoading(false);
               
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
           
        };

        fetchData();
    },[])

   

return(
    <>
       
     <div className="productDrop">

    <p>NEW PRODUCT DROPS</p>

    {isLoading? <LoadingSpinner/>:( <div className="productBox">

{data?(data.map((item,index)=>(

<Link to={`/products/${item._id}`}   key={item._id}>
<div className="product">
    <div className="picture">
<img src= {item.images[0]} alt="" />
</div>

<div className="info" >

<div className="productName">{item.name.toUpperCase().substring(0,30)}  </div>
<div className="productPrice">${item.price}</div>
</div>
</div>

</Link>
   

))):(<LoadingSpinner/>)


}


</div>)}

   
    </div>
    
    </>

)

   



}




