import Banner from '../components/banner'
import Footer from '../components/footer'
import NavBar from '../components/navbar'
import '../index.css'
import DisplaySearchResults from '../components/displaySearchResults'
import { getSearchResults } from '../apicalls/getSearchResults'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../components/loadingSpinner'

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
                setIsLoading(false);
                
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }

        };

        fetchData();
        
    },[searchQuery])
   
    return(
        <>

        <main>

        <Banner/>

        <NavBar/>

        {isLoading?<LoadingSpinner/>:(<DisplaySearchResults numberOfProductsFound={numberOfProducts}  querydata ={searchQuery.toUpperCase()}/>)}


        <Footer/>
       
        </main>
      
        </>
    )
}