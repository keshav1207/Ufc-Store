import Banner from "../components/banner";
import NavBar from "../components/navbar";
import ProductList from "../components/productList";
import Footer from "../components/footer";

import '../index.css'
export default function ManageProductsPage(){
    
    return(
        <>
        <main>

        <Banner/>

        <NavBar/>

        <ProductList/>

        <Footer/>

        </main>
        
        </>

    )
}