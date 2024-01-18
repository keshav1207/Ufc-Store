const jwt = require("jsonwebtoken");
require('dotenv').config();


const authMiddleware = async(req,res,next)=>{
    
    const authorizationHeader = req.header("authorization");

    if (!authorizationHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
    }
    
    const token = authorizationHeader.split(" ")[1];
   
   
    try {

        const decryptedToken = jwt.verify(token,process.env.SECRET_KEY,{ algorithms: ["HS256"] });
        req.body.userId = decryptedToken.userId;
        next() ; 

    } catch (error) {

        console.error("JWT verification error:", error);

        if (error.message ==="jwt expired") {
            return res.status(401).json({ error: "Token expired" });
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
       
}

module.exports = authMiddleware;