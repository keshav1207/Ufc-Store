const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

/* Create new product. */
router.post('/', asyncHandler( async function(req, res, next) {
        console.log(req.body);
        const {name,price,features,comments,images,category} = req.body;

        //Finding ID of category selected
        try {
                const categorySelected = await Category.findOne({name: category});
                const categoryId = categorySelected._id;    
        } catch (error) {
                throw new Error("Please select category!"); 
        }
        


        
        //Create product in database
        try {
                await Product.create({name:name,price:price,features:features,comments:comments,images:images, category:categoryId});
                res.json({success:true,msg:"Product added to store"});
        } catch (error) {
               throw new Error("Error! Please try again!"); 
        }
        


}));

module.exports = router;