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
        const categorySelected = await Category.findOne({name: category});
        const categoryId = categorySelected._id;


        
        //Create product in database
        await Product.create({name:name,price:price,features:features,comments:comments,images:images, category:categoryId});
        res.json({msg:"Product added to store"});
}));

module.exports = router;