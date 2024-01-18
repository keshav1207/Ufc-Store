const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

router.delete('/:userId/:productId',asyncHandler( async function(req, res){
    
    //Get product Id and User Id from params
    const productId = req.params['productId'];
    const userId = req.params['userId'];
    

    //Get user cart
    var cartArray  = await User.findById(userId).select('-_id cart').exec();
    cartArray = cartArray.cart;

    var updatedCart;

   
    //Remove specific product from cart
      
    updatedCart = cartArray.filter(obj => obj.id !== productId);


    //Update user cart in database
    const result = await User.findByIdAndUpdate(userId,{cart:updatedCart});


    res.json(
        {success:true,msg:"Product deleted from cart"}
    )

}))

module.exports = router;