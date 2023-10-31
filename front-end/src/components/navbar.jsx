
import '../index.css'
import {  CiUser } from "react-icons/ci";
import {  AiOutlineSearch } from "react-icons/ai";
import {  AiOutlineShoppingCart } from "react-icons/ai";
import ufclogo from "../assets/logo.avif"

export default function NavBar (){
    return(
        <div className="navBar">

        <div className="logo">
        <img src={ufclogo}  alt="logo" id="logo"/>

        </div>

        <div className="menu">
            <h4>APPAREL</h4>
            <h4>ACCESSORIES</h4>
            <h4>EQUIPMENT</h4>

        </div>

        <div className="options">

     

       <div className="search">
            <form action="">
                <input placeholder = "Search Store"/>
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