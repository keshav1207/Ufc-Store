
import DropdownFilter from "./dropdownFilter"
import SearchResultsHeading from "./searchResultsHeading";
import SearchResultsGrid from "./searchResultsGrid";

export default function DisplaySearchResults({numberOfProductsFound, querydata}){
    
    return(
        <>

        <div className="ResultsContainer">
        <SearchResultsHeading productsTotal ={numberOfProductsFound} textSearched={querydata}/>
            
            <DropdownFilter/>
             
        <SearchResultsGrid textSearched={querydata}/>
        </div>
         

        
      
        </>
    )
}