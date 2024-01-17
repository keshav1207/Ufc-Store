const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

router.put('/:userId/:productId',asyncHandler( async function(req, res, next){
    

    //Get product Id and User Id from params
    const productId = req.params['productId'];
    const userId = req.params['userId'];
    

    //Get user cart
    var cartArray  = await User.findById(userId).select('-_id cart').exec();
    cartArray = cartArray.cart;


    var updatedCart;
   //If cart has no products, then add the product Id to cart with count 1
    if(cartArray.length == 0){
         updatedCart = [{id: productId, count: 1}]
    }
    else{
        // Find if the product Id is already in the cart and add one if is in the array
        var found = false;
         updatedCart = cartArray.map(function(object){
                
                if(object.id == productId){
                    found = true;
                    return{...object, count: object.count +1};
                }

                return object
        })

        if(!found){
            updatedCart.push({id: productId, count: 1});
        }
    }


    //Update user cart in database
    const result = await User.findByIdAndUpdate(userId,{cart:updatedCart});


    res.json(
        {success:true,msg:"Product added to cart"}
    )

}))

module.exports = router;