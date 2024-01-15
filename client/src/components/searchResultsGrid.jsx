
import { getSearchResults } from "../apicalls/getSearchResults";
import { useEffect, useState } from "react";
import { useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import LoadingSpinner from './loadingSpinner';

export default function SearchResultsGrid({textSearched}){

    const [isLoading, setIsLoading] = useState(false);
    const filter = useSelector((state) => state.filter.filter);
   

        const[myarray,setArray] = useState(null);

        


        useEffect(()=>{
            const fetchData =  async ()=>{
                try {
                    setIsLoading(true);
                    const response = await getSearchResults(textSearched,filter);
                    setArray(response.data);
                    setIsLoading(false);
                   
                } catch (error) {
                    console.log(error);
                    setIsLoading(false);
                }
               
            };

            fetchData();
        },[filter,textSearched]);



    
    return(
        <>

        {isLoading?<LoadingSpinner/>:( < div className="ProductsGrid">


       
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
            

        ))):("")


        }

        </div>

        )}
       
        
        </>
    )
}