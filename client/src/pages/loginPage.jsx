import FixedNavBannerContainer from '../components/fixedNavBannerContainer'
import LoginForm from "../components/loginForm";
import Footer from "../components/footer";


import '../index.css'

export default function Login(){
    return(
        <>

        <main>
      
        <FixedNavBannerContainer/>

        <LoginForm/>

        <Footer/>
       
        </main>
      
        </>
    )
}