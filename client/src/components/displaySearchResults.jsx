
import DropdownFilter from "./dropdownFilter"
import SearchResultsHeading from "./searchResultsHeading";


export default function DisplaySearchResults({numberOfProductsFound, data}){
    
    return(
        <>

        <div className="ResultsContainer">
        <SearchResultsHeading productsTotal ={numberOfProductsFound} textSearched={data}/>
            
            <DropdownFilter/>
             
        {/* Add the searchResultsGrid component displaying the products found during the search */} 
        </div>
         

        
      
        </>
    )
}