const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

router.put('/:userId',asyncHandler( async function(req, res){
    

    //Get  User Id from params and productQtyArray from req.body
    
    const userId = req.params.userId;

    const productQtyArray = req.body;


    

    //Get user cart
    var cartArray  = await User.findById(userId).select('-_id cart').exec();
    cartArray = cartArray.cart;


    var updatedCart;

   
       
      
        // Update product qty in cart
     updatedCart = cartArray.map((item, index) => ({
        ...item,
        count: productQtyArray[index]
      }));

        
    //Update user cart in database
    const result = await User.findByIdAndUpdate(userId,{cart:updatedCart});


    return res.json(
        {success:true,msg:"Cart updated"}
    )

}))

module.exports = router;