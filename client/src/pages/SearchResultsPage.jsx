import Footer from '../components/footer'
import DisplaySearchResults from '../components/displaySearchResults'
import { getSearchResults } from '../apicalls/getSearchResults'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../components/loadingSpinner'
import FixedNavBannerContainer from '../components/fixedNavBannerContainer'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SearchResultsPage(){
    const {searchQuery} =  useParams();
    const [numberOfProducts, setNumberOfProducts] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(()=>{

        const fetchData = async() =>{

            try {
                setIsLoading(true);
                const results = await getSearchResults(searchQuery);
                if(results.data.length>0){
                    setNumberOfProducts(results.data.length);
                    
                }
                else{
                    setNumberOfProducts(0);
                }
                
                
            } catch (error) {
                console.log(error);
               
                toast.dismiss();
                toast.error('An error occurred. Please try again.', {
              position: toast.POSITION.TOP_CENTER,
            });

            } finally {
                setIsLoading(false);
            }

            

        };

        fetchData();
        
    },[searchQuery])
   
    return(
        <>

        <main>

       <FixedNavBannerContainer/>

        {isLoading?<LoadingSpinner/>:(<DisplaySearchResults numberOfProductsFound={numberOfProducts}  queryData ={searchQuery.toUpperCase()}/>)}


        <Footer/>
       
        </main>
      
        </>
    )
}