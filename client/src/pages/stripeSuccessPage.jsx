
import { useEffect,useState } from "react"
import { ClearCart } from "../apicalls/clearCart"
import { useJwtAuth } from "../hooks/useJwtAuth";
import { setAuthToken } from "../apicalls/axiosInstance";
import axiosInstance from "../apicalls/axiosInstance";
import { useNavigate } from "react-router-dom";



export default function StripeSuccessPage(){
    const[userId, setUserId] = useState(null);
    const { jwtToken } = useJwtAuth();
    const navigate = useNavigate();


    useEffect(()=>{
       
        const fetchUserId =  async ()=>{
            try {
                setAuthToken(jwtToken);
                const response = await axiosInstance.get("http://localhost:5000/api/users/getUserInfo") ;
               setUserId(response.data.data._id);
            

            } catch (error) {
                console.log(error);
            }
           
        };

      if(jwtToken){
        fetchUserId()
      }
       
    },[jwtToken]);



  


    async function handleClick(){

        const clearCart =  async ()=>{
            try {
                const response =  await ClearCart(userId);
                console.log(response);

            } catch (error) {
                console.log(error);
            }
           
        };

      if(jwtToken && userId != null){
        await clearCart();
        navigate('/');
        
      }

    }




    return(
       <>
       <div className="messageContainer">

       <div className="successForm">

       <div className="successTick"><img src= 'https://res.cloudinary.com/dj7032z2r/image/upload/v1704467423/Ufc-Store/GreenTick_srmhti.png' alt="Green tick" /></div> 

        <div>Payment Successful</div>

        <div>Your order has been placed. We'll send an email with your order details </div>

        <button className="Btn" onClick={handleClick}>Back to HomePage</button>

        </div>



       </div>
       
       
       
       </>

    

    )

}