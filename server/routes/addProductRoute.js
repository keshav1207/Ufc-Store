const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

/* Create new product. */
router.post('/', asyncHandler( async function(req, res, next) {
        console.log(req.body);
        res.json({msg:"Received form data"});
}));

module.exports = router;