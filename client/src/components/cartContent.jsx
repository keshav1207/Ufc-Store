import { useEffect, useState } from "react"
import { getAllCartProducts } from "../apicalls/getAllCartProducts"
import { useJwtAuth } from "../hooks/useJwtAuth";
import axiosInstance from "../apicalls/axiosInstance";
import { setAuthToken } from "../apicalls/axiosInstance";
import { deleteFromCart } from "../apicalls/deleteFromCart";
import { MdDeleteOutline } from "react-icons/md";
import { CiSquareMinus } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../apicalls/clearCart";
import { updateCart } from "../apicalls/updateCart";
import {loadStripe} from '@stripe/stripe-js';
import axios from "axios";
import LoadingSpinner from './loadingSpinner';
import { useDispatch } from "react-redux";
import { reloadToggle } from "../redux/reloadSlice";
import {  toast } from 'react-toastify';
import { API_BASE_URL } from "../apicalls/apiService";


export default function CartContent(){

    const { jwtToken } = useJwtAuth();
    const[userId, setUserId] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
  
   const navigate = useNavigate();
    
    useEffect(()=>{
       
        const fetchUserId =  async ()=>{
            try {
                setIsLoading(true);
                setAuthToken(jwtToken);
                const response = await axiosInstance.get(`${API_BASE_URL}/api/users/getUserInfo`) ;
                setUserId(response.data.data._id);
            

            } catch (error) {
                console.log(error);
            }

            setIsLoading(false);
           
        };

      if(jwtToken){
        fetchUserId()
      }
       
    },[jwtToken]);


    const [reloadAlert, setReloadAlert] = useState(false);

   
    const [qtyArray, setQtyArray] = useState([]);
    const [priceArray, setPriceArray] = useState([]);
    const [total, setTotal] = useState(null);
   
    // Get all products from cart if userId is present
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                setIsLoading(true);
                const response = await getAllCartProducts(userId);
                console.log(response.data);
                setProductInfo(response.data);
  
            } catch (error) {
                console.log(error);
            }finally{
                setIsLoading(false);
            }

            
        }
        if(userId){
            fetchData()
        }
      
    },[userId,reloadAlert])

// Calculate the total cost and add the price and quantity of each products  to the QtyArray and PriceArray state
    useEffect(()=>{
        if(productInfo){
            setIsLoading(true);
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
            setIsLoading(false);
        }
       
    },[productInfo])


    //Recalculates total if qtyArray is changed. This occurs when the user is using the plus and minus icon to change quantity
    useEffect(()=>{
        if(priceArray.length > 0){
            setIsLoading(true);
            
            var total = 0;
            for(let i = 0 ; i<priceArray.length ; i ++){
                total += priceArray[i] * qtyArray[i]
            }
    
            
            setTotal(total);
            setIsLoading(false);
        }
       
    },[qtyArray])


    



    async function deleteProduct(e){
        try {
            // target refers to the DOM element that triggers an event. 
            //Otherwise, currentTarget refers to the DOM element that the event listener is listening on. In this case, we need to use currentTarget
            setIsLoading(true);
            const productId = e.currentTarget.value;
            const response =  await deleteFromCart(userId,productId);
            const update = await updateCart(userId,qtyArray);
            toast.dismiss();
            toast.success("Product successfully deleted from cart ", {
                position: toast.POSITION.TOP_CENTER,
              });

            dispatch(reloadToggle());
            setReloadAlert(true);


        // Reset deleteAlert to false after a delay (e.g., 1 second)
        setTimeout(() => {
            setReloadAlert(false);
        }, 1000);
           
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
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
              
                setIsLoading(true)
                const response =  await clearCart(userId);
                toast.dismiss();
            toast.success("Cart Cleared successfully", {
                position: toast.POSITION.TOP_CENTER,
              });
                dispatch(reloadToggle());
                console.log(response);
                setReloadAlert(true);
    
               
            // Reset reloadAlert to false after a delay (e.g., 1 second)
            setTimeout(() => {
                setReloadAlert(false);
            }, 1000);

           
               
            } catch (error) {
                console.log(error);
                
            }finally {
                setIsLoading(false);
            }
 
        }


        async function continueShop(){
            try {
                setIsLoading(true);
                //Update database for any changes in qty before navigating to home page
                const update = await updateCart(userId,qtyArray);
                
                navigate('/');
            } catch (error) {
                console.log(error);
                
            }finally {
                setIsLoading(false);
            }

        }

        async function handlePay(){
            try {

                setIsLoading(true);
                //Update database for any changes in qty before navigating to checkout page
                await updateCart(userId,qtyArray);

                const updatedcart = await getAllCartProducts(userId);

                const stripe =  await loadStripe( import.meta.env. VITE_STRIPE_PUBLISHABLE_KEY);
                
                const data = {
                    products: updatedcart.data,
                }

               const response = await axios.post(`${API_BASE_URL}/api/create-checkout-session`, JSON.stringify(data), {
            headers: {                  
                    'Content-Type': 'application/json'
                    }
                })

                const session =   response.data;

                const result = await stripe.redirectToCheckout({
                    sessionId:session.id
                })

                if(result.error){
                    console.log(result.error);
                }


                
            } catch (error) {
                console.log(error);

            }finally{
                setIsLoading(false);
            }

          
        }



  

    return(

        <>

        {isLoading?(<LoadingSpinner/>):(<> {productInfo !== undefined ?( <div>
       
       <div className="productSection">
       {userId?(<div className="cartProducts">Products in Cart</div>):(<div className="cartProducts">Cart empty</div>)}
       
       <div className="products">
       <div className="productLineCart">

           <div className="p-image"><b>Images</b></div>
           
           <div className="p-name"><b>Name</b></div>
           <div className="p-price"><b>Price</b></div>
           <div className="p-category"><b>Category</b></div>
           <div className="p-quantity"><b>Quantity</b></div>
           <div className="p-subtotal"><b>Subtotal</b></div>


       </div>

       {productInfo?(productInfo.map((item,index)=>(

               <div className="productLineCart" key={index}>

               <img className="p-image" src={item.productInfo.images[0]}/>
               <div className="p-name">{item.productInfo.name}</div>
               <div className="p-price">${item.productInfo.price}</div>
               <div className="p-category">{item.productInfo.category.name}</div>
               <div className="qtyBtns"> <button className="incrementBtn" onClick={() => handleIncrement(index,qtyArray[index])}><CiSquarePlus  className="quantitySvg" /></button> <div className="p-quantity" >{qtyArray[index]}</div><button className="decrementBtn" onClick={() => handleDecrement(index,qtyArray[index])}><CiSquareMinus  className="quantitySvg" /></button> </div>
               <div className="p-subtotal">${qtyArray[index] * priceArray[index] }</div>
               <div className="buttons">         
               
               <button className="deleteBtn" onClick={deleteProduct}  value={item.productInfo._id}><MdDeleteOutline /></button>
               </div>
               
               </div>

               
               
                 
       ))):(<LoadingSpinner/>)}

       

</div>
       

<div className="cartBtns">
<button className="btn" onClick={continueShop} disabled={isLoading}>Continue Shopping</button>
<button className="btn" onClick={handleClearCart} disabled={isLoading}>Clear Cart</button>
</div>


<div className="orderForm">

   <h1>Order details</h1>
   <div className="orderFormLine"> <div>Sub Total</div>  {total?(<div>${total}</div>):(null)}</div>
   <div className="orderFormLine"> <div>Tax </div> <div>0</div></div>
  
 
  <button className="btn" onClick={handlePay} disabled={isLoading}>Pay {total?(<div>${total}</div>):(null)}</button>
  

</div>


</div>

   
       

       </div>):(<div className="productSection"> <div className="cartEmpty">Cart Empty</div>  </div>)}
       </>)}

       

            </>
       
    )


}
    
