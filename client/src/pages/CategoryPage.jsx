import FixedNavBannerContainer from '../components/fixedNavBannerContainer'
import Footer from '../components/footer'
import DisplayCategory from '../components/displayCategory'
import { useParams } from 'react-router-dom'

export default function CategoryPage(){
    const {categoryName} = useParams();
    
   return(
     <>

    <main>

    <FixedNavBannerContainer/>

     <DisplayCategory category={categoryName}/>

    <Footer/>
       
    </main>
      
    </>
    
    )
}