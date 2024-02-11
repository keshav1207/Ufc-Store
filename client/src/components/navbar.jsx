
import {  CiUser } from "react-icons/ci";
import {  AiOutlineSearch } from "react-icons/ai";
import {  AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import ufclogo from "../assets/logo.avif"
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance ,{ setAuthToken } from "../apicalls/axiosInstance";
import { useJwtAuth } from '../hooks/useJwtAuth';
import { getAllCartProducts } from '../apicalls/getAllCartProducts';
import  { useSelector}  from 'react-redux';
import { API_BASE_URL } from "../apicalls/apiService";




export default function NavBar (){

    const [results,setResults] = useState("");

    const { jwtToken } = useJwtAuth();

    const reloadredux = useSelector((state) => state.reload. value);

 

    const handleInputChange = (event) => {
          
        setResults(event.target.value);
      };

    const handleSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    }

    const navigate = useNavigate();

    // Only navigate to search results page if the user  press enter and the input bar is not blank
    const handleKeyPress = (event) => {
        console.log(results);
            if(event.key == 'Enter' && results != ""){
                 
                navigate(`/searchResults/${results}`);
            }
    }

    const[userName, setUserName] = useState(null);
  
    const[loading,setLoading] = useState(false);


    // Get User Info and set the username
    useEffect( () => {

        const fetchData = async() =>{  
            try {
                
                
                setAuthToken(jwtToken);
                
                setLoading(true);
                const response = await axiosInstance.get(`${API_BASE_URL}/api/users/getUserInfo`);
                setUserId(response.data.data._id);
                setUserName(response.data.data.name) ;
                
            } catch (error) {
                
                if(error.response){
                    console.log(`${error.response.data.error}`) ;
                } 
            }finally{
                setLoading(false);
            }
            
        };


        if(jwtToken){
            fetchData();
        }

        else{
            setUserName("");
        }
       
        
       
       
    },[jwtToken, reloadredux])

    const[userId, setUserId] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
    const [quantity, setQuantity] = useState(0);


    // Get all the products from the User's Cart if user is logged in
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await getAllCartProducts(userId);
                console.log(response.data);
                setProductInfo(response.data);
                
            } catch (error) {
                console.log(error);
            }
        }
        if(userId){
            fetchData()
        }
      
    },[userId, reloadredux])


    // Count the number of items in the cart and add to the Quantity state
    useEffect(() => {
        if (productInfo) {
            var count = 0;
            productInfo.forEach((item) => {
                count += item.quantity;
            });
            setQuantity(count);
        }
        else{
            setQuantity(0);
        }
        
    }, [productInfo, reloadredux]);
       


    // State used to toggle Nav bar when the hamburger menu is present in  smaller screen sizes
    const[nav,setNav] = useState(false);

    function toggleNavbar(){

        setNav((prev) => !prev);

    }



    return(
        <div className="navBar " id={nav?('expand'):(null)}>
        
        <div className="logo">
        <Link to={'/'}>
        <img src={ufclogo}  alt="logo" id="logo"/>
        </Link>

        <button className="hamburger" onClick={toggleNavbar}><GiHamburgerMenu /></button>
        

        </div>

        <div className="menu">
            <Link to={"/categories/Apparel"} id={nav?('active'):(null)} >APPAREL</Link>
            <Link to={"/categories/Accessories"} id={nav?('active'):(null)} >ACCESORIES</Link>
            <Link to={"/categories/Equipment"}  id={nav?('active'):(null)}>EQUIPMENT</Link>

        </div>

        <div className="options ">

     

       <div className="search  ">
            <form onSubmit={handleSubmit} >
                <input id={nav?('active'):(null)} name='search' placeholder = "Search Store" value={results} onChange={handleInputChange} onKeyDown={handleKeyPress} />
            </form>


        {/* The code below add a link to the searchResults Page to the search SVG if the searchBar is not empty, otherwise the link is omitted*/}
        {results != ""?(<Link to={`/searchResults/${results}`}><AiOutlineSearch  id={nav?('active'):('navSvg')}/></Link>):(<AiOutlineSearch id={nav?('active'):('navSvg')} />)}
            
       </div>

       <div className="user">

         {/* The code below add a link to the user details Page to the username if the user is logged in, otherwise we have the default userIcon which links to the loginPage*/}
        {loading?(<div>...Loading</div>):(userName?(<Link to={"/userDetails"}><div id={nav?('userName'):('userHidden')}>{userName}</div></Link>):(<Link to={'/login'}><CiUser id={nav?('user'):('navSvg')}/></Link> ))}

        
           
       </div>
         {/* The code below add a link to the cart Page to the cart icon if the user is logged in, otherwise there is a link the loginPage*/}
          {/* In addtion, if the user is logged in, we will also display the number of items in the cart on the cart icon*/}
       <div className="cart">
        {userName?(<Link to={'/cart'}>
            {quantity &&  quantity > 0?(<div className='noOfProductsInCart' id={nav?(null):('cartHidden')}>{quantity}</div>):(null)}
            
            <AiOutlineShoppingCart id={nav?('cart'):('navSvg')}/>
        </Link>):(<Link to={'/login'}><AiOutlineShoppingCart id={nav?('cart'):('navSvg')}/></Link> )}
        
           
       </div>

       </div>
      
        </div>

    )
    
}