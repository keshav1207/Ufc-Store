const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

//Get all the products from a category
router.get('/:categoryName/:optionalFilter?',asyncHandler( async function(req, res, next) {
    
    const optionalFilter = req.params['optionalFilter']|| null;
    const categoryName = req.params['categoryName'];
    
    //Finding category selected id
    
    const categorySelected = await Category.findOne({name: categoryName}).sort(optionalFilter).exec();
    const categoryId = categorySelected._id; 


    

    //Using the id to find the products
    const products = await Product.find({category:categoryId}).exec();

   
   
    res.json({success:true, data: products});


}))

module.exports = router;