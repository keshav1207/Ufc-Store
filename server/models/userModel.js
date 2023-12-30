const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
    type:String,
    required:true
    },


    email: {
    type:String,
    required:true,
    unique: true,
    trim: true,
    },

    password: {
    type:String,
    required:true,
    },

    role: {
    type:String,
    default: 'user',
    },

    status: {
    type:String,
    default: 'active',
    },

    profilePicture:{
        type: String,
        default:"",
    },

    // This is used to delete the profile picture from Cloudinary in case we delete the profile picture
    cloudinaryPublicId: {
        type: String,
        default:"",
        
        
    },

    cart: {
        type: Array,
        default:[],
        
        
    },

    

        },
        //set timestamps: true, Mongoose will add two properties of type Date to your schema createdAT 
        // & updateAT
        
        {timestamps: true}



)


const User = mongoose.model("users", userSchema);

module.exports = User;