const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const Multer = require("multer");
const cloudinary = require( '../config/cloudinaryConfig');
const upload = require('../middleware/multerMiddleware');

/* Create new product. */
router.post('/', upload.single("file"),asyncHandler( async function(req, res, next) {
        
        //Uploading image to cloudinary
        cloudinary.uploader.upload(req.file.path,{ folder: "Ufc-Store" },function(err,result){
                if(err){
                        throw new Error("Image could not be uploaded");
                }

                console.log("Image Uploaded");
        })

        const {name,price,features,comments,category} = req.body;

        //Finding ID of category selected
        var categoryId;
        try {
                const categorySelected = await Category.findOne({name: category});
                 categoryId = categorySelected._id;    
        } catch (error) {
                throw new Error("Please select category!"); 
        }
        


        
        //Create product in database
        try {
                await Product.create({name:name,price:price,features:features,comments:comments,category:categoryId});
                res.json({success:true,msg:"Product added to store"});
        } catch (error) {
               throw new Error("Error! Please try again!"); 
        }
        


}));

module.exports = router;