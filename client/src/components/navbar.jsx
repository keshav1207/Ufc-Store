
import '../index.css'
import {  CiUser } from "react-icons/ci";
import {  AiOutlineSearch } from "react-icons/ai";
import {  AiOutlineShoppingCart } from "react-icons/ai";
import ufclogo from "../assets/logo.avif"
import { Link } from 'react-router-dom';

export default function NavBar (){
    return(
        <div className="navBar">

        <div className="logo">
        <Link to={'/'}>
        <img src={ufclogo}  alt="logo" id="logo"/>
        </Link>
        

        </div>

        <div className="menu">
            <Link to={"/categories/apparel"}>APPAREL</Link>
            <Link to={"/categories/accessories"}>ACCESORIES</Link>
            <Link to={"/categories/equipment"}>EQUIPMENT</Link>

        </div>

        <div className="options">

     

       <div className="search">
            <form >
                <input name='search' placeholder = "Search Store"/>
            </form>

            <AiOutlineSearch id="navSvg"/>
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