
import Banner from "./banner";
import NavBar from "./navbar";
import ProductDropScreen from "./productDrop";

import '../index.css'

export default function Home(){
    return(
        <>

        <main>

        <Banner/>

        <NavBar/>

        <ProductDropScreen/>


       

        <div className="footerBox">
            <div className="shop">
                <p id="footerTitle"><b>Shop</b></p>
                <p>About us</p>
                <p> Gift Cards</p>
                <p>Contact Us</p>
                
            </div>
            <div className="helpAndAdvice">
                <p id="footerTitle"><b>Help & Advice </b></p>
                <p> Shipping & Returns</p>
                <p>Cookie Policy</p>
                <p>Privacy Policy</p>
            </div>

        </div>


        </main>
      

        </>
    )
}