import smallPic1 from "../assets/mouthgard1.webp"
import smallPic2 from "../assets/mouthgard2.avif"
export default function DisplayProduct(){
    return(
        <>

        <div className="productImageBox">

            <div className="smallPics">
                <img  src= {smallPic1} alt="" />
                <img  src={smallPic2}  alt="" />

            </div>

            <div className="bigPic">
                <img  src= {smallPic1} alt="" />
                

            </div>


            <div className="textbox">
                <h1>OPRO SILVER/BLACK UFC INSTANT CUSTOM FIT MOUTHGUARD</h1>
                <h4>$39.99</h4>
                <button id="AddToCartBtn">Add to Cart</button>

            </div>

        </div>

        <div className="featureBox">
            <div className="comments">
                    <p>In three decades, UFC has grown from a phenomenon to an unrivalled force, creating some of the most memorable moments and recognizable stars in sports history. Be part of the celebration with the Limited Edition OPRO UFC 30th Anniversary mouthguard!</p>
            </div>

            <div className="keyFeatures">
                    <h3>Key Features:</h3>
                    <ul>
                        <li>Dentist Level Protection</li>
                        <li>Hyperflex technology for a custom fit</li>
                        <li>Triple layer protection</li>
                        <li>Up to $20,000 worth of dental warranty</li>

                    </ul>
            </div>
        </div>


        </>

    )
}