
export default function SearchResultsHeading({productsTotal, textSearched}){
  
    
return(
    <>
    
    {productsTotal > 0? (<div className="resultsHeading"> <h3>Search results for</h3> <h2>"{textSearched}" ({productsTotal})</h2> </div>):(<div className="resultsHeading"><h2>SORRY, NOTHING FOUND FOR "{textSearched}"</h2> </div>)}
    
    </>
)




}