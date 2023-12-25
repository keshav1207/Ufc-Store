
import '../index.css'
import {  CiUser } from "react-icons/ci";
import {  AiOutlineSearch } from "react-icons/ai";
import {  AiOutlineShoppingCart } from "react-icons/ai";
import ufclogo from "../assets/logo.avif"
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance ,{ setAuthToken } from "../apicalls/axiosInstance";

export default function NavBar (){

    const [results,setResults] = useState("");

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
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    const[loading,setLoading] = useState(false);


    useEffect( () => {

        const fetchData = async() =>{  
            try {
                
                
                setAuthToken(token);
                console.log("Before axios");
                setLoading(true);
                const response = await axiosInstance.get("http://localhost:5000/api/users/getUserInfo");
                setLoading(false);
                console.log("After axios");
                
                
                
                setUserName(response.data.data.name) ;
                
            } catch (error) {
               
                if(error.response){
                    console.log(`${error.response.data.msg}`) ;
                } 
            }
            
        };


        if(token){
            fetchData();
        }
        
       
       
    },[])

       

    



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

        {loading?(<div>...Loading</div>):(userName?(<div>{userName}</div>):(<Link to={'/login'}><CiUser id="navSvg"/></Link> ))}

        
           
       </div>

       <div className="cart">
            <AiOutlineShoppingCart id="navSvg"/>
       </div>

       </div>
      
        </div>

    )
    
}