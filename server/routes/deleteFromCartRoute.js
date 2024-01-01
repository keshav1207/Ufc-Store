const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

router.delete('/:userId/:productId',asyncHandler( async function(req, res, next){
    

    //Get product Id and User Id from params
    const productId = req.params['productId'];
    const userId = req.params['userId'];
    

    //Get user cart
    var cartArray  = await User.findById(userId).select('-_id cart').exec();
    cartArray = cartArray.cart;


    var updatedCart;
   
        //  Reduce product count by 1
        
         updatedCart = cartArray.map(function(object){
                
                if(object.id == productId){
                    
                    return{...object, count: object.count -1};
                }

                return object
        })

        //Exclude products which have a count of zero

        updatedCart = updatedCart.filter(obj => obj.count != 0);

        
    


    //Update user cart in database
    const result = await User.findByIdAndUpdate(userId,{cart:updatedCart});


    res.json(
        {success:true,msg:"Product deleted from cart"}
    )

}))

module.exports = router;