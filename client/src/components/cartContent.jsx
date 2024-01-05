import { useEffect, useState } from "react"
import { getAllCartProducts } from "../apicalls/getAllCartProducts"
import { useJwtAuth } from "../hooks/useJwtAuth";
import axiosInstance from "../apicalls/axiosInstance";
import { setAuthToken } from "../apicalls/axiosInstance";
import { DeleteFromCart } from "../apicalls/deleteFromCart";
import { MdDeleteOutline } from "react-icons/md";
import { CiSquareMinus } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { ClearCart } from "../apicalls/clearCart";
import { UpdateCart } from "../apicalls/updateCart";
import {loadStripe} from '@stripe/stripe-js';
import axios from "axios";


export default function CartContent(){

    const { jwtToken } = useJwtAuth();
    const[userId, setUserId] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
  
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


    const [reloadAlert, setReloadAlert] = useState(false);

   
    const [qtyArray, setQtyArray] = useState([]);
    const [priceArray, setPriceArray] = useState([]);
    const [total, setTotal] = useState(null);
   

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await getAllCartProducts(userId);
                console.log(response.data);
                setProductInfo(response.data);

         
                
                
            } catch (error) {
                console.log(error);
            }
        }
        if(userId){
            fetchData()
        }
      
    },[userId,reloadAlert])


    useEffect(()=>{
        if(productInfo){
            var array1 =[];
            var array2 =[];
            var total = 0;
            (productInfo.map((item,index)=>(
                array1.push(item.quantity),
                array2.push(item.productInfo.price),
                total += item.quantity * item.productInfo.price
            )))
    
            setQtyArray(array1);
            setPriceArray(array2);
            setTotal(total);
        }
       
    },[productInfo])


    useEffect(()=>{
        if(priceArray.length > 0){
            
            var total = 0;
            for(let i = 0 ; i<priceArray.length ; i ++){
                total += priceArray[i] * qtyArray[i]
            }
    
            
            setTotal(total);
        }
       
    },[qtyArray])


    



    async function deleteProduct(e){
        try {
            // target refers to the DOM element that triggers an event. 
            //Otherwise, currentTarget refers to the DOM element that the event listener is listening on. In this case, we need to use currentTarget
            const productId = e.currentTarget.value;
            
            const response =  await DeleteFromCart(userId,productId);
            const update = await UpdateCart(userId,qtyArray);
            
           
            setReloadAlert(true);


        // Reset deleteAlert to false after a delay (e.g., 1 second)
        setTimeout(() => {
            setReloadAlert(false);
        }, 1000);
           
        } catch (error) {
            console.log(error);
        }
       
    }


   function handleIncrement(index, originalValue){
        let newValue = originalValue + 1;
        setQtyArray(prev => {
            const newArray = [...prev];
            // Update the value at the specified index
            newArray[index] = newValue;
            // Return the new array
            return newArray;
        })
       
   }

   function handleDecrement(index, originalValue){
    let newValue = originalValue -1 ;
    if(newValue < 1){
        newValue = 1;
    }
    setQtyArray(prev => {
        const newArray = [...prev];
        // Update the value at the specified index
        newArray[index] = newValue;
        // Return the new array
        return newArray;
    })
   
}

        async function handleClearCart(){
            try {
              
                
                const response =  await ClearCart(userId);
                console.log(response);
                setReloadAlert(true);
    
    
            // Reset reloadAlert to false after a delay (e.g., 1 second)
            setTimeout(() => {
                setReloadAlert(false);
            }, 1000);
               
            } catch (error) {
                console.log(error);
            }
        }


        async function continueShop(){
            try {
                //Update database for any changes in qty before navigating to home page
                const update = await UpdateCart(userId,qtyArray);
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }

        async function handlePay(){
            try {
                //Update database for any changes in qty before navigating to checkout page
                const update = await UpdateCart(userId,qtyArray);

                

            const updatedcart = await getAllCartProducts(userId);

                const stripe =  await loadStripe( import.meta.env. VITE_STRIPE_PUBLISHABLE_KEY);
                

                const data = {
                    products: updatedcart.data,
                }

               const response = await axios.post('http://localhost:5000/api/create-checkout-session', JSON.stringify(data), {
            headers: {                  
                    'Content-Type': 'application/json'
                    }
                })

                const session =   response.data;

                const result = stripe.redirectToCheckout({
                    sessionId:session.id
                })

                if(result.error){
                    console.log(result.error);
                }


                
            } catch (error) {
                console.log(error);
            }
        }



  

    return(
        <>
        <div className="productSection">
        {userId?(<div className="CartProducts">Products in Cart</div>):(<div className="CartProducts">Cart empty</div>)}
        

        <div className="products">
        <div className="productLineCart">

            <div><b>Images</b></div>
            
            <div><b>Name</b></div>
            <div><b>Price</b></div>
            <div><b>Category</b></div>
            <div><b>Quantity</b></div>
            <div><b>Subtotal</b></div>


        </div>

        {productInfo?(productInfo.map((item,index)=>(

                <div className="productLineCart" key={index}>

                <img src={item.productInfo.images[0]}/>
                <div>{item.productInfo.name}</div>
                <div>${item.productInfo.price}</div>
                <div>{item.productInfo.category.name}</div>
                <div className="qtyBtns"> <button className="incrementBtn" onClick={() => handleIncrement(index,qtyArray[index])}><CiSquarePlus  className="QuantitySvg" /></button> <div >{qtyArray[index]}</div><button className="decrementBtn" onClick={() => handleDecrement(index,qtyArray[index])}><CiSquareMinus  className="QuantitySvg" /></button> </div>
                <div>${qtyArray[index] * priceArray[index] }</div>
                <div className="buttons">         
                
                <button className="deleteBtn" onClick={deleteProduct}  value={item.productInfo._id}><MdDeleteOutline /></button>
                </div>
                
                </div>

                
                
                  
        ))):(null)}

        

</div>

<div className="cartBtns">
<button className="Btn" onClick={continueShop}>Continue Shopping</button>
<button className="Btn" onClick={handleClearCart}>Clear Cart</button>
</div>


<div className="orderForm">

    <h1>Order details</h1>
    <div className="orderFormLine"> <div>Sub Total</div>  {total?(<div>${total}</div>):(null)}</div>
    <div className="orderFormLine"> <div>Tax </div> <div>0</div></div>
   
  
   <button className="Btn" onClick={handlePay}>Pay {total?(<div>${total}</div>):(null)}</button>
   

</div>


</div>

    
        

        </>
    )
}
    
