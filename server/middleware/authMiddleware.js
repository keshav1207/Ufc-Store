const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require('dotenv').config();


const authMiddleware = asyncHandler(function (req,res,next){
    const token = req.header("authorization").split(" ")[1];
    const decryptedToken = jwt.verify(token,process.env.SECRET_KEY);
    
    req.body.userId = decryptedToken.userId;
    (next)
})

module.exports = authMiddleware;