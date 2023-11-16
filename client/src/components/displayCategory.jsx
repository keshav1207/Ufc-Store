import CategoryHeader from "./categoryHeader"
import DropdownFilter from "./dropdownFilter"
import ProductsGrid from "./productsGrid"

export default function DisplayCategory(){
    return(
        <>

        < div className="Categorycontainer">
            <CategoryHeader category={"Accessories"}/> 

            
            <DropdownFilter/>
             
             <ProductsGrid/>

        </div>

        
        
      

        
      
        </>
    )
}