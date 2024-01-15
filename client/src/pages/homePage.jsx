
import FixedNavBannerContainer from "../components/fixedNavBannerContainer";
import ProductDropScreen from "../components/productDrop";
import Footer from "../components/footer";

import '../index.css'

export default function Home(){
    return(
        <>

        <main>
        
       <FixedNavBannerContainer/>


        <ProductDropScreen/>

        <Footer/>
       
        </main>
      
        </>
    )
}