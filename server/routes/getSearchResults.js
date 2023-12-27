const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");

router.get('/:searchQuery/:optionalFilter?',asyncHandler( async function(req, res, next) {

    const optionalFilter = req.params['optionalFilter']|| null;

    const searchQuery = req.params.searchQuery;


    let sortArguments;
    if(optionalFilter){
        const arrayArguments = optionalFilter.split(","); 
        const fieldName = arrayArguments[0].toString();
        const number = parseInt(arrayArguments[1])
      
        sortArguments =  { [fieldName]:number};
    }else{
         sortArguments = {"createdAt":1};
    }

    const searchResults = await Product.find({ $text: { $search: searchQuery } }).sort(sortArguments).exec();

   
    if(searchResults.length == 0){
        res.json({success:false, data:false}); 
    }
    else{
        res.json({success:true, data: searchResults});
    }
    


}))

module.exports = router;
