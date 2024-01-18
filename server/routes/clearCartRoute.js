const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

router.delete('/:userId',asyncHandler( async function(req, res){
   
    
    //Get  User Id from params
    
    const userId = req.params['userId'];
    

    //Update user cart in database
    const result = await User.findByIdAndUpdate(userId,{cart:[]});


    return res.json(
        {success:true,msg:"Cart Cleared"}
    )

}))

module.exports = router;