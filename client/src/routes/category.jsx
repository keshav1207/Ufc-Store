import Banner from '../components/banner'
import Footer from '../components/footer'
import NavBar from '../components/navbar'
import DisplayCategory from '../components/displayCategory'

import '../index.css'
import { useParams } from 'react-router-dom'

export default function Category(){
    const {categoryName} = useParams();
   
    return(
        <>

        <main>

        <Banner/>

        <NavBar/>

        <DisplayCategory category={categoryName}/>


        <Footer/>
       
        </main>
      
        </>
    )
}