const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// Get product info for product detail page
router.get('/:productId',asyncHandler( async function(req, res, next) {
    
        //Get product Id from params
        const productId = req.params['productId'];

    

        //Get product Info from MongoDB
        const productInfo = await Product.findById(productId).exec();
       

        res.json({success:true, data: productInfo});

}))

// Delete product
router.delete('/:productId',asyncHandler( async function(req, res, next) {
    
        //Get product Id from params
        const productId = req.params['productId'];

    
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct){
                throw new Error("Product Not found");
        }

        res.json({success:true, data: deletedProduct});
        

}))




module.exports = router;