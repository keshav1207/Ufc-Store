const cloudinary = require("cloudinary").v2;
require('dotenv').config();

try {
    //Configure cloudinary
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
} catch (error) {
    console.error("Error configuring Cloudinary:", error.message); 
}


module.exports = cloudinary;
