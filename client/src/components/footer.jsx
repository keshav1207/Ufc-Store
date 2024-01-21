import { Link } from 'react-router-dom'

export default function Footer(){
return(
    <>
        <div className="footerContainer">
        <div className="footerBox">
            <div className="shop">
                <p id="footerTitle"><b>Shop</b></p>
                
                <div className="footerLinks">
               <Link to={ "/aboutUs"}> <div>About us</div></Link>
               <Link to={"/giftCards"}><div> Gift Cards</div></Link>
               <Link to={"/contactUs"}><div>Contact Us</div></Link> 
                </div>
              
                
            </div>
            <div className="helpAndAdvice">
                <p id="footerTitle"><b>Help & Advice </b></p>
                <div className="footerLinks">
                <Link to={"/shippingsAndReturns"}><div> Shipping & Returns</div></Link>  
                <Link to={"/cookiePolicy"}><div>Cookie Policy</div></Link>  
                <Link to={"/privatePolicy"}><div>Privacy Policy</div></Link> 
                </div>
                
            </div>

        </div>
        </div>


    
    </>
)
}