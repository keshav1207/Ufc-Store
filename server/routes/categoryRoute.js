const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

//Get all the products from a category
router.get('/:categoryName',asyncHandler( async function(req, res, next) {

    const categoryName = req.params['categoryName'];
    //Finding category selected id
    const categorySelected = await Category.findOne({name: categoryName});
    const categoryId = categorySelected._id; 

  

    //Using the id to find the products
    const products = await Product.find({category:categoryId});

   

    res.json({success:true});


}))

module.exports = router;