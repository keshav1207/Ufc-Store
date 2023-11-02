const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import User from "../models/userModel"
require('dotenv').config();

/* Create user account. */
router.post('/register', asyncHandler( async function(req, res, next) {

    // Check if user already exists
    const userEmailAlreadyExist = await User.findOne({ email: req.body.email }).exec();
    if(userEmailAlreadyExist){
        throw new Error("User already exists!");
    }

    else{
        const userName = req.body.name;
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const saltRounds = 10;

        //Hash Password

        bcrypt.hash(userPassword, saltRounds, function(err, hash) {
            userPassword = hash;
        });

        // Create new user
        User.Create({name:userName},{email:userEmail},{password:userPassword});
          res.send({
            success: true,
            message: "User created successfully",
         })
       

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
    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPassword = req.body.password;

   const validPassword = bcrypt.compare(userPassword, userExist.password);


   // Create Json web token and send it to user
    if(validPassword){
        const token = jwt.sign({userId: user._id},process.env.SECRET_KEY);
    res.send({
        token: token,
        success: true,
        message: "User logged successfully",
     })
    }
    

  }));








  
  module.exports = router;

