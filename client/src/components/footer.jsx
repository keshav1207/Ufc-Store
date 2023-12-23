import '../index.css'


export default function Footer(){
return(
    <>
       <div className="footerBox">
            <div className="shop">
                <p id="footerTitle"><b>Shop</b></p>
                
                <div className="footerLinks">
                <div>About us</div>
                <div> Gift Cards</div>
                <div>Contact Us</div>
                </div>
              
                
            </div>
            <div className="helpAndAdvice">
                <p id="footerTitle"><b>Help & Advice </b></p>
                <div className="footerLinks">
                    <div> Shipping & Returns</div>
                    <div>Cookie Policy</div>
                    <div>Privacy Policy</div>
                </div>
                
            </div>

        </div>
    
    </>

)
}