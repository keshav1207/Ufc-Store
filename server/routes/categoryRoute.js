const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

//Get all the products from a category
router.get('/:categoryName/:optionalFilter?',asyncHandler( async function(req, res, next) {
   
    const optionalFilter = req.params['optionalFilter']|| null;

    let sortArguments;
    if(optionalFilter){
        const arrayArguments = optionalFilter.split(","); 
        const fieldName = arrayArguments[0].toString();
        const number = parseInt(arrayArguments[1])
      
        sortArguments =  { [fieldName]:number};
    }else{
         sortArguments = {"createdAt":1};
    }


   

    const categoryName = req.params['categoryName'];
    
    //Finding category selected id

   
    const categorySelected = await Category.findOne({name: categoryName}).exec();
    const categoryId = categorySelected._id; 


    

    //Using the id to find the products
    
    const products = await Product.find({category:categoryId}).sort(sortArguments).select("name price  images ").exec();

   
   
    res.json({success:true, data: products});


}))

module.exports = router;