import product1 from "../assets/product1.webp"
import product2 from "../assets/product2.webp"
import product3 from "../assets/product3.webp"
import '../index.css'
import { getNewProducts } from "../apicalls/getNewProducts"


export default function ProductDropScreen(){
return(
    <>
     <div className="productDrop">

    <p>NEW PRODUCT DROPS</p>

    <div className="productBox">
    <img src={product1} alt="product1" />
    <img src={product2} alt="product2" />
    <img src={product3} alt="product3" />

    </div>
    </div>
    
    </>

)

   



}




