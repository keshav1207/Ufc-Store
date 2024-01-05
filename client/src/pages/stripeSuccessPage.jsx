import { Link } from "react-router-dom"
export default function StripeSuccessPage(){
    return(
       <>
       <div className="messageContainer">

       <div className="successForm">

       <div className="successTick"><img src= 'https://res.cloudinary.com/dj7032z2r/image/upload/v1704467423/GreenTick_srmhti.png' alt="Green tick" /></div> 

        <div>Payment Successful</div>

        <div>Your order has been placed. We'll send an email with your order details </div>

        <Link to={'/'}><button className="Btn">Back to HomePage</button></Link>

        </div>



       </div>
       
       
       
       </>

    

    )

}