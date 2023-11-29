
import { getCategoryProducts } from "../apicalls/getCategoryProducts"
import { useEffect, useState } from "react";

export default function ProductsGrid(props){

        const[myarray,setArray] = useState(null);

        useEffect(()=>{
            const fetchData =  async ()=>{
                try {
                    const response = await getCategoryProducts(props.categorySelected);
                    setArray(response.data);
                } catch (error) {
                    console.log(error);
                }
               
            };

            fetchData();
        },[]);
        
        
     
       
    
    
    return(
        <>

        < div className="ProductsGrid">


       
                {myarray?(myarray.map((item,index)=>(
                    <div className="product"key={item._id}>
                        <div className="picture">
                    <img src= {item.images} alt="" />
                </div>

                <div className="info" >
                    
                    <div className="productName">{item.name.toUpperCase().substring(0,30)}  </div>
                    <div className="productPrice">${item.price}</div>
                </div>
                    </div>
                       

                ))):(<p>Loading...</p>)
                
                
                }
                
        </div>

        
        
        </>
    )
}