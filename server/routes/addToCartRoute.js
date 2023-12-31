const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

router.post('/:userId/:productId',asyncHandler( async function(req, res, next){

    //Get product Id and User Id from params
    const productId = req.params['productId'];
    const userId = req.params['userId'];

    //Get user cart
    const cart  = await User.findById(userId).select('cart').exec();

   //If cart has no products, then add the product Id to cart with count 1
    if(cart.length == 0){
        const updatedCart = [{id: productId, count: 1}]
    }
    else{
        // Find if the product Id is already in the cart
        const updatedCart = cart.map(function(object){
                if(object.id == productId){
                    return{...object, count: object.count +1};
                }

                return object
        })
    }


    //Update user cart in database
    const result = await User.findByIdAndUpdate(userId,{cart:updatedCart});


    res.json(
        {success:true,msg:"Product added to cart"}
    )


     





}))

module.exports = router;