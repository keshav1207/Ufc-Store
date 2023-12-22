const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");

router.get('/:searchQuery',asyncHandler( async function(req, res, next) {

    const searchQuery = req.params['searchQuery'];

    const searchResults = await Product.find({ $text: { $search: searchQuery } }).exec();


    res.json({success:true, data: searchResults});


}))

module.exports = router;
