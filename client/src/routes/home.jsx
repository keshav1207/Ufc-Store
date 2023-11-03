
import Banner from "../components/banner";
import NavBar from "../components/navbar";
import ProductDropScreen from "../components/productDrop";
import Footer from "../components/footer";

import '../index.css'

export default function Home(){
    return(
        <>

        <main>

        <Banner/>

        <NavBar/>

        <ProductDropScreen/>

        <Footer/>
       
        </main>
      
        </>
    )
}