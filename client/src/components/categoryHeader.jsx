import AccessoriesHeaderPic from "../assets/AccessoriesHeaderPic.webp";
import EquipmentHeaderPic from "../assets/EquipmentHeaderPic.webp";
import ApparelHeaderPic from "../assets/ApparelHeaderPic.webp";


export default function CategoryHeader({categorySelected}){

    console.log(categorySelected);

    let image,header, paragraph;

    if(categorySelected == "Apparel"){
        header = "UFC T-SHIRTS, JERSEYS, GEAR";
        paragraph = "From UFC t-shirts to durable UFC jerseys, get your hands on the very latest MMA apparel. Browse our selection of official UFC gear.Shop Now!"
        image = AccessoriesHeaderPic;
        


    }else if(categorySelected == "Equipment"){
        header = "UFC EQUIPMENT";
        paragraph = "If you're an MMA fan and looking to buy some high-quality equipment, look no further than the official UFC store. Offering the latest and greatest in UFC equipment including full body training, the official UFC store will have everything you need for your next training session. From official MMA gloves to MMA mouth guards, get your gear today!"
        image = EquipmentHeaderPic;
    }else{
        header = "UFC ACCESSORIES";
        paragraph = "Whether it’s a UFC flag, a Conor McGregor ring or even a UFC championship belt, the official Ultimate Fighting Championship store has everything a true MMA fan could ever need!  Our varied selection of UFC accessories will leave you and your fellow MMA friends kitted out with official high-quality gear. Shop our online range now."
        image = ApparelHeaderPic;
    }



    return(
        <>

        <div className="CatHeaderBox">

            <div className="CatHeaderText">
                <div className="CatHeaderTextComponent">
                <h1>{header}</h1>
                <p>{paragraph}</p>
                </div>
                
            </div>

            <div className="CatHeaderImg">
                <img src={image} alt={categorySelected} />

            </div>

        
        </div>

        
      
        </>
    )
}