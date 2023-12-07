const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
require('dotenv').config();
const authMiddleware = require('../middleware/authMiddleware');

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
        const saltRounds = 10;

        //Hash Password
        const hashedPassword =  await bcrypt.hash(userPassword, saltRounds);
        userPassword = hashedPassword;


        // Create new user
        await User.create({name: userName,email: userEmail,password :userPassword});
        
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
    
    const token = jwt.sign({userId: userExist._id},process.env.SECRET_KEY,{ expiresIn: '1d' });

    
    

    return res
    .json({ msg: "User Logged in Successfully", token });

  }));



/* Get user information. */

router.get('/get-user-info',authMiddleware,asyncHandler(async(req,res)=>{

    console.log("router function")
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

  module.exports = router;

