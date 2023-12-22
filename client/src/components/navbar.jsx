
import '../index.css'
import {  CiUser } from "react-icons/ci";
import {  AiOutlineSearch } from "react-icons/ai";
import {  AiOutlineShoppingCart } from "react-icons/ai";
import ufclogo from "../assets/logo.avif"
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function NavBar (){

    const [results,setResults] = useState("");

    const handleInputChange = (event) => {
        setResults(event.target.value);
      };

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
            <form >
                <input name='search' placeholder = "Search Store" value={results} onChange={handleInputChange}/>
            </form>


            <Link to={`/searchResults/${results}`}>

            <AiOutlineSearch id="navSvg"/>

            </Link>
       </div>

       <div className="user">
            <CiUser id="navSvg"/>
       </div>

       <div className="cart">
            <AiOutlineShoppingCart id="navSvg"/>
       </div>

       </div>
      
        </div>

    )
    
}