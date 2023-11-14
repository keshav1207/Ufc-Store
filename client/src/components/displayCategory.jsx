import CategoryHeader from "./categoryHeader"
import DropdownFilter from "./dropdownFilter"

export default function DisplayCategory(){
    return(
        <>

        <div className="Categorycontainer">
            <CategoryHeader category={"Accessories"}/>  

        </div>


        <DropdownFilter/>
      

        
      
        </>
    )
}