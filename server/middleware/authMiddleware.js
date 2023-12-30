const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require('dotenv').config();


const authMiddleware = asyncHandler(async(req,res,next)=>{
    
    
    const token = req.header("authorization").split(" ")[1];
   
   
   
    
    
    
    try {
        const decryptedToken = jwt.verify(token,process.env.SECRET_KEY);
       
    
        req.body.userId = decryptedToken.userId;
       
        next() ;  
    } catch (error) {
        console.log(error.message);
        if (error.message ==="jwt expired") {
            return res.status(401).json({ error: "Token expired" });
        } else {
            
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    

    
    
})

module.exports = authMiddleware;