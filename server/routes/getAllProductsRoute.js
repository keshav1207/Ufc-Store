const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");

//Get all the products from database
router.get('/',asyncHandler( async function(req, res, next) {

    
    const allProducts = await Product.find().populate('category').exec();


    res.json({success:true, data: allProducts});


}))

module.exports = router;