import { Link } from "react-router-dom"
export default function StripeFailurePage(){
    return(
       <>
       <div className="messageContainer">

       <div className="failureForm">

       <div className="failureIcon"><img src= 'https://res.cloudinary.com/dj7032z2r/image/upload/v1704468781/Ufc-Store/failure_ndvtur.png' alt="Failure icon" /></div> 

        <div>Payment Error</div>

        <div>Payment was unsuccessful. Your credit card was not charged. </div>

        <Link to={'/cart'}><button className="Btn">Back to Cart</button></Link>

        </div>



       </div>
       
       
       
       </>

    

    )

}