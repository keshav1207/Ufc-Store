import { useDispatch } from 'react-redux'
import { NewtoOld, OldtoNew, AZ, ZA, LowtoHigh, HightoLow } from "../redux/filterSlice"

export default function DropdownFilter(){
    const dispatch = useDispatch()

    return(
        <>
        <div className="dropdownFilter">
        <select>

        <option onChange={() => dispatch(NewtoOld(["CreatedAt",1]))}>Date, New to Old</option>
        <option onChange={() => dispatch(OldtoNew(["CreatedAt",-1]))}>Date, Old to New</option>
        <option onChange={() => dispatch(AZ(["name",1]))}>Name, A-Z</option>
        <option onChange={() => dispatch(ZA(["name",-1]))}>Name, Z-A</option>
        <option onChange={() => dispatch(LowtoHigh(["price",1]))}>Price, Low to High</option>
        <option onChange={() => dispatch(HightoLow(["price",-1]))}>Price, High to Low</option>

        </select>
        </div>
       
        </>
    )
}