const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
require('dotenv').config();
const authMiddleware = require('../middleware/authMiddleware');
const cloudinary = require( '../config/cloudinaryConfig');
const upload = require('../middleware/multerMiddleware');

/* Create user account. */
router.post('/register', asyncHandler( async function(req, res, next) {
    // Check if user already exists
    const userEmailAlreadyExist = await User.findOne({ email: req.body.email }).exec();

    if(userEmailAlreadyExist){
       
        throw new Error("User already exists!");
        
    }

    else{
        let userName = req.body.name;
        let userEmail = req.body.email;
        let userPassword = req.body.password;
        var userRole;
        if(req.body.email == 'admin@gmail.com'){
            userRole = "admin"
        }

        else{
            userRole = "user"
        }
        
        const saltRounds = 10;

        //Hash Password
        const hashedPassword =  await bcrypt.hash(userPassword, saltRounds);
        userPassword = hashedPassword;


        // Create new user
        await User.create({name: userName,email: userEmail,password :userPassword, role: userRole});
        
        res.send("User created successfully!")
    }
  }));

  /* Login to user account. */
router.post('/login', asyncHandler(async function(req,res,next){
   
    //Verify if user exist
    const userExist = await User.findOne({ email: req.body.email }).exec();
    if(!userExist){
        
        throw new Error("User does not exist");

    }


    //Verify password
    
    const userPassword = req.body.password;

   const validPassword = await bcrypt.compare(userPassword, userExist.password);

  


   
    if(!validPassword){
    throw new Error("Password invalid!")
    }
    

    // Create Json web token and send it to user
    
    const token = jwt.sign({userId: userExist._id},process.env.SECRET_KEY,{expiresIn: '1d'});

    
    

    return res
    .json({ msg: "User Logged in Successfully", token });

  }));



/* Get user information. */

router.get('/getUserInfo',authMiddleware,asyncHandler(async(req,res)=>{
   
    
    const user = await User.findById(req.body.userId).exec();

    if(!user){
        throw Error("User not found");
    }

   return res.
   json({
        success: true,
        msg: "User fetched successfully",
        data: user,
    });

}));

/* Edit user information. */

router.put('/editUserInfo',upload.single('picture'),authMiddleware,asyncHandler(async(req,res)=>{

    let user, userPicture;
  
    const newPicture = req.file;

    // If a new picture was sent or the existing picture was  deleted, this will be type  undefined /undefined. Hence we will need to delete it from cloudinary.
    const existingPicture = req.body.picture;
    
    if( existingPicture == 'undefined'||typeof(existingPicture) == 'undefined'){
        
        var publicId = await User.findById(req.body.userId).select('-_id cloudinaryPublicId').exec();
        publicId = publicId. cloudinaryPublicId;


        // In of no profile picture, publicId will be an empty string "", hence no need to delete anything
        if(publicId !== ""){
        //Delete image from Cloudinary
        const cloudinaryResult = await cloudinary.uploader.destroy(publicId);

        //Delete image from mongoDB
        
        try {
            userPicture = await User.findByIdAndUpdate(req.body.userId, { profilePicture: "", cloudinaryPublicId: "" }).exec();
            
          } catch (error) {
            console.error('Error updating user:', error);
          }
        
       
        }
        
    }
   
    const{name,email,password} = req.body; 
   

    var deliveryUrlArray = [];
    var publicIdArray  = [];

    

    if(newPicture){
        //Uploading image to cloudinary

     const result = await cloudinary.uploader.upload(newPicture.path,{ folder: "Ufc-Store" });

       //The delivery URL is available in the "secure_url" of the result
       const deliveryUrl = result.secure_url;
       deliveryUrlArray.push(deliveryUrl);


       const public_Id = result.public_id;
        publicIdArray.push(public_Id);

         userPicture = await User.findByIdAndUpdate(req.body.userId,{ profilePicture: deliveryUrlArray[0], cloudinaryPublicId: publicIdArray[0]}).exec();
    }


    if(password !== ""){
        
        const saltRounds = 10;
        // Hash Password
        const hashedPassword =  await bcrypt.hash(password, saltRounds);
       

        const userPassword = hashedPassword;

        
         user = await User.findByIdAndUpdate(req.body.userId,{name:name, email:email, password:userPassword}).exec();
        
    }

    else{
       
         user = await User.findByIdAndUpdate(req.body.userId,{name:name, email:email}).exec();
         
    }
    

    

   return res.
   json({
        success: true,
        msg: "User Information updated successfully",
        data: {user,userPicture},
    });

}));


  module.exports = router;

