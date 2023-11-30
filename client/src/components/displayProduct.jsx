import smallPic1 from "../assets/mouthgard1.webp"
import smallPic2 from "../assets/mouthgard2.avif"
import { ProductDetail } from "../apicalls/productDetail"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function DisplayProduct(){


    // Getting productId from params
    const {productId} = useParams();

    //Create a state to hold the productInfo fetched from database
    const [productInfo, setProductInfo] = useState(null);

    //Create state to hold the array of features
    const [featuresArray, setFeatures] = useState([]);

    useEffect(()=>{
            const fetchData =  async ()=>{
                try {
                    const response = await ProductDetail(productId);
                    setProductInfo(response.data);

                    // We split the features using the delimetre newline before storing it in the featuresArray
                    setFeatures(response.data.features.split("\n"));
                   
                    console.log(productInfo)

                } catch (error) {
                    console.log(error);
                }
               
            };

            fetchData();
        },[]);

    return(
        <>

        <div className="productImageBox">

            <div className="smallPics">
            {productInfo?(productInfo.images.map((item,index)=>(
                            <img  src={item}  key={index} />

                    ))):( null)}
               

            </div>

            <div className="bigPic">
                <img  src= {productInfo?(productInfo.images[0]):("...Loading")} alt="" />
                

            </div>


            <div className="textbox">
                <h1>{productInfo?(productInfo.name.toUpperCase()):("...Loading")}</h1>
                <h4>${productInfo?(productInfo.price):("...Loading")}</h4>
                <button id="AddToCartBtn">Add to Cart</button>

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