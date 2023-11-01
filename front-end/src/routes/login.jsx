import Banner from "../components/banner";
import NavBar from "../components/navbar";
import LoginForm from "../components/loginForm";
import Footer from "../components/footer";

import '../index.css'

export default function Login(){
    return(
        <>

        <main>

        <Banner/>

        <NavBar/>

        <LoginForm/>

        <Footer/>
       
        </main>
      
        </>
    )
}