
import '../index.css'
import {  CiUser } from "react-icons/ci";
import {  AiOutlineSearch } from "react-icons/ai";
import {  AiOutlineShoppingCart } from "react-icons/ai";
import ufclogo from "../assets/logo.avif"
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance ,{ setAuthToken } from "../apicalls/axiosInstance";
import { useJwtAuth } from '../hooks/useJwtAuth';
import { getAllCartProducts } from '../apicalls/getAllCartProducts';

export default function NavBar (){

    const [results,setResults] = useState("");

    const { jwtToken } = useJwtAuth();

 

    const handleInputChange = (event) => {
          
        setResults(event.target.value);
      };

    const handleSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    }

    const navigate = useNavigate();


    const handleKeyPress = (event) => {
        console.log(results);
            if(event.key == 'Enter' && results != ""){
                 
                navigate(`/searchResults/${results}`);
            }
    }

    const[userName, setUserName] = useState(null);
  
    const[loading,setLoading] = useState(false);


    useEffect( () => {

        const fetchData = async() =>{  
            try {
                
                
                setAuthToken(jwtToken);
                
                setLoading(true);
                const response = await axiosInstance.get("http://localhost:5000/api/users/getUserInfo");
                setUserId(response.data.data._id);
                setLoading(false);
               
                
                
                
                setUserName(response.data.data.name) ;
                
            } catch (error) {
                setLoading(false);
                if(error.response){
                    console.log(`${error.response.data.error}`) ;
                } 
            }
            
        };


        if(jwtToken){
            fetchData();
        }

        else{
            setUserName("");
        }
       
        
       
       
    },[jwtToken])

    const[userId, setUserId] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
    const [quantity, setQuantity] = useState(0);


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
      
    },[userId])


    useEffect(() => {
        if (productInfo) {
            var count = 0;
            productInfo.forEach((item) => {
                count += item.quantity;
            });
            setQuantity(count);
        }
    }, [productInfo]);
       

    



    return(
        <div className="navBar">

        <div className="logo">
        <Link to={'/'}>
        <img src={ufclogo}  alt="logo" id="logo"/>
        </Link>
        

        </div>

        <div className="menu">
            <Link to={"/categories/Apparel"}>APPAREL</Link>
            <Link to={"/categories/Accessories"}>ACCESORIES</Link>
            <Link to={"/categories/Equipment"}>EQUIPMENT</Link>

        </div>

        <div className="options">

     

       <div className="search">
            <form onSubmit={handleSubmit} >
                <input name='search' placeholder = "Search Store" value={results} onChange={handleInputChange} onKeyDown={handleKeyPress} />
            </form>

        {results != ""?(<Link to={`/searchResults/${results}`}><AiOutlineSearch id="navSvg"/></Link>):(<AiOutlineSearch id="navSvg"/>)}
            
       </div>

       <div className="user">

   
        {loading?(<div>...Loading</div>):(userName?(<Link to={"/userDetails"}><div>{userName}</div></Link>):(<Link to={'/login'}><CiUser id="navSvg"/></Link> ))}

        
           
       </div>

       <div className="cart">
        <Link to={'/cart'}>
            <div className='NoOfProductsInCart'>{quantity?(quantity):(null)}</div>
            <AiOutlineShoppingCart id="navSvg"/>
        </Link>
           
       </div>

       </div>
      
        </div>

    )
    
}