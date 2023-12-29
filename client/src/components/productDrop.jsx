
import '../index.css'
import { getNewProducts } from "../apicalls/getNewProducts"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';


export default function ProductDropScreen(){
    const[data,setData] = useState(null);

    useEffect(()=>{
        const fetchData =  async ()=>{
            try {
                const response = await getNewProducts();
                setData(response.data);
               
            } catch (error) {
                console.log(error);
            }
           
        };

        fetchData();
    },[])

   

return(
    <>
     <div className="productDrop">

    <p>NEW PRODUCT DROPS</p>

    <div className="productBox">

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
       

))):(<p>Loading...</p>)


}
    

    </div>
    </div>
    
    </>

)

   



}




