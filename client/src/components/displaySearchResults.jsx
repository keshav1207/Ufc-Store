
import DropdownFilter from "./dropdownFilter"
import SearchResultsHeading from "./searchResultsHeading";
import SearchResultsGrid from "./searchResultsGrid";

export default function DisplaySearchResults({numberOfProductsFound, queryData}){
    
    return(
        <>

        <div className="ResultsContainer">
        <SearchResultsHeading productsTotal ={numberOfProductsFound} textSearched={queryData}/>
            
            <DropdownFilter/>
             
        <SearchResultsGrid textSearched={queryData}/>
        </div>
         

        
      
        </>
    )
}