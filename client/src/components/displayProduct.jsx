
import { ProductDetail } from "../apicalls/productDetail"
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { GoArrowLeft,GoArrowRight } from "react-icons/go";
import { AddToCart } from "../apicalls/addToCart";
import { useJwtAuth } from '../hooks/useJwtAuth';
import axiosInstance from "../apicalls/axiosInstance";
import { setAuthToken } from "../apicalls/axiosInstance"

export default function DisplayProduct(){


    // Getting productId from params
    const {productId} = useParams();

    //Create a state to hold the productInfo fetched from database
    const [productInfo, setProductInfo] = useState(null);

    //Create state to hold the array of features
    const [featuresArray, setFeatures] = useState([]);

    const[numberOfImages, setNumberOfImages] = useState(0)
    const[imageSelected, setImageSelected] = useState(0);
    

    


    const leftClick = () => {
        
        if(imageSelected > 0){
            setImageSelected((previmageSelected)=> previmageSelected -1);
        }
        else{
            setImageSelected(numberOfImages-1);
        }
        
      };

      const rightClick = () => {
        
        if(imageSelected < numberOfImages-1){
            setImageSelected((previmageSelected)=> previmageSelected +1);
        }
        else{
            setImageSelected(0);
        }
      
       
       
      };

    useEffect(()=>{
            const fetchData =  async ()=>{
                try {
                    const response = await ProductDetail(productId);
                    setProductInfo(response.data);

                    // We split the features using the delimetre newline before storing it in the featuresArray
                    setFeatures(response.data.features.split("\n"));

                    setNumberOfImages(response.data.images.length);
                   
                    console.log(productInfo)

                } catch (error) {
                    console.log(error);
                }
               
            };

            fetchData();
           
        },[]);


        const { jwtToken } = useJwtAuth();
        const[userId, setUserId] = useState(null);
        
        
        useEffect(()=>{
            const fetchUserId =  async ()=>{
                try {
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


        const navigate = useNavigate();
        async function addToCart(){
           setAuthToken(jwtToken);
            if(userId){
                const result = await AddToCart(userId,productInfo._id);
                console.log(result);

            }
            else{
                navigate('/login');
            }

        }

    return(
        <>

        <div className="productImageBox">

            <div className="smallPics">
            {productInfo?(productInfo.images.map((item,index)=>(
                            <img  src={item}  key={index} />

                    ))):( null)}
               

            </div>

            <div className="bigPic">

                {/* Add condition that product need to have more than one product for arrows to appear */}
                {productInfo?(productInfo.images.length > 1? (<div className="arrows" onClick={leftClick}>
                <GoArrowLeft />
                </div>):(null)
                ):( null)}
                

                <div>
                <img  src= {productInfo?(productInfo.images[imageSelected]):("...Loading")} alt="" />
                </div>
                
                {productInfo?(productInfo.images.length > 1? (<div className="arrows" onClick={rightClick}>
                <GoArrowRight />
                </div>):(null)
                ):( null)}
                

            </div>


            <div className="textbox">
                <h1>{productInfo?(productInfo.name.toUpperCase()):("...Loading")}</h1>
                <h3>${productInfo?(productInfo.price):("...Loading")}</h3>
                <button id="AddToCartBtn" onClick={addToCart}>Add to Cart</button>

            </div>

        </div>

        <div className="featureBox">
            <div className="comments">
                    <p>{productInfo?(productInfo.comments):("...Loading")}</p>
            </div>

            <div className="keyFeatures">
                    <h3>Key Features:</h3>
                    <ul>
                    {featuresArray?(featuresArray.map((item,index)=>(
                            <li key={index}>{item}</li>

                    ))):( <li>...Loading </li>)}
                    
                        

                    </ul>
            </div>
        </div>


        </>

    )
}