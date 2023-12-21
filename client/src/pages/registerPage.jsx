import Banner from "../components/banner";
import NavBar from "../components/navbar";
import RegisterForm from "../components/registerForm";
import Footer from "../components/footer";

import '../index.css'

export default function Register(){
    return(
        <>

        <main>

        <Banner/>

        <NavBar/>

        <RegisterForm/>

        <Footer/>
       
        </main>
      
        </>
    )
}