import FixedNavBannerContainer from '../components/fixedNavBannerContainer'
import ProductList from "../components/productList";
import Footer from "../components/footer";


export default function ManageProductsPage(){
    
    return(
        <>
        <main>

        <FixedNavBannerContainer/>

        <ProductList/>

        <Footer/>

        </main>
        
        </>

    )
}