import { useDispatch } from 'react-redux'
import { filterApplied } from "../redux/filterSlice"

export default function DropdownFilter(){
    const dispatch = useDispatch()

    function dispatchFunction(e){
        dispatch(filterApplied(e.target.value));
    }
    return(
        <>
        <div className="dropdownFilter">
        <select onChange={dispatchFunction}>

        <option value={["createdAt",1]}>Date, New to Old</option>
        <option value={["createdAt",-1]}>Date, Old to New</option>
        

        <option value={["name",1]}>Name, A-Z</option>
        <option value={["name",-1]}>Name, Z-A</option>
        <option value={["price",1]}>Price, Low to High</option>
        <option value={["price",-1]}>Price, High to Low</option>

        </select>
        </div>
       
        </>
    )
}