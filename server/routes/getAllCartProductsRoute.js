const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const Product = require("../models/productModel");


router.get('/:userId',asyncHandler( async function(req, res, next) {
    

    //Get user Id from params
    const userId = req.params['userId'];


    //Get user cart
        var cartArray  = await User.findById(userId).select('-_id cart').exec();
        cartArray = cartArray.cart;

    // If cart has no products, return false
        if(cartArray.length == 0){
            
         return   res.json({success:false});
       }

    
    else{
        
        var productsArray = []
        for(let i = 0; i < cartArray.length ; i++){
        const productInfo = await Product.findById(cartArray[i].id).populate('category').exec();

        productsArray.push({productInfo:productInfo, quantity:cartArray[i].count});

        }
    }



    return res.json({success:true, data: productsArray});

}))


module.exports = router;