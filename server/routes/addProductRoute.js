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
        const result = await cloudinary.uploader.upload(req.file.path,{ folder: "Ufc-Store" });

        //The delivery URL is available in the "secure_url" of the result

        const deliveryUrl = result.secure_url;

        const public_Id = result.public_id;

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
                await Product.create({name:name,price:price,features:features,comments:comments,category:categoryId,images:deliveryUrl,cloudinaryPublicId: public_Id});
                res.json({success:true,msg:"Product added to store"});
        } catch (error) {
               throw new Error("Error! Please try again!"); 
        }
        


}));

module.exports = router;