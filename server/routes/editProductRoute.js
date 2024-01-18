const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const cloudinary = require( '../config/cloudinaryConfig');
const upload = require('../middleware/multerMiddleware');

/* Edit product. */
const filesUploaded =  upload.fields([{ name: 'file-0', maxCount: 1 }, { name: 'file-1', maxCount: 1 },
{ name: 'file-2', maxCount: 1 },{ name: 'file-3', maxCount: 1 },
{ name: 'file-4', maxCount: 1 }])

router.put('/:productId', filesUploaded,asyncHandler( async function(req, res, next) {

    //Get product Id from params
    const productId = req.params['productId'];


    var existingImages = [];
    //Adding all the exisiting images to an array
    for(const key in req.body){
        if(key.startsWith("existing")){
            existingImages.push(req.body[key]);
        }
    }

    

    //Getting the product deliveryUrlArray & publicIdArray
    var deliveryUrlArray = await Product.findById(productId).select("-_id images").exec();
    var publicIdArray = await Product.findById(productId).select("-_id cloudinaryPublicId").exec();


    deliveryUrlArray = deliveryUrlArray.images;
    publicIdArray = publicIdArray. cloudinaryPublicId;


    
    // Here we are checking all the images from front end against our database, if an image in our database be cannot found 
    // in existingImage array, it means it has been deleted by the user.

    for(let i = 0; i < deliveryUrlArray.length; i++){
        
        
        if(!existingImages.includes(deliveryUrlArray[i])){
            
        //Delete the url from the deliveryUrlArray
            deliveryUrlArray.splice(i,1);

            //Delete Product from Cloudinary
        const cloudinaryResult = await cloudinary.uploader.destroy(publicIdArray[i]);

           //Delete the publicID from the publicIdArray
            publicIdArray.splice(i,1);
        }
    }
       
    // Here we are adding all the new images from front-end to our database and cloudinary.
        const files = req.files;
        //Iterates through the fields
        for (const field of Object.keys(files) ){
            
                //Access files  for each field
                const fieldFiles = files[field];
                
                //Iterate through the files in the current field
                for (const file of fieldFiles){

                    
                         
                
                        //Uploading image to cloudinary
                        const result = await cloudinary.uploader.upload(file.path,{ folder: "Ufc-Store" });

                        //The delivery URL is available in the "secure_url" of the result
                        const deliveryUrl = result.secure_url;
                        deliveryUrlArray.push(deliveryUrl);
                        
                        //This Id is used to delete the image if required
                         const public_Id = result.public_id;
                         publicIdArray.push(public_Id);
                         
                        
                }
        };
                
        



        const {name,price,features,comments,category} = req.body;

        //Finding ID of category selected
        var categoryId;
        try {
                const categorySelected = await Category.findOne({name: category});
                 categoryId = categorySelected._id;    
        } catch (error) {
                throw new Error("Please select category!"); 
        }
        

        //Update product in database
        try {
                
                await Product.findByIdAndUpdate(productId,{name:name,price:price,features:features,comments:comments,category:categoryId,images: deliveryUrlArray,cloudinaryPublicId: publicIdArray});
                res.json({success:true,msg:"Product updated in store"});
        } catch (error) {
               throw new Error("Error! Please try again!"); 
        }
        


}));

module.exports = router;