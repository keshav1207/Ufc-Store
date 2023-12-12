const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const cloudinary = require( '../config/cloudinaryConfig');

// Get product info for product detail page
router.get('/:productId',asyncHandler( async function(req, res, next) {
    
        //Get product Id from params
        const productId = req.params['productId'];

    

        //Get product Info from MongoDB
        const productInfo = await Product.findById(productId).populate('category').exec();
       

        res.json({success:true, data: productInfo});

}))

// Delete product based on ID
router.delete('/:productId',asyncHandler( async function(req, res, next) {

        
    
        //Get product Id from params
        const productId = req.params['productId'];

        

        // Get cloudinary Public Id stored in mongoDB
        const result = await Product.findById(productId).select('-_id cloudinaryPublicId').exec();

        const publicId = result. cloudinaryPublicId;

        //Delete Product from Cloudinary
        const cloudinaryResult = await cloudinary.uploader.destroy(publicId);
        


        // Delete product from MongoDB
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct){
                throw new Error("Product Not found");
        }


        res.json({success:true, data: deletedProduct});
        

}))




module.exports = router;