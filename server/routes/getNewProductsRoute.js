const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");

//Get  newest 3 products from database
router.get('/',asyncHandler( async function(req, res, next) {

    //Sort most recent using createdAT and then the top 3 results using the limit property.
    const newProducts = await Product.find().sort({ createdAt: -1 }).limit(3).exec();


    res.json({success:true, data: newProducts});


}))

module.exports = router;