import CategoryHeader from "./categoryHeader"
import DropdownFilter from "./dropdownFilter"
import ProductsGrid from "./productsGrid"

export default function DisplayCategory({category}){
    
    return(
        <>

        < div className="Categorycontainer">
            <CategoryHeader categorySelected={category}/> 

            
            <DropdownFilter/>
             
             <ProductsGrid categorySelected={category}/>

        </div>

        </>
    )
}