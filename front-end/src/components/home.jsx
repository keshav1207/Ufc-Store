import React from "react";
import {  CiUser } from "react-icons/ci";
import {  AiOutlineSearch } from "react-icons/ai";
import {  AiOutlineShoppingCart } from "react-icons/ai";
import ufclogo from "../assets/logo.avif"
import product1 from "../assets/product1.webp"
import product2 from "../assets/product2.webp"
import product3 from "../assets/product3.webp"
import Banner from "./banner";

import '../index.css'

export default function Home(){
    return(
        <>

        <main>

        <Banner/>


        
        
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




        <div className="productDrop">

            <p>NEW PRODUCT DROPS</p>

            <div className="productBox">
                <img src={product1} alt="product1" />
                <img src={product2} alt="product2" />
                <img src={product3} alt="product3" />

            </div>
        </div>


        <div className="footerBox">
            <div className="shop">
                <p id="footerTitle"><b>Shop</b></p>
                <p>About us</p>
                <p> Gift Cards</p>
                <p>Contact Us</p>
                
            </div>
            <div className="helpAndAdvice">
                <p id="footerTitle"><b>Help & Advice </b></p>
                <p> Shipping & Returns</p>
                <p>Cookie Policy</p>
                <p>Privacy Policy</p>
            </div>

        </div>


        </main>
      

        </>
    )
}