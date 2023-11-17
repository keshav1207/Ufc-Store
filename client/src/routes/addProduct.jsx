import Banner from '../components/banner'
import Footer from '../components/footer'
import NavBar from '../components/navbar'
import AddProductForm from '../components/addProductForm'

import '../index.css'

export default function AddProductPage(){
    return(
        <>

        <main>

        <Banner/>

        <NavBar/>

        <AddProductForm/>


        <Footer/>
       
        </main>
      
        </>
    )
}