import FixedNavBannerContainer from '../components/fixedNavBannerContainer'
import RegisterForm from "../components/registerForm";
import Footer from "../components/footer";

import '../index.css'

export default function Register(){
    return(
        <>

        <main>

        <FixedNavBannerContainer/>
        <RegisterForm/>

        <Footer/>
       
        </main>
      
        </>
    )
}