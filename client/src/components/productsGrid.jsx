import { getCategoryProducts } from "../apicalls/getCategoryProducts"
import { useEffect, useState } from "react";
import { useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import LoadingSpinner from './loadingSpinner';

export default function ProductsGrid(props){

    const [isLoading, setIsLoading] = useState(false);
    const filter = useSelector((state) => state.filter.filter);
    const[myarray,setArray] = useState(null);

        


        useEffect(()=>{
            const fetchData =  async ()=>{
                try {
                    setIsLoading(true);
                    const response = await getCategoryProducts(props.categorySelected,filter);
                    setArray(response.data);
                    
                } catch (error) {
                    console.log(error);
                    

                }finally{
                    setIsLoading(false);

                }
               
            };

            fetchData();
        },[props.categorySelected,filter]);



    
    return(
        <>
    {isLoading? <LoadingSpinner/>:( < div className="ProductsGrid">


       
        {myarray?(myarray.map((item,index)=>(

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

        </div>
        )}
            
                
                
        </>
    )
}