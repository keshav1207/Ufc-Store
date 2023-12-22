import Banner from '../components/banner'
import Footer from '../components/footer'
import NavBar from '../components/navbar'
import '../index.css'
import DisplaySearchResults from '../components/displaySearchResults'
import { getSearchResults } from '../apicalls/getSearchResults'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function SearchResultsPage(){
    const {searchQuery} =  useParams();
    const [numberOfProducts, setNumberOfProducts] = useState(0);
    
    useEffect(()=>{

        const fetchData = async() =>{
            try {
                
                const results = await getSearchResults(searchQuery);
                if(results.data.length>0){
                    setNumberOfProducts(results.data.length);
                    
                }
                else{
                    setNumberOfProducts(0);
                }
                
            } catch (error) {
                console.log(error);
            }

        };

        fetchData();
        
    },[])
   
    return(
        <>

        <main>

        <Banner/>

        <NavBar/>

        <DisplaySearchResults numberOfProductsFound={numberOfProducts}  querydata ={searchQuery.toUpperCase()}/>


        <Footer/>
       
        </main>
      
        </>
    )
}